import { PrismaService } from 'src/prisma/prisma.service';
export declare class CategoryService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    allCategory(): Promise<{
        id: number;
        name: string;
    }[]>;
}
