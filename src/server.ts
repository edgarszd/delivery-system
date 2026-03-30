import { App } from './app';
import './configurations/dotenv';
import * as env from './configurations/env-constants';
import { RestaurantControllerFactory } from './configurations/factory/restaurant/restaurant.controller.factory';
import { CategoryControllerFactory } from './configurations/factory/category/category.controller.factory';
import { ProductControllerFactory } from './configurations/factory/product/product.controller.factory';
import { OrderControllerFactory } from './configurations/factory/order/order.controller.factory';
import path from 'path';

const OPEN_API_SPEC_FILE_PATH = path.resolve(
  __dirname,
  './contracts/contract.yaml',
);

const app = new App({
  port: env.PORT,
  apiSpecLocation: OPEN_API_SPEC_FILE_PATH,
  controllers: [
    RestaurantControllerFactory.create(),
    CategoryControllerFactory.create(),
    ProductControllerFactory.create(),
    OrderControllerFactory.create(),
  ],
  database: {
    dbURI: env.DATABASE_URI,
    dbName: env.DATABASE_NAME,
  },
});

async function start() {
  app.connectToDatabase();
  app.listen();
}

start();
