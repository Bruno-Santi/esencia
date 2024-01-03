import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { GetUserDto } from './dto/get-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(createAuthDto: CreateAuthDto): Promise<{
        payload: string;
    }>;
    findOne(getUserDto: GetUserDto): Promise<{
        token: string;
    }>;
}
