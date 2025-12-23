import {
  IOrder,
  IOrderProduct,
} from '../../../../domain/order/entity/interfaces/order.interface';
import { IMOrder } from '../../../database/mongo/models/order.model';

function dbOrderProductToInternal(product: IOrderProduct): IOrderProduct {
  return {
    productId: product.productId,
    quantity: product.quantity,
  };
}

export function dbOrderToInternal(dbOrder: IMOrder): IOrder {
  return {
    _id: dbOrder._id.toHexString(),
    restaurantId: dbOrder.restaurantId.toHexString(),
    items: dbOrder.items.map(dbOrderProductToInternal),
    priceTotal: dbOrder.priceTotal,
    status: dbOrder.status,
  };
}
