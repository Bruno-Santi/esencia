import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
export declare class SurveyController {
    private readonly surveyService;
    constructor(surveyService: SurveyService);
    createNewSurvey(teamId: string): Promise<{
        payload: string;
    }>;
    postSurvey(createSurveyDto: CreateSurveyDto): Promise<{
        created: string;
    }>;
}
