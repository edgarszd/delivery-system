import { IOrder } from '../../domain/order/entity/interfaces/order.interface';
import { OrderEntity } from '../../domain/order/entity/order.entity';
import { generateOrder } from '../mocks-test';

let order: IOrder;

beforeEach(() => {
  order = generateOrder();
});

describe('Testing OrderEntity', () => {
  describe('Success cases', () => {
    describe('When the object is valid', () => {
      it('should return a valid instance', () => {
        const orderInstance = new OrderEntity(order);

        expect(orderInstance).toEqual(order);
      });

      it('should return a valid instance without _id', () => {
        delete order._id;

        const orderInstance = new OrderEntity(order);

        expect(orderInstance).toEqual(order);
      });
    });
  });

  describe('Error cases', () => {
    describe('When the items list is empty', () => {
      it('should throw an error for empty items list', () => {
        order.items = [];

        expect(() => new OrderEntity(order)).toThrow(
          'At least one product is required.',
        );
      });
    });

    describe('When the quantity of the product is less than 1', () => {
      it('should throw an error for incorrect product quantity', () => {
        order.items[0].quantity = 0;

        expect(() => new OrderEntity(order)).toThrow(
          /^The minimum quantity of product .+ must be 1\.$/,
        );
      });
    });

    describe('When the total price is negative', () => {
      it('should throw an error for negative total price', () => {
        order.priceTotal = -1;

        expect(() => new OrderEntity(order)).toThrow(
          'The order total price cannot be negative!',
        );
      });
    });
  });
});
