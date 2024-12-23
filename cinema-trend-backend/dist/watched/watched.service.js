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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchedService = void 0;
const common_1 = require("@nestjs/common");
const movie_service_1 = require("../movie/movie.service");
const prisma_service_1 = require("../prisma/prisma.service");
let WatchedService = class WatchedService {
    constructor(prismaServise, movieService) {
        this.prismaServise = prismaServise;
        this.movieService = movieService;
    }
    async getWatched(userId) {
        const watched = await this.prismaServise.watchedMovie.findMany({
            where: { userId: userId },
            orderBy: {
                watchedAt: 'desc',
            },
        });
        const moviesId = watched.map((watchedMovie) => watchedMovie.movieId);
        const movies = await this.movieService.findMoviesById(moviesId, userId);
        return movies;
    }
    async createWatched(userId, movieId) {
        const watchedMovie = await this.prismaServise.watchedMovie.findFirst({
            where: {
                userId: userId,
                movieId: movieId,
            },
        });
        if (watchedMovie) {
            await this.prismaServise.watchedMovie.delete({
                where: {
                    id: watchedMovie.id,
                },
            });
        }
        return await this.createWatchedMovie(userId, movieId);
    }
    async createWatchedMovie(userId, movieId) {
        return await this.prismaServise.watchedMovie.create({
            data: {
                userId: userId,
                movieId: movieId,
            },
        });
    }
};
exports.WatchedService = WatchedService;
exports.WatchedService = WatchedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        movie_service_1.MovieService])
], WatchedService);
//# sourceMappingURL=watched.service.js.map