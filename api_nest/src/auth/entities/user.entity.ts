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
    unique: false,
    required: true,
  })
  role: string;
  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  @Prop({
    unique: false,
    required: false,
  })
  password: string;

  @Prop({
    unique: false,
    required: true,
  })
  avtColor: string;
  @Prop({
    unique: false,
    required: false,
  })
  avatar: string;
  @Prop({
    default: true,
    required: false,
  })
  firstLoggin: boolean;
  @Prop({
    unique: false,
    required: false,
  })
  method: string;
  @Prop({
    unique: true,
    required: false,
  })
  uid: string;
}

export const ScrumMasterSchema = SchemaFactory.createForClass(ScrumMaster);
