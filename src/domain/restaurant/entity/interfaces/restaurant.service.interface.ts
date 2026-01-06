import { IRestaurantRepositoryWrite } from '../../repository/restaurant.repository.write.interface';
import { IRestaurantRepositoryRead } from '../../repository/restaurant.repository.read.interface';
import { IRestaurant } from './restaurant.interface';

export interface IRestaurantService {
  createRestaurant(restaurant: IRestaurant): Promise<IRestaurant>;
  getRestaurants(limit?: number, cursor?: string): Promise<IRestaurant[]>;
}

export interface IParamsRestaurantService {
  restaurantRepositoryWrite: IRestaurantRepositoryWrite;
  restaurantRepositoryRead: IRestaurantRepositoryRead;
}
