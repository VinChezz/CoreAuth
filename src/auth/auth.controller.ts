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
    @Res({ passthrough: true })
    res: Response,
  ) {
    const { refreshToken, ...response } = await this.authService.login(dto);

    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login/access-token')
  async GetNewTokens(
    @Req() req: Request,
    @Res({ passthrough: true })
    res: Response,
  ) {
    const refreshTokenFromCookies =
      req.cookies[this.authService.REFRESH_TOKEN_NAME];

    if (!refreshTokenFromCookies) {
      this.authService.removeRefreshTokenToResponse(res);
      throw new UnauthorizedException('Refresh токен не пройшов');
    }
    const { refreshToken, ...response } = await this.authService.getNewTokens(
      refreshTokenFromCookies,
    );

    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, ...response } = await this.authService.register(dto);

    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }

  @HttpCode(200)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    this.authService.removeRefreshTokenToResponse(res);
    this.authService.removeAccessTokenToResponse(res);

    return { message: 'Logout successful' };
  }
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async google(@Req() _req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req, @Res({ passthrough: true }) res: Response) {
    const { refreshToken, accessToken, ...response } =
      await this.authService.validateOAuthLogin(req);

    console.log('Google auth response', { refreshToken, accessToken });

    this.authService.addRefreshTokenToResponse(res, refreshToken);
    this.authService.addAccessTokenToResponse(res, accessToken);

    return { message: 'Google login successful', status: 200, ...response };
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
      await this.authService.validateOAuthLogin(req);

    console.log('Facebook auth response', { refreshToken, accessToken });

    this.authService.addRefreshTokenToResponse(res, refreshToken);
    this.authService.addAccessTokenToResponse(res, accessToken);

    return { message: 'Facebook login successful', status: 200, ...response };
  }
}
