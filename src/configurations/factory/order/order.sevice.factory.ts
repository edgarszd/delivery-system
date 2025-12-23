import { IOrderService } from '../../../domain/order/entity/interfaces/order.service.inteface';
import { OrderService } from '../../../domain/order/service/order.service';
import { OrderRepositoryRead } from '../../../infrastructure/repository/order/order.respository.read';
import { OrderRepositoryWrite } from '../../../infrastructure/repository/order/order.respository.write';
import { ProductRepositoryRead } from '../../../infrastructure/repository/product/product.repository.read';
import { RestaurantRepositoryRead } from '../../../infrastructure/repository/restaurant/restaurant.repository.read';

export class OrderServiceFactory {
  static create(): IOrderService {
    const orderRepositoryWrite = new OrderRepositoryWrite();

    const orderRepositoryRead = new OrderRepositoryRead();

    const restaurantRepositoryRead = new RestaurantRepositoryRead();

    const productRepositoryRead = new ProductRepositoryRead();

    const service = new OrderService({
      orderRepositoryWrite,
      orderRepositoryRead,
      restaurantRepositoryRead,
      productRepositoryRead,
    });

    return service;
  }
}
