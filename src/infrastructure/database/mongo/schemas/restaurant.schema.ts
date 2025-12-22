import { IMRestaurant } from '../models/restaurant.model';
import mongoose from 'mongoose';

const collectionName = 'restaurant';
const schemaName = 'restaurant';

const RestaurantSchema = new mongoose.Schema<IMRestaurant>(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
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

export const MRestaurant = mongoose.model<IMRestaurant>(
  schemaName,
  RestaurantSchema,
);
