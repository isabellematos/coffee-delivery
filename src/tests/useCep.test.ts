import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useCep } from '../hooks/useCep';
import { fetchCep } from '../utils/cep';

function mockFetch(response: Partial<Response> | Error) {
  vi.stubGlobal('fetch', vi.fn(() => (response instanceof Error ? Promise.reject(response) : Promise.resolve(response))));
}

describe('fetchCep', () => {
  it('devolve o endereço quando o CEP existe', async () => {
    mockFetch({ ok: true, json: async () => ({ logradouro: 'Praça da Sé', bairro: 'Sé', localidade: 'São Paulo', uf: 'SP' }) });
    await expect(fetchCep('01001-000')).resolves.toEqual({
      found: true,
      address: { street: 'Praça da Sé', neighborhood: 'Sé', city: 'São Paulo', state: 'SP' },
    });
  });
  it('devolve found:false quando a API responde erro:true', async () => {
    mockFetch({ ok: true, json: async () => ({ erro: true }) });
    await expect(fetchCep('99999999')).resolves.toEqual({ found: false });
  });
  it('lança erro em falha HTTP', async () => {
    mockFetch({ ok: false, status: 500 });
    await expect(fetchCep('01001000')).rejects.toThrow();
  });
});

describe('useCep', () => {
  it('passa por loading e termina em success', async () => {
    mockFetch({ ok: true, json: async () => ({ logradouro: 'R', bairro: 'B', localidade: 'C', uf: 'SP' }) });
    const { result } = renderHook(() => useCep());
    let address: unknown;
    await act(async () => {
      address = await result.current.lookup('01001000');
    });
    expect(result.current.status).toBe('success');
    expect(address).toMatchObject({ street: 'R' });
  });
  it('status notFound para CEP inexistente', async () => {
    mockFetch({ ok: true, json: async () => ({ erro: true }) });
    const { result } = renderHook(() => useCep());
    await act(async () => {
      await result.current.lookup('99999999');
    });
    expect(result.current.status).toBe('notFound');
  });
  it('status error quando a API está fora do ar', async () => {
    mockFetch(new Error('offline'));
    const { result } = renderHook(() => useCep());
    await act(async () => {
      await result.current.lookup('01001000');
    });
    expect(result.current.status).toBe('error');
  });
});
