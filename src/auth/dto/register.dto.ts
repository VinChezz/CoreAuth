import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { isUrlOrBase64 } from 'src/validator/is-url-or-base64.validators';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  @IsString({ message: 'Username is required' })
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @MaxLength(30, { message: 'Username must be no longer than 30 characters.' })
  name: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must contain at least 6 characters' })
  @MaxLength(50, { message: 'Password must be no longer than 50 characters.' })
  passwordHash: string;

  @ApiProperty({
    required: false,
    description: 'Profile picture URL or base64 encoded image',
  })
  @IsOptional()
  @isUrlOrBase64({
    message: 'Picture must be a valid URL or base64 image string',
  })
  picture: string;
}
