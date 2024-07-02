import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'user' })
export class User extends Document {
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
    unique: false,
    default: false,
  })
  emailVerified: boolean;

  @Prop({
    default: false,
    required: false,
  })
  isRegistered: boolean;

  @Prop({
    required: false,
    unique: true,
  })
  uid: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
