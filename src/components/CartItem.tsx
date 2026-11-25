import styled from 'styled-components';
import { useCart } from '../hooks/useCart';
import { secondaryButton } from '../styles/layout';
import type { CartItem as CartItemType } from '../types';
import { formatCurrency } from '../utils/money';
import { TrashIcon } from './icons';
import { QuantityInput } from './QuantityInput';

// Item do carrinho como no protótipo: imagem 64px, nome, quantidade + "Remover" e preço à direita.
const Row = styled.li`
  display: grid;
  grid-template-columns: 64px 1fr auto;
  align-items: start;
  gap: 8px 20px;
  padding: 8px 4px 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.button};
  img { width: 64px; height: 64px; object-fit: cover; border-radius: 50%; }
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const Name = styled.p`
  color: ${({ theme }) => theme.colors.subtitle};
`;

const Price = styled.p`
  font-weight: 700;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.text};
`;

const RemoveButton = styled.button`
  ${secondaryButton}
`;

export function CartItem({ item }: { item: CartItemType }) {
  const { increment, decrement, removeItem } = useCart();

  return (
    <Row>
      <img src={item.image} alt="" width={64} height={64} />
      <div>
        <Name>{item.name}</Name>
        <Controls>
          <QuantityInput
            value={item.quantity}
            productName={item.name}
            editable={false}
            onChange={(next) => (next > item.quantity ? increment(item.coffeeId) : decrement(item.coffeeId))}
          />
          <RemoveButton type="button" onClick={() => removeItem(item.coffeeId)} aria-label={`Remover ${item.name} do carrinho`}>
            <TrashIcon /> Remover
          </RemoveButton>
        </Controls>
      </div>
      <Price>{formatCurrency(item.priceInCents * item.quantity)}</Price>
    </Row>
  );
}
