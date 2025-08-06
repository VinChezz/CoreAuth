import { BadRequestException, Injectable } from '@nestjs/common';
import {
  RequestPasswordResetDto,
  ResetPasswordDto,
} from 'src/auth/dto/password-dto/password-reset.dto';
import { PrismaService } from 'src/prisma.service';
import { generate6DigitsCode } from 'src/utils/generate6DigitsCode';
import { EmailSettingsService } from '../email/email-settings.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class PasswordService {
  constructor(
    private prisma: PrismaService,
    private emailSettings: EmailSettingsService,
  ) {}

  async sendCode(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const code = generate6DigitsCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    console.log('User in sendCode:', user);

    await this.prisma.passwordResetToken.deleteMany({
      where: {
        userId: user.id,
      },
    });
    await this.prisma.passwordResetToken.create({
      data: { code, expiresAt, userId: user.id },
    });

    const subject = 'Password to reset code';
    const text =
      `Your password reset code: ${code}\n` +
      `Expires in ${expiresAt.toLocaleTimeString()}.`;
    await this.emailSettings.sendEmail(user.email, subject, text);

    return { message: 'Reset code sent to email' };
  }

  async reset(code: string, newPassword: string, dto: ResetPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new BadRequestException('User not found');

    const token = await this.prisma.passwordResetToken.findFirst({
      where: { userId: user.id, code },
    });
    if (!token || token.expiresAt < new Date()) {
      throw new BadRequestException('Incorrect or expired code');
    }

    const hash = await bcrypt.hash(newPassword, 6);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: hash },
    });

    await this.prisma.passwordResetToken.delete({
      where: { id: token.id },
    });

    return { message: 'Password reset successful' };
  }
}
