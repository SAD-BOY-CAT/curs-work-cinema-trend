import { FavoriteService } from 'src/favorite/favorite.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieDto, UpdateMovieDto } from './movie.dto';
export declare class MovieService {
    private readonly favoriteService;
    private readonly prismaService;
    constructor(favoriteService: FavoriteService, prismaService: PrismaService);
    getMainMovies(userId: number): Promise<{
        newMovies: any;
        topMovies: any;
        watchedMovies: any[];
    }>;
    getMovieById(id: number, userId: number): Promise<any>;
    getMoviesByGenre(genre: string, userId: number): Promise<any>;
    getMoviesBySearch(keywords: string, userId: number): Promise<any>;
    private getTopRatedMovies;
    private getNewMovies;
    findMoviesById(moviesId: number[], userId: number): Promise<any>;
    private calculateRatings;
    createMovie(data: CreateMovieDto): Promise<{
        id: number;
        title: string;
        picture: string;
        description: string | null;
        releaseDate: Date;
        rating: number | null;
        duration: number | null;
        country: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteMovieById(id: number): Promise<void>;
    updateMovieById(data: UpdateMovieDto): Promise<{
        id: number;
        title: string;
        picture: string;
        description: string | null;
        releaseDate: Date;
        rating: number | null;
        duration: number | null;
        country: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
