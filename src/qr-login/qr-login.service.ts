import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma.service';
import { addMinutes } from 'date-fns';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class QrLoginService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async initSession() {
    const code = randomUUID();

    const session = await this.prisma.qrLoginSession.create({
      data: {
        code,
        expiresAt: addMinutes(new Date(), 3),
      },
    });
    return {
      message: 'QR code generated',
      successful: true,
      code: session.code,
    };
  }

  async confirmSession(code: string, userId: string) {
    const session = await this.prisma.qrLoginSession.findUnique({
      where: { code },
    });

    if (!session || session.isUsed || session.expiresAt < new Date()) {
      throw new BadRequestException('QR code not found or expired');
    }

    await this.prisma.qrLoginSession.update({
      where: { code },
      data: {
        userId,
        isUsed: true,
      },
    });

    return {
      message: 'QR code confirmed successfully',
      successful: true,
      userId: userId,
    };
  }

  async checkStatus(code: string) {
    const session = await this.prisma.qrLoginSession.findUnique({
      where: { code },
    });

    if (!session) throw new NotFoundException('QR code not found');

    if (session.expiresAt < new Date())
      throw new BadRequestException('Session expired');

    if (session.isUsed && session.userId) {
      const { accessToken, refreshToken } = this.authService.issueTokens(
        session.userId,
      );

      return { loggedIn: true, accessToken, refreshToken };
    }

    return {
      message: 'QR code not confirmed yet',
      loggedIn: false,
    };
  }
}
