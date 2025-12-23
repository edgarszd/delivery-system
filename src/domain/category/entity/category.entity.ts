import { BusinessError } from '../../../application/exceptions/business.error';
import { ICategory } from './interfaces/category.interface';

export class CategoryEntity implements ICategory {
  _id?: string;

  restaurantId: string;

  name: string;

  index: number;

  constructor(category: ICategory) {
    this.validateCategory(category);

    this._id = category._id;
    this.restaurantId = category.restaurantId;
    this.name = category.name;
    this.index = category.index;
  }

  private validateCategory(category: ICategory): void {
    this.validateName(category.name);
    this.validateIndex(category.index);
  }

  private validateName(name: string): void {
    if (!name.trim()) {
      throw new BusinessError(`The category name cannot be empty!`);
    }
  }

  private validateIndex(index: number): void {
    if (index < 0) {
      throw new BusinessError(`The category index cannot be negative!`);
    }
  }
}
