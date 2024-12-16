import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { MovieModule } from 'src/movie/movie.module';
import { ReviewModule } from 'src/review/review.module';
import { WatchedModule } from 'src/watched/watched.module';
import { FavoriteModule } from 'src/favorite/favorite.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    MovieModule,
    ReviewModule,
    WatchedModule,
    FavoriteModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
