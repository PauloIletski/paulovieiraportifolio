import type { CartItem } from "@/app/types/cartTypes";

export type Product = Omit<CartItem, "quantity"> & {
  techs: string;
  icon: "frontend" | "backend" | "ecommerce" | "database" | "devops" | "clticontrato";
};

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Front-end",
    techs: "React · Next.js · TypeScript",
    price: 0,
    icon: "frontend",
    available: true,
  },
  {
    id: "2",
    name: "Back-end",
    techs: "Node.js · Express · APIs REST",
    price: 0,
    icon: "backend",
    available: true,
  },
  {
    id: "3",
    name: "E-commerce VTEX",
    techs: "VTEX IO · Fast Store · Shopify",
    price: 0,
    icon: "ecommerce",
    available: true,
  },
  {
    id: "4",
    name: "Banco de Dados",
    techs: "MySQL · Supabase · SQLite",
    price: 0,
    icon: "database",
    available: true,
  },
  {
    id: "5",
    name: "DevOps & Deploy",
    techs: "Docker · Vercel · Git CI/CD",
    price: 0,
    icon: "devops",
    available: true,
  },
  {
    id:'6',
    name: "Contrato CLT",
    techs: "Propostas de emprego CLT",
    price: 0,
    icon: "clticontrato",
    available: false,
  }
];

export const SVG_ICONS: Record<Product["icon"], string> = {
  frontend:
    '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  backend:
    '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
  ecommerce:
    '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18"/><path d="M16 10a4 4 0 01-8 0"/></svg>',
  database:
    '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
  devops:
    '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>',
  clticontrato:
    '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 2L2 7h20L12 2z"/><path d="M2 7v13a2 2 0 002 2h16a2 2 0 002-2V7"/><path d="M16 10a4 4 0 01-8 0"/></svg>',
};
