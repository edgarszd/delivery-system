import { IProductRepositoryRead } from '../../../product/repository/product.repository.read.interface';
import { IRestaurantRepositoryRead } from '../../../restaurant/repository/restaurant.repository.read.interface';
import { IOrderRepositoryRead } from '../../repository/order.repository.read.interface';
import { IOrderRepositoryWrite } from '../../repository/order.repository.write.interface';
import { EOrderStatus, IOrder } from './order.interface';

export interface IOrderService {
  createOrder(order: IOrder): Promise<IOrder>;
  getAllOrders(restaurantId: string): Promise<IOrder[]>;
  updateOrderStatus(orderId: string, status: EOrderStatus): Promise<IOrder>;
}

export interface IParamsOrderService {
  orderRepositoryWrite: IOrderRepositoryWrite;
  orderRepositoryRead: IOrderRepositoryRead;
  restaurantRepositoryRead: IRestaurantRepositoryRead;
  productRepositoryRead: IProductRepositoryRead;
}
