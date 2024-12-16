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
exports.MovieService = void 0;
const common_1 = require("@nestjs/common");
const favorite_service_1 = require("../favorite/favorite.service");
const prisma_service_1 = require("../prisma/prisma.service");
let MovieService = class MovieService {
    constructor(favoriteService, prismaService) {
        this.favoriteService = favoriteService;
        this.prismaService = prismaService;
    }
    async getMainMovies(userId) {
        const newMovies = await this.getNewMovies(10, userId);
        const topMovie = await this.getTopRatedMovies(10, userId);
        return {
            newMovies: newMovies,
            topMovies: topMovie,
            watchedMovies: [],
        };
    }
    async getMovieById(id, userId) {
        const movie = await this.prismaService.movie.findFirst({
            where: { id: id },
            include: {
                _count: {
                    select: { reviews: true },
                },
                reviews: {
                    select: {
                        rating: true,
                    },
                },
                favoritedBy: {
                    select: {
                        favoritedAt: true,
                    },
                },
                categories: true,
            },
        });
        if (!movie)
            throw new common_1.BadRequestException();
        const updateFavorite = await this.favoriteService.updateMoviesWithFavorites(userId, [this.calculateRatings(movie)]);
        return updateFavorite[0];
    }
    async getMoviesByGenre(genre, userId) {
        const category = await this.prismaService.movieCategory.findFirst({
            where: {
                name: genre,
            },
            include: {
                movies: true,
            },
        });
        const moviesId = category.movies.map((item) => item.id);
        const movies = await this.findMoviesById(moviesId, userId);
        const updateFavorite = await this.favoriteService.updateMoviesWithFavorites(userId, movies);
        return updateFavorite;
    }
    async getMoviesBySearch(keywords, userId) {
        if (keywords === '')
            return [];
        const movies = await this.prismaService.movie.findMany({
            where: {
                title: {
                    contains: keywords,
                    mode: 'insensitive',
                },
            },
            include: {
                _count: {
                    select: { reviews: true },
                },
                reviews: {
                    select: {
                        rating: true,
                    },
                },
                favoritedBy: {
                    select: {
                        favoritedAt: true,
                    },
                },
                categories: true,
            },
        });
        const updateFavorite = await this.favoriteService.updateMoviesWithFavorites(userId, movies.map((item) => this.calculateRatings(item)));
        return updateFavorite;
    }
    async getTopRatedMovies(amount = 10, userId) {
        const movies = await this.prismaService.movie.findMany({
            include: {
                _count: {
                    select: { reviews: true },
                },
                reviews: {
                    select: {
                        rating: true,
                    },
                },
                favoritedBy: {
                    select: {
                        favoritedAt: true,
                    },
                },
                categories: true,
            },
        });
        const moviesWithAverage = movies.map((item) => this.calculateRatings(item));
        const sortMovies = moviesWithAverage
            .sort((a, b) => b.averageRating - a.averageRating)
            .slice(0, amount);
        const updateFavorite = await this.favoriteService.updateMoviesWithFavorites(userId, sortMovies);
        return updateFavorite;
    }
    async getNewMovies(amount = 10, userId) {
        const movies = await this.prismaService.movie.findMany({
            include: {
                _count: {
                    select: { reviews: true },
                },
                reviews: {
                    select: {
                        rating: true,
                    },
                },
                favoritedBy: {
                    select: {
                        favoritedAt: true,
                    },
                },
                categories: true,
            },
            orderBy: {
                releaseDate: 'desc',
            },
            take: amount,
        });
        const updateFavorite = await this.favoriteService.updateMoviesWithFavorites(userId, movies.map((item) => this.calculateRatings(item)));
        return updateFavorite;
    }
    async findMoviesById(moviesId, userId) {
        const movies = await this.prismaService.movie.findMany({
            where: {
                id: { in: moviesId },
            },
            include: {
                _count: {
                    select: { reviews: true },
                },
                reviews: {
                    select: {
                        rating: true,
                    },
                },
                favoritedBy: {
                    select: {
                        favoritedAt: true,
                    },
                },
                categories: true,
            },
        });
        const sortedMovies = movies.sort((a, b) => {
            return moviesId.indexOf(a.id) - moviesId.indexOf(b.id);
        });
        const updateFavorite = await this.favoriteService.updateMoviesWithFavorites(userId, sortedMovies.map((item) => this.calculateRatings(item)));
        return updateFavorite;
    }
    calculateRatings(movie) {
        const totalRating = movie.reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = movie._count.reviews > 0 ? totalRating / movie._count.reviews : 0;
        return {
            id: movie.id,
            title: movie.title,
            picture: movie.picture,
            description: movie.description,
            releaseDate: movie.releaseDate,
            averageRating: averageRating,
            categories: movie.categories.map((category) => category.name),
            review: movie.reviews,
            rating: movie.rating,
            duration: movie.duration,
            country: movie.country,
        };
    }
    async createMovie(data) {
        const movieAndGenres = await this.prismaService.$transaction(async (prisma) => {
            const categoryNames = data.genres.map((item) => item.name);
            const genres = await prisma.movieCategory.findMany({
                where: { name: { in: categoryNames } },
            });
            const movie = await prisma.movie.create({
                data: {
                    title: data.title,
                    picture: data.picture,
                    description: data.description,
                    releaseDate: data.releaseDate,
                    rating: data.rating,
                    duration: data.duration,
                    country: data.country,
                    categories: {
                        connect: genres.map((genre) => ({ id: genre.id })),
                    },
                },
            });
            return movie;
        });
        return movieAndGenres;
    }
    async deleteMovieById(id) {
        const movie = await this.prismaService.movie.findUnique({ where: { id } });
        if (!movie) {
            throw new common_1.NotFoundException(`Movie with ID ${id} not found`);
        }
        await this.prismaService.$transaction([
            this.prismaService.movie.update({
                where: { id },
                data: {
                    categories: {
                        set: [],
                    },
                },
            }),
            this.prismaService.review.deleteMany({ where: { movieId: id } }),
            this.prismaService.watchedMovie.deleteMany({ where: { movieId: id } }),
            this.prismaService.favoriteMovie.deleteMany({ where: { movieId: id } }),
            this.prismaService.movie.delete({ where: { id } }),
        ]);
    }
    async updateMovieById(data) {
        const updateMovie = await this.prismaService.$transaction(async (prisma) => {
            await prisma.movie.update({
                where: { id: data.id },
                data: {
                    categories: {
                        set: [],
                    },
                },
            });
            const updatedMovie = await prisma.movie.update({
                where: { id: data.id },
                data: {
                    title: data.title,
                    picture: data.picture,
                    description: data.description,
                    releaseDate: data.releaseDate,
                    rating: data.rating,
                    duration: data.duration,
                    country: data.country,
                    categories: {
                        connect: data.genres.map((genre) => ({ id: genre.id })),
                    },
                },
            });
            return updatedMovie;
        });
        return updateMovie;
    }
};
exports.MovieService = MovieService;
exports.MovieService = MovieService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => favorite_service_1.FavoriteService))),
    __metadata("design:paramtypes", [favorite_service_1.FavoriteService,
        prisma_service_1.PrismaService])
], MovieService);
//# sourceMappingURL=movie.service.js.map