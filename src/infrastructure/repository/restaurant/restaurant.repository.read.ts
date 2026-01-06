import { IRestaurant } from '../../../domain/restaurant/entity/interfaces/restaurant.interface';
import { IRestaurantRepositoryRead } from '../../../domain/restaurant/repository/restaurant.repository.read.interface';
import { MRestaurant } from '../../database/mongo/schemas/restaurant.schema';
import { dbRestaurantToInternal } from './adapters/restaurant.adapter';

export class RestaurantRepositoryRead implements IRestaurantRepositoryRead {
  async getRestaurants(
    limit: number = 10,
    cursor?: string,
  ): Promise<IRestaurant[]> {
    const filter = cursor ? { _id: { $gt: cursor } } : {};

    const result = await MRestaurant.find(filter)
      .sort({ _id: 1 })
      .limit(limit)
      .lean();

    const restaurants = result.map(dbRestaurantToInternal);

    return restaurants;
  }

  async getRestaurantById(restaurantId: string): Promise<IRestaurant | null> {
    const result = await MRestaurant.findOne({ _id: restaurantId }).lean();

    return result ? dbRestaurantToInternal(result) : null;
  }
}
