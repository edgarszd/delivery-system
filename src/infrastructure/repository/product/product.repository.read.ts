import { IProduct } from '../../../domain/product/entity/interfaces/product.interface';
import { IProductRepositoryRead } from '../../../domain/product/repository/product.repository.read.interface';
import { MProduct } from '../../database/mongo/schemas/product.schema';
import { dbProductToInternal } from './adapters/product.adapter';

export class ProductRepositoryRead implements IProductRepositoryRead {
  async getProductsByCategoryId(categoryId: string): Promise<IProduct[]> {
    const result = await MProduct.find({ categoryId });

    const products = result.map(dbProductToInternal);

    return products;
  }
}
