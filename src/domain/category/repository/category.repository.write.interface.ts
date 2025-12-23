import { ICategory } from '../entity/interfaces/category.interface';

export interface ICategoryRepositoryWrite {
  create(category: ICategory): Promise<ICategory>;
}
