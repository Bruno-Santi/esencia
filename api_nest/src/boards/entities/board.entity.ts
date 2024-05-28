import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Column extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Card' }] })
  cards: Types.ObjectId[];
}

export const ColumnSchema = SchemaFactory.createForClass(Column);

@Schema({ collection: 'Boards' })
export class Board extends Document {
  @Prop({ required: true })
  team_id: string;

  @Prop({ required: true })
  scrum_id: string;

  @Prop({ required: true })
  title: string;

  @Prop({
    type: [ColumnSchema],
    default: () => [
      { name: 'Backlog', cards: [] },
      { name: 'In Progress', cards: [] },
      { name: 'In Review', cards: [] },
      { name: 'Finished', cards: [] },
    ],
  })
  columns: Column[];

  @Prop({ required: true })
  sprint: number;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;

  @Prop({ default: Date.now })
  start_date: Date;

  @Prop({ default: Date.now })
  end_date: Date;
}

export const BoardsSchema = SchemaFactory.createForClass(Board);
