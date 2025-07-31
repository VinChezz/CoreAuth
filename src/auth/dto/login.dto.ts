import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Please enter the correct email' })
  email: string;

  @IsString({ message: 'Password is required' })
  password: string;
}
