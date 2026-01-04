import { ICategory } from '../domain/category/entity/interfaces/category.interface';
import {
  EOrderStatus,
  IOrder,
  IOrderProduct,
} from '../domain/order/entity/interfaces/order.interface';
import { IProduct } from '../domain/product/entity/interfaces/product.interface';
import { IRestaurant } from '../domain/restaurant/entity/interfaces/restaurant.interface';
import mongoose from 'mongoose';

export const generateRestaurant = (
  override?: Partial<IRestaurant>,
): IRestaurant => {
  const restaurant: IRestaurant = {
    _id: new mongoose.Types.ObjectId().toHexString(),
    name: 'Restaurant X',
    address: '123 Main Street, Apt 4B.',
    ...override,
  };

  return restaurant;
};

export const generateCategory = (override?: Partial<ICategory>): ICategory => {
  const category: ICategory = {
    _id: new mongoose.Types.ObjectId().toHexString(),
    restaurantId: new mongoose.Types.ObjectId().toHexString(),
    name: 'Candy',
    index: 1,
    ...override,
  };

  return category;
};

export const generateProduct = (override?: Partial<IProduct>): IProduct => {
  const product: IProduct = {
    _id: new mongoose.Types.ObjectId().toHexString(),
    categoryId: new mongoose.Types.ObjectId().toHexString(),
    restaurantId: new mongoose.Types.ObjectId().toHexString(),
    name: 'KitRat',
    price: 9.99,
    description: 'A chocolate in the shape of a mouse.',
    isAvailable: true,
    ...override,
  };

  return product;
};

export const generateOrderProduct = (
  override?: Partial<IOrderProduct>,
): IOrderProduct => {
  const orderProduct = {
    productId: new mongoose.Types.ObjectId().toHexString(),
    quantity: 2,
    ...override,
  };

  return orderProduct;
};

export const generateOrder = (override?: Partial<IOrder>): IOrder => {
  const order = {
    _id: new mongoose.Types.ObjectId().toHexString(),
    restaurantId: new mongoose.Types.ObjectId().toHexString(),
    items: [generateOrderProduct()],
    priceTotal: 9.99,
    status: EOrderStatus.PENDING,
    ...override,
  };

  return order;
};
