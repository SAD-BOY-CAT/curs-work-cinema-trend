import { MovieService } from 'src/movie/movie.service';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class FavoriteService {
    private readonly prismaService;
    private readonly movieService;
    constructor(prismaService: PrismaService, movieService: MovieService);
    getFavorites(userId: number): Promise<any>;
    createFavorites(userId: number, movieId: number): Promise<{
        id: number;
        userId: number;
        movieId: number;
        favoritedAt: Date;
    }>;
    deleteFavorites(movieId: number, userId: number): Promise<boolean>;
    updateMoviesWithFavorites(userId: number, movies: any): Promise<any>;
}
