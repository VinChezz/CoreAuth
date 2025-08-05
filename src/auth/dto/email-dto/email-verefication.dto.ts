import { IsEmail, IsString, Length } from 'class-validator';

export class EmailVerificationDto {
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  email: string;
}

export class VerifyEmailDto {
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  email: string;

  @IsString({ message: 'Verification code must be a string' })
  @Length(6, 6)
  code: string;
}
