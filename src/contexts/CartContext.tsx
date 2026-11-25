import { createContext, useCallback, useEffect, useMemo, useReducer, type ReactNode } from 'react';
import { cartReducer } from '../reducers/cartReducer';
import type { CartItem, Coffee } from '../types';
import { getSubtotal, getTotalUnits } from '../utils/cart';
import { loadCart, saveCart } from '../utils/cartStorage';

interface CartContextValue {
  items: CartItem[];
  totalUnits: number;
  subtotalInCents: number;
  addItem: (coffee: Coffee, quantity: number) => void;
  increment: (coffeeId: string) => void;
  decrement: (coffeeId: string) => void;
  removeItem: (coffeeId: string) => void;
  clear: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  // Inicialização preguiçosa: lê o localStorage só uma vez, na criação do estado.
  const [state, dispatch] = useReducer(cartReducer, undefined, () => ({ items: loadCart() }));

  useEffect(() => {
    saveCart(state.items);
  }, [state.items]);

  const addItem = useCallback((coffee: Coffee, quantity: number) => dispatch({ type: 'ADD_ITEM', coffee, quantity }), []);
  const increment = useCallback((coffeeId: string) => dispatch({ type: 'INCREMENT', coffeeId }), []);
  const decrement = useCallback((coffeeId: string) => dispatch({ type: 'DECREMENT', coffeeId }), []);
  const removeItem = useCallback((coffeeId: string) => dispatch({ type: 'REMOVE_ITEM', coffeeId }), []);
  const clear = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      totalUnits: getTotalUnits(state.items),
      subtotalInCents: getSubtotal(state.items),
      addItem,
      increment,
      decrement,
      removeItem,
      clear,
    }),
    [state.items, addItem, increment, decrement, removeItem, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
