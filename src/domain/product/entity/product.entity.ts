import { BusinessError } from '../../../application/exceptions/business.error';
import { IProduct } from './interfaces/product.interface';

export class ProductEntity implements IProduct {
  _id?: string;

  categoryId: string;

  restaurantId?: string;

  name: string;

  price: number;

  description: string;

  isAvailable: boolean;

  constructor(product: IProduct) {
    this.validateProduct(product);

    this._id = product._id;
    this.categoryId = product.categoryId;
    this.restaurantId = product.restaurantId;
    this.name = product.name;
    this.price = product.price;
    this.description = product.description;
    this.isAvailable = product.isAvailable;
  }

  private validateProduct(product: IProduct): void {
    this.validateName(product.name);
    this.validatePrice(product.price);
    this.validateDescription(product.description);
  }

  private validateName(name: string): void {
    if (!name.trim()) {
      throw new BusinessError(`The product name cannot be empty!`);
    }
  }

  private validatePrice(price: number): void {
    if (price < 0) {
      throw new BusinessError(`The product price cannot be negative!`);
    }
  }

  private validateDescription(description: string): void {
    if (!description.trim()) {
      throw new BusinessError(`The product description cannot be empty!`);
    }
  }
}
