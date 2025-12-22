import { IRestaurant } from '../../../../domain/restaurant/entity/interfaces/restaurant.interface';
import mongoose from 'mongoose';

export interface IMRestaurant extends Omit<IRestaurant, '_id'> {
  _id: mongoose.Types.ObjectId;
}
