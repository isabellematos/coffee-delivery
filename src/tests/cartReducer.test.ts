import { cartReducer, type CartState } from '../reducers/cartReducer';
import { coffees } from '../data/coffees';

const [expresso, latte] = coffees;
const empty: CartState = { items: [] };

describe('cartReducer', () => {
  it('adiciona um item novo', () => {
    const state = cartReducer(empty, { type: 'ADD_ITEM', coffee: expresso, quantity: 2 });
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toMatchObject({ coffeeId: expresso.id, quantity: 2, priceInCents: expresso.priceInCents });
  });

  it('acumula a quantidade do mesmo café sem duplicar a linha (RN-02)', () => {
    let state = cartReducer(empty, { type: 'ADD_ITEM', coffee: expresso, quantity: 2 });
    state = cartReducer(state, { type: 'ADD_ITEM', coffee: expresso, quantity: 3 });
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(5);
  });

  it('ignora quantidade zero, negativa ou decimal (RN-01)', () => {
    for (const quantity of [0, -1, 1.5]) {
      expect(cartReducer(empty, { type: 'ADD_ITEM', coffee: expresso, quantity })).toBe(empty);
    }
  });

  it('incrementa e decrementa, sem descer de 1', () => {
    let state = cartReducer(empty, { type: 'ADD_ITEM', coffee: expresso, quantity: 1 });
    state = cartReducer(state, { type: 'INCREMENT', coffeeId: expresso.id });
    expect(state.items[0].quantity).toBe(2);
    state = cartReducer(state, { type: 'DECREMENT', coffeeId: expresso.id });
    state = cartReducer(state, { type: 'DECREMENT', coffeeId: expresso.id });
    expect(state.items[0].quantity).toBe(1);
  });

  it('remove só o item pedido e limpa tudo', () => {
    let state = cartReducer(empty, { type: 'ADD_ITEM', coffee: expresso, quantity: 1 });
    state = cartReducer(state, { type: 'ADD_ITEM', coffee: latte, quantity: 1 });
    state = cartReducer(state, { type: 'REMOVE_ITEM', coffeeId: expresso.id });
    expect(state.items.map((i) => i.coffeeId)).toEqual([latte.id]);
    expect(cartReducer(state, { type: 'CLEAR' }).items).toEqual([]);
  });

  it('não muta o estado anterior (imutabilidade)', () => {
    const before: CartState = { items: [{ coffeeId: 'a', name: 'A', priceInCents: 100, image: '', quantity: 1 }] };
    const frozen = Object.freeze({ items: Object.freeze(before.items.map((i) => Object.freeze({ ...i }))) }) as CartState;
    expect(() => {
      cartReducer(frozen, { type: 'INCREMENT', coffeeId: 'a' });
      cartReducer(frozen, { type: 'REMOVE_ITEM', coffeeId: 'a' });
      cartReducer(frozen, { type: 'ADD_ITEM', coffee: expresso, quantity: 1 });
    }).not.toThrow();
    expect(frozen.items[0].quantity).toBe(1);
  });
});
