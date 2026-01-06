import { BusinessError } from '../../../application/exceptions/business.error';
import { ICategory } from '../../../domain/category/entity/interfaces/category.interface';
import { ICategoryRepositoryWrite } from '../../../domain/category/repository/category.repository.write.interface';
import { IMCategory } from '../../database/mongo/models/category.model';
import { MCategory } from '../../database/mongo/schemas/category.schema';
import { dbCategoryToInternal } from './adapters/category.adapter';
import { MongoError } from 'mongodb';

export class CategoryRepositoryWrite implements ICategoryRepositoryWrite {
  async create(category: ICategory): Promise<ICategory> {
    let result: IMCategory;

    try {
      result = await MCategory.create(category);
    } catch (error) {
      const DUPLICATE_KEY_ERROR = 11000;

      if (error instanceof MongoError && error.code === DUPLICATE_KEY_ERROR) {
        throw new BusinessError('The category index must be unique!');
      }

      throw error;
    }

    return dbCategoryToInternal(result);
  }
}
