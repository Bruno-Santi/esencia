import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'recommendation' })
export class Recommendation extends Document {
  @Prop({ required: true })
  team_id: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  kind: string;

  @Prop({ required: true })
  content: string;
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const RecommendationSchema =
  SchemaFactory.createForClass(Recommendation);
