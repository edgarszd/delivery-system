import { IRestaurant } from '../entity/interfaces/restaurant.interface';

export interface IRestaurantRepositoryWrite {
  create(params: IRestaurant): Promise<IRestaurant>;
}
