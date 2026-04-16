"use client";

import { useState } from "react";
import { useCart } from "@/app/hooks/useCart";
import type { CartItem } from "@/app/types/cartTypes";

interface AddToCartProps {
  item: Omit<CartItem, "quantity">;
  showLabel?: boolean;
  variant?: "button" | "card";
}

export function AddToCart({ item, showLabel = true, variant = "button" }: AddToCartProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(item, quantity);
    setIsAdded(true);
    
    // Reset feedback após 2 segundos
    setTimeout(() => {
      setIsAdded(false);
      setQuantity(1);
    }, 2000);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (variant === "card") {
    return (
      <div className="flex flex-col gap-3 p-4 border border-zinc-200 rounded-lg bg-white">
        {showLabel && (
          <div>
            <h3 className="font-semibold text-zinc-900">{item.name}</h3>
            <p className="text-sm text-zinc-600">R$ {item.price.toFixed(2)}</p>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <button
            onClick={decrementQuantity}
            className="inline-flex h-8 w-8 items-center justify-center rounded border border-zinc-300 text-zinc-700 hover:bg-zinc-50 transition"
          >
            −
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-12 text-center border border-zinc-300 rounded py-1 px-2"
          />
          <button
            onClick={incrementQuantity}
            className="inline-flex h-8 w-8 items-center justify-center rounded border border-zinc-300 text-zinc-700 hover:bg-zinc-50 transition"
          >
            +
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className={`w-full py-2 px-4 rounded-lg font-medium transition ${
            isAdded
              ? "bg-green-500 text-white"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isAdded ? "✓ Adicionado!" : "Adicionar ao Carrinho"}
        </button>
      </div>
    );
  }

  // Variant button (padrão)
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 border border-zinc-300 rounded-lg">
        <button
          onClick={decrementQuantity}
          className="inline-flex h-8 w-8 items-center justify-center text-zinc-700 hover:bg-zinc-100 transition"
        >
          −
        </button>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-10 text-center border-0 py-1 px-1"
        />
        <button
          onClick={incrementQuantity}
          className="inline-flex h-8 w-8 items-center justify-center text-zinc-700 hover:bg-zinc-100 transition"
        >
          +
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className={`py-2 px-4 rounded-lg font-medium transition whitespace-nowrap ${
          isAdded
            ? "bg-green-500 text-white"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isAdded ? "✓" : showLabel ? "Adicionar" : "🛒"}
      </button>
    </div>
  );
}
