import type { PaymentMethod } from '../types';

export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  credit: 'Cartão de crédito',
  debit: 'Cartão de débito',
  cash: 'Dinheiro',
};
