import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'TeamSurveys' })
export class DaySurvey extends Document {
  @Prop({ required: true })
  team_id: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: false })
  sprint: number;

  @Prop({
    type: [{ id: String, content: String, cuadrant_cohef: Array }],
    required: true,
  })
  questions: { id: string; content: string; cuadrant_cohef: number[] }[];
}

export const daySurveySchema = SchemaFactory.createForClass(DaySurvey);
