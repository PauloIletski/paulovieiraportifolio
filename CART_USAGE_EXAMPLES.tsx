// =============================================
// EXEMPLO DE USO: Hook useCart e Componente AddToCart
// =============================================

// 1. USANDO O HOOK useCart EM UM COMPONENTE
// =============================================

import { useCart } from "@/app/hooks/useCart";

export function ProductsExample() {
  const { items, totalItems, totalPrice, addItem, removeItem, updateQuantity, clearCart } = useCart();

  // Adicionar um produto ao carrinho
  const handleAddProduct = () => {
    addItem({
      id: "1",
      name: "Notebook Dell",
      price: 2499.99,
      image: "/products/notebook.jpg",
    }, 1); // quantidade = 1
  };

  return (
    <div>
      <h2>Produtos ({totalItems})</h2>
      <button onClick={handleAddProduct}>Adicionar Notebook</button>
      
      {/* Listar itens */}
      {items.map(item => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>R$ {item.price.toFixed(2)}</p>
          <p>Quantidade: {item.quantity}</p>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
          <button onClick={() => removeItem(item.id)}>Remover</button>
        </div>
      ))}
      
      <p>Total: R$ {totalPrice.toFixed(2)}</p>
      <button onClick={clearCart}>Limpar Carrinho</button>
    </div>
  );
}

// 2. USANDO O COMPONENTE AddToCart
// =============================================

import { AddToCart } from "@/app/components/Cart/AddToCart";

export function ProductCard() {
  const product = {
    id: "2",
    name: "Mouse Gamer RGB",
    price: 149.99,
    image: "/products/mouse.jpg",
  };

  // Modo botão (padrão)
  return (
    <div>
      <h3>{product.name}</h3>
      <p>R$ {product.price.toFixed(2)}</p>
      <AddToCart 
        item={product}
        showLabel={true}
        variant="button"
      />
    </div>
  );
}

// 3. USANDO AddToCart COM VARIANT CARD
// =============================================

export function ProductCardVariant() {
  const product = {
    id: "3",
    name: "Teclado Mecânico",
    price: 385.50,
    image: "/products/keyboard.jpg",
  };

  return (
    <AddToCart 
      item={product}
      showLabel={true}
      variant="card" // Usa layout de card com informações
    />
  );
}

// 4. ESTRUTURA DOS TIPOS
// =============================================

/*
CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
}

UseCartReturn {
  items: CartItem[];
  totalItems: number; // Soma de todas as quantidades
  totalPrice: number; // Preço total do carrinho
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isLoading: boolean;
}
*/

// 5. LOCALIZAÇÃO DOS ARQUIVOS
// =============================================

/*
Hook:
- /app/hooks/useCart.ts

Componente AddToCart:
- /app/components/Cart/AddToCart.tsx

Tipos:
- /app/types/cartTypes.ts

Componentes existentes:
- /app/components/Cart/Cart.tsx (Painel desktop)
- /app/components/Cart/CartButton.tsx (Botão + Painel mobile)
- /app/components/Menu/Menu.tsx (Menu com integração do carrinho)
*/

// 6. DADOS PERSISTEM EM localStorage
// =============================================

/*
Chave: "paulo-cart"
Exemplo de dados armazenados:
{
  "items": [
    {
      "id": "1",
      "name": "Notebook Dell",
      "price": 2499.99,
      "quantity": 1,
      "image": "/products/notebook.jpg"
    }
  ]
}
*/

// 7. USO COM PRODUTOS REAIS (EXEMPLO COMPLETO)
// =============================================

export function FullProductExample() {
  const { addItem } = useCart();

  const products = [
    {
      id: "1",
      name: "Notebook Dell",
      price: 2499.99,
      image: "/assets/product1.jpg",
    },
    {
      id: "2", 
      name: "Mouse Gamer",
      price: 149.99,
      image: "/assets/product2.jpg",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {products.map(product => (
        <div key={product.id} className="border rounded-lg p-4">
          <h3 className="font-bold">{product.name}</h3>
          <p className="text-lg font-semibold text-blue-600">
            R$ {product.price.toFixed(2)}
          </p>
          <AddToCart
            item={product}
            showLabel={true}
            variant="card"
          />
        </div>
      ))}
    </div>
  );
}
