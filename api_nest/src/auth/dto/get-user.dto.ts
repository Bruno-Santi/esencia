import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class GetUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @IsEmail()
  email: string;

  @ValidateIf((o) => o.method !== 'Google')
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  method: string;

  @IsString()
  @IsNotEmpty()
  uid: string;

  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  avatar: string;
}
