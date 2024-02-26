import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Member {
  @Prop({ required: true })
  memberId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  teamId: string;

  @Prop({ required: true })
  avtColor: string;
}

export class Comment {
  @Prop({ type: Member, required: true })
  member: Member;

  @Prop({ required: true })
  comment: string;

  @Prop({ default: Date.now })
  date: Date;
}

@Schema({ collection: 'Cards' })
export class Card extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  creator_id: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  boardId: string;

  @Prop({ type: [{ memberId: String, memberName: String, avtColor: String }] })
  assignees: { memberId: string; memberName: string; avtColor: string }[];

  @Prop({ type: Comment })
  comments: Comment[];
}

export const CardSchema = SchemaFactory.createForClass(Card);
