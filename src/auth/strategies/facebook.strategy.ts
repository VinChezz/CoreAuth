import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private configService: ConfigService) {
    super({
      clientId: configService.get('FACEBOOK_CLIENT_ID'),
      clientSecret: configService.get('FACEBOOK_CLIENT_SECRET'),
      callbackURL: configService.get('SERVER_URL') + '/auth/facebook/callback',
      profileFields: ['id', 'emails', 'name', 'picture.type(large)'],
    });
  }
  async validate(
    accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { id, emails, displayName, photos } = profile;

    const user = {
      email: emails?.[0]?.value,
      facebookId: id,
      name: displayName,
      avatar: photos?.[0]?.value,
    };
    done(null, user);
  }
}
