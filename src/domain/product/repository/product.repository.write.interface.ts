import { IProduct } from '../entity/interfaces/product.interface';

export interface IProductRepositoryWrite {
  create(category: IProduct): Promise<IProduct>;
}
