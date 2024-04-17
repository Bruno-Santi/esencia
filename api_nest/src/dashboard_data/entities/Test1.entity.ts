import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define un esquema para los datos diarios
@Schema()
export class DailyData {
  @Prop({ required: true })
  date: Date;

  // Otros campos relacionados con los datos diarios
}

@Schema()
export class Test1 extends Document {
  @Prop({ required: true })
  team_id: string;

  // Define days como una matriz de objetos de DailyData
  @Prop({ type: [DailyData], required: true })
  days: DailyData[];
}

export const Test1Schema = SchemaFactory.createForClass(Test1);
