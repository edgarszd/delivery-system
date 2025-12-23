import mongoose from 'mongoose';
import { IMOrder } from '../models/order.model';
import {
  EOrderStatus,
  IOrderProduct,
} from '../../../../domain/order/entity/interfaces/order.interface';

const collectionName = 'order';
const schemaName = 'order';

const orderProductSchema = new mongoose.Schema<IOrderProduct>(
  {
    productId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
    versionKey: false,
    strict: 'throw',
  },
);

const OrderSchema = new mongoose.Schema<IMOrder>(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    items: {
      type: [orderProductSchema],
      required: true,
    },
    priceTotal: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: EOrderStatus,
      required: true,
    },
  },
  {
    collection: collectionName,
    versionKey: false,
    strict: 'throw',
    timestamps: true,
  },
);

export const MOrder = mongoose.model<IMOrder>(schemaName, OrderSchema);
