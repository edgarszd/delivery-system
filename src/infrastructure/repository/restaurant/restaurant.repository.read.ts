import { IRestaurant } from '../../../domain/restaurant/entity/interfaces/restaurant.interface';
import { IRestaurantRepositoryRead } from '../../../domain/restaurant/repository/restaurant.repository.read.interface';
import { MRestaurant } from '../../database/mongo/schemas/restaurant.schema';
import { dbRestaurantToInternal } from './adapters/restaurant.adapter';

export class RestaurantRepositoryRead implements IRestaurantRepositoryRead {
  async getAll(): Promise<Array<IRestaurant>> {
    const result = await MRestaurant.find({});

    const restaurants = result.map(dbRestaurantToInternal);

    return restaurants;
  }
}
