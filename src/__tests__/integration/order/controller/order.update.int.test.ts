import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../../../../jest/setup-integration-tests';
import { MOrder } from '../../../../infrastructure/database/mongo/schemas/order.schema';
import { generateOrder } from '../../../mocks-test';
import {
  EOrderStatus,
  IOrder,
} from '../../../../domain/order/entity/interfaces/order.interface';

const orderId = new mongoose.Types.ObjectId().toHexString();

let order: IOrder;

beforeEach(async () => {
  order = generateOrder({ _id: orderId });

  await MOrder.create(order);
});

describe('Update Order - Integration Tests', () => {
  it(`Should return an order with the updated status
    status code: 200
    route: PATCH /orders/:id/status`, async () => {
    const newStatus = EOrderStatus.COMPLETED;

    const response = await request(app)
      .patch(`/orders/${orderId}/status`)
      .send({ status: newStatus });

    const updatedOrder = {
      ...order,
      status: newStatus,
    };
    expect(response.body).toEqual(updatedOrder);

    expect(response.status).toBe(200);
  });

  it(`Should return error when the order does not exist
    status code: 404
    route: PATCH /orders/:id/status`, async () => {
    const wrongOrderId = new mongoose.Types.ObjectId().toHexString();

    const newStatus = EOrderStatus.COMPLETED;

    const response = await request(app)
      .patch(`/orders/${wrongOrderId}/status`)
      .send({ status: newStatus });

    expect(response.status).toBe(404);
  });
});
