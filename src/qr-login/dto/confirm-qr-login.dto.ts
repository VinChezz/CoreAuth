import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmQrLoginDto {
  @ApiProperty()
  @IsString()
  @Length(10, 100)
  code: string;
}
