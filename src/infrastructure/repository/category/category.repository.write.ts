import { BusinessError } from '../../../application/exceptions/business.error';
import { ICategory } from '../../../domain/category/entity/interfaces/category.interface';
import { ICategoryRepositoryWrite } from '../../../domain/category/repository/category.repository.write.interface';
import { MCategory } from '../../database/mongo/schemas/category.schema';
import { dbCategoryToInternal } from './adapters/category.adapter';

export class CategoryRepositoryWrite implements ICategoryRepositoryWrite {
  async create(category: ICategory): Promise<ICategory> {
    const existingIndexes = await MCategory.find(
      { restaurantId: category.restaurantId },
      { _id: 0, index: 1 },
    );

    const foundIndex = existingIndexes.find((c) => c.index === category.index);
    if (foundIndex !== undefined) {
      throw new BusinessError('The category index must be unique!');
    }

    const result = await MCategory.create(category);

    return dbCategoryToInternal(result);
  }
}
