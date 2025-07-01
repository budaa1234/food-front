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
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
