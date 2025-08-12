import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RequestPasswordResetDto {
  @ApiProperty()
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  email: string;
}
export class ResetPasswordDto {
  @ApiProperty()
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'Verification code must be a string' })
  @Length(6, 6)
  code: string;

  @ApiProperty()
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must contain at least 6 characters' })
  @MaxLength(50, { message: 'Password must be no longer than 50 characters.' })
  newPassword: string;
}
