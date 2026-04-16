"use client";

import { useCart } from "@/app/hooks/useCart";

export default function GeneralOpenCart() {
  const { openCart } = useCart();

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={openCart}>
        Ir para o Carrinho
      </button>
    </div>
  );
}
