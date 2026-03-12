import { IProduct } from '../../../domain/product/entity/interfaces/product.interface';
import { IProductRepositoryRead } from '../../../domain/product/repository/product.repository.read.interface';
import { IMProduct } from '../../database/mongo/models/product.model';
import { MProduct } from '../../database/mongo/schemas/product.schema';
import { dbProductToInternal } from './adapters/product.adapter';

export class ProductRepositoryRead implements IProductRepositoryRead {
  async getProductsByCategoryId(categoryId: string): Promise<IProduct[]> {
    const result: IMProduct[] = await MProduct.find({ categoryId }).lean();

    const products = result.map(dbProductToInternal);

    return products;
  }

  async getProductById(productId: string): Promise<IProduct | null> {
    const result: IMProduct | null = await MProduct.findById(productId).lean();

    return result ? dbProductToInternal(result) : null;
  }
}
