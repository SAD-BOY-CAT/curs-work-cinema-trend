import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto, DeleteFavoriteDto } from './favorite.dto';
export declare class FavoriteController {
    private readonly favoriteService;
    constructor(favoriteService: FavoriteService);
    getFavorites(req: any): Promise<any>;
    createFavorite(data: CreateFavoriteDto, req: any): Promise<{
        id: number;
        userId: number;
        movieId: number;
        favoritedAt: Date;
    }>;
    deleteFavoriteDto(data: DeleteFavoriteDto, req: any): Promise<boolean>;
}
