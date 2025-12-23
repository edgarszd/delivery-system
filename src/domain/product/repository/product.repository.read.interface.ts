import { IProduct } from '../entity/interfaces/product.interface';

export interface IProductRepositoryRead {
  getProductsByCategoryId(categoryId: string): Promise<IProduct[]>;
}
