import request from 'supertest';
import { app } from '../../../../../jest/setup-integration-tests';
import { ICategory } from '../../../../domain/category/entity/interfaces/category.interface';
import { IRestaurant } from '../../../../domain/restaurant/entity/interfaces/restaurant.interface';
import { MCategory } from '../../../../infrastructure/database/mongo/schemas/category.schema';
import { MRestaurant } from '../../../../infrastructure/database/mongo/schemas/restaurant.schema';
import { dbCategoryToInternal } from '../../../../infrastructure/repository/category/adapters/category.adapter';
import { dbRestaurantToInternal } from '../../../../infrastructure/repository/restaurant/adapters/restaurant.adapter';

let categories: ICategory[];

let existingRestaurant: IRestaurant;

beforeAll(async () => {
  const createdRestaurant = await MRestaurant.create({
    name: 'Restaurant A',
    address: '123 Main Street, Apt 4A.',
  });

  existingRestaurant = dbRestaurantToInternal(createdRestaurant);

  const createdCategories = await MCategory.create([
    {
      restaurantId: existingRestaurant._id,
      name: 'Lanches',
      index: 1,
    },
    {
      restaurantId: existingRestaurant._id,
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
      `/restaurants/${existingRestaurant._id}/categories`,
    );

    expect(response.body).toEqual(categories);

    expect(response.status).toBe(200);
  });
});
