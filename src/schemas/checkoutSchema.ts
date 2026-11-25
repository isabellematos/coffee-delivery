import { z } from 'zod';

export const checkoutSchema = z.object({
  cep: z.string().trim().regex(/^\d{5}-?\d{3}$/, 'Informe um CEP válido (00000-000)'),
  street: z.string().trim().min(1, 'Informe a rua'),
  number: z.string().trim().min(1, 'Informe o número'),
  complement: z.string().trim().optional(),
  neighborhood: z.string().trim().min(1, 'Informe o bairro'),
  city: z.string().trim().min(1, 'Informe a cidade'),
  state: z
    .string()
    .trim()
    .regex(/^[A-Za-z]{2}$/, 'Informe a UF com 2 letras'),
  paymentMethod: z.enum(['credit', 'debit', 'cash'], {
    errorMap: () => ({ message: 'Escolha uma forma de pagamento' }),
  }),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
