import { IRestaurant } from '../entity/interfaces/restaurant.interface';
import {
  IRestaurantService,
  IParamsRestaurantService,
} from '../entity/interfaces/restaurant.service.interface';
import { RestaurantEntity } from '../entity/restaurant.entity';
import { IRestaurantRepositoryWrite } from '../repository/restaurant.repository.write.interface';
import { IRestaurantRepositoryRead } from '../repository/restaurant.repository.read.interface';

export class RestaurantService implements IRestaurantService {
  restaurantRepositoryWrite: IRestaurantRepositoryWrite;

  restaurantRepositoryRead: IRestaurantRepositoryRead;

  constructor(params: IParamsRestaurantService) {
    this.restaurantRepositoryWrite = params.restaurantRepositoryWrite;
    this.restaurantRepositoryRead = params.restaurantRepositoryRead;
  }

  async createRestaurant(restaurant: IRestaurant): Promise<IRestaurant> {
    const restaurantEntity = new RestaurantEntity(restaurant);

    const createdRestaurant =
      await this.restaurantRepositoryWrite.create(restaurantEntity);

    return createdRestaurant;
  }

  async getAllRestaurants(): Promise<Array<IRestaurant>> {
    const restaurants = await this.restaurantRepositoryRead.getAll();

    return restaurants;
  }
}
