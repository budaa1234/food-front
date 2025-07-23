import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderSheet, OrderSheetOrderItem } from ".";
import { useEffect, useState } from "react";

type Food = {
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

export type Order = {
  _id: string;
  user: string;
  totalPrice: number;
  foodOrderItems: {
    food: Food;
    quantity: number;
    price: string;
    _id: string;
  }[];
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
type OrderResponse = {
  success: boolean;
  foodOrder: Order[];
};

export const OrderSheetOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    const getCatgories = async () => {
      const response = await fetch(
        "http://localhost:4200/food-order/user/688056a64de455ef33ab0ce1"
      );

      const data = (await response.json()) as OrderResponse;

      console.log(data);

      setOrders(data.foodOrder);
      console.log(data.foodOrder);
      
    };
    getCatgories();
  }, []);

  console.log(orders?.[0]);
  return (
    <Card className="h-[87%]">
      <CardHeader className="p-4 ">
        <CardTitle>Order history</CardTitle>
      </CardHeader>

      <CardContent className="p-4">
        {orders.map((order) => {
          return <OrderSheetOrderItem key={order._id} {...order} />;
        })}
      </CardContent>
    </Card>
  );
};
