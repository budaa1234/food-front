import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { SidebarDashLine } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { FoodCartContext } from "@/providers/foodCard";
import { useContext } from "react";

export const OrderSheetPayment = ({ openModal }: { openModal: () => void }) => {
  const { foodCart } = useContext(FoodCartContext);
  console.log("Pay", foodCart);

  if (!foodCart.length) return;

  const priceCalculate = foodCart.map((foods) => {
    return foods.food.price * foods.quantity;
  });
  const totalPrice = priceCalculate.reduce((acc, curr) => acc + curr, 0);

  const handleCreateOrder = async () => {
    const response = await fetch("http://localhost:4200/food-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        foodOrderItems: foodCart,
        totalPrice: totalPrice,
        user: "6880752fdb2d593ea8aa485f",
      }),
      
    });
  };
  return (
    <Card className="mt-6">
      <CardHeader className="p-4 ">
        <CardTitle>Payment info</CardTitle>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex justify-between">
          <p className="text-[#71717A] font-light">Items</p>
          <p className="font-bold">12₮</p>
        </div>

        <div className="flex justify-between">
          <p className="text-[#71717A] font-light">Shipping</p>
          <p className="font-bold">12₮</p>
        </div>

        <SidebarDashLine />

        <div className="flex justify-between">
          <p className="text-[#71717A] font-light">Total</p>
          <p className="font-bold">{totalPrice}₮</p>
        </div>
      </CardContent>

      <CardFooter className="p-4">
        <Button
          onClick={handleCreateOrder}
          size="lg"
          className="w-full bg-red-500 rounded-full"
        >
          Checkout
        </Button>
      </CardFooter>
    </Card>
  );
};
