import { IsString } from 'class-validator';

export class VerifyEmailDto {
  @IsString({ message: 'Confirmation token is required' })
  token: string;
}
