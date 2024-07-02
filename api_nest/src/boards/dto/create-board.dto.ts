import { IsNotEmpty, IsNumber, IsString, IsISO8601 } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  team_id: string;

  @IsNotEmpty()
  @IsNumber()
  sprint: number;
}

export class UpdateBoardDto extends CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}

export class UpdateBoardDatesDto {
  @IsISO8601()
  start_date: string;

  @IsISO8601()
  end_date: string;
}
