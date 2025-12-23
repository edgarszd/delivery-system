import { EOrderStatus, IOrder } from '../entity/interfaces/order.interface';

export interface IOrderRepositoryWrite {
  create(order: IOrder): Promise<IOrder>;
  updateOrderStatus(
    orderId: string,
    status: EOrderStatus,
  ): Promise<IOrder | null>;
}
