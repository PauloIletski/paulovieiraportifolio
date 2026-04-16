# ProductShowcase - Integração com Carrinho

## 📋 Fluxo de Integração

### Como funciona a adição ao carrinho:

1. **Usuário clica em "+ Adicionar"** no card do serviço
2. **`handleToggleProduct()` é chamado** com os dados do produto
3. **`addItem()` do hook useCart** é acionado com:
   - `product` (tipo: Omit<CartItem, "quantity">) - sem quantity
   - `quantity: 1` - quantidade padrão
4. **Hook useCart**:
   - Verifica se produto já existe no carrinho
   - Se existe: incrementa a quantidade
   - Se não existe: adiciona novo item
   - Salva no localStorage automaticamente
5. **Estado local `items` é atualizado** e o componente re-renderiza
6. **Verificação `isProductInCart()`** retorna true
7. **Botão muda para "✓ No carrinho"** (cor green)

### Sincronização em tempo real

O carrinho está **sincronizado automaticamente** com:
- ✅ Dados persistidos no localStorage
- ✅ Componente ProductShowcase (visualização)
- ✅ Componente Cart (listagem)
- ✅ Componente CartButton (badge com contagem)

## 🔄 Estado Local vs Cart Global

### ❌ ANTES (com estado redundante)
```typescript
const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
// Problema: desincronizado do carrinho real
// Problema: perdido ao recarregar página
```

### ✅ DEPOIS (sincronizado)
```typescript
const { items, addItem, removeItem } = useCart();
// Vantagem: sempre sincronizado com carrinho real
// Vantagem: persistido no localStorage
// Vantagem: fonte única da verdade
```

## 📊 Fluxo de Dados

```
ProductShowcase (renderiza cards)
       ↓
    handleToggleProduct()
       ↓
    useCart.addItem() / removeItem()
       ↓
    localStorage (persistência)
       ↓
    items atualiza → re-render
       ↓
    Botão muda de estado
    Info section atualiza
    Cart também vê os novos items
```

## 🎯 Tipos Utilizados

### Product (em products.ts)
```typescript
type Product = Omit<CartItem, "quantity"> & {
  techs: string;
  icon: IconType;
};
```

### CartItem (em cartTypes.ts)
```typescript
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
};
```

Quando `addItem(product, 1)` é chamado:
- `product` (Product) é passado como Omit<CartItem, "quantity">
- Hook adiciona `quantity: 1`
- Resultado final é um CartItem completo

## ✨ Benefícios da Integração

1. **Single Source of Truth**: items vem apenas do hook useCart
2. **Persistência**: dados salvos no localStorage automaticamente
3. **Sincronização**: todos os componentes veem o mesmo carrinho
4. **Sem duplicação**: não há estado redundante
5. **Reatividade**: mudanças no carrinho refletem instantaneamente
6. **Escalabilidade**: fácil adicionar novos componentes que usem o carrinho

## 🧪 Como Testar

1. Abra a página no navegador
2. Clique em "+ Adicionar" em um produto
   - Botão muda para "✓ No carrinho"
   - Info section aparece com contagem
3. Abra o carrinho (Cart component)
   - Item aparece listado com quantidade
   - Preço total está correto
4. Recarregue a página (F5)
   - Itens persistem no carrinho
   - Botões continuam marcados como "No carrinho"
5. Remova um item
   - Desaparece do carrinho e da listagem
   - Botão volta para "+ Adicionar"

## 🐛 Troubleshooting

Se os items não aparecerem no carrinho:
1. Verificar se useCart está retornando items corretamente
2. Verificar localStorage no DevTools (Application > Local Storage)
3. Verificar console para erros
4. Verificar se hook está chamando setItems()

Se o botão não atualiza:
1. Verificar se isProductInCart() está comparando IDs corretamente
2. Verificar se product.id matches item.id no carrinho
