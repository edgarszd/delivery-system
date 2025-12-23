import mongoose from 'mongoose';
import { IMProduct } from '../models/product.model';

const collectionName = 'product';
const schemaName = 'product';

const ProductSchema = new mongoose.Schema<IMProduct>(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
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

export const MProduct = mongoose.model<IMProduct>(schemaName, ProductSchema);
