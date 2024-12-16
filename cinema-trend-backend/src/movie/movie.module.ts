import { forwardRef, Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoriteModule } from 'src/favorite/favorite.module';

@Module({
  controllers: [MovieController],
  providers: [MovieService, PrismaService],
  exports: [MovieService],
  imports: [forwardRef(() => FavoriteModule)],
})
export class MovieModule {}
