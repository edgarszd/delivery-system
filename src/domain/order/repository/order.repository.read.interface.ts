import { IOrder } from '../entity/interfaces/order.interface';

export interface IOrderRepositoryRead {
  getOrdersByRestaurantId(restaurantId: string): Promise<IOrder[]>;
}
