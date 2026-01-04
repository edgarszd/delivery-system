import { IRestaurant } from '../../domain/restaurant/entity/interfaces/restaurant.interface';
import { RestaurantEntity } from '../../domain/restaurant/entity/restaurant.entity';
import { generateRestaurant } from '../mocks-test';

let restaurant: IRestaurant;

beforeEach(() => {
  restaurant = generateRestaurant();
});

describe('Testing RestaurantEntity', () => {
  describe('Success cases', () => {
    describe('When the object is valid', () => {
      it('should return a valid instance', () => {
        const restaurantInstance = new RestaurantEntity(restaurant);

        expect(restaurantInstance).toEqual(restaurant);
      });

      it('should return a valid instance without _id', () => {
        delete restaurant._id;

        const restaurantInstance = new RestaurantEntity(restaurant);

        expect(restaurantInstance).toEqual(restaurant);
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
            `The restaurant's name cannot be empty!`,
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
            `The restaurant's address cannot be empty!`,
          );
        },
      );
    });
  });
});
