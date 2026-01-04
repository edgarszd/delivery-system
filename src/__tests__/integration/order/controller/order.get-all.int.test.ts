import { MOrder } from '../../../../infrastructure/database/mongo/schemas/order.schema';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../../../../jest/setup-integration-tests';
import { generateOrderProduct } from '../../../mocks-test';
import {
  EOrderStatus,
  IOrder,
} from '../../../../domain/order/entity/interfaces/order.interface';
import { dbOrderToInternal } from '../../../../infrastructure/repository/order/adapters/order.adapter';
import { sortById } from '../../../utils-test';

const restaurantId = new mongoose.Types.ObjectId().toHexString();

let orders: IOrder[];

beforeEach(async () => {
  const createdOrders = await MOrder.create([
    {
      restaurantId: restaurantId,
      items: [generateOrderProduct()],
      priceTotal: 9.99,
      status: EOrderStatus.PENDING,
    },
    {
      restaurantId: restaurantId,
      items: [generateOrderProduct()],
      priceTotal: 23.99,
      status: EOrderStatus.COMPLETED,
    },
  ]);

  orders = createdOrders.map(dbOrderToInternal);
});

describe('Get All Orders - Integration Tests', () => {
  it(`Should return a list of orders
    status code: 200
    route: GET /restaurants/:id/orders`, async () => {
    const response = await request(app).get(
      `/restaurants/${restaurantId}/orders`,
    );

    expect(response.body.sort(sortById)).toEqual(orders.sort(sortById));

    expect(response.status).toBe(200);
  });
});
