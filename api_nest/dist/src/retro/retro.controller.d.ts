import { RetroService } from './retro.service';
export declare class RetroEmailController {
    private readonly retroService;
    constructor(retroService: RetroService);
    sendEmailToTeamMembers(team_id: string): void;
    createRetro(retroData: any): Promise<string>;
}
