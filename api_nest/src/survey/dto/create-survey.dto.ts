import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSurveyDto {
  @IsOptional()
  @IsString()
  user_id: string;
  @IsNotEmpty()
  @IsString()
  team_id: string;
  @IsOptional()
  sprint?: number | 0;
  @IsNotEmpty()
  question1: number | 0;
  @IsNotEmpty()
  question2: number | 0;
  @IsNotEmpty()
  question3: number | 0;
  @IsNotEmpty()
  question4: number | 0;
  @IsOptional()
  comment?: string;
}
