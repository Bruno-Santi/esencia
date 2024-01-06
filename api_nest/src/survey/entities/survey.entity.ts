import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'surveys' })
export class Survey extends Document {
  @Prop({
    required: false,
  })
  userId: string;
  @Prop({
    required: true,
  })
  teamId: string;
  @Prop({
    required: true,
  })
  question1: number;
  @Prop({
    required: true,
  })
  question2: number;
  @Prop({
    required: true,
  })
  question3: number;
  @Prop({
    required: true,
  })
  question4: number;
  @Prop({
    required: false,
  })
  comment: string;

  @Prop({
    required: false,
  })
  sprint: number;
  @Prop({
    required: true,
  })
  date: Date;
}

export const surveySchema = SchemaFactory.createForClass(Survey);
