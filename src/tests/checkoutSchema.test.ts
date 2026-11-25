import { checkoutSchema } from '../schemas/checkoutSchema';

const valid = {
  cep: '01001-000',
  street: 'Praça da Sé',
  number: '10',
  complement: '',
  neighborhood: 'Sé',
  city: 'São Paulo',
  state: 'SP',
  paymentMethod: 'credit',
};

describe('checkoutSchema', () => {
  it('aceita dados válidos, com complemento opcional', () => {
    expect(checkoutSchema.safeParse(valid).success).toBe(true);
    const { complement: _complement, ...semComplemento } = valid;
    expect(checkoutSchema.safeParse(semComplemento).success).toBe(true);
  });
  it('rejeita CEP inválido', () => {
    for (const cep of ['', '123', '0100-1000', 'abcde-fgh']) {
      expect(checkoutSchema.safeParse({ ...valid, cep }).success).toBe(false);
    }
  });
  it('exige rua, número, bairro, cidade e UF', () => {
    for (const field of ['street', 'number', 'neighborhood', 'city', 'state']) {
      expect(checkoutSchema.safeParse({ ...valid, [field]: '' }).success).toBe(false);
    }
    expect(checkoutSchema.safeParse({ ...valid, state: 'SPP' }).success).toBe(false);
  });
  it('exige forma de pagamento válida', () => {
    expect(checkoutSchema.safeParse({ ...valid, paymentMethod: undefined }).success).toBe(false);
    expect(checkoutSchema.safeParse({ ...valid, paymentMethod: 'pix' }).success).toBe(false);
  });
});
