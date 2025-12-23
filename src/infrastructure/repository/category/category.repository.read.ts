import { ICategory } from '../../../domain/category/entity/interfaces/category.interface';
import { ICategoryRepositoryRead } from '../../../domain/category/repository/category.repository.read.interface';
import { MCategory } from '../../database/mongo/schemas/category.schema';
import { dbCategoryToInternal } from './adapters/category.adapter';

export class CategoryRepositoryRead implements ICategoryRepositoryRead {
  async getCategoriesByRestaurantId(
    restaurantId: string,
  ): Promise<ICategory[]> {
    const result = await MCategory.find({ restaurantId }).sort({ index: 1 });

    const categories = result.map(dbCategoryToInternal);

    return categories;
  }
}
