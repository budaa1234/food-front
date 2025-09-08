export type Category = {
  categoryName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  _id: string;
  foods: Food[]
};

export type Food = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
  count: number
  __v: number;
};
export type FoodOrderItem = {
  _id: string;             // Mongoose ObjectId
  food: string;            // Food-ийн ObjectId
  quantity: number;
  price: number;
};

export enum FoodOrderStatusEnum {
  PENDING = "PENDING",
  CANCELED = "CANCELED",
  DELIVERED = "DELIVERED",
}

export type Order = {
  _id: string;                 // Mongoose ObjectId
  user: string;                // User-ийн ObjectId
  totalPrice: number;
  foodOrderItems: FoodOrderItem[];
  status: FoodOrderStatusEnum;
  createdAt: string;           // ISO string
  updatedAt: string;           // ISO string
};
