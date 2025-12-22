import { BusinessError } from '../../../application/exceptions/business.error';
import { IRestaurant } from './interfaces/restaurant.interface';

export class RestaurantEntity implements IRestaurant {
  _id?: string;

  name: string;

  address: string;

  constructor(restaurant: IRestaurant) {
    this._id = restaurant._id;
    this.name = restaurant.name;
    this.address = restaurant.address;

    this.validate(this);
  }

  private validate(restaurant: IRestaurant): void {
    this.validateName(restaurant.name);
    this.validateAddress(restaurant.address);
  }

  private validateName(name: string): void {
    if (!name.trim()) {
      throw new BusinessError(`The restaurant's name cannot be empty!`);
    }
  }

  private validateAddress(address: string): void {
    if (!address.trim()) {
      throw new BusinessError(`The restaurant's address cannot be empty!`);
    }
  }
}
