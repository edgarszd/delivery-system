import {
  EOrderStatus,
  IOrder,
} from '../../domain/order/entity/interfaces/order.interface';
import { NextFunction, Request, Response, Router } from 'express';
import { IController } from './controller.interface';
import { IOrderService } from '../../domain/order/entity/interfaces/order.service.inteface';

export class OrderController implements IController {
  private router: Router = Router();

  private readonly orderService: IOrderService;

  constructor(orderService: IOrderService) {
    this.orderService = orderService;
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post('/orders', this.createOrder);
    this.router.get('/restaurants/:id/orders', this.getAllOrders);
    this.router.patch('/orders/:id/status', this.updateOrderStatus);
  }

  public getRoutes() {
    return this.router;
  }

  createOrder = async (
    req: Request<{}, {}, Omit<IOrder, 'status'>, {}>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const orderData = {
        ...req.body,
        status: EOrderStatus.PENDING,
      };

      const result = await this.orderService.createOrder(orderData);

      res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  };

  getAllOrders = async (
    req: Request<{ id: string }, {}, {}, {}>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;

      const result = await this.orderService.getAllOrders(id);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };

  updateOrderStatus = async (
    req: Request<{ id: string }, {}, { status: EOrderStatus }, {}>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;

      const { status } = req.body;

      const result = await this.orderService.updateOrderStatus(id, status);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };
}
