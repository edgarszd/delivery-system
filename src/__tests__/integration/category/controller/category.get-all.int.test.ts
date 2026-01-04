import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../../../../jest/setup-integration-tests';
import { ICategory } from '../../../../domain/category/entity/interfaces/category.interface';
import { MCategory } from '../../../../infrastructure/database/mongo/schemas/category.schema';
import { MRestaurant } from '../../../../infrastructure/database/mongo/schemas/restaurant.schema';
import { dbCategoryToInternal } from '../../../../infrastructure/repository/category/adapters/category.adapter';
import { generateRestaurant } from '../../../mocks-test';

const restaurantId = new mongoose.Types.ObjectId().toHexString();

let categories: ICategory[];

beforeEach(async () => {
  await MRestaurant.create(generateRestaurant({ _id: restaurantId }));

  const createdCategories = await MCategory.create([
    {
      restaurantId: restaurantId,
      name: 'Lanches',
      index: 1,
    },
    {
      restaurantId: restaurantId,
      name: 'Bebidas',
      index: 2,
    },
  ]);

  categories = createdCategories.map(dbCategoryToInternal);
});

describe('Get All Categories - Integration Tests', () => {
  it(`Should return a list of categories sorted by index
    status code: 200
    route: GET /restaurants/:id/categories`, async () => {
    const response = await request(app).get(
      `/restaurants/${restaurantId}/categories`,
    );

    expect(response.body).toEqual(categories);

    expect(response.status).toBe(200);
  });
});
