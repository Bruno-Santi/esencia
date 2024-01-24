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
import { CreateAuthDto } from './dto/create-auth.dto';
import { GetUserDto } from './dto/get-user.dto';
import { ScrumMaster } from './entities/user.entity';
import { Model, Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Team } from 'src/team/entities/team.entity';
import { TeamService } from 'src/team/team.service';
export declare class AuthService {
    private readonly scrumMasterModel;
    private readonly jwtService;
    private readonly teamService;
    private readonly teamModel;
    constructor(scrumMasterModel: Model<ScrumMaster>, jwtService: JwtService, teamService: TeamService, teamModel: Model<Team>);
    create(createAuthDto: CreateAuthDto): Promise<{
        payload: string;
    }>;
    findOne(getUserDto: GetUserDto): Promise<{
        token: string;
        user: {
            id: any;
            name: string;
            email: string;
        };
        teams: (import("mongoose").Document<unknown, {}, Team> & Team & {
            _id: Types.ObjectId;
        })[];
    }>;
    findScrumMaster(scrumId: any): Promise<boolean>;
}
