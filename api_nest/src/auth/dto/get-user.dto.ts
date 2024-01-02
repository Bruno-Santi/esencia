import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class GetUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
