import type { CartItem, DeliveryAddress, Order, PaymentMethod } from '../types';
import { getTotals } from './cart';
import { readJSON, writeJSON } from './storage';

export const ORDER_STORAGE_KEY = 'coffee-delivery:last-order';

// Snapshot independente: copia os itens, então limpar o carrinho não afeta o pedido (RN-06).
export function buildOrder(items: CartItem[], address: DeliveryAddress, paymentMethod: PaymentMethod): Order {
  return {
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
    items: items.map((item) => ({ ...item })),
    address: { ...address },
    paymentMethod,
    ...getTotals(items),
  };
}

export function saveOrder(order: Order): void {
  writeJSON(ORDER_STORAGE_KEY, order);
}

function isOrder(value: unknown): value is Order {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === 'string' &&
    Array.isArray(v.items) &&
    v.items.length > 0 &&
    typeof v.address === 'object' &&
    v.address !== null &&
    (v.paymentMethod === 'credit' || v.paymentMethod === 'debit' || v.paymentMethod === 'cash') &&
    typeof v.totalInCents === 'number'
  );
}

export function loadOrder(): Order | null {
  const stored = readJSON(ORDER_STORAGE_KEY);
  return isOrder(stored) ? stored : null;
}
