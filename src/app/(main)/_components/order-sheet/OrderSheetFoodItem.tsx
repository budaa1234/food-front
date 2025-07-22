import { SidebarDashLine } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { FoodType } from "@/constants/food";
import { useFoodCart } from "@/providers/foodCard";

import { CircleX, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
type OrderSheetFoodItemProps = {
  food: FoodType;
  quantity: number;
  totalPrice: number
};
export const OrderSheetFoodItem = ({
  food,
  quantity,
  totalPrice
}: OrderSheetFoodItemProps) => {
  const { incrementFoodQuantity, decrimentFoodQuantity , removeFromCart } = useFoodCart();

  return (
    <>
      <div className="flex gap-3">
        <div className="w-[124px] h-[120px] relative rounded-lg overflow-hidden">
          <Image
            className="fill"
            src={food?.image}
            objectFit="cover"
            layout="fill"
            alt={food?.foodName}
          />
        </div>

        <div className="w-[300px] flex flex-col justify-between">
          <div className="flex">
            <div className="w-full">
              <h3 className="font-bold text-red-500">{food?.foodName}</h3>
              <div className="flex flex-wrap">
                <p className="text-xs font-light">{food.ingredients}</p>
              </div>
            </div>
            <CircleX
             onClick={() => removeFromCart(food._id)}
              strokeWidth={0.5}
              size={50}
              color="red"
              className="cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                onClick={() => decrimentFoodQuantity(food._id)}
                variant="ghost"
              >
                <Minus />
              </Button>

              <div className="text-lg font-semibold">{quantity}</div>

              <Button
                onClick={() => incrementFoodQuantity(food._id)}
                variant="ghost"
              >
                <Plus />
              </Button>
            </div>

            <h4 className="font-bold">{totalPrice}</h4>
          </div>
        </div>
      </div>
      <SidebarDashLine />
    </>
  );
};
