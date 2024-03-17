import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import moment from 'moment-timezone';

export class Member {
  @Prop({ required: true })
  memberId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  teamId: string;

  @Prop({ required: true })
  avtColor: string;
}

export class CheckItem {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true, default: false })
  isChecked: boolean;

  @Prop({ required: true, type: Types.ObjectId })
  _id: Types.ObjectId;
}

@Schema()
export class CheckList {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [CheckItem], default: [] })
  checkItems: CheckItem[];

  constructor(title: string) {
    this.title = title;
    this.checkItems = []; // Inicializamos el array de checkItems como vacío
  }
}

@Schema()
export class Comment extends Document {
  @Prop({ type: Member, required: true })
  member: Member;

  @Prop({ required: true })
  comment: string;

  @Prop({
    required: true,
    default: () => moment.tz('America/Argentina/Buenos_Aires').format(),
  })
  date: Date;

  constructor(member: Member, comment: string, date: Date) {
    super();
    this.member = member;
    this.comment = comment;
    this.date = date;
  }
}

@Schema({ collection: 'Cards' })
export class Card extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  creator_id: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  boardId: string;

  @Prop({ type: [{ memberId: String, memberName: String, avtColor: String }] })
  assignees: { memberId: string; memberName: string; avtColor: string }[];

  @Prop({ type: [Comment], default: [] })
  comments: Comment[];

  @Prop({ type: [CheckList], default: [] })
  checkList: CheckList[];

  constructor(
    title: string,
    creator_id: string,
    description: string,
    status: string,
    boardId: string,
  ) {
    super();
    this.title = title;
    this.creator_id = creator_id;
    this.description = description;
    this.status = status;
    this.boardId = boardId;
    this.assignees = [];
    this.comments = [];
    this.checkList = [{ title: 'Checklist', checkItems: [] }];
  }
}

export const CardSchema = SchemaFactory.createForClass(Card);
