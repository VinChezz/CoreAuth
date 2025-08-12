import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Name is required' })
  name: string;

  @ApiProperty()
  @IsString({
    message: 'Email is required',
  })
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @ApiProperty()
  @IsString({
    message: 'Password is required',
  })
  passwordHash: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl({}, { message: 'Incorrect URL format for avatar' })
  picture: string;
}
