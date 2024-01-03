import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  teamId: string;
}
