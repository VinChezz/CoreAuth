import { IsString, Length } from 'class-validator';

export class ConfirmQrLoginDto {
  @IsString()
  @Length(10, 100)
  code: string;
}
