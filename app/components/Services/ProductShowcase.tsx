"use client";

import { useCart } from "@/app/hooks/useCart";
import { PRODUCTS, SVG_ICONS } from "./products";
import GeneralOpenCart from "../Cart/GeneralOpenCart";

export function ProductShowcase() {
  const { items, addItem, removeItem } = useCart();

  const isProductInCart = (productId: string) => {
    return items.some((item) => item.id === productId);
  };

  const handleToggleProduct = (product: (typeof PRODUCTS)[0]) => {
    if (isProductInCart(product.id)) {
      removeItem(product.id);
    } else {
      // Extract only CartItem properties (remove techs and icon)
      const { techs, icon, ...cartItem } = product;
      addItem(cartItem, 1);
    }
  };

  return (
    <section id="showcase" className="w-full py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-between mb-8">
          <div>
            <h2 className=" text-center text-3xl font-bold text-zinc-900 mb-2">
             Vamos conversar! 
            </h2>
            <p className="text-center text-base text-zinc-600">
              Escolha os assuntos que gostaria de trocar uma idéia
            </p>
          </div>
          <span className="text-sm font-medium text-zinc-500">
            {items.length} assuntos selecionados
          </span>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => {
            const inCart = isProductInCart(product.id);

            return (
              <div
                key={product.id}
                className={`flex flex-col gap-4 p-6 rounded-lg border transition-all duration-200 ${
                  inCart
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-zinc-200 bg-white hover:shadow-lg"
                }`}
              >
                {/* Icon */}
                <div className="text-zinc-600">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: SVG_ICONS[product.icon],
                    }}
                  />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-base font-semibold text-zinc-900 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-zinc-600 mb-3">{product.techs}</p>
                 {product.price>0 &&
                  <p className="text-lg font-bold text-zinc-900">
                    R$ {product.price.toLocaleString("pt-BR")}
                    <span className="text-sm font-normal text-zinc-600 ml-1">
                      / pacote
                    </span>
                  </p>
                  }
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleToggleProduct(product)}
                  disabled={!product.available}
                  className={`w-full py-2.5 disabled:opacity-50 disabled:cursor-not-allowed px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                    inCart
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-zinc-900 text-white hover:bg-zinc-800"
                  }`}
                >
                  {inCart ? "✓ No carrinho" : "+ Adicionar"}
                  {!product.available && " (Indisponível)"}
                </button>
              </div>
            );
          })}
        </div>
        {items.length > 0 && (
          <GeneralOpenCart/>
        )}
        {/* Info */}
        {items.length > 0 && (
          <div className="mt-8 p-4 rounded-lg bg-blue-50 border border-blue-200">
            <p className="text-sm text-blue-900">
              {items.length} assunto
              {items.length !== 1 ? "s" : ""} adicionado
              {items.length !== 1 ? "s" : ""} ao carrinho
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
