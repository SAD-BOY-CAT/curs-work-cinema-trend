import { MovieService } from 'src/movie/movie.service';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class WatchedService {
    private readonly prismaServise;
    private readonly movieService;
    constructor(prismaServise: PrismaService, movieService: MovieService);
    getWatched(userId: number): Promise<any>;
    createWatched(userId: number, movieId: number): Promise<{
        id: number;
        movieId: number;
        userId: number;
        watchedAt: Date;
    }>;
    private createWatchedMovie;
}
