import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString({ message: 'Name is required' })
  name: string;

  @IsString({
    message: 'Email is required',
  })
  @IsEmail()
  email: string;

  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @IsString({
    message: 'Password is required',
  })
  passwordHash: string;

  @IsOptional()
  @IsUrl({}, { message: 'Incorrect URL format for avatar' })
  picture: string;
}
