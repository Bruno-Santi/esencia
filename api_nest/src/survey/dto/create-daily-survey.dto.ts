import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsObject,
  IsArray,
  ValidateNested,
} from 'class-validator';

class Question {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  cuadrant_cohef: number[];
}

export class CreateDailySurveyDto {
  @IsNotEmpty()
  @IsString()
  team_id: string;

  @IsOptional()
  @IsNumber()
  sprint?: number | 0;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true }) // Esta validación es importante para asegurar que cada elemento en el array sea validado según la clase Question
  @Type(() => Question)
  questions: Question[];
}
