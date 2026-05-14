"use client";

import { useState } from "react";
import { useCart } from "@/app/hooks/useCart";
import GeneralOpenCart from "../Cart/GeneralOpenCart";
import { PRODUCTS, SVG_ICONS } from "./products";

const categoryTags = ["Todos", "Front-end", "Back-end", "E-commerce", "Dados", "Deploy"];

function getProductCategory(product: (typeof PRODUCTS)[0]) {
  if (product.icon === "database") return "Dados";
  if (product.icon === "devops") return "Deploy";
  if (product.icon === "ecommerce") return "E-commerce";
  if (product.icon === "backend") return "Back-end";
  if (product.icon === "frontend") return "Front-end";
  return "Todos";
}

export function ProductShowcase() {
  const { items, addItem, removeItem } = useCart();
  const [activeCategory, setActiveCategory] = useState("Todos");
  const visibleProducts =
    activeCategory === "Todos"
      ? PRODUCTS
      : PRODUCTS.filter((product) => getProductCategory(product) === activeCategory);

  const isProductInCart = (productId: string) => {
    return items.some((item) => item.id === productId);
  };

  const handleToggleProduct = (product: (typeof PRODUCTS)[0]) => {
    if (isProductInCart(product.id)) {
      removeItem(product.id);
      return;
    }

    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        available: product.available,
      },
      1,
    );
  };

  return (
    <section id="showcase" className="bg-white px-4 py-14 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Competências profissionais
            </p>
            <h2 className="mt-2 text-3xl font-black text-zinc-950 md:text-5xl">
              Áreas de atuação
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
              Selecione os temas do meu currículo que mais conversam com a
              vaga, projeto ou oportunidade. A seleção ajuda a iniciar um
              contato mais objetivo pelo WhatsApp.
            </p>
          </div>

          <div className="rounded border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-bold text-zinc-700">
            {items.length} competência{items.length !== 1 ? "s" : ""} selecionada
            {items.length !== 1 ? "s" : ""}
          </div>
        </div>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-1">
          {categoryTags.map((tag) => (
            <button
              key={tag}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition ${
                activeCategory === tag
                  ? "border-zinc-950 bg-zinc-950 text-white"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-blue-300 hover:text-blue-700"
              }`}
              type="button"
              onClick={() => setActiveCategory(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product) => {
            const inCart = isProductInCart(product.id);

            return (
              <article
                key={product.id}
                className={`flex min-h-[310px] flex-col rounded-lg border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
                  inCart ? "border-blue-500 ring-2 ring-blue-100" : "border-zinc-200"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-blue-50 text-blue-700">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: SVG_ICONS[product.icon],
                      }}
                    />
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      product.available
                        ? "bg-green-100 text-green-700"
                        : "bg-zinc-100 text-zinc-500"
                    }`}
                  >
                    {product.available ? "Disponível" : "Indisponível"}
                  </span>
                </div>

                <div className="mt-5 flex-1">
                  <h3 className="text-xl font-black text-zinc-950">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    {product.techs}
                  </p>
                </div>

                <div className="mt-5 border-t border-zinc-100 pt-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                    Disponibilidade
                  </p>
                  <div className="mt-1 flex items-end justify-between gap-3">
                    {product.price > 0 ? (
                      <p className="text-2xl font-black text-zinc-950">
                        R$ {product.price.toLocaleString("pt-BR")}
                      </p>
                    ) : (
                      <p className="text-2xl font-black text-zinc-950">
                        Em currículo
                      </p>
                    )}
                    <button
                      onClick={() => handleToggleProduct(product)}
                      disabled={!product.available}
                      className={`rounded px-4 py-3 text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-50 ${
                        inCart
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-zinc-950 text-white hover:bg-blue-700"
                      }`}
                    >
                      {inCart ? "Selecionado" : "Selecionar"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {items.length > 0 && (
          <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-black text-blue-950">
                  Sua seleção está pronta para virar pauta de conversa.
                </p>
                <p className="mt-1 text-sm text-blue-900">
                  Revise os tópicos e envie uma mensagem de contato profissional.
                </p>
              </div>
              <GeneralOpenCart />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
