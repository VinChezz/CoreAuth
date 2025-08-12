import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Please enter the correct email' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'Password is required' })
  passwordHash: string;
}
