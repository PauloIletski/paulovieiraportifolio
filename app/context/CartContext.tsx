'use client';

import  { createContext, useContext  } from 'react';
import type { UseCartReturn } from '@/app/types/cartTypes';

export const CartContext = createContext<UseCartReturn | undefined>(undefined);

export function useCart(): UseCartReturn {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider');
  }
  return context;
}
