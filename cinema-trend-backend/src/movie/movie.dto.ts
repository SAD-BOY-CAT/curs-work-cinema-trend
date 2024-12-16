import { MovieCategory } from '@prisma/client';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;
  @IsString()
  picture: string;
  @IsString()
  description: string;
  @IsDate()
  releaseDate: Date;
  @IsNumber()
  rating: number;
  @IsNumber()
  duration: number;
  @IsString()
  country: string;
  genres: MovieCategory[];
}

export class UpdateMovieDto {
  @IsNumber()
  id: number;
  @IsString()
  title: string;
  @IsString()
  picture: string;
  @IsString()
  description: string;
  @IsDate()
  releaseDate: Date;
  @IsNumber()
  rating: number;
  @IsNumber()
  duration: number;
  @IsString()
  country: string;
  genres: MovieCategory[];
}
