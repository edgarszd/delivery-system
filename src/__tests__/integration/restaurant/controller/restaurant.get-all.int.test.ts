import request from 'supertest';
import { app } from '../../../../../jest/setup-integration-tests';
import { dbRestaurantToInternal } from '../../../../infrastructure/repository/restaurant/adapters/restaurant.adapter';
import { IRestaurant } from '../../../../domain/restaurant/entity/interfaces/restaurant.interface';
import { MRestaurant } from '../../../../infrastructure/database/mongo/schemas/restaurant.schema';

let restaurants: IRestaurant[];

beforeAll(async () => {
    const createdRestaurants = await MRestaurant.create([
        {
            name: 'Restaurant A',
            address: 'Rua A, 123',
        },
        {
            name: 'Restaurant B',
            address: 'Rua B, 124',
        }
    ]);

    restaurants = createdRestaurants.map(dbRestaurantToInternal);
});

describe('Get All Restaurants - Integration Tests', () => {
    it(`Should return a list of restaurants
    status code: 200
    route: GET /restaurants`, async () => {
        const response = await request(app).get('/restaurants');

        expect(response.body).toEqual(restaurants);

        expect(response.status).toBe(200);
    });
});