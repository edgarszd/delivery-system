import { IController } from '../../../application/controllers/controller.interface';
import { RestaurantController } from '../../../application/controllers/restaurant.controller';
import { RestaurantServiceFactory } from './restaurant.service.factory';

export class RestaurantControllerFactory {
  static create(): IController {
    const restaurantService = RestaurantServiceFactory.create();

    const controller = new RestaurantController(restaurantService);

    return controller;
  }
}
