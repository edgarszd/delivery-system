import mongoose from 'mongoose';
import { IOrder } from '../../../../domain/order/entity/interfaces/order.interface';

export interface IMOrder extends Omit<IOrder, '_id' | 'restaurantId'> {
  _id: mongoose.Types.ObjectId;
  restaurantId: mongoose.Types.ObjectId;
}
