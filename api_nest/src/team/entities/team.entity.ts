import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

interface Member {
  id: string;
  role: string;
}
@Schema({ collection: 'teams' })
export class Team extends Document {
  @Prop({
    required: true,
  })
  name: string;
  @Prop({
    required: false,
  })
  logo?: string;
  @Prop({
    default: 1,
  })
  sprint?: number;
  @Prop({
    type: [{ id: String, role: String }],
    default: [],
  })
  members: Member[];
}

export const TeamSchema = SchemaFactory.createForClass(Team);
