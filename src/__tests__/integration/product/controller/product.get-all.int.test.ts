import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../../../../jest/setup-integration-tests';
import { MProduct } from '../../../../infrastructure/database/mongo/schemas/product.schema';
import { dbProductToInternal } from '../../../../infrastructure/repository/product/adapters/product.adapter';
import { IProduct } from '../../../../domain/product/entity/interfaces/product.interface';
import { sortById } from '../../../utils-test';

const categoryId = new mongoose.Types.ObjectId().toHexString();

const restaurantId = new mongoose.Types.ObjectId().toHexString();

let products: IProduct[];

beforeEach(async () => {
  const createdProducts = await MProduct.create([
    {
      categoryId: categoryId,
      restaurantId: restaurantId,
      name: 'Refrigerante',
      price: 9.99,
      description: 'Refrigerante de cola',
      isAvailable: true,
    },
    {
      categoryId: categoryId,
      restaurantId: restaurantId,
      name: 'Suco de uva',
      price: 7.49,
      description: 'Suco feito de uva',
      isAvailable: true,
    },
  ]);

  products = createdProducts.map(dbProductToInternal);
});

describe('Get All Products - Integration Tests', () => {
  it(`Should return a list of products
    status code: 200
    route: GET /categories/:id/products`, async () => {
    const response = await request(app).get(
      `/categories/${categoryId}/products`,
    );

    expect(response.body.sort(sortById)).toEqual(products.sort(sortById));

    expect(response.status).toBe(200);
  });
});
