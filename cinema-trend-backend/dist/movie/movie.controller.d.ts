import { MovieService } from './movie.service';
import { CreateMovieDto, UpdateMovieDto } from './movie.dto';
export declare class MovieController {
    private readonly movieService;
    constructor(movieService: MovieService);
    getMain(req: any): Promise<{
        newMovies: any;
        topMovies: any;
        watchedMovies: any[];
    }>;
    getMovieByGanre(genre: string, req: any): Promise<any>;
    getMovieById(id: string, req: any): Promise<any>;
    getMovieBySearch(keyword: string, req: any): Promise<any>;
    createMovie(data: CreateMovieDto): Promise<void>;
    deleteMovie(id: number): Promise<void>;
    updateMovie(data: UpdateMovieDto): Promise<void>;
}
