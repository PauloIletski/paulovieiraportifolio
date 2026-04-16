"use client";

import { useCart } from "@/app/hooks/useCart";
import handleSendMessage from "@/app/utils/sendMessage";



export function Cart() {
  const { items, totalPrice, totalItems, removeItem, updateQuantity, isOpen, closeCart } = useCart();



  return (
    <>
      <section
        id="cart"
        className={`hidden md:flex fixed right-0 z-40 flex-col bg-white w-100 shadow-xl max-w-sm h-[calc(100vh-3rem)] overflow-y-auto p-6 transition-all duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Carrinho</h2>
          <button
            onClick={closeCart}
            aria-label="Fechar carrinho"
            className="inline-flex h-8 w-8 items-center justify-center text-zinc-500 transition hover:bg-zinc-100 rounded"
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

        {items.length === 0 ? (
          <p className="text-base text-zinc-600">Seu carrinho está vazio</p>
        ) : (
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex-1 space-y-3 overflow-y-auto">
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
                    <h3 className="font-semibold text-sm pb-5">{item.name}</h3>
                    {item.price > 0 ? (
                      <p className="text-xs text-zinc-600 mb-2">
                        R$ {item.price.toFixed(2)}
                      </p>
                    ) : null}

                    <div className="flex items-center gap-2">
                      <button
                        disabled={item.price === 0}
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="inline-flex disabled:opacity-50 h-6 w-6 items-center justify-center text-xs border border-zinc-300 rounded hover:bg-zinc-50"
                      >
                        -
                      </button>
                      <span className="text-xs font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        disabled={item.price === 0}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="inline-flex disabled:opacity-50 h-6 w-6 items-center justify-center text-xs border border-zinc-300 rounded hover:bg-zinc-50"
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
            </div>

            <div className="border-t border-zinc-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">Itens:</span>
                <span className="font-semibold">{totalItems}</span>
              </div>
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
              <button
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition mt-2"
                onClick={() => handleSendMessage(items)}
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
