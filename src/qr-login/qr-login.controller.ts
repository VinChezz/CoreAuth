import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { QrLoginService } from './qr-login.service';
import { ConfirmQrLoginDto } from './dto/confirm-qr-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('QrLogin')
@Controller('qr-login')
export class QrLoginController {
  constructor(private readonly qrLoginService: QrLoginService) {}

  @HttpCode(200)
  @Post('init')
  async initSession() {
    return this.qrLoginService.initSession();
  }

  @Auth()
  @HttpCode(200)
  @Post('confirm')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async confirmSession(@Body() dto: ConfirmQrLoginDto, @Req() req) {
    return this.qrLoginService.confirmSession(dto.code, req.user.id);
  }

  @HttpCode(200)
  @Get('status/:code')
  async checkStatus(@Param('code') code: string) {
    return this.qrLoginService.checkStatus(code);
  }
}
