import type { CartItem } from '../types';
import { DELIVERY_FEE_IN_CENTS } from './money';

export function getTotalUnits(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function getSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.priceInCents * item.quantity, 0);
}

export interface CartTotals {
  subtotalInCents: number;
  deliveryFeeInCents: number;
  totalInCents: number;
}

// Carrinho vazio não tem entrega, então a taxa é zero.
export function getTotals(items: CartItem[]): CartTotals {
  const subtotalInCents = getSubtotal(items);
  const deliveryFeeInCents = items.length > 0 ? DELIVERY_FEE_IN_CENTS : 0;
  return { subtotalInCents, deliveryFeeInCents, totalInCents: subtotalInCents + deliveryFeeInCents };
}
