import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('FACEBOOK_CLIENT_ID')!,
      clientSecret: configService.get('FACEBOOK_CLIENT_SECRET')!,
      callbackURL: configService.get('SERVER_URL') + '/auth/facebook/callback',
      scope: ['email', 'public_profile'],
      profileFields: ['id', 'emails', 'name', 'displayName', 'photos'],
    });
  }

  async validate(
    accessToken: string,
    _refreshToken: string,
    profile: any,
    done: Function,
  ) {
    const { emails, name, photos } = profile;

    const user = {
      email: emails && emails[0] ? emails[0].value : null,
      name: name?.givenName + ' ' + name?.familyName || 'Not specified',
      picture:
        photos && photos[0] ? photos[0].value : '/uploads/default-avatar.png',
      accessToken,
    };

    done(null, user);
  }
}
