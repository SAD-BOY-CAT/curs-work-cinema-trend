import { IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  rating: number;
  @IsString()
  content: string;
  @IsNumber()
  movieId: number;
}

export class GetReviewDto {
  @IsNumber()
  movieId: number;
}

export class DeleteReviewDto {
  @IsNumber()
  id: number;
}
