import { forwardRef, Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovieModule } from 'src/movie/movie.module';

@Module({
  imports: [forwardRef(() => MovieModule)],
  controllers: [FavoriteController],
  providers: [FavoriteService, PrismaService],
  exports: [FavoriteService],
})
export class FavoriteModule {}
