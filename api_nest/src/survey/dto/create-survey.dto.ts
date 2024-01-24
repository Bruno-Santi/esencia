import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsObject,
} from 'class-validator';

export class CreateSurveyDto {
  @IsOptional()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  team_id: string;

  @IsOptional()
  @IsNumber()
  sprint?: number | 0;

  @IsNotEmpty()
  @IsObject()
  question1: { content: string; value: number } | 0;

  @IsNotEmpty()
  @IsObject()
  question2: { content: string; value: number } | 0;

  @IsNotEmpty()
  @IsObject()
  question3: { content: string; value: number } | 0;

  @IsNotEmpty()
  @IsObject()
  question4: { content: string; value: number } | 0;

  @IsNotEmpty()
  @IsObject()
  comment?: { content: string } | undefined;
}
