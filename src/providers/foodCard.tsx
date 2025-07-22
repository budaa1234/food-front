"use client";

import { FoodType } from "@/constants/food";
import { createContext, useContext, useEffect, useState } from "react";

export type FoodWithQuantity = {
  food: FoodType;
  quantity: number;
  totalPrice: number;
};

type FoodCartContextType = {
  foodCart: FoodWithQuantity[];
  addToCart: (_food: FoodWithQuantity) => void;
  removeFromCart: (_foodId: string) => void;
  incrementFoodQuantity: (_foodId: string) => void;
  decrimentFoodQuantity: (_foodId: string) => void;
};

export const FoodCartContext = createContext<FoodCartContextType>(
  {} as FoodCartContextType
);

export default function FoodCartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [foodCart, setFoodCart] = useState<FoodWithQuantity[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartItems = localStorage.getItem("foodCart");
      if (cartItems) setFoodCart(JSON.parse(cartItems) || []);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("foodCart", JSON.stringify(foodCart));
    }
  }, [foodCart]);

  const addToCart = (newFood: FoodWithQuantity) => {
    const existingFood = foodCart.find(
      ({ food }) => food._id === newFood.food._id
    );

    if (existingFood) {
      const updatedFoodCart = updateFoodCart(foodCart, newFood);
      setFoodCart(updatedFoodCart);
    } else {
      setFoodCart([...foodCart, newFood]);
    }
  };

  const incrementFoodQuantity = (foodId: string) => {
    const updatedFoodCart = foodCart.map(({ food, quantity }) => {
      if (food._id === foodId) {
        const newQuantity = quantity + 1;
        return {
          food,
          quantity: newQuantity,
          totalPrice: newQuantity * food.price,
        };
      }
      return { food, quantity, totalPrice: quantity * food.price };
    });

    setFoodCart(updatedFoodCart);
  };

  const decrimentFoodQuantity = (foodId: string) => {
    const updatedFoodCart = foodCart
      .map(({ food, quantity }) => {
        if (food._id === foodId) {
          const newQuantity = quantity - 1;
          if (newQuantity <= 0) return null; 
          return {
            food,
            quantity: newQuantity,
            totalPrice: newQuantity * food.price,
          };
        }
        return {
          food,
          quantity,
          totalPrice: quantity * food.price,
        };
      })
      .filter(Boolean) as FoodWithQuantity[];

    setFoodCart(updatedFoodCart);
  };

  const removeFromCart = (foodId: string) => {
    const updatedCart = foodCart.filter(({ food }) => food._id !== foodId);
    setFoodCart(updatedCart);
  };

  return (
    <FoodCartContext.Provider
      value={{
        foodCart,
        addToCart,
        removeFromCart,
        incrementFoodQuantity,
        decrimentFoodQuantity,
      }}
    >
      {children}
    </FoodCartContext.Provider>
  );
}

export const useFoodCart = () => useContext(FoodCartContext);

const updateFoodCart = (
  foodCart: FoodWithQuantity[],
  newFood: FoodWithQuantity
): FoodWithQuantity[] => {
  return foodCart.map(({ food, quantity }) => {
    if (food._id === newFood.food._id) {
      const newQuantity = quantity + newFood.quantity;
      return {
        food,
        quantity: newQuantity,
        totalPrice: newQuantity * food.price,
      };
    }
    return {
      food,
      quantity,
      totalPrice: quantity * food.price,
    };
  });
};
