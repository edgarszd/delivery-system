import { IRestaurant } from '../../../../domain/restaurant/entity/interfaces/restaurant.interface';
import { IMRestaurant } from '../../../database/mongo/models/restaurant.model';

export function dbRestaurantToInternal(
  dbRestaurant: IMRestaurant,
): IRestaurant {
  return {
    _id: dbRestaurant._id.toHexString(),
    name: dbRestaurant.name,
    address: dbRestaurant.address,
  };
}
