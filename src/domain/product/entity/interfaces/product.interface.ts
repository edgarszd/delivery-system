export interface IProduct {
  _id?: string;
  categoryId: string;
  restaurantId?: string;
  name: string;
  price: number;
  description: string;
  isAvailable: boolean;
}
