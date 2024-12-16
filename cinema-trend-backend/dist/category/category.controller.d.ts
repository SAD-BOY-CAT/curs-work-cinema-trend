import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getCategory(): Promise<{
        id: number;
        name: string;
    }[]>;
}
