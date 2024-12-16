import { ReviewService } from './review.service';
import { CreateReviewDto, DeleteReviewDto, GetReviewDto } from './review.dto';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    getReview(data: GetReviewDto): Promise<{
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
    createReview(date: CreateReviewDto, req: any): Promise<{
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
