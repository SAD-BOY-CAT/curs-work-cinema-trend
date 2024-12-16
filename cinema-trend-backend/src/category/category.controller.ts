import { Controller, Get, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getCategory() {
    return this.categoryService.allCategory();
  }
}
