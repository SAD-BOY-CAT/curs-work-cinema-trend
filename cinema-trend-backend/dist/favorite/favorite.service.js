"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteService = void 0;
const common_1 = require("@nestjs/common");
const movie_service_1 = require("../movie/movie.service");
const prisma_service_1 = require("../prisma/prisma.service");
let FavoriteService = class FavoriteService {
    constructor(prismaService, movieService) {
        this.prismaService = prismaService;
        this.movieService = movieService;
    }
    async getFavorites(userId) {
        const favorite = await this.prismaService.favoriteMovie.findMany({
            where: { userId: userId },
            orderBy: {
                favoritedAt: 'desc',
            },
        });
        const moviesId = favorite.map((item) => item.movieId);
        const movies = this.movieService.findMoviesById(moviesId, userId);
        return movies;
    }
    async createFavorites(userId, movieId) {
        const favorite = await this.prismaService.favoriteMovie.create({
            data: {
                userId: userId,
                movieId: movieId,
            },
        });
        if (!favorite)
            throw new common_1.BadRequestException();
        return favorite;
    }
    async deleteFavorites(movieId, userId) {
        const deleteFavorite = await this.prismaService.favoriteMovie.deleteMany({
            where: { movieId: movieId, userId: userId },
        });
        return deleteFavorite ? true : false;
    }
    async updateMoviesWithFavorites(userId, movies) {
        const favorites = await this.prismaService.favoriteMovie.findMany({
            where: {
                userId: userId,
            },
        });
        const favotitesId = favorites.map((item) => item.movieId);
        const updateMovies = movies.map((item) => ({
            ...item,
            favorite: favotitesId.includes(item.id),
        }));
        return updateMovies;
    }
};
exports.FavoriteService = FavoriteService;
exports.FavoriteService = FavoriteService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => movie_service_1.MovieService))),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        movie_service_1.MovieService])
], FavoriteService);
//# sourceMappingURL=favorite.service.js.map