import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto, DeleteReviewDto } from './review.dto';
export declare class ReviewService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getReviewByMovieId(id: number): Promise<{
        user: {
            id: number;
            username: string;
            picture: string;
        };
        id: number;
        content: string;
        rating: number;
        userId: number;
        movieId: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    createReview(data: CreateReviewDto & {
        userId: number;
    }): Promise<{
        id: number;
        content: string;
        rating: number;
        userId: number;
        movieId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteReview(data: DeleteReviewDto): Promise<{
        id: number;
        content: string;
        rating: number;
        userId: number;
        movieId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
