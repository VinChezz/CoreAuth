import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmailVerificationDto {
  @ApiProperty()
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  email: string;
}

export class VerifyEmailDto {
  @ApiProperty()
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'Verification code must be a string' })
  @Length(6, 6)
  code: string;
}
