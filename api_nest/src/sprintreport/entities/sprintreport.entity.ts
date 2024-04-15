import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({ collection: 'sprintreport' })
export class SprintReport extends Document {
    @Prop({ required: true })
    teamId: String 
    @Prop({ required: true })
    sprint: String
    @Prop({ required: true })
    startDate: Date
    @Prop({ required: true })
    endDate: Date
    @Prop({ required: true })
    tasks: mongoose.Schema.Types.Mixed
    @Prop({ required: true })
    cuadrants_difference: mongoose.Schema.Types.Mixed
    @Prop({ required: true })
    retrospective: mongoose.Schema.Types.Mixed
    @Prop({ required: true })
    line_graphs: mongoose.Schema.Types.Mixed
    @Prop({ required: true })
    survey_answers: mongoose.Schema.Types.Mixed
    @Prop({ required: true })
    analysis: String
    @Prop({ required: true })
    recommendations: String
};

// Optionally, you can add indexes, virtuals, methods, or statics to your schema


export const SprintReportSchema = SchemaFactory.createForClass(SprintReport);
