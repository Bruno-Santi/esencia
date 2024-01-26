import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

interface Response {
  note: string;
  thumb_up: number;
  thumb_down: number;
}

@Schema({ collection: 'TeamRetro' })
export class Retro extends Document {
  @Prop({ required: true })
  team_id: string;

  @Prop({ required: true })
  sprint: number;

  @Prop({
    required: true,
    type: {
      content: { type: String, required: true },
      responses: { type: [{ type: Object }], default: [] },
    },
  })
  c1: { content: string; responses: Response[] };

  @Prop({
    required: true,
    type: {
      content: { type: String, required: true },
      responses: { type: [{ type: Object }], default: [] },
    },
  })
  c2: { content: string; responses: Response[] };

  @Prop({
    required: true,
    type: {
      content: { type: String, required: true },
      responses: { type: [{ type: Object }], default: [] },
    },
  })
  c3: { content: string; responses: Response[] };

  @Prop({
    required: true,
    type: {
      content: { type: String, required: true },
      responses: { type: [{ type: Object }], default: [] },
    },
  })
  c4: { content: string; responses: Response[] };
}

export const RetroSchema = SchemaFactory.createForClass(Retro);
