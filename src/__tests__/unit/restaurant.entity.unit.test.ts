import mongoose from 'mongoose';
import { IRestaurant } from '../../domain/restaurant/entity/interfaces/restaurant.interface';
import { RestaurantEntity } from '../../domain/restaurant/entity/restaurant.entity';

let restaurant: IRestaurant;

beforeEach(() => {
  restaurant = {
    _id: new mongoose.Types.ObjectId().toHexString(),
    name: 'Restaurant X',
    address: '123 Main Street, Apt 4B.',
  };
});

describe('Testing RestaurantEntity', () => {
  describe('Success cases', () => {
    describe('When the object is valid', () => {
      it('should return a valid instance', () => {
        const restaurantInstance = new RestaurantEntity(restaurant);

        expect(restaurantInstance._id).toBe(restaurant._id);
        expect(restaurantInstance.name).toBe(restaurant.name);
        expect(restaurantInstance.address).toBe(restaurant.address);
      });

      it('should return a valid instance without _id', () => {
        delete restaurant._id;

        const restaurantInstance = new RestaurantEntity(restaurant);

        expect(restaurantInstance._id).toBeUndefined();
        expect(restaurantInstance.name).toBe(restaurant.name);
        expect(restaurantInstance.address).toBe(restaurant.address);
      });
    });
  });

  describe('Error cases', () => {
    describe('When the name is empty', () => {
      it.each(['', ' '])(
        'should throw an error for empty name',
        (emptyName: string) => {
          restaurant.name = emptyName;

          expect(() => new RestaurantEntity(restaurant)).toThrow(
            /^The restaurant's name cannot be empty!$/,
          );
        },
      );
    });

    describe('When the address is empty', () => {
      it.each(['', ' '])(
        'should throw an error for empty address',
        (emptyAddress: string) => {
          restaurant.address = emptyAddress;

          expect(() => new RestaurantEntity(restaurant)).toThrow(
            /^The restaurant's address cannot be empty!$/,
          );
        },
      );
    });
  });
});
