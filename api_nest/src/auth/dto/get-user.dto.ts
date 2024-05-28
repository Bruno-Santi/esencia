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

  @ValidateIf((o) => !o.method || o.method !== 'Google')
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @ValidateIf((o) => o.method)
  @IsString()
  method: string;

  @ValidateIf((o) => o.method === 'Google')
  @IsString()
  @IsNotEmpty()
  uid: string;

  @ValidateIf((o) => o.method === 'Google')
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((o) => o.method === 'Google')
  @IsString()
  avatar: string;
}
