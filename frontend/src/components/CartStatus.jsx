import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "../hooks/useCart";
import { useUser } from "../context/UserContext";

export default function CartStatus() {
  const { user } = useUser();
  const userId = user ? user.id : null;
  const { cartQuery } = useCart(userId);
  const { data: carts, isLoading, error } = cartQuery || {};

  if (isLoading) return <AiOutlineShoppingCart className="text-xl relative" />;
  if (error) return <div>Error loading cart: {error.message}</div>;

  return (
    <div className="relative w-8">
      <span className="absolute bg-main rounded-full z-10 text-sm right-1 -top-1 w-4 h-4 text-center leading-4 text-white inline-block">
        {carts ? carts.length : 0}
      </span>
      <AiOutlineShoppingCart className="text-xl relative" />
    </div>
  );
}
