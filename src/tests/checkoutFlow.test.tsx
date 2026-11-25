import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { App } from '../App';
import { AppProviders } from '../AppProviders';
import { CART_STORAGE_KEY } from '../utils/cartStorage';

function renderApp(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppProviders>
        <App />
      </AppProviders>
    </MemoryRouter>,
  );
}

function stubViaCep() {
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({ logradouro: 'Praça da Sé', bairro: 'Sé', localidade: 'São Paulo', uf: 'SP' }),
      }),
    ),
  );
}

describe('fluxo de compra', () => {
  it('Home → carrinho → checkout → sucesso, limpando o carrinho', async () => {
    stubViaCep();
    const user = userEvent.setup();
    renderApp();

    // adiciona 2 unidades do primeiro café e 1 do segundo
    await user.click(screen.getByRole('button', { name: 'Aumentar quantidade de Expresso Tradicional' }));
    await user.click(screen.getByRole('button', { name: /adicionar 2 expresso tradicional/i }));
    await user.click(screen.getByRole('button', { name: /adicionar 1 expresso americano/i }));

    // contador do Header soma unidades
    const cartLink = screen.getByRole('link', { name: /carrinho, 3 unidades/i });
    await user.click(cartLink);

    // totais: 2×9,90 + 1×9,90 = 29,70 + 3,50 de entrega
    const norm = (s: string | null) => (s ?? '').replace(/\u00a0/g, ' ');
    expect(norm(screen.getByText('R$ 29,70').textContent)).toBe('R$ 29,70');
    expect(norm(screen.getByText('R$ 33,20').textContent)).toBe('R$ 33,20');

    // endereço via CEP
    await user.type(screen.getByLabelText('CEP'), '01001000');
    await waitFor(() => expect(screen.getByLabelText('Rua')).toHaveValue('Praça da Sé'));
    expect(screen.getByLabelText('Cidade')).toHaveValue('São Paulo');
    expect(screen.getByLabelText('UF')).toHaveValue('SP');
    await user.type(screen.getByLabelText('Número'), '10');
    await user.click(screen.getByLabelText('Cartão de crédito'));

    await user.click(screen.getByRole('button', { name: /confirmar pedido/i }));

    expect(await screen.findByRole('heading', { name: /pedido confirmado/i })).toBeInTheDocument();
    expect(screen.getByText(/Praça da Sé, 10/)).toBeInTheDocument();
    const successSection = screen.getByRole('region', { name: /pedido confirmado/i });
    expect(within(successSection).getByText('Cartão de crédito')).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(CART_STORAGE_KEY) ?? '[]')).toEqual([]);
  });

  it('não confirma com formulário inválido e mostra erros', async () => {
    const user = userEvent.setup();
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([{ coffeeId: 'latte', name: 'Latte', priceInCents: 1490, image: '/coffees/latte.svg', quantity: 1 }]),
    );
    renderApp('/checkout');
    await user.click(screen.getByRole('button', { name: /confirmar pedido/i }));
    expect(await screen.findByText('Informe um CEP válido (00000-000)')).toBeInTheDocument();
    expect(screen.getByText('Escolha uma forma de pagamento')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /pedido confirmado/i })).not.toBeInTheDocument();
  });

  it('checkout com carrinho vazio mostra estado vazio', () => {
    renderApp('/checkout');
    expect(screen.getByRole('heading', { name: /carrinho está vazio/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /confirmar pedido/i })).not.toBeInTheDocument();
  });

  it('/success sem pedido mostra mensagem de estado vazio', () => {
    renderApp('/success');
    expect(screen.getByRole('heading', { name: /nenhum pedido encontrado/i })).toBeInTheDocument();
  });
  it('rota inexistente mostra página 404 com link para a Home', () => {
    renderApp('/rota-que-nao-existe');
    expect(screen.getByRole('heading', { name: /página não encontrada/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ver cafés/i })).toHaveAttribute('href', '/');
  });

  it('carrinho persistido reaparece ao recarregar (RF-06)', () => {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([{ coffeeId: 'latte', name: 'Latte', priceInCents: 1490, image: '/coffees/latte.svg', quantity: 4 }]),
    );
    renderApp();
    expect(screen.getByRole('link', { name: /carrinho, 4 unidades/i })).toBeInTheDocument();
  });

  it('alterna o tema e persiste a escolha (RF-14)', async () => {
    const user = userEvent.setup();
    renderApp();
    const toggle = screen.getByRole('button', { name: /modo escuro/i });
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(localStorage.getItem('coffee-delivery:theme')).toBe('"dark"');
    expect(document.documentElement.dataset.theme).toBe('dark');
  });
});
