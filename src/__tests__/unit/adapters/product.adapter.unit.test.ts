import mongoose from 'mongoose';
import { IMProduct } from '../../../infrastructure/database/mongo/models/product.model';
import { dbProductToInternal } from '../../../infrastructure/repository/product/adapters/product.adapter';

describe('Testing dbProductToInternal', () => {
  it('should be return a correctly mapped IProduct object', () => {
    const productId = new mongoose.Types.ObjectId();
    const categoryId = new mongoose.Types.ObjectId();
    const restaurantId = new mongoose.Types.ObjectId();

    const imProduct: IMProduct = {
      _id: categoryId,
      categoryId: categoryId,
      restaurantId: restaurantId,
      name: 'KitRat',
      price: 9.99,
      description: 'A chocolate in the shape of a mouse',
      isAvailable: true,
    };

    const result = dbProductToInternal(imProduct);

    const expected = {
      ...imProduct,
      _id: imProduct._id.toHexString(),
      categoryId: imProduct.categoryId.toHexString(),
      restaurantId: imProduct.restaurantId.toHexString(),
    };

    expect(result).toEqual(expected);
  });
});
