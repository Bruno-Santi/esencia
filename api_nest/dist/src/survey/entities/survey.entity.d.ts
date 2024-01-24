/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document } from 'mongoose';
export declare class Survey extends Document {
    team_id: string;
    user_id: string;
    sprint: number;
    comment: {
        content: string;
    };
    question1: {
        content: string;
        value: number;
    };
    question2: {
        content: string;
        value: number;
    };
    question3: {
        content: string;
        value: number;
    };
    question4: {
        content: string;
        value: number;
    };
    date: Date;
}
export declare const surveySchema: import("mongoose").Schema<Survey, import("mongoose").Model<Survey, any, any, any, Document<unknown, any, Survey> & Survey & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Survey, Document<unknown, {}, import("mongoose").FlatRecord<Survey>> & import("mongoose").FlatRecord<Survey> & {
    _id: import("mongoose").Types.ObjectId;
}>;
