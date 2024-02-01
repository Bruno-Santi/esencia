import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'surveys' })
export class Survey extends Document {
  @Prop({ required: true })
  team_id: string;

  @Prop({ required: true })
  user_id: string;

  @Prop({ required: false })
  sprint: number;

  @Prop({ type: Object, required: false })
  comment: { content: string };

  @Prop({ type: Object, required: true })
  question1: { content: string; value: number };

  @Prop({ type: Object, required: true })
  question2: { content: string; value: number };

  @Prop({ type: Object, required: true })
  question3: { content: string; value: number };

  @Prop({ type: Object, required: true })
  question4: { content: string; value: number };

  @Prop({ required: true })
  date: Date;
}

export const surveySchema = SchemaFactory.createForClass(Survey);
