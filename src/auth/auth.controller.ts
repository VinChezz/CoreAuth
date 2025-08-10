import {
  Body,
  Controller,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Post,
  Res,
  Req,
  Get,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { response, Response } from 'express';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, accessToken, ...response } =
      await this.authService.login(dto);

    this.authService.addRefreshTokenToResponse(res, refreshToken);
    this.authService.addAccessTokenToResponse(res, accessToken);

    return response;
  }

  @HttpCode(200)
  @Post('login/access-token')
  async getNewTokens(
    @Req() req: Request,
    @Body('refreshToken') refreshTokenFromBody: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken =
      req.cookies?.[this.authService.REFRESH_TOKEN_NAME] ||
      refreshTokenFromBody;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing');
    }

    const { refreshToken: newRefreshToken, ...response } =
      await this.authService.getNewTokens(refreshToken);

    res.cookie(this.authService.REFRESH_TOKEN_NAME, newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie(this.authService.ACCESS_TOKEN_NAME, response.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 60 * 1000,
    });

    return response;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, accessToken, ...response } =
      await this.authService.register(dto);

    this.authService.addRefreshTokenToResponse(res, refreshToken);
    this.authService.addAccessTokenToResponse(res, accessToken);

    return response;
  }

  @HttpCode(200)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(this.authService.REFRESH_TOKEN_NAME, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    res.clearCookie(this.authService.ACCESS_TOKEN_NAME, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return { message: 'Logout successful' };
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebook(@Req() _req) {}

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookCallback(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, accessToken, ...response } =
      await this.authService.validateOAuthLogin('FACEBOOK', req);

    console.log('Facebook auth response', { refreshToken, accessToken });

    this.authService.addRefreshTokenToResponse(res, refreshToken);
    this.authService.addAccessTokenToResponse(res, accessToken);

    return { message: 'Facebook login successful', status: 200, ...response };
  }
}
