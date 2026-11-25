import type { CartItem } from '../types';
import { getSubtotal, getTotals, getTotalUnits } from '../utils/cart';
import { formatCep, sanitizeCep } from '../utils/cep';
import { DELIVERY_FEE_IN_CENTS, formatCurrency } from '../utils/money';
import { buildOrder, loadOrder, saveOrder } from '../utils/order';
import { CART_STORAGE_KEY, loadCart, saveCart } from '../utils/cartStorage';

const items: CartItem[] = [
  { coffeeId: 'a', name: 'A', priceInCents: 990, image: '', quantity: 2 },
  { coffeeId: 'b', name: 'B', priceInCents: 1490, image: '', quantity: 3 },
];
const address = { cep: '01001-000', street: 'Praça da Sé', number: '10', neighborhood: 'Sé', city: 'São Paulo', state: 'SP' };

describe('cálculos do carrinho', () => {
  it('contador soma unidades, não tipos (RF-04)', () => expect(getTotalUnits(items)).toBe(5));
  it('subtotal em centavos', () => expect(getSubtotal(items)).toBe(990 * 2 + 1490 * 3));
  it('total = subtotal + entrega (RN-03)', () => {
    const t = getTotals(items);
    expect(t.deliveryFeeInCents).toBe(DELIVERY_FEE_IN_CENTS);
    expect(t.totalInCents).toBe(t.subtotalInCents + DELIVERY_FEE_IN_CENTS);
  });
  it('carrinho vazio não cobra entrega', () => expect(getTotals([]).totalInCents).toBe(0));
  it('evita erro de ponto flutuante (0,1 + 0,2)', () => {
    const t = getSubtotal([{ coffeeId: 'x', name: 'x', priceInCents: 10, image: '', quantity: 1 }, { coffeeId: 'y', name: 'y', priceInCents: 20, image: '', quantity: 1 }]);
    expect(t).toBe(30);
  });
});

describe('formatação', () => {
  it('formata BRL com duas casas', () => {
    expect(formatCurrency(990).replace(/\u00a0/g, ' ')).toBe('R$ 9,90');
    expect(formatCurrency(123456).replace(/\u00a0/g, ' ')).toBe('R$ 1.234,56');
  });
  it('máscara e limpeza de CEP', () => {
    expect(formatCep('01001000')).toBe('01001-000');
    expect(sanitizeCep('01001-000abc')).toBe('01001000');
  });
});

describe('persistência', () => {
  it('salva e recarrega o carrinho (RF-06)', () => {
    saveCart(items);
    expect(loadCart()).toEqual(items);
  });
  it('JSON inválido ou formato errado volta para carrinho vazio', () => {
    localStorage.setItem(CART_STORAGE_KEY, '{quebrado');
    expect(loadCart()).toEqual([]);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([{ coffeeId: 1 }]));
    expect(loadCart()).toEqual([]);
  });
  it('pedido é um snapshot independente dos itens do carrinho (RN-06)', () => {
    const order = buildOrder(items, address, 'credit');
    items[0].quantity = 99; // mexer no "carrinho" depois não altera o pedido
    expect(order.items[0].quantity).toBe(2);
    items[0].quantity = 2;
    saveOrder(order);
    expect(loadOrder()?.paymentMethod).toBe('credit');
  });
  it('sem pedido salvo, loadOrder retorna null (RN-09)', () => expect(loadOrder()).toBeNull());
});
