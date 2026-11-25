import type { CartItem, Coffee } from '../types';

export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | { type: 'ADD_ITEM'; coffee: Coffee; quantity: number }
  | { type: 'INCREMENT'; coffeeId: string }
  | { type: 'DECREMENT'; coffeeId: string }
  | { type: 'REMOVE_ITEM'; coffeeId: string }
  | { type: 'CLEAR' };

// Todas as ações retornam novos objetos/arrays: o estado anterior nunca é alterado.
export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { coffee, quantity } = action;
      if (!Number.isInteger(quantity) || quantity < 1) return state; // RN-01
      const existing = state.items.find((item) => item.coffeeId === coffee.id);
      if (existing) {
        // RN-02: mesma linha, quantidade somada
        return {
          items: state.items.map((item) =>
            item.coffeeId === coffee.id ? { ...item, quantity: item.quantity + quantity } : item,
          ),
        };
      }
      const newItem: CartItem = {
        coffeeId: coffee.id,
        name: coffee.name,
        priceInCents: coffee.priceInCents,
        image: coffee.image,
        quantity,
      };
      return { items: [...state.items, newItem] };
    }
    case 'INCREMENT':
      return {
        items: state.items.map((item) =>
          item.coffeeId === action.coffeeId ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      };
    case 'DECREMENT':
      // Regra escolhida: não desce de 1. Para remover, usa REMOVE_ITEM.
      return {
        items: state.items.map((item) =>
          item.coffeeId === action.coffeeId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      };
    case 'REMOVE_ITEM':
      return { items: state.items.filter((item) => item.coffeeId !== action.coffeeId) };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}
