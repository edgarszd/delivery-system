import mongoose from 'mongoose';
import { ICategory } from '../../domain/category/entity/interfaces/category.interface';
import { CategoryEntity } from '../../domain/category/entity/category.entity';

let category: ICategory;

beforeEach(() => {
  category = {
    _id: new mongoose.Types.ObjectId().toHexString(),
    restaurantId: new mongoose.Types.ObjectId().toHexString(),
    name: 'Lanches',
    index: 1,
  };
});

describe('Testing CategoryEntity', () => {
  describe('Success cases', () => {
    describe('When the object is valid', () => {
      it('should return a valid instance', () => {
        const categoryInstance = new CategoryEntity(category);

        expect(categoryInstance).toMatchObject(category);
      });

      it('should return a valid instance without _id', () => {
        delete category._id;

        const categoryInstance = new CategoryEntity(category);

        expect(categoryInstance._id).toBeUndefined();
        expect(categoryInstance).toMatchObject(category);
      });
    });
  });

  describe('Error cases', () => {
    describe('When the name is empty', () => {
      it.each(['', ' '])(
        'should throw an error for empty name',
        (emptyName: string) => {
          category.name = emptyName;

          expect(() => new CategoryEntity(category)).toThrow(
            'The category name cannot be empty!',
          );
        },
      );
    });

    describe('When the index is negative', () => {
      it('should throw an error for negative index', () => {
        category.index = -1;

        expect(() => new CategoryEntity(category)).toThrow(
          'The category index cannot be negative!',
        );
      });
    });
  });
});
