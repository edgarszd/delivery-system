import { ICategory } from '../../../domain/category/entity/interfaces/category.interface';
import { ICategoryRepositoryRead } from '../../../domain/category/repository/category.repository.read.interface';
import { IMCategory } from '../../database/mongo/models/category.model';
import { MCategory } from '../../database/mongo/schemas/category.schema';
import { dbCategoryToInternal } from './adapters/category.adapter';

export class CategoryRepositoryRead implements ICategoryRepositoryRead {
  async getCategoriesByRestaurantId(
    restaurantId: string,
  ): Promise<ICategory[]> {
    const result: IMCategory[] = await MCategory.find({ restaurantId })
      .sort({ index: 1 })
      .lean();

    const categories = result.map(dbCategoryToInternal);

    return categories;
  }

  async getCategoryById(categoryId: string): Promise<ICategory | null> {
    const result: IMCategory | null =
      await MCategory.findById(categoryId).lean();

    return result ? dbCategoryToInternal(result) : null;
  }
}
