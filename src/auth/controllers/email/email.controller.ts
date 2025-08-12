import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  EmailVerificationDto,
  VerifyEmailDto,
} from 'src/auth/dto/email-dto/email-verefication.dto';
import { EmailService } from 'src/auth/services/email/email.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('ConfirmEmail')
@Controller('auth/email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post('send-code')
  @HttpCode(200)
  sendCode(@Body() dto: EmailVerificationDto) {
    return this.emailService.sendCode(dto);
  }

  @Post('verify-code')
  @HttpCode(200)
  verifyCode(@Body() dto: VerifyEmailDto) {
    return this.emailService.verifyCode(dto);
  }
}
