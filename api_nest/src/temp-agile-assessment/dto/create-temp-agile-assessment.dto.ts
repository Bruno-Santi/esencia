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
  teamObjectivesAndFunctions: string;

  @IsNotEmpty()
  @IsString()
  teamDailyChallenges: string;

  @IsNotEmpty()
  @IsString()
  teamCultureAndValues: string;
}
