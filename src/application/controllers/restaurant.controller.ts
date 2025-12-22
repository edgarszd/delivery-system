import { IRestaurant } from '../../domain/restaurant/entity/interfaces/restaurant.interface';
import { IRestaurantService } from '../../domain/restaurant/entity/interfaces/restaurant.service.interface';
import { IController } from './controller.interface';
import { NextFunction, Request, Response, Router } from 'express';

export class RestaurantController implements IController {
  private router: Router = Router();

  private readonly restaurantService: IRestaurantService;

  constructor(restaurantService: IRestaurantService) {
    this.restaurantService = restaurantService;
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post('/restaurants', this.createRestaurant);
    this.router.get('/restaurants', this.getAllRestaurants);
  }

  public getRoutes() {
    return this.router;
  }

  createRestaurant = async (
    req: Request<{}, {}, IRestaurant, {}>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const restaurantData = req.body;

      const result =
        await this.restaurantService.createRestaurant(restaurantData);

      res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  };

  getAllRestaurants = async (
    req: Request<{}, {}, {}, {}>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await this.restaurantService.getAllRestaurants();

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };
}
