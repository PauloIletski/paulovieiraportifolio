"use client";

import { useCart } from "@/app/hooks/useCart";
import handleSendMessage from "@/app/utils/sendMessage";

export function CartButton() {
  const {
    items,
    totalPrice,
    removeItem,
    updateQuantity,
    totalItems,
    isOpen,
    toggleCart,
    closeCart,
  } = useCart();

  return (
    <>
      <button
        id="cart-toggle"
        onClick={toggleCart}
        aria-expanded={isOpen}
        aria-controls="cart-panel"
        aria-label="Abrir carrinho"
        className="relative inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white transition hover:bg-zinc-50 border border-zinc-200"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8m10 0l2 8m-12-8h16M9 21h6"
          />
        </svg>
        <span className="text-sm font-medium text-zinc-700">Carrinho</span>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </button>

      <div
        className={`fixed inset-0 z-40 bg-black/50 md:hidden transition-opacity ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        role="presentation"
      />

      <div
        className={`fixed right-0 top-0 z-40 h-screen w-full bg-white overflow-y-auto transition-transform md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        id="cart-panel"
      >
        <div className="flex justify-between items-center p-4 border-b border-zinc-200">
          <h2 className="text-lg font-bold">Carrinho</h2>
          <button
            onClick={closeCart}
            aria-label="Fechar carrinho"
            className="inline-flex h-9 w-9 items-center justify-center bg-white text-zinc-700 transition hover:bg-zinc-50 rounded"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 6l12 12M18 6l-12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-4">
          {items.length === 0 ? (
            <p className="text-base text-zinc-600">Seu carrinho está vazio</p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 border border-zinc-200 rounded-lg"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{item.name}</h3>
                    <p className="text-xs text-zinc-600 mb-2">
                      R$ {item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="inline-flex h-6 w-6 items-center justify-center text-xs border border-zinc-300 rounded hover:bg-zinc-50"
                      >
                        -
                      </button>
                      <span className="text-xs font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="inline-flex h-6 w-6 items-center justify-center text-xs border border-zinc-300 rounded hover:bg-zinc-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-zinc-400 hover:text-red-500 transition"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 6l12 12M18 6l-12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}

              <div className="border-t border-zinc-200 pt-4 space-y-2 mt-4">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Total:</span>
                  {totalPrice > 0 ? (
                    <span className="font-bold text-blue-600">
                      R$ {totalPrice.toFixed(2)}
                    </span>
                  ) : (
                    <span className="text-green-500 font-bold">É gratis (Por enquanto!)</span>
                  )}
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition" onClick={handleSendMessage}>
                  Finalizar Compra
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
