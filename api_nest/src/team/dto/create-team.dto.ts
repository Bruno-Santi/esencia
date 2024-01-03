import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;
  @IsOptional()
  logo?: string;
}
