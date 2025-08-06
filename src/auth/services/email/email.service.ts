import { BadRequestException, Injectable } from '@nestjs/common';
import { generate6DigitsCode } from 'src/utils/generate6DigitsCode';
import { PrismaService } from 'src/prisma.service';
import {
  EmailVerificationDto,
  VerifyEmailDto,
} from 'src/auth/dto/email-dto/email-verefication.dto';
import { EmailSettingsService } from './email-settings.service';
@Injectable()
export class EmailService {
  constructor(
    private prisma: PrismaService,
    private emailSettings: EmailSettingsService,
  ) {}

  async sendCode(dto: EmailVerificationDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new BadRequestException('User not found');

    const code = generate6DigitsCode();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await this.prisma.emailVerificationToken.deleteMany({
      where: { userId: user.id },
    });

    await this.prisma.emailVerificationToken.create({
      data: { code, expiresAt, userId: user.id },
    });

    const subject = `Email confirmation code`;
    const text =
      `Your email verification code: ${code}\n` +
      `Expires in ${expiresAt.toLocaleTimeString()}`;

    await this.emailSettings.sendEmail(dto.email, subject, text);

    return { message: 'Email verefication code sent to email' };
  }

  async verifyCode(dto: VerifyEmailDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new BadRequestException('User not found');

    const token = await this.prisma.emailVerificationToken.findFirst({
      where: {
        user: {
          email: dto.email,
        },
        code: dto.code,
        expiresAt: {
          gte: new Date(),
        },
      },
    });
    console.log({ token });
    if (!token || token.expiresAt < new Date()) {
      throw new BadRequestException('Incorrect or expired code');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { isEmailVerified: true },
    });

    await this.prisma.emailVerificationToken.delete({
      where: { id: token.id },
    });
    return { message: 'Email verified successfully' };
  }
}
