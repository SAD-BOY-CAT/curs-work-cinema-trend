import { Injectable } from '@nestjs/common';
import { MovieService } from 'src/movie/movie.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WatchedService {
  constructor(
    private readonly prismaServise: PrismaService,
    private readonly movieService: MovieService,
  ) {}

  async getWatched(userId: number) {
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

  async createWatched(userId: number, movieId: number) {
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

  private async createWatchedMovie(userId: number, movieId: number) {
    return await this.prismaServise.watchedMovie.create({
      data: {
        userId: userId,
        movieId: movieId,
      },
    });
  }
}
