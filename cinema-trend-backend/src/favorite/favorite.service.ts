import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { MovieService } from 'src/movie/movie.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => MovieService))
    private readonly movieService: MovieService,
  ) {}

  async getFavorites(userId: number) {
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

  async createFavorites(userId: number, movieId: number) {
    const favorite = await this.prismaService.favoriteMovie.create({
      data: {
        userId: userId,
        movieId: movieId,
      },
    });

    if (!favorite) throw new BadRequestException();

    return favorite;
  }

  async deleteFavorites(movieId: number, userId: number) {
    const deleteFavorite = await this.prismaService.favoriteMovie.deleteMany({
      where: { movieId: movieId, userId: userId },
    });

    return deleteFavorite ? true : false;
  }

  async updateMoviesWithFavorites(userId: number, movies) {
    const favorites = await this.prismaService.favoriteMovie.findMany({
      where: {
        userId: userId,
      },
    });

    const favotitesId: number[] = favorites.map((item) => item.movieId);
    const updateMovies = movies.map((item) => ({
      ...item,
      favorite: favotitesId.includes(item.id),
    }));

    return updateMovies;
  }
}
