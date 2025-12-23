import { NotFound } from 'express-openapi-validator/dist/openapi.validator';
import {
  EOrderStatus,
  IOrder,
} from '../../../domain/order/entity/interfaces/order.interface';
import { IOrderRepositoryWrite } from '../../../domain/order/repository/order.repository.write.interface';
import { MOrder } from '../../database/mongo/schemas/order.schema';
import { dbOrderToInternal } from './adapters/order.adapter';
import { NotFoundError } from '../../../application/exceptions/not-found.error';

export class OrderRepositoryWrite implements IOrderRepositoryWrite {
  async create(order: IOrder): Promise<IOrder> {
    const result = await MOrder.create(order);

    return dbOrderToInternal(result);
  }

  async updateOrderStatus(
    orderId: string,
    status: EOrderStatus,
  ): Promise<IOrder | null> {
    const updatedOrder = await MOrder.findByIdAndUpdate(
      orderId,
      { status: status },
      { new: true },
    );

    return updatedOrder ? dbOrderToInternal(updatedOrder) : null;
  }
}
