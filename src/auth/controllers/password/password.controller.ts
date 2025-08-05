import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  RequestPasswordResetDto,
  ResetPasswordDto,
} from 'src/auth/dto/password-dto/password-reset.dto';
import { PasswordService } from 'src/auth/services/password/password.service';

@Controller('auth/password')
export class PasswordController {
  constructor(private passwordService: PasswordService) {}

  @Post('send-code')
  @HttpCode(200)
  sendCode(@Body() dto: RequestPasswordResetDto) {
    return this.passwordService.sendCode(dto);
  }

  @Post('reset-code')
  @HttpCode(200)
  verifyCode(@Body() dto: ResetPasswordDto) {
    return this.passwordService.reset(dto.code, dto.email, dto);
  }
}
