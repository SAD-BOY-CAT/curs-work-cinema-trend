import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FavoriteService } from 'src/favorite/favorite.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieDto, UpdateMovieDto } from './movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @Inject(forwardRef(() => FavoriteService))
    private readonly favoriteService: FavoriteService,
    private readonly prismaService: PrismaService,
  ) {}

  async getMainMovies(userId: number) {
    const newMovies = await this.getNewMovies(10, userId);
    const topMovie = await this.getTopRatedMovies(10, userId);

    return {
      newMovies: newMovies,
      topMovies: topMovie,
      watchedMovies: [],
    };
  }

  async getMovieById(id: number, userId: number) {
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

    if (!movie) throw new BadRequestException();

    const updateFavorite = await this.favoriteService.updateMoviesWithFavorites(
      userId,
      [this.calculateRatings(movie)],
    );

    return updateFavorite[0];
  }

  async getMoviesByGenre(genre: string, userId: number) {
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

    const updateFavorite = await this.favoriteService.updateMoviesWithFavorites(
      userId,
      movies,
    );

    return updateFavorite;
  }

  async getMoviesBySearch(keywords: string, userId: number) {
    if (keywords === '') return [];

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

    const updateFavorite = await this.favoriteService.updateMoviesWithFavorites(
      userId,
      movies.map((item) => this.calculateRatings(item)),
    );

    return updateFavorite;
  }

  private async getTopRatedMovies(amount: number = 10, userId: number) {
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

    const updateFavorite = await this.favoriteService.updateMoviesWithFavorites(
      userId,
      sortMovies,
    );

    return updateFavorite;
  }

  private async getNewMovies(amount: number = 10, userId: number) {
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

    const updateFavorite = await this.favoriteService.updateMoviesWithFavorites(
      userId,
      movies.map((item) => this.calculateRatings(item)),
    );

    return updateFavorite;
  }

  async findMoviesById(moviesId: number[], userId: number) {
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

    const updateFavorite = await this.favoriteService.updateMoviesWithFavorites(
      userId,
      sortedMovies.map((item) => this.calculateRatings(item)),
    );

    return updateFavorite;
  }

  private calculateRatings(movie) {
    const totalRating = movie.reviews.reduce(
      (sum, review) => sum + review.rating,
      0,
    );
    const averageRating =
      movie._count.reviews > 0 ? totalRating / movie._count.reviews : 0;

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

  async createMovie(data: CreateMovieDto) {
    const movieAndGenres = await this.prismaService.$transaction(
      async (prisma) => {
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
      },
    );

    return movieAndGenres;
  }

  async deleteMovieById(id: number): Promise<void> {
    const movie = await this.prismaService.movie.findUnique({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
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

  async updateMovieById(data: UpdateMovieDto) {
    const updateMovie = await this.prismaService.$transaction(
      async (prisma) => {
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
      },
    );

    return updateMovie;
  }
}
