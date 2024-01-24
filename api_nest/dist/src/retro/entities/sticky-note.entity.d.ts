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
import { Document, Types } from 'mongoose';
export declare class StickyNote extends Document {
    user_id: Types.ObjectId;
    team_id: Types.ObjectId;
    column: string;
    value: string;
    thumb_up: number;
    thumb_down: number;
}
export declare const StickyNoteSchema: import("mongoose").Schema<StickyNote, import("mongoose").Model<StickyNote, any, any, any, Document<unknown, any, StickyNote> & StickyNote & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, StickyNote, Document<unknown, {}, import("mongoose").FlatRecord<StickyNote>> & import("mongoose").FlatRecord<StickyNote> & {
    _id: Types.ObjectId;
}>;
