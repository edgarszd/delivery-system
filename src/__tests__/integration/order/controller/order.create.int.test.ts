import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../../../../jest/setup-integration-tests';
import {
  EOrderStatus,
  IOrder,
  IOrderProduct,
} from '../../../../domain/order/entity/interfaces/order.interface';
import { MRestaurant } from '../../../../infrastructure/database/mongo/schemas/restaurant.schema';
import { MProduct } from '../../../../infrastructure/database/mongo/schemas/product.schema';
import { MOrder } from '../../../../infrastructure/database/mongo/schemas/order.schema';
import {
  generateOrderProduct,
  generateProduct,
  generateRestaurant,
} from '../../../mocks-test';

const restaurantId = new mongoose.Types.ObjectId().toHexString();

const productId = new mongoose.Types.ObjectId().toHexString();

let order: Omit<IOrder, 'status'>;

beforeEach(async () => {
  const items: IOrderProduct[] = [
    generateOrderProduct({ productId: productId }),
  ];

  order = {
    restaurantId: restaurantId,
    items: items,
    priceTotal: 9.99,
  };

  const restaurant = generateRestaurant({ _id: restaurantId });
  await MRestaurant.create(restaurant);

  const product = generateProduct({
    _id: productId,
    restaurantId: restaurantId,
  });
  await MProduct.create(product);
});

describe('Create Order - Integration Tests', () => {
  it(`Should create order successfully with valid data
    status code: 201
    route: POST /orders`, async () => {
    const response = await request(app).post(`/orders`).send(order);

    const createdOrder = await MOrder.findById(response.body._id).lean();

    expect(response.body).toMatchObject({
      ...order,
      status: EOrderStatus.PENDING,
    });
    expect(response.status).toBe(201);

    expect(createdOrder).toBeTruthy();
  });

  it(`Should return error when the restaurant does not exist
    status code: 404
    route: POST /orders`, async () => {
    order.restaurantId = new mongoose.Types.ObjectId().toHexString();

    const response = await request(app).post(`/orders`).send(order);

    expect(response.status).toBe(404);
  });

  it(`Should return error when a product does not exist
  status code: 404
  route: POST /orders`, async () => {
    order.items[0].productId = new mongoose.Types.ObjectId().toHexString();

    const response = await request(app).post(`/orders`).send(order);

    expect(response.status).toBe(404);
  });

  it(`Should return error when product does not belong to the restaurant
    status code: 422
    route: POST /orders`, async () => {
    const wrongOrderProduct: IOrderProduct = generateOrderProduct();

    const wrongProduct = generateProduct({ _id: wrongOrderProduct.productId });
    await MProduct.create(wrongProduct);

    order.items.push(wrongOrderProduct);

    const response = await request(app).post(`/orders`).send(order);

    expect(response.status).toBe(422);
  });

  it(`Should return error when total price is negative
    status code: 422
    route: POST /orders`, async () => {
    order.priceTotal = -1;

    const response = await request(app).post(`/orders`).send(order);

    expect(response.status).toBe(422);
  });

  it(`Should return error when items list is empty
    status code: 422
    route: POST /orders`, async () => {
    order.items = [];

    const response = await request(app).post(`/orders`).send(order);

    expect(response.status).toBe(422);
  });

  it(`Should return error when the quantity of an item is less than 1
    status code: 422
    route: POST /orders`, async () => {
    order.items[0].quantity = 0;

    const response = await request(app).post(`/orders`).send(order);

    expect(response.status).toBe(422);
  });
});
