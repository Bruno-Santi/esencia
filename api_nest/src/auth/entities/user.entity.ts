import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'scrumMaster' })
export class ScrumMaster extends Document {
  @Prop({
    unique: false,
    required: true,
  })
  name: string;

  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  @Prop({
    unique: false,
    required: true,
  })
  password: string;
}

export const ScrumMasterSchema = SchemaFactory.createForClass(ScrumMaster);
