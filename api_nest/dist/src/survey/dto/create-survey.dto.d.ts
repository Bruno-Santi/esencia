export declare class CreateSurveyDto {
    user_id: string;
    team_id: string;
    sprint?: number | 0;
    question1: {
        content: string;
        value: number;
    } | 0;
    question2: {
        content: string;
        value: number;
    } | 0;
    question3: {
        content: string;
        value: number;
    } | 0;
    question4: {
        content: string;
        value: number;
    } | 0;
    comment?: {
        content: string;
    } | undefined;
}
