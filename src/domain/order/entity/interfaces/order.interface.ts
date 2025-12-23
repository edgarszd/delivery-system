export interface IOrderProduct {
  productId: string;
  quantity: number;
}

export enum EOrderStatus {
  PENDING = 'PENDING',
  PREPARING = 'PREPARING',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export interface IOrder {
  _id?: string;
  restaurantId: string;
  items: IOrderProduct[];
  priceTotal: number;
  status: EOrderStatus;
}
