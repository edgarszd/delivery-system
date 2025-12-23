import request from 'supertest';
import { app } from '../../../../../jest/setup-integration-tests';
import { ICategory } from '../../../../domain/category/entity/interfaces/category.interface';
import { IRestaurant } from '../../../../domain/restaurant/entity/interfaces/restaurant.interface';
import { MCategory } from '../../../../infrastructure/database/mongo/schemas/category.schema';
import { MRestaurant } from '../../../../infrastructure/database/mongo/schemas/restaurant.schema';
import { dbRestaurantToInternal } from '../../../../infrastructure/repository/restaurant/adapters/restaurant.adapter';

let category: Omit<ICategory, 'restaurantId'>;

beforeEach(() => {
  category = {
    name: 'Lanches',
    index: 1,
  };
});

let existingRestaurant: IRestaurant;

beforeAll(async () => {
  const createdRestaurant = await MRestaurant.create({
    name: 'Restaurant A',
    address: '123 Main Street, Apt 4A.',
  });

  existingRestaurant = dbRestaurantToInternal(createdRestaurant);
});

describe('Create Category - Integration Tests', () => {
  it(`Should create category successfully with valid data
    status code: 201
    route: POST /restaurants/:id/categories`, async () => {
    const response = await request(app)
      .post(`/restaurants/${existingRestaurant._id}/categories`)
      .send(category);

    const createdCategory = await MCategory.findById(response.body._id).lean();

    expect(response.body).toMatchObject({
      restaurantId: existingRestaurant._id,
      name: category.name,
      index: category.index,
    });
    expect(response.status).toBe(201);

    expect(createdCategory).toBeTruthy();
  });

  it(`Should return error when index is duplicated
  status code: 422
  route: POST /restaurants/:id/categories`, async () => {
    await MCategory.create({
      restaurantId: existingRestaurant._id,
      name: 'Bebidas',
      index: 2,
    });

    category.index = 2;

    const response = await request(app)
      .post(`/restaurants/${existingRestaurant._id}/categories`)
      .send(category);

    expect(response.status).toBe(422);
  });

  it(`Should return error when name is empty
  status code: 422
  route: POST /restaurants/:id/categories`, async () => {
    category.name = '';

    const response = await request(app)
      .post(`/restaurants/${existingRestaurant._id}/categories`)
      .send(category);

    expect(response.status).toBe(422);
  });

  it(`Should return error when index is negative
  status code: 422
  route: POST /restaurants/:id/categories`, async () => {
    category.index = -1;

    const response = await request(app)
      .post(`/restaurants/${existingRestaurant._id}/categories`)
      .send(category);

    expect(response.status).toBe(422);
  });

  it(`Should return error when required fields are missing
    status code: 400
    route: POST /restaurants/:id/categories`, async () => {
    const incompleteCategory = { name: 'Lanches' };

    const response = await request(app)
      .post(`/restaurants/${existingRestaurant._id}/categories`)
      .send(incompleteCategory);

    expect(response.status).toBe(400);
  });

  it(`Should return error when additional fields exist
    status code: 400
    route: POST /restaurants`, async () => {
    const categoryWithExtraFields = {
      ...category,
      extraField: 'extra',
    };

    const response = await request(app)
      .post(`/restaurants/${existingRestaurant._id}/categories`)
      .send(categoryWithExtraFields);

    expect(response.status).toBe(400);
  });
});
