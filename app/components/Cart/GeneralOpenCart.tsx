"use client";

import { useCart } from "@/app/hooks/useCart";

export default function GeneralOpenCart() {
  const { openCart } = useCart();

  return (
    <div className="flex flex-col items-center gap-4">
      <button className="rounded bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700" onClick={openCart}>
        Revisar seleção
      </button>
    </div>
  );
}
