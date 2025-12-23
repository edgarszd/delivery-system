import { CategoryRepositoryRead } from '../../../../infrastructure/repository/category/category.repository.read';
import { IProductRepositoryRead } from '../../repository/product.repository.read.interface';
import { IProductRepositoryWrite } from '../../repository/product.repository.write.interface';
import { IProduct } from './product.interface';

export interface IProductService {
  createProduct(product: IProduct): Promise<IProduct>;
  getAllProducts(categoryId: string): Promise<IProduct[]>;
}

export interface IParamsProductService {
  productRepositoryWrite: IProductRepositoryWrite;
  productRepositoryRead: IProductRepositoryRead;
  categoryRepositoryRead: CategoryRepositoryRead;
}
