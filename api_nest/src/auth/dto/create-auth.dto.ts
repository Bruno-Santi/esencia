import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
  @ValidateIf((o) => o.method !== 'Google')
  @IsString()
  avtColor: string;
  @IsString()
  avatar: string;
  @IsString()
  role: string;
  @IsString()
  method: string;
  @IsString()
  uid: string;
}
