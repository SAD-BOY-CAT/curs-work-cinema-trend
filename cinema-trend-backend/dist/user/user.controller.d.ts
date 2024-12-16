import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(data: CreateUserDto): Promise<{
        id: number;
        email: string;
        username: string | null;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        picture: string | null;
        date: Date | null;
        gender: import(".prisma/client").$Enums.Gender | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getUser(req: any): Promise<{
        id: number;
        email: string;
        username: string | null;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        picture: string | null;
        date: Date | null;
        gender: import(".prisma/client").$Enums.Gender | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateUser(data: UpdateUserDto, req: any): Promise<{
        username: string;
        gender: import(".prisma/client").$Enums.Gender;
        date: Date;
        picture: string;
    }>;
}
