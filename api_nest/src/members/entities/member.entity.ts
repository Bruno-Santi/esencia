import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'members' })
export class Member extends Document {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    unique: true, // Asegura que el correo electrónico sea único
  })
  email: string;

  @Prop({
    required: true,
  })
  teamId: Types.ObjectId;

  @Prop({
    required: true,
  })
  avtColor: string;

  @Prop({
    default: false,
  })
  isRegistered: boolean;

  @Prop({
    required: false,
  })
  password: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
