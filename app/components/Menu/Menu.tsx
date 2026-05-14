"use client";

import { CartButton } from "../Cart/CartButton";
import { MenuToggle } from "./ToggleMenu";

export function Menu() {
  const menuMock = [
    {
      name: "Inicio",
      href: "#hero",
    },
    {
      name: "Competências",
      href: "#showcase",
    },
    {
      name: "Projetos",
      href: "#projects",
    },
    {
      name: "Experiencia",
      href: "#experiences",
    },
    {
      name: "Contato",
      href: "#network",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="bg-zinc-950 px-4 py-2 text-center text-xs font-medium text-white">
        Portfólio profissional de Paulo Vieira: experiência, competências e cases
      </div>

      <nav aria-label="Navegação principal" className="px-4">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3 md:grid-cols-[220px_minmax(320px,1fr)_auto] lg:grid-cols-[260px_minmax(420px,1fr)_220px]">
          <a href="#hero" className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-blue-600 text-sm font-black text-white">
              PV
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-base font-black text-zinc-950">
                Paulo Vieira
              </span>
              <span className="hidden truncate text-xs font-medium text-zinc-500 sm:block">
                Desenvolvedor Full Stack
              </span>
            </span>
          </a>

          <label className="order-3 col-span-2 flex w-full items-center rounded border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-500 shadow-sm transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 md:order-none md:col-span-1">
            <svg
              className="mr-2 h-4 w-4 shrink-0 text-zinc-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                d="m21 21-4.3-4.3M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            <input
              type="search"
              placeholder="Busque por competências, experiências, projetos ou tecnologias"
              className="min-w-0 flex-1 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-500"
            />
          </label>

          <div className="flex justify-end">
            <CartButton />
            <div className="ml-2 md:hidden">
              <MenuToggle items={menuMock} />
            </div>
          </div>
        </div>

        <div className="mx-auto hidden max-w-7xl grid-cols-[220px_minmax(320px,1fr)_auto] items-center gap-3 border-t border-zinc-100 py-2 md:grid lg:grid-cols-[260px_minmax(420px,1fr)_220px]">
          <div className="text-xs font-semibold text-zinc-500">
            Seções do currículo
          </div>
          <ul className="flex items-center gap-6">
            {menuMock.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-sm font-semibold text-zinc-700 transition hover:text-blue-600"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#network"
            className="justify-self-end text-sm font-bold text-blue-700 transition hover:text-blue-800"
          >
            Contato profissional
          </a>
        </div>
      </nav>
    </header>
  );
}
