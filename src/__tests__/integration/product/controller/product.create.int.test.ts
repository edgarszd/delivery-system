import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../../../../jest/setup-integration-tests';
import { IProduct } from '../../../../domain/product/entity/interfaces/product.interface';
import { MCategory } from '../../../../infrastructure/database/mongo/schemas/category.schema';
import { MProduct } from '../../../../infrastructure/database/mongo/schemas/product.schema';
import { generateCategory, generateProduct } from '../../../mocks-test';

const restaurantId = new mongoose.Types.ObjectId().toHexString();

const categoryId = new mongoose.Types.ObjectId().toHexString();

let product: Omit<IProduct, 'categoryId'>;

beforeEach(async () => {
  product = generateProduct({
    _id: undefined,
    categoryId: undefined,
    restaurantId: undefined,
  });

  await MCategory.create(
    generateCategory({ _id: categoryId, restaurantId: restaurantId }),
  );
});

describe('Create Product - Integration Tests', () => {
  it(`Should create product successfully with valid data
    status code: 201
    route: POST /categories/:id/products`, async () => {
    const response = await request(app)
      .post(`/categories/${categoryId}/products`)
      .send(product);

    const createdProduct = await MProduct.findById(response.body._id).lean();

    expect(response.body).toMatchObject({
      categoryId: categoryId,
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
      .post(`/categories/${categoryId}/products`)
      .send(product);

    expect(response.status).toBe(422);
  });

  it(`Should return error when price is negative
  status code: 422
  route: POST /categories/:id/products`, async () => {
    product.price = -1;

    const response = await request(app)
      .post(`/categories/${categoryId}/products`)
      .send(product);

    expect(response.status).toBe(422);
  });

  it(`Should return error when description is empty
  status code: 422
  route: POST /categories/:id/products`, async () => {
    product.description = '';

    const response = await request(app)
      .post(`/categories/${categoryId}/products`)
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
      .post(`/categories/${categoryId}/products`)
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
      .post(`/categories/${categoryId}/products`)
      .send(categoryWithExtraFields);

    expect(response.status).toBe(400);
  });
});
