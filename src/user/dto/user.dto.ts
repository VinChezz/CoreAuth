import {
  IsString,
  IsEmail,
  IsBoolean,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class UserDto {
  @IsUUID()
  id: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  passwordHash?: string;

  @IsString({ message: 'The name must be a string' })
  name: string;

  @IsBoolean()
  @IsOptional({ message: 'isEmailVerified must be a boolean' })
  isEmailVerified?: boolean;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;
}
