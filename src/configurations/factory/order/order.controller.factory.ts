import { IController } from '../../../application/controllers/controller.interface';
import { OrderController } from '../../../application/controllers/order.controller';
import { OrderServiceFactory } from './order.sevice.factory';

export class OrderControllerFactory {
  static create(): IController {
    const orderService = OrderServiceFactory.create();

    const controller = new OrderController(orderService);

    return controller;
  }
}
