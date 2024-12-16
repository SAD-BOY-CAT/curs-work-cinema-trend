import { MovieCategory } from '@prisma/client';
export declare class CreateMovieDto {
    title: string;
    picture: string;
    description: string;
    releaseDate: Date;
    rating: number;
    duration: number;
    country: string;
    genres: MovieCategory[];
}
export declare class UpdateMovieDto {
    id: number;
    title: string;
    picture: string;
    description: string;
    releaseDate: Date;
    rating: number;
    duration: number;
    country: string;
    genres: MovieCategory[];
}
