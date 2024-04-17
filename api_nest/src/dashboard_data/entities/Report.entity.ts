import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class DailyData {
  @Prop({ required: true })
  date: Date;
}

@Schema()
export class Report extends Document {
  @Prop({ required: true })
  team_id: string;

  @Prop({ type: [DailyData], required: true })
  days: DailyData[];
}

export const ReportSchema = SchemaFactory.createForClass(Report);
