import { IRestaurant } from '../entity/interfaces/restaurant.interface';

export interface IRestaurantRepositoryRead {
  getAll(): Promise<IRestaurant[]>;
}
