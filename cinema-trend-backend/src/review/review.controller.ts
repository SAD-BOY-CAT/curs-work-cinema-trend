import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto, DeleteReviewDto, GetReviewDto } from './review.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getReview(@Query() data: GetReviewDto) {
    return await this.reviewService.getReviewByMovieId(Number(data.movieId));
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async createReview(@Body() date: CreateReviewDto, @Request() req) {
    return await this.reviewService.createReview({
      rating: date.rating,
      movieId: date.movieId,
      content: date.content,
      userId: Number(req.user.sub),
    });
  }

  @UseGuards(AuthGuard)
  @Delete('delete')
  async deleteReview(@Body() data: DeleteReviewDto) {
    return await this.reviewService.deleteReview({ id: data.id });
  }
}
