"use client";

import { usePathname } from "next/navigation";
import { Cart } from "./Cart/Cart";
import { Menu } from "./Menu/Menu";

export function LayoutClient() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <Menu />
      <Cart />
    </>
  );
}
