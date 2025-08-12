import {
  IsString,
  IsEmail,
  IsBoolean,
  IsOptional,
  IsUUID,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'Password must be a string' })
  passwordHash?: string;

  @ApiProperty()
  @IsString({ message: 'The name must be a string' })
  name: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional({ message: 'isEmailVerified must be a boolean' })
  isEmailVerified?: boolean;

  @ApiProperty()
  @IsOptional()
  provider: 'EMAIL' | 'GOOGLE' | 'FACEBOOK';

  @ApiProperty()
  @IsOptional()
  @IsUrl({}, { message: 'Incorrect URL format for avatar' })
  @IsString({ message: 'Picture must be a string' })
  picture?: string;

  @ApiProperty()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty()
  @IsOptional()
  updatedAt?: Date;
}
