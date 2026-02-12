"use client";

import { useState } from "react";
import { MenuProps } from "@/app/types/menuTypes";

export function MenuToggle(props: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        id="menu-list"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="menu-list"
        aria-label="Abrir menu"
        className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl  bg-white trasition hover:bg-zinc-50"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <ul
        className={`absolute min-h-[93dvh] w-full left-0 mt-2 overflow-hidden border border-zinc-200 bg-white shadow-lg  transition-all px-2 pb-4 ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"}`}
        aria-label="Menu"
        id="menu-list"
      >
        <li className="flex justify-end px-2 pt-2">
              <button
               onClick={()=>setIsOpen(false)}
               aria-label="Fechar menu "
               className="inline-flex h-9 h-9 items-center justify-center  bg-white text-zinc-700  transition hover:bg-zinc-50 focus:outline-none "
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12M18 6l-12 12" />
             </svg>
           </button>
        </li>
        {props.items.map((item) => (
          <li key={item.name} className="px-4 py-3 hover:bg-zinc-50" onClick={()=>setIsOpen(false)}>
            <a
              href={item.href}
              className="text-sm font-medium text-zinc-700 hover:text-zinc-900"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
