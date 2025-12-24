import { IProduct } from '../entity/interfaces/product.interface';

export interface IProductRepositoryRead {
  getProductsByCategoryId(categoryId: string): Promise<IProduct[]>;
  getProductById(productId: string): Promise<IProduct | null>;
}
