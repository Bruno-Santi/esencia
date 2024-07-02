import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateTempAgileAssessmentDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  teamName: string;

  @IsNotEmpty()
  @IsArray()
  agileQuestions: {
    id: string;
    question: string;
    score: number;
  }[];

  @IsNotEmpty()
  @IsString()
  teamGoalsAndFunctions: string;

  @IsNotEmpty()
  @IsString()
  teamChallenges: string;

  @IsNotEmpty()
  @IsString()
  teamCultureAndValues: string;
}
