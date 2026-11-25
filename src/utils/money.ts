// Taxa de entrega fictícia (RN-03). Único lugar onde o valor é definido.
export const DELIVERY_FEE_IN_CENTS = 350;

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

// Valores são guardados em centavos (inteiros) para evitar erro de ponto flutuante (RN-04).
export function formatCurrency(cents: number): string {
  return brl.format(cents / 100);
}
