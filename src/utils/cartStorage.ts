import type { CartItem } from '../types';
import { readJSON, writeJSON } from './storage';

export const CART_STORAGE_KEY = 'coffee-delivery:cart';

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.coffeeId === 'string' &&
    typeof v.name === 'string' &&
    typeof v.image === 'string' &&
    typeof v.priceInCents === 'number' &&
    Number.isInteger(v.quantity) &&
    (v.quantity as number) >= 1
  );
}

export function loadCart(): CartItem[] {
  const stored = readJSON(CART_STORAGE_KEY);
  return Array.isArray(stored) && stored.every(isCartItem) ? stored : [];
}

export function saveCart(items: CartItem[]): void {
  writeJSON(CART_STORAGE_KEY, items);
}
