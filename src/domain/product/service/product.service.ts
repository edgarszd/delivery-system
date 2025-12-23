import { ICategoryRepositoryRead } from '../../category/repository/category.repository.read.interface';
import { IProduct } from '../entity/interfaces/product.interface';
import {
  IParamsProductService,
  IProductService,
} from '../entity/interfaces/product.service.interface';
import { ProductEntity } from '../entity/product.entity';
import { IProductRepositoryRead } from '../repository/product.repository.read.interface';
import { IProductRepositoryWrite } from '../repository/product.repository.write.interface';
import { NotFoundError } from '../../../application/exceptions/not-found.error';

export class ProductService implements IProductService {
  productRepositoryWrite: IProductRepositoryWrite;

  productRepositoryRead: IProductRepositoryRead;

  categoryRepositoryRead: ICategoryRepositoryRead;

  constructor(params: IParamsProductService) {
    this.productRepositoryWrite = params.productRepositoryWrite;
    this.productRepositoryRead = params.productRepositoryRead;
    this.categoryRepositoryRead = params.categoryRepositoryRead;
  }

  async createProduct(product: IProduct): Promise<IProduct> {
    const category = await this.categoryRepositoryRead.getCategoryById(
      product.categoryId,
    );

    if (!category) {
      throw new NotFoundError(
        `No category with ID ${product.categoryId} was found.`,
      );
    }

    const productWithRestaurantId = {
      ...product,
      restaurantId: category.restaurantId,
    };

    const productEntity = new ProductEntity(productWithRestaurantId);

    const createdProduct =
      await this.productRepositoryWrite.create(productEntity);

    return createdProduct;
  }

  async getAllProducts(categoryId: string): Promise<IProduct[]> {
    const products =
      await this.productRepositoryRead.getProductsByCategoryId(categoryId);

    return products;
  }
}
