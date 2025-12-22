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
            address: '123 Main Street, Apt 4A.',
        },
        {
            name: 'Restaurant B',
            address: '123 Main Street, Apt 4B.',
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