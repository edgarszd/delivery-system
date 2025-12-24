import mongoose from 'mongoose';
import { IProduct } from '../../domain/product/entity/interfaces/product.interface';
import { ProductEntity } from '../../domain/product/entity/product.entity';

let product: IProduct;

beforeEach(() => {
  product = {
    _id: new mongoose.Types.ObjectId().toHexString(),
    categoryId: new mongoose.Types.ObjectId().toHexString(),
    restaurantId: new mongoose.Types.ObjectId().toHexString(),
    name: 'Refrigerante',
    price: 9.99,
    description: 'Refrigerante de cola',
    isAvailable: true,
  };
});

describe('Testing ProductEntity', () => {
  describe('Success cases', () => {
    describe('When the object is valid', () => {
      it('should return a valid instance', () => {
        const productInstance = new ProductEntity(product);

        expect(productInstance).toMatchObject(product);
      });

      it('should return a valid instance without _id', () => {
        delete product._id;

        const productInstance = new ProductEntity(product);

        expect(productInstance._id).toBeUndefined();
        expect(productInstance).toMatchObject(product);
      });
    });
  });

  describe('Error cases', () => {
    describe('When the name is empty', () => {
      it.each(['', ' '])(
        'should throw an error for empty name',
        (emptyName: string) => {
          product.name = emptyName;

          expect(() => new ProductEntity(product)).toThrow(
            'The product name cannot be empty!',
          );
        },
      );
    });

    describe('When the price is negative', () => {
      it('should throw an error for negative price', () => {
        product.price = -1;

        expect(() => new ProductEntity(product)).toThrow(
          'The product price cannot be negative!',
        );
      });
    });

    describe('When the description is empty', () => {
      it.each(['', ' '])(
        'should throw an error for empty description',
        (emptyDescription: string) => {
          product.description = emptyDescription;

          expect(() => new ProductEntity(product)).toThrow(
            'The product description cannot be empty!',
          );
        },
      );
    });
  });
});
