import { DataService } from './data.service';
export declare class DataController {
    private readonly dataService;
    constructor(dataService: DataService);
    getLong(teamId: string): Promise<{
        data: any;
    }>;
    getDashData(teamId: string): Promise<{
        data: any;
    }>;
}
