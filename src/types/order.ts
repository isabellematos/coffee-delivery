import type { CartItem } from './cart';

export type PaymentMethod = 'credit' | 'debit' | 'cash';

export interface DeliveryAddress {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  address: DeliveryAddress;
  paymentMethod: PaymentMethod;
  subtotalInCents: number;
  deliveryFeeInCents: number;
  totalInCents: number;
}
