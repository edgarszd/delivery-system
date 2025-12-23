import { ICategory } from '../../../../domain/category/entity/interfaces/category.interface';
import { IMCategory } from '../../../database/mongo/models/category.model';

export function dbCategoryToInternal(dbCategory: IMCategory): ICategory {
  return {
    _id: dbCategory._id.toHexString(),
    restaurantId: dbCategory.restaurantId.toHexString(),
    name: dbCategory.name,
    index: dbCategory.index,
  };
}
