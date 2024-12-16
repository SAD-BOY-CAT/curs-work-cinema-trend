import { UserService } from 'src/user/user.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    signIn(data: LoginDto): Promise<{
        token: string;
    }>;
    signUp(data: RegisterDto): Promise<boolean>;
}
