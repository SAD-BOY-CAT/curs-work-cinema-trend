import {
  Controller,
  Get,
  Query,
  UseGuards,
  Request,
  Post,
  Body,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from '@prisma/client';
import { CreateMovieDto, UpdateMovieDto } from './movie.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('main')
  @UseGuards(AuthGuard)
  async getMain(@Request() req) {
    return await this.movieService.getMainMovies(Number(req.user.sub));
  }

  @Get('genre')
  @UseGuards(AuthGuard)
  async getMovieByGanre(@Query('genre') genre: string, @Request() req) {
    return await this.movieService.getMoviesByGenre(
      genre,
      Number(req.user.sub),
    );
  }

  @Get()
  @UseGuards(AuthGuard)
  async getMovieById(@Query('id') id: string, @Request() req) {
    return await this.movieService.getMovieById(
      Number(id),
      Number(req.user.sub),
    );
  }

  @Get('search')
  @UseGuards(AuthGuard)
  async getMovieBySearch(@Query('keyword') keyword: string, @Request() req) {
    return await this.movieService.getMoviesBySearch(
      keyword,
      Number(req.user.sub),
    );
  }

  @Post('create')
  @Roles(Role.MODERATOR)
  @UseGuards(AuthGuard, RoleGuard)
  async createMovie(@Body() data: CreateMovieDto) {
    await this.movieService.createMovie(data);
  }

  @Delete()
  @Roles(Role.MODERATOR)
  @UseGuards(AuthGuard, RoleGuard)
  async deleteMovie(@Query('id', ParseIntPipe) id: number) {
    await this.movieService.deleteMovieById(id);
  }

  @Put()
  @Roles(Role.MODERATOR)
  @UseGuards(AuthGuard, RoleGuard)
  async updateMovie(@Body() data: UpdateMovieDto) {
    await this.movieService.updateMovieById(data);
  }
}
