import { IProductService } from '../../../domain/product/entity/interfaces/product.service.interface';
import { ProductService } from '../../../domain/product/service/product.service';
import { CategoryRepositoryRead } from '../../../infrastructure/repository/category/category.repository.read';
import { ProductRepositoryRead } from '../../../infrastructure/repository/product/product.repository.read';
import { ProductRepositoryWrite } from '../../../infrastructure/repository/product/product.repository.write';

export class ProductServiceFactory {
  static create(): IProductService {
    const productRepositoryWrite = new ProductRepositoryWrite();

    const productRepositoryRead = new ProductRepositoryRead();

    const categoryRepositoryRead = new CategoryRepositoryRead();

    const service = new ProductService({
      productRepositoryWrite,
      productRepositoryRead,
      categoryRepositoryRead,
    });

    return service;
  }
}
