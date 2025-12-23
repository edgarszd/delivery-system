import { IProduct } from '../../../domain/product/entity/interfaces/product.interface';
import { IProductRepositoryWrite } from '../../../domain/product/repository/product.repository.write.interface';
import { MProduct } from '../../database/mongo/schemas/product.schema';
import { dbProductToInternal } from './adapters/product.adapter';

export class ProductRepositoryWrite implements IProductRepositoryWrite {
  async create(product: IProduct): Promise<IProduct> {
    const result = await MProduct.create(product);

    return dbProductToInternal(result);
  }
}
