import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ collection: 'teams' })
export class Team extends Document {
  @Prop({
    required: true,
  })
  scrumId: string;
  @Prop({
    required: true,
  })
  name: string;
  @Prop({
    required: false,
  })
  logo?: string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
