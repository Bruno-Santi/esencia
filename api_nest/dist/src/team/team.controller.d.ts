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
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { JwtAuthGuard } from 'common/jwt-guard/jwt-guard.guard';
import { ParseMongoIdPipe } from '../../common/pipes/parse-mongo-id.pipe';
import { Types } from 'mongoose';
export declare class TeamController {
    private readonly teamService;
    private readonly JwtGuardGuard;
    private readonly ParseMongoIdPipe;
    constructor(teamService: TeamService, JwtGuardGuard: JwtAuthGuard, ParseMongoIdPipe: ParseMongoIdPipe);
    create(createTeamDto: CreateTeamDto, scrumId: Types.ObjectId): Promise<import("mongoose").Document<unknown, {}, import("./entities/team.entity").Team> & import("./entities/team.entity").Team & {
        _id: Types.ObjectId;
    }>;
    GetTeams(scrumId: Types.ObjectId): Promise<(import("mongoose").Document<unknown, {}, import("./entities/team.entity").Team> & import("./entities/team.entity").Team & {
        _id: Types.ObjectId;
    })[]>;
}
