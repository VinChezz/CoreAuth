import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/config/getJwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { EmailSettingsService } from './services/email/email-settings.service';
import { PrismaModule } from 'src/prisma.module';
import { EmailService } from './services/email/email.service';
import { PasswordService } from './services/password/password.service';
import { EmailController } from './controllers/email/email.controller';
import { PasswordController } from './controllers/password/password.controller';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  controllers: [AuthController, EmailController, PasswordController],
  providers: [
    AuthService,
    JwtStrategy,
    GoogleStrategy,
    FacebookStrategy,
    EmailSettingsService,
    EmailService,
    PasswordService,
  ],
  exports: [EmailSettingsService],
})
export class AuthModule {}
