import { BusinessError } from '../../../application/exceptions/business.error';
import { NotFoundError } from '../../../application/exceptions/not-found.error';
import { IProductRepositoryRead } from '../../product/repository/product.repository.read.interface';
import { IRestaurantRepositoryRead } from '../../restaurant/repository/restaurant.repository.read.interface';
import { EOrderStatus, IOrder } from '../entity/interfaces/order.interface';
import {
  IOrderService,
  IParamsOrderService,
} from '../entity/interfaces/order.service.inteface';
import { OrderEntity } from '../entity/order.entity';
import { IOrderRepositoryRead } from '../repository/order.repository.read.interface';
import { IOrderRepositoryWrite } from '../repository/order.repository.write.interface';

export class OrderService implements IOrderService {
  orderRepositoryWrite: IOrderRepositoryWrite;

  orderRepositoryRead: IOrderRepositoryRead;

  restaurantRepositoryRead: IRestaurantRepositoryRead;

  productRepositoryRead: IProductRepositoryRead;

  constructor(params: IParamsOrderService) {
    this.orderRepositoryWrite = params.orderRepositoryWrite;
    this.orderRepositoryRead = params.orderRepositoryRead;
    this.restaurantRepositoryRead = params.restaurantRepositoryRead;
    this.productRepositoryRead = params.productRepositoryRead;
  }

  async createOrder(order: IOrder): Promise<IOrder> {
    const restaurant = await this.restaurantRepositoryRead.getRestaurantById(
      order.restaurantId,
    );

    if (!restaurant) {
      throw new NotFoundError(
        `No restaurant with ID ${order.restaurantId} was found.`,
      );
    }

    for (const item of order.items) {
      const product = await this.productRepositoryRead.getProductById(
        item.productId,
      );

      if (!product) {
        throw new NotFoundError(`Item ${item.productId} was not found.`);
      }

      if (product.restaurantId !== restaurant._id) {
        throw new BusinessError(
          `Product ${product.name} does not belong to the restaurant.`,
        );
      }
    }

    const orderEntity = new OrderEntity(order);

    const createdOrder = await this.orderRepositoryWrite.create(orderEntity);

    return createdOrder;
  }

  async getAllOrders(restaurantId: string): Promise<IOrder[]> {
    const orders =
      await this.orderRepositoryRead.getOrdersByRestaurantId(restaurantId);

    return orders;
  }

  async updateOrderStatus(
    orderId: string,
    status: EOrderStatus,
  ): Promise<IOrder> {
    const updatedOrder = await this.orderRepositoryWrite.updateOrderStatus(
      orderId,
      status,
    );

    if (!updatedOrder) {
      throw new NotFoundError(
        `The order with ID ${orderId} could not be found.`,
      );
    }

    return updatedOrder;
  }
}
