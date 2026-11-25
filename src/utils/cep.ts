import type { DeliveryAddress } from '../types';

export function sanitizeCep(value: string): string {
  return value.replace(/\D/g, '').slice(0, 8);
}

export function formatCep(value: string): string {
  const digits = sanitizeCep(value);
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
}

interface ViaCepResponse {
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  erro?: boolean | string;
}

export type CepAddress = Pick<DeliveryAddress, 'street' | 'neighborhood' | 'city' | 'state'>;
export type CepLookupResult = { found: true; address: CepAddress } | { found: false };

// Lança erro em falha de rede/HTTP; devolve { found: false } quando o CEP não existe.
export async function fetchCep(cep: string, signal?: AbortSignal): Promise<CepLookupResult> {
  const response = await fetch(`https://viacep.com.br/ws/${sanitizeCep(cep)}/json/`, { signal });
  if (!response.ok) throw new Error(`Falha na consulta de CEP (${response.status})`);
  const data = (await response.json()) as ViaCepResponse;
  if (data.erro) return { found: false };
  return {
    found: true,
    address: {
      street: data.logradouro ?? '',
      neighborhood: data.bairro ?? '',
      city: data.localidade ?? '',
      state: data.uf ?? '',
    },
  };
}
