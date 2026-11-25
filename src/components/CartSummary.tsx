import styled from 'styled-components';
import { useCart } from '../hooks/useCart';
import { media } from '../styles/media';
import { primaryButton } from '../styles/layout';
import { getTotals } from '../utils/cart';
import { formatCurrency } from '../utils/money';
import { CartItem } from './CartItem';

// Card "Cafés selecionados" do protótipo: base-card com cantos 6/44px.
const Box = styled.section`
  padding: 24px 16px;
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.cardLg};
  ${media.md} { padding: 40px; }
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Totals = styled.dl`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px 0;
  margin: 0 0 24px;
  dt, dd { font-size: 0.875rem; color: ${({ theme }) => theme.colors.text}; }
  dd { margin: 0; text-align: right; font-size: 1rem; }
  .total { font-size: 1.25rem; font-weight: 700; color: ${({ theme }) => theme.colors.subtitle}; }
`;

const Confirm = styled.button`
  ${primaryButton}
  width: 100%;
`;

export function CartSummary({ formId }: { formId: string }) {
  const { items } = useCart();
  const { subtotalInCents, deliveryFeeInCents, totalInCents } = getTotals(items);

  return (
    <Box aria-labelledby="resumo-titulo">
      <h2 id="resumo-titulo" className="sr-only">
        Resumo do pedido
      </h2>
      <List>
        {items.map((item) => (
          <CartItem key={item.coffeeId} item={item} />
        ))}
      </List>
      <Totals>
        <dt>Total de itens</dt>
        <dd>{formatCurrency(subtotalInCents)}</dd>
        <dt>Entrega</dt>
        <dd>{formatCurrency(deliveryFeeInCents)}</dd>
        <dt className="total">Total</dt>
        <dd className="total">{formatCurrency(totalInCents)}</dd>
      </Totals>
      <Confirm type="submit" form={formId} disabled={items.length === 0}>
        Confirmar pedido
      </Confirm>
    </Box>
  );
}
