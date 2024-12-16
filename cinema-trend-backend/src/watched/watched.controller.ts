import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { WatchedService } from './watched.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('watched')
export class WatchedController {
  constructor(private readonly watcheadService: WatchedService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getWatched(@Request() req) {
    return await this.watcheadService.getWatched(Number(req.user.sub));
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() data: { movieId: number }, @Request() req) {
    return await this.watcheadService.createWatched(
      Number(req.user.sub),
      data.movieId,
    );
  }
}
