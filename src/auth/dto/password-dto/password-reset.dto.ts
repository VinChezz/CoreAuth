import {
  IsEmail,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RequestPasswordResetDto {
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  email: string;
}
export class ResetPasswordDto {
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  email: string;

  @IsString({ message: 'Verification code must be a string' })
  @Length(6, 6)
  code: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must contain at least 6 characters' })
  @MaxLength(50, { message: 'Password must be no longer than 50 characters.' })
  newPassword: string;
}
