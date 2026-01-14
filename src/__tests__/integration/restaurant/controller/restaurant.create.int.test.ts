import request from 'supertest';
import { app } from '../../../../../jest/setup-integration-tests';
import { IRestaurant } from '../../../../domain/restaurant/entity/interfaces/restaurant.interface';
import { MRestaurant } from '../../../../infrastructure/database/mongo/schemas/restaurant.schema';
import { generateRestaurant } from '../../../mocks-test';

let restaurant: IRestaurant;

beforeEach(() => {
  restaurant = generateRestaurant({ _id: undefined });
});

describe('Create Restaurant - Integration Tests', () => {
  it(`Should create restaurant successfully with valid data
    status code: 201
    route: POST /restaurants`, async () => {
    const response = await request(app).post('/restaurants').send(restaurant);

    const createdRestaurant = await MRestaurant.findById(
      response.body._id,
    ).lean();

    expect(response.body).toMatchObject({
      name: restaurant.name,
      address: restaurant.address,
    });
    expect(response.status).toBe(201);

    expect(createdRestaurant).toBeTruthy();
  });

  it(`Should return error when name is empty
  status code: 422
  route: POST /restaurants`, async () => {
    restaurant.name = '';

    const response = await request(app).post('/restaurants').send(restaurant);

    expect(response.status).toBe(422);
  });

  it(`Should return error when address is empty
  status code: 422
  route: POST /restaurants`, async () => {
    restaurant.address = '';

    const response = await request(app).post('/restaurants').send(restaurant);

    expect(response.status).toBe(422);
  });
});
