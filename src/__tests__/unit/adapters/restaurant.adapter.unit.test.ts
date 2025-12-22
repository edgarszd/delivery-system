import mongoose from 'mongoose';
import { IMRestaurant } from '../../../infrastructure/database/mongo/models/restaurant.model';
import { dbRestaurantToInternal } from '../../../infrastructure/repository/restaurant/adapters/restaurant.adapter';

describe('Testing dbRestaurantToInternal', () => {
    it('should be return a correctly mapped IRestaurant object', () => {
        const restaurantId = new mongoose.Types.ObjectId();

        const imRestaurant: IMRestaurant = {
            _id: restaurantId,
            name: 'Restaurant X',
            address: '123 Main Street, Apt 4B.',
        };

        const result = dbRestaurantToInternal(imRestaurant);

        const expected = {
            ...imRestaurant,
            _id: imRestaurant._id.toHexString(),
        }

        expect(result).toEqual(expected);
    });
});