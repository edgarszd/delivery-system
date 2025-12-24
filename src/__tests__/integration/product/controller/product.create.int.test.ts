import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../../../../jest/setup-integration-tests';
import { IProduct } from '../../../../domain/product/entity/interfaces/product.interface';
import { ICategory } from '../../../../domain/category/entity/interfaces/category.interface';
import { MCategory } from '../../../../infrastructure/database/mongo/schemas/category.schema';
import { dbCategoryToInternal } from '../../../../infrastructure/repository/category/adapters/category.adapter';
import { MRestaurant } from '../../../../infrastructure/database/mongo/schemas/restaurant.schema';
import { dbRestaurantToInternal } from '../../../../infrastructure/repository/restaurant/adapters/restaurant.adapter';
import { IRestaurant } from '../../../../domain/restaurant/entity/interfaces/restaurant.interface';
import { IMCategory } from '../../../../infrastructure/database/mongo/models/category.model';
import { MProduct } from '../../../../infrastructure/database/mongo/schemas/product.schema';

const restaurantId = new mongoose.Types.ObjectId().toHexString();

let product: Omit<IProduct, 'categoryId'>;

beforeEach(() => {
  product = {
    name: 'Refrigerante',
    price: 9.99,
    description: 'Refrigerante de cola',
    isAvailable: true,
  };
});

let existingCategory: ICategory;

beforeAll(async () => {
  const createdCategory = await MCategory.create({
    restaurantId: restaurantId,
    name: 'Lanches',
    index: 1,
  });

  existingCategory = dbCategoryToInternal(createdCategory);
});

describe('Create Product - Integration Tests', () => {
  it(`Should create product successfully with valid data
    status code: 201
    route: POST /categories/:id/products`, async () => {
    const response = await request(app)
      .post(`/categories/${existingCategory._id}/products`)
      .send(product);

    const createdProduct = await MProduct.findById(response.body._id).lean();

    expect(response.body).toMatchObject({
      categoryId: existingCategory._id,
      restaurantId: restaurantId,
      name: product.name,
      price: product.price,
      description: product.description,
      isAvailable: product.isAvailable,
    });
    expect(response.status).toBe(201);

    expect(createdProduct).toBeTruthy();
  });

  it(`Should return error when index does not exist
  status code: 404
  route: POST /categories/:id/products`, async () => {
    const inexistingCategoryId = new mongoose.Types.ObjectId().toHexString();
    const response = await request(app)
      .post(`/categories/${inexistingCategoryId}/products`)
      .send(product);

    expect(response.status).toBe(404);
  });

  it(`Should return error when name is empty
  status code: 422
  route: POST /categories/:id/products`, async () => {
    product.name = '';

    const response = await request(app)
      .post(`/categories/${existingCategory._id}/products`)
      .send(product);

    expect(response.status).toBe(422);
  });

  it(`Should return error when price is negative
  status code: 422
  route: POST /categories/:id/products`, async () => {
    product.price = -1;

    const response = await request(app)
      .post(`/categories/${existingCategory._id}/products`)
      .send(product);

    expect(response.status).toBe(422);
  });

  it(`Should return error when description is empty
  status code: 422
  route: POST /categories/:id/products`, async () => {
    product.description = '';

    const response = await request(app)
      .post(`/categories/${existingCategory._id}/products`)
      .send(product);

    expect(response.status).toBe(422);
  });

  it(`Should return error when required fields are missing
    status code: 400
    route: POST /categories/:id/products`, async () => {
    const incompleteProduct = {
      name: 'Refrigerante',
      price: 9.99,
      isAvailable: true,
    };

    const response = await request(app)
      .post(`/categories/${existingCategory._id}/products`)
      .send(incompleteProduct);

    expect(response.status).toBe(400);
  });

  it(`Should return error when additional fields exist
    status code: 400
    route: POST /restaurants`, async () => {
    const categoryWithExtraFields = {
      ...product,
      extraField: 'extra',
    };

    const response = await request(app)
      .post(`/categories/${existingCategory._id}/products`)
      .send(categoryWithExtraFields);

    expect(response.status).toBe(400);
  });
});
