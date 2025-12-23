import { IProduct } from '../../../../domain/product/entity/interfaces/product.interface';
import { IMProduct } from '../../../database/mongo/models/product.model';

export function dbProductToInternal(dbProduct: IMProduct): IProduct {
  return {
    _id: dbProduct._id.toHexString(),
    categoryId: dbProduct.categoryId.toHexString(),
    restaurantId: dbProduct.restaurantId.toHexString(),
    name: dbProduct.name,
    price: dbProduct.price,
    description: dbProduct.description,
    isAvailable: dbProduct.isAvailable,
  };
}
