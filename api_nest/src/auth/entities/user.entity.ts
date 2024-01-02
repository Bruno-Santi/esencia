import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'auth' })
export class ScrumMaster extends Document {
  @Prop({
    unique: false,
  })
  name: string;

  @Prop({
    unique: true,
  })
  email: string;

  @Prop({
    unique: false,
  })
  password: string;
}

export const ScrumMasterSchema = SchemaFactory.createForClass(ScrumMaster);
