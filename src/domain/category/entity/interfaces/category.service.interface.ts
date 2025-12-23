import { ICategoryRepositoryRead } from '../../repository/category.repository.read.interface';
import { ICategoryRepositoryWrite } from '../../repository/category.repository.write.interface';
import { ICategory } from './category.interface';

export interface ICategoryService {
  createCategory(category: ICategory): Promise<ICategory>;
  getAllCategories(restaurantId: string): Promise<ICategory[]>;
}

export interface IParamsCategoryService {
  categoryRepositoryWrite: ICategoryRepositoryWrite;
  categoryRepositoryRead: ICategoryRepositoryRead;
}
