import { IRestaurant } from '../../../domain/restaurant/entity/interfaces/restaurant.interface';
import { IRestaurantRepositoryWrite } from '../../../domain/restaurant/repository/restaurant.repository.write.interface';
import { MRestaurant } from '../../database/mongo/schemas/restaurant.schema';
import { dbRestaurantToInternal } from './adapters/restaurant.adapter';

export class RestaurantRepositoryWrite implements IRestaurantRepositoryWrite {
  async create(restaurant: IRestaurant): Promise<IRestaurant> {
    const result = await MRestaurant.create(restaurant);

    return dbRestaurantToInternal(result);
  }
}
