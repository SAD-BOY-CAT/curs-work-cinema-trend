import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateFavoriteDto, DeleteFavoriteDto } from './favorite.dto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getFavorites(@Request() req) {
    return await this.favoriteService.getFavorites(Number(req.user.sub));
  }

  @Post()
  @UseGuards(AuthGuard)
  async createFavorite(@Body() data: CreateFavoriteDto, @Request() req) {
    return await this.favoriteService.createFavorites(
      Number(req.user.sub),
      data.movieId,
    );
  }

  @Delete()
  @UseGuards(AuthGuard)
  async deleteFavoriteDto(@Query() data: DeleteFavoriteDto, @Request() req) {
    return await this.favoriteService.deleteFavorites(
      Number(data.movieId),
      Number(req.user.sub),
    );
  }
}
