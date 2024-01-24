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
import { Member } from 'src/members/entities/member.entity';
import { Model } from 'mongoose';
import { SendGridService } from '@ntegral/nestjs-sendgrid';
import { JwtService } from '@nestjs/jwt';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { Survey } from './entities/survey.entity';
import { TeamService } from 'src/team/team.service';
export declare class SurveyService {
    private readonly memberModel;
    private readonly surveyModel;
    private readonly teamModel;
    private readonly client;
    private readonly jwtService;
    private readonly teamService;
    constructor(memberModel: Model<Member>, surveyModel: Model<Survey>, teamModel: Model<any>, client: SendGridService, jwtService: JwtService, teamService: TeamService);
    createNewSurvey(teamId: any): Promise<{
        payload: string;
    }>;
    postSurvey(createSurveyDto: CreateSurveyDto): Promise<{
        created: string;
    }>;
}
