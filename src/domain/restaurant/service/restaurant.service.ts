import { IRestaurant } from '../entity/interfaces/restaurant.interface';
import {
  IRestaurantService,
  IParamsRestaurantService,
} from '../entity/interfaces/restaurant.service.interface';
import { RestaurantEntity } from '../entity/restaurant.entity';
import { IRestaurantRepositoryWrite } from '../repository/restaurant.repository.write.interface';
import { IRestaurantRepositoryRead } from '../repository/restaurant.repository.read.interface';
import { BusinessError } from '../../../application/exceptions/business.error';
import { NotFoundError } from '../../../application/exceptions/not-found.error';

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

  async getRestaurants(
    limit?: number,
    cursor?: string,
  ): Promise<IRestaurant[]> {

    if (limit !== undefined && (limit < 1 || limit > 100)) {
      throw new BusinessError('Limit must be between 1 and 100.');
    }

    if (cursor) {
      const restaurant = await this.restaurantRepositoryRead.getRestaurantById(cursor);
      
      if (!restaurant) {
        throw new NotFoundError(`The restaurant with ID ${cursor} does not exist.`);
      }
    }

    const restaurants = await this.restaurantRepositoryRead.getRestaurants(
      limit,
      cursor,
    );

    return restaurants;
  }
}
