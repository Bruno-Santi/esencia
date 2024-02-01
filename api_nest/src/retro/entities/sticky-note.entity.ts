import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class StickyNote extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  user_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  team_id: Types.ObjectId;

  @Prop({ required: true })
  column: string;

  @Prop({ required: true })
  value: string;

  @Prop({ default: 0 })
  thumb_up: number;
  @Prop({ default: 0 })
  thumb_down: number;
}

export const StickyNoteSchema = SchemaFactory.createForClass(StickyNote);
