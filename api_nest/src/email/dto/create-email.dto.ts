import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateEmailDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  subjectEmail: string;
}
