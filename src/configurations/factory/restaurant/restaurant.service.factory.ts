import { IRestaurantService } from '../../../domain/restaurant/entity/interfaces/restaurant.service.interface';
import { RestaurantRepositoryWrite } from '../../../infrastructure/repository/restaurant/restaurant.repository.write';
import { RestaurantRepositoryRead } from '../../../infrastructure/repository/restaurant/restaurant.repository.read';
import { RestaurantService } from '../../../domain/restaurant/service/restaurant.service';

export class RestaurantServiceFactory {
  static create(): IRestaurantService {
    const restaurantRepositoryWrite = new RestaurantRepositoryWrite();

    const restaurantRepositoryRead = new RestaurantRepositoryRead();

    const service = new RestaurantService({
      restaurantRepositoryWrite,
      restaurantRepositoryRead,
    });

    return service;
  }
}
