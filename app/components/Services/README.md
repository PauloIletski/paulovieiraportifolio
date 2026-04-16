# ProductShowcase Component

Componente de vitrine de serviços/produtos para o portfólio, baseado no mockup HTML fornecido.

## Estrutura

### `ProductShowcase.tsx`
Componente principal que exibe:
- Grid responsivo de cards de produtos (1 col mobile → 3 col desktop)
- Ícones SVG para cada tipo de serviço
- Preço formatado em BRL
- Botão para adicionar/remover do carrinho
- Status visual quando produto está no carrinho

### `products.ts`
Define constantes:
- `PRODUCTS`: Array com 5 serviços (Front-end, Back-end, E-commerce, Banco de Dados, DevOps)
- `SVG_ICONS`: Ícones SVG para cada serviço
- `Product`: Tipo que estende CartItem com techs e icon

## Features

✓ Integração com hook `useCart` existente
✓ Estilo responsivo com Tailwind CSS
✓ Transições suaves ao adicionar/remover itens
✓ Sistema de cores: zinc (neutro), blue (seleção), green (confirmação)
✓ Sem dependências externas de CSS
✓ Zero compromissos com Lighthouse

## Uso

```tsx
import { ProductShowcase } from "./components/Services/ProductShowcase";

export default function Home() {
  return (
    <main>
      <ProductShowcase />
    </main>
  );
}
```

## Dados

Os produtos são definidos em `products.ts` e podem ser facilmente editar:

```typescript
export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Pacote Front-end",
    techs: "React · Next.js · TypeScript",
    price: 3000,
    icon: "frontend",
  },
  // ... mais produtos
];
```

## Customização

Para adicionar novos ícones:

1. Adicione uma nova chave ao tipo icon em `Product`
2. Adicione o SVG correspondente em `SVG_ICONS`
3. Utilize em novos produtos

```typescript
export type Product = Omit<CartItem, "quantity"> & {
  techs: string;
  icon: "frontend" | "backend" | "ecommerce" | "database" | "devops" | "novo";
  //                                                                     ^
};

export const SVG_ICONS: Record<Product["icon"], string> = {
  // ...
  novo: '<svg>...</svg>',
};
```
