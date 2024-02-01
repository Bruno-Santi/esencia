import { PartialType } from '@nestjs/mapped-types';
import { CreateRetroDto } from './create-retro.dto';

export class UpdateRetroDto extends PartialType(CreateRetroDto) {
  id: number;
}
