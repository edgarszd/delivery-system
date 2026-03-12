import { IOrder } from '../../../domain/order/entity/interfaces/order.interface';
import { IOrderRepositoryRead } from '../../../domain/order/repository/order.repository.read.interface';
import { IMOrder } from '../../database/mongo/models/order.model';
import { MOrder } from '../../database/mongo/schemas/order.schema';
import { dbOrderToInternal } from './adapters/order.adapter';

export class OrderRepositoryRead implements IOrderRepositoryRead {
  async getOrdersByRestaurantId(restaurantId: string): Promise<IOrder[]> {
    const result: IMOrder[] = await MOrder.find({ restaurantId }).lean();

    const orders = result.map(dbOrderToInternal);

    return orders;
  }
}
