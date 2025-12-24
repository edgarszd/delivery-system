import { BusinessError } from '../../../application/exceptions/business.error';
import {
  EOrderStatus,
  IOrder,
  IOrderProduct,
} from './interfaces/order.interface';

export class OrderEntity implements IOrder {
  _id?: string;

  restaurantId: string;

  items: IOrderProduct[];

  priceTotal: number;

  status: EOrderStatus;

  constructor(order: IOrder) {
    this.validateOrder(order);

    this._id = order._id;
    this.restaurantId = order.restaurantId;
    this.items = order.items;
    this.priceTotal = order.priceTotal;
    this.status = order.status;
  }

  private validateOrder(order: IOrder): void {
    this.validateItems(order.items);
    this.validatePriceTotal(order.priceTotal);
  }

  private validateItems(items: IOrderProduct[]): void {
    if (items.length === 0) {
      throw new BusinessError('At least one product is required.');
    }

    items.forEach((item) => this.validateItem(item));
  }

  private validateItem(item: IOrderProduct) {
    if (item.quantity < 1) {
      throw new BusinessError(
        `The minimum quantity of product ${item.productId} must be 1.`,
      );
    }
  }

  private validatePriceTotal(priceTotal: number): void {
    if (priceTotal < 0) {
      throw new BusinessError(`The order total price cannot be negative!`);
    }
  }
}
