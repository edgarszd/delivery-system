import mongoose from 'mongoose';
import { IProduct } from '../../../../domain/product/entity/interfaces/product.interface';

export interface IMProduct extends Omit<
  IProduct,
  '_id' | 'categoryId' | 'restaurantId'
> {
  _id: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  restaurantId: mongoose.Types.ObjectId;
}
