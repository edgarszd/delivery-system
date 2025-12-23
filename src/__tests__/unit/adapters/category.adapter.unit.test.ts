import mongoose from 'mongoose';
import { IMCategory } from '../../../infrastructure/database/mongo/models/category.model';
import { dbCategoryToInternal } from '../../../infrastructure/repository/category/adapters/category.adapter';

describe('Testing dbCategoryToInternal', () => {
  it('should be return a correctly mapped ICategory object', () => {
    const categoryId = new mongoose.Types.ObjectId();
    const restaurantId = new mongoose.Types.ObjectId();

    const imCategory: IMCategory = {
      _id: categoryId,
      restaurantId: restaurantId,
      name: 'Lanches',
      index: 1,
    };

    const result = dbCategoryToInternal(imCategory);

    const expected = {
      ...imCategory,
      _id: imCategory._id.toHexString(),
      restaurantId: imCategory.restaurantId.toHexString(),
    };

    expect(result).toEqual(expected);
  });
});
