import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
export declare class UserService {
    private readonly prismaService;
    private readonly bucket;
    constructor(prismaService: PrismaService);
    findOne(email: string): Promise<{
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
    update(data: Omit<UpdateUserDto, 'picture'>, userId: number, fileBuffer?: Buffer): Promise<{
        username: string;
        gender: import(".prisma/client").$Enums.Gender;
        date: Date;
        picture: string;
    }>;
    private uploadAvatar;
}
