import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty()
  @IsString({ message: 'Token is required' })
  token: string;

  @ApiProperty()
  @IsString({ message: 'New password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  newPassword: string;
}
