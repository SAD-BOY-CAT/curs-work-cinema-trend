import { WatchedService } from './watched.service';
export declare class WatchedController {
    private readonly watcheadService;
    constructor(watcheadService: WatchedService);
    getWatched(req: any): Promise<any>;
    create(data: {
        movieId: number;
    }, req: any): Promise<{
        id: number;
        movieId: number;
        userId: number;
        watchedAt: Date;
    }>;
}
