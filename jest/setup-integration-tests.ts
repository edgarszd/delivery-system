import { App } from '../src/app';
import { MRestaurant } from '../src/infrastructure/database/mongo/schemas/restaurant.schema';
import { MCategory } from '../src/infrastructure/database/mongo/schemas/category.schema';
import { MProduct } from '../src/infrastructure/database/mongo/schemas/product.schema';
import { MOrder } from '../src/infrastructure/database/mongo/schemas/order.schema';
import { bootstrapApp } from '../src/__tests__/test-utils';

export let app: App;

beforeAll(async () => {
  app = await bootstrapApp();
  await app.connectToDatabase();
});

afterAll(async () => {
  await app.closeDatabase();
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