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
import { TeamService } from 'src/team/team.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './entities/member.entity';
import { Model, Types } from 'mongoose';
export declare class MembersService {
    private readonly memberModel;
    private readonly teamService;
    constructor(memberModel: Model<Member>, teamService: TeamService);
    create(createMemberDto: CreateMemberDto): Promise<{
        created: string;
        newMember: CreateMemberDto;
    }>;
    getTeamMembers(teamId: any): Promise<{
        members: (import("mongoose").Document<unknown, {}, Member> & Member & {
            _id: Types.ObjectId;
        })[];
    }>;
    deleteTeamMember(memberId: string): Promise<{
        deleted: string;
    }>;
    deleteTeamMembers(teamId: any): Promise<{
        deleted: string;
        members: number;
    }>;
}
