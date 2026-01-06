import { IRestaurant } from '../entity/interfaces/restaurant.interface';

export interface IRestaurantRepositoryRead {
  getRestaurants(limit?: number, cursor?: string): Promise<IRestaurant[]>;
  getRestaurantById(restaurantId: string): Promise<IRestaurant | null>;
}
