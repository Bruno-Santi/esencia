import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
class AssigneeDto {
  @IsNotEmpty()
  @IsString()
  memberId: string;

  @IsNotEmpty()
  @IsString()
  memberName: string;

  @IsNotEmpty()
  @IsString()
  avtColor: string;
}

class CommentDto {
  @IsNotEmpty()
  @IsString()
  memberId: string;
  @IsNotEmpty()
  @IsString()
  memberName: string;
  @IsNotEmpty()
  @IsString()
  avtColor: string;
  @IsNotEmpty()
  @IsString()
  comment: string;

  date?: Date;

  thumb_up?: number;

  thumb_down?: number;
}

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsNotEmpty()
  @IsString()
  creator_id: string;
  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  boardId: string;

  @IsArray()
  @ArrayMinSize(0)
  assignees: string[];

  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  comments: CommentDto[];
}

export class UpdateCardDto {
  status?: string;

  @IsOptional()
  title?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AssigneeDto)
  assignees?: AssigneeDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  comments?: CommentDto[];
}
