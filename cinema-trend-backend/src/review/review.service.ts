import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto, DeleteReviewDto } from './review.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  async getReviewByMovieId(id: number) {
    const review = await this.prismaService.review.findMany({
      where: {
        movieId: id,
      },
      include: {
        user: true,
      },
    });

    const filterArray = review.map((item) => {
      return {
        ...item,
        user: {
          id: item.userId,
          username: item.user.username,
          picture: item.user.picture,
        },
      };
    });

    return filterArray;
  }

  async createReview(data: CreateReviewDto & { userId: number }) {
    const { rating, userId, movieId, content } = data;
    const review = await this.prismaService.review.create({
      data: {
        rating: rating,
        userId: userId,
        movieId: movieId,
        content: content,
      },
    });

    if (!review) throw new BadRequestException();

    return review;
  }

  async deleteReview(data: DeleteReviewDto) {
    const { id } = data;
    const review = await this.prismaService.review.delete({
      where: { id: id },
    });

    if (!review) throw new BadRequestException();

    return review;
  }
}
