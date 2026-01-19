import request from 'supertest';
import { app } from '../../../../../jest/setup-integration-tests';
import { dbRestaurantToInternal } from '../../../../infrastructure/repository/restaurant/adapters/restaurant.adapter';
import { IRestaurant } from '../../../../domain/restaurant/entity/interfaces/restaurant.interface';
import { MRestaurant } from '../../../../infrastructure/database/mongo/schemas/restaurant.schema';
import { sortById } from '../../../utils-test';
import mongoose from 'mongoose';

let restaurants: IRestaurant[];

beforeEach(async () => {
  const createdRestaurants = await MRestaurant.create([
    {
      name: 'Restaurant A',
      address: '123 Main Street, Apt 4A.',
    },
    {
      name: 'Restaurant B',
      address: '123 Main Street, Apt 4B.',
    },
    {
      name: 'Restaurant C',
      address: '456 Secondary Street, Apt 10.',
    },
  ]);

  restaurants = createdRestaurants.map(dbRestaurantToInternal);
});

describe('Get Restaurants - Integration Tests', () => {
  it(`Should return 10 first restaurants when no pagination params are provided
    status code: 200
    route: GET /restaurants`, async () => {
    const response = await request(app).get('/restaurants');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(restaurants.sort(sortById));
  });

  it(`Should respect the limit param when paginating restaurants
    status code: 200
    route: GET /restaurants?limit=1`, async () => {
    const response = await request(app)
      .get('/restaurants')
      .query({ limit: 1 });

    expect(response.status).toBe(200);

    const expectedResponse = restaurants.sort(sortById).slice(0, 1);

    expect(response.body).toEqual(expectedResponse);
  });

  it(`Should paginate restaurants using cursor and limit
    status code: 200
    route: GET /restaurants?limit=1&cursor=<id>`, async () => {
    const allRestaurantsSorted = restaurants.sort(sortById);

    const firstPageResponse = await request(app)
      .get('/restaurants')
      .query({ limit: 1 });

    const firstPageItem = firstPageResponse.body[0];
    const cursor = firstPageItem._id;

    const secondPageResponse = await request(app)
      .get('/restaurants')
      .query({ limit: 1, cursor });

    expect(secondPageResponse.status).toBe(200);

    const expectedRemaining = allRestaurantsSorted.slice(1, 2);

    expect(secondPageResponse.body).toEqual(expectedRemaining);
  });

  it(`Should return error when the limit is lower than 1
    status code: 422
    route: GET /restaurants?limit=0`, async () => {
    const response = await request(app)
      .get('/restaurants')
      .query({ limit: 0 });

    expect(response.status).toBe(422);
  });

  it(`Should return error when the limit is grather than 100
    status code: 422
    route: GET /restaurants?limit=101`, async () => {
    const response = await request(app)
      .get('/restaurants')
      .query({ limit: 101 });

    expect(response.status).toBe(422);
  });

  it(`Should return error when the cursor restaurant does not exist
    status code: 404
    route: GET /restaurants?cursor=<id>`, async () => {
    const notExistingId = new mongoose.Types.ObjectId().toHexString();

    const response = await request(app)
      .get('/restaurants')
      .query({ cursor: notExistingId });

    expect(response.status).toBe(404);
  });
});
