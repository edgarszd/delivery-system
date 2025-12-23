import { IMCategory } from '../models/category.model';
import { IMRestaurant } from '../models/restaurant.model';
import mongoose from 'mongoose';

const collectionName = 'category';
const schemaName = 'category';

const CategorySchema = new mongoose.Schema<IMCategory>(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
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

export const MCategory = mongoose.model<IMCategory>(schemaName, CategorySchema);
