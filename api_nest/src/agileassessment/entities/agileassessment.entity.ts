import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

interface AgileQuestion {
    question: string;
    area: string;
    score: number;
}

interface AgileIndex {
    Resultados: number;
    Metodología: number;
    Cultura: number;
    AgileIndex: number;
}

@Schema()
export class AgilityAssessment extends Document {
    @Prop({ required: true })
    teamId: string;

    @Prop({ required: true })
    date: Date;

    @Prop({ required: true })
    teamContext: string;

    @Prop({ required: true })
    objectivesAndFunctions: string;

    @Prop({ required: true })
    dailyChallenges: string;

    @Prop({ required: true })
    cultureAndValues: string;

    @Prop({ required: true, type: [Object] })
    agileQuestions: AgileQuestion[];

    @Prop({ required: true })
    agileindex: AgileIndex[];   

    @Prop({ required: true })
    analysis: string;

    @Prop({ required: false })
    recommendations: string;
}

export const AgilityAssessmentSchema = SchemaFactory.createForClass(AgilityAssessment);