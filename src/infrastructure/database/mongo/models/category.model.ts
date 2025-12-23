import { ICategory } from '../../../../domain/category/entity/interfaces/category.interface';
import mongoose from 'mongoose';

export interface IMCategory extends Omit<ICategory, '_id' | 'restaurantId'> {
  _id: mongoose.Types.ObjectId;
  restaurantId: mongoose.Types.ObjectId;
}
