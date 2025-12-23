import { CategoryEntity } from '../entity/category.entity';
import { ICategory } from '../entity/interfaces/category.interface';
import {
  ICategoryService,
  IParamsCategoryService,
} from '../entity/interfaces/category.service.interface';
import { ICategoryRepositoryRead } from '../repository/category.repository.read.interface';
import { ICategoryRepositoryWrite } from '../repository/category.repository.write.interface';

export class CategoryService implements ICategoryService {
  categoryRepositoryWrite: ICategoryRepositoryWrite;

  categoryRepositoryRead: ICategoryRepositoryRead;

  constructor(params: IParamsCategoryService) {
    this.categoryRepositoryWrite = params.categoryRepositoryWrite;
    this.categoryRepositoryRead = params.categoryRepositoryRead;
  }

  async createCategory(category: ICategory): Promise<ICategory> {
    const categoryEntity = new CategoryEntity(category);

    const createdCategory =
      await this.categoryRepositoryWrite.create(categoryEntity);

    return createdCategory;
  }

  async getAllCategories(restaurantId: string): Promise<ICategory[]> {
    const categories =
      await this.categoryRepositoryRead.getCategoriesByRestaurantId(
        restaurantId,
      );

    return categories;
  }
}
