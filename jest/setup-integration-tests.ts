import { createApp } from '../src/app';
import { Express } from 'express';
import mongoose from 'mongoose';
import { DATABASE_URI, DATABASE_NAME } from '../src/configurations/env-constants';
import { MRestaurant } from '../src/infrastructure/database/mongo/schemas/restaurant.schema';
import { MCategory } from '../src/infrastructure/database/mongo/schemas/category.schema';
import { MProduct } from '../src/infrastructure/database/mongo/schemas/product.schema';
import { MOrder } from '../src/infrastructure/database/mongo/schemas/order.schema';

let dbInstance: mongoose.Mongoose;
export let app: Express;

beforeAll(async () => {
  dbInstance = await mongoose.connect(DATABASE_URI, { dbName: DATABASE_NAME });
  app = createApp();
});

afterAll(async () => {
  await dbInstance?.connection.close();
});

afterEach(async () => {
  jest.clearAllMocks();
  await Promise.all([
    MRestaurant.deleteMany(),
    MCategory.deleteMany(),
    MProduct.deleteMany(),
    MOrder.deleteMany(),
  ]);
});