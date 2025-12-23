import { ICategory } from '../entity/interfaces/category.interface';

export interface ICategoryRepositoryRead {
  getCategoriesByRestaurantId(restaurantId: string): Promise<ICategory[]>;
  getCategoryById(categoryId: string): Promise<ICategory | null>;
}
