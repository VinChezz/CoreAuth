import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    super({
      clientId: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackUrl: configService.get('SERVER_URL') + '/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { photos, emails, displayName } = profile;
    const user = {
      emails: emails && emails[0] ? emails[0].value : null,
      name: displayName,
      picture:
        photos && photos[0] ? photos[0].value : '/uploads/default-avatar.png',
      accessToken,
    };

    done(null, user);
  }
}
