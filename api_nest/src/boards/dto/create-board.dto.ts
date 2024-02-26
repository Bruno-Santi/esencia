import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  team_id: string;
  @IsNotEmpty()
  @IsString()
  scrum_id: string;
  @IsNotEmpty()
  @IsNumber()
  sprint: number;
}

export class UpdateBoardDto extends CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}
