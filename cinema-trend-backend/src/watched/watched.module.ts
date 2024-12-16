import { Module } from '@nestjs/common';
import { WatchedService } from './watched.service';
import { WatchedController } from './watched.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovieModule } from 'src/movie/movie.module';

@Module({
  imports: [MovieModule],
  controllers: [WatchedController],
  providers: [WatchedService, PrismaService],
})
export class WatchedModule {}
