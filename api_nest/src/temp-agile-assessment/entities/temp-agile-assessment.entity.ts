import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TempAgileAssessmentDocument = TempAgileAssessment & Document;

class AgileQuestion {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  score: number;
}
interface AgileIndex {
  Resultados: number;
  Metodología: number;
  Cultura: number;
  AgileIndex: number;
}
@Schema({ collection: 'tempAgileAssessment' })
export class TempAgileAssessment {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  teamName: string;

  @Prop({ type: [AgileQuestion], required: true })
  agileQuestions: AgileQuestion[];

  @Prop({ required: true })
  teamObjectivesAndFunctions: string;

  @Prop({ required: true })
  teamDailyChallenges: string;

  @Prop({ required: true })
  teamCultureAndValues: string;

  @Prop({ required: true })
  teamId: string;

  @Prop()
  agileindex: AgileIndex[];

  @Prop()
  analysis: string;

  @Prop()
  recommendations: string;
}

export const TempAgileAssessmentSchema =
  SchemaFactory.createForClass(TempAgileAssessment);
