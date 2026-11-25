import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchCep, type CepAddress } from '../utils/cep';

export type CepStatus = 'idle' | 'loading' | 'success' | 'notFound' | 'error';

export function useCep() {
  const [status, setStatus] = useState<CepStatus>('idle');
  const controllerRef = useRef<AbortController | null>(null);

  const lookup = useCallback(async (cep: string): Promise<CepAddress | null> => {
    controllerRef.current?.abort(); // cancela consulta anterior
    const controller = new AbortController();
    controllerRef.current = controller;
    setStatus('loading');
    try {
      const result = await fetchCep(cep, controller.signal);
      if (controller.signal.aborted) return null;
      setStatus(result.found ? 'success' : 'notFound');
      return result.found ? result.address : null;
    } catch {
      if (controller.signal.aborted) return null;
      setStatus('error');
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    controllerRef.current?.abort();
    setStatus('idle');
  }, []);

  useEffect(() => () => controllerRef.current?.abort(), []);

  return { status, lookup, reset };
}
