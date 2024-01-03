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
  })
  email: string;
  @Prop({
    required: true,
  })
  teamId: Types.ObjectId;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
