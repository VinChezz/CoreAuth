import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  EXPIRE_DAYS_REFRESH_TOKEN = 7;
  REFRESH_TOKEN_NAME = 'refreshToken';

  EXPIRE_MINUTES_ACCESS_TOKEN = 60;
  ACCESS_TOKEN_NAME = 'accessToken';

  SALT_ROUNDS = 10;

  constructor(
    private jwt: JwtService,
    private userService: UserService,
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const tokens = this.issueTokens(user.id);

    return { user, ...tokens };
  }

  async register(dto: RegisterDto) {
    const oldUser = await this.userService.getByEmail(dto.email);

    if (oldUser) throw new BadRequestException('User already exists');

    const user = await this.userService.create(dto);
    const tokens = this.issueTokens(user.id);

    return { user, ...tokens };
  }

  async getNewTokens(refreshToken: string) {
    try {
      const result = await this.jwt.verifyAsync(refreshToken);

      if (!result || !result.id) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const user = await this.userService.getById(result.id);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const tokens = this.issueTokens(user.id);

      return { user, ...tokens };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  private async validateUser(dto: LoginDto) {
    const user = await this.userService.getByEmail(dto.email);
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  issueTokens(userId: string) {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '15m',
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async validateOAuthLogin(provider: 'GOOGLE' | 'FACEBOOK', request: any) {
    const { email, name, picture } = request.user;

    if (!email) {
      throw new BadRequestException('Email is required');
    }

    let user = await this.userService.getByEmail(email);

    if (user) {
      if (user.provider !== provider) {
        throw new BadRequestException(
          `This email is already registered via ${user.provider}. Please use that method to login.`,
        );
      }
    } else {
      user = await this.prisma.user.create({
        data: {
          email,
          name: name || 'Not specified',
          picture: picture || '/uploads/default-avatar.png',
          provider,
        },
      });
    }

    const tokens = this.issueTokens(user.id);

    return { user, ...tokens };
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAYS_REFRESH_TOKEN);

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      domain: this.configService.get('SERVER_DOMAIN'),
      expires: expiresIn,
      secure: true,
      sameSite: 'none',
    });
  }

  addAccessTokenToResponse(res: Response, accessToken: string) {
    const expiresIn = new Date();
    expiresIn.setMinutes(
      expiresIn.getMinutes() + this.EXPIRE_MINUTES_ACCESS_TOKEN,
    );

    res.cookie(this.ACCESS_TOKEN_NAME, accessToken, {
      httpOnly: true,
      domain: this.configService.get('SERVER_DOMAIN'),
      expires: expiresIn,
      secure: true,
      sameSite: 'none',
    });
  }

  removeRefreshTokenToResponse(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      domain: this.configService.get('SERVER_DOMAIN'),
      expires: new Date(0),
      secure: true,
      sameSite: 'none',
    });
  }

  removeAccessTokenToResponse(res: Response) {
    res.cookie(this.ACCESS_TOKEN_NAME, '', {
      httpOnly: true,
      domain: this.configService.get('SERVER_DOMAIN'),
      expires: new Date(0),
      secure: true,
      sameSite: 'none',
    });
  }
}
