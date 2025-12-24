import mongoose from 'mongoose';
import { IMOrder } from '../../../infrastructure/database/mongo/models/order.model';
import {
  EOrderStatus,
  IOrderProduct,
} from '../../../domain/order/entity/interfaces/order.interface';
import { dbOrderToInternal } from '../../../infrastructure/repository/order/adapters/order.adapter';

describe('Testing dbOrderToInternal', () => {
  it('should be return a correctly mapped IOrder object', () => {
    const orderId = new mongoose.Types.ObjectId();
    const restaurantId = new mongoose.Types.ObjectId();

    const items: IOrderProduct[] = [
      {
        productId: new mongoose.Types.ObjectId().toHexString(),
        quantity: 2,
      },
    ];

    const imOrder: IMOrder = {
      _id: orderId,
      restaurantId: restaurantId,
      items: items,
      priceTotal: 23.4,
      status: EOrderStatus.PENDING,
    };

    const result = dbOrderToInternal(imOrder);

    const expected = {
      ...imOrder,
      _id: imOrder._id.toHexString(),
      restaurantId: imOrder.restaurantId.toHexString(),
    };

    expect(result).toEqual(expected);
  });
});
