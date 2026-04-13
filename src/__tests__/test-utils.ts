import { App } from '../app';
import {
  PORT,
  DATABASE_URI,
  DATABASE_NAME,
} from '../configurations/env-constants';
import path from 'path';
import { RestaurantControllerFactory } from '../configurations/factory/restaurant/restaurant.controller.factory';
import { CategoryControllerFactory } from '../configurations/factory/category/category.controller.factory';
import { ProductControllerFactory } from '../configurations/factory/product/product.controller.factory';
import { OrderControllerFactory } from '../configurations/factory/order/order.controller.factory';

export async function bootstrapApp() {
  const OPEN_API_SPEC_FILE_PATH = path.resolve(
    __dirname,
    '../contracts/contract.yaml',
  );

  const app = new App({
    port: PORT,
    apiSpecLocation: OPEN_API_SPEC_FILE_PATH,
    controllers: [
      RestaurantControllerFactory.create(),
      CategoryControllerFactory.create(),
      ProductControllerFactory.create(),
      OrderControllerFactory.create(),
    ],
    database: {
      dbURI: DATABASE_URI,
      dbName: DATABASE_NAME,
    },
  });

  return app;
}

export const sortById = (a: any, b: any) => a._id.localeCompare(b._id);
