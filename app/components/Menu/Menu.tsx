'use client';

import { CartButton } from "../Cart/CartButton";
import { MenuToggle } from "./ToggleMenu";

export function Menu() {
  const menuMock = [
    {
      name: "Hello World",
      href: "/",
      type: "internal",
      format: "link",
    },
    {
      name: "Contato",
      href: "#showcase",
    },
    {
      name: "Projetos",
      href: "#projects",
    },
    {
      name: "HistÃ³rico Profissional",
      href: "#experiences",
    },
    {
      name: "Redes Sociais",
      href: "#network",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full shadow-sm border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="text-lg font-semibold">Paulo Vieira</div>
        <div className="flex items-center gap-4">
          <ul className="hidden gap-6 md:flex">
            {menuMock.map((item) => (
              <li key={item.name}>
                <a href={item.href} className="text-sm font-medium text-zinc-700 hover:text-zinc-900">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <CartButton />
          <div className="md:hidden">
            <MenuToggle items={menuMock} />
          </div>
        </div>
      </div>
    </nav>
  );
}
