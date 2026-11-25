import { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../hooks/useCart';
import type { Coffee } from '../types';
import { formatCurrency } from '../utils/money';
import { CartIcon } from './icons';
import { QuantityInput } from './QuantityInput';

// Card do catálogo como no protótipo: fundo base-card, cantos 6/36px e imagem "saindo" do topo.
const Card = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 20px;
  margin-top: 20px;
  text-align: center;
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.card};
`;

const Photo = styled.img`
  width: 120px;
  height: 120px;
  margin-top: -20px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
`;

const Tags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
  margin: 12px 0 16px;
  padding: 0;
  list-style: none;
`;

// Tag do Style Guide: 10px, bold, caixa alta, amarelo-claro.
const Tag = styled.li`
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 0.625rem;
  font-weight: 700;
  line-height: 1.3;
  text-transform: uppercase;
  background: ${({ theme }) => theme.colors.yellowLight};
  color: ${({ theme }) => theme.colors.tagText};
`;

const Name = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.subtitle};
`;

const Description = styled.p`
  margin-top: 8px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px 23px;
  margin-top: auto;
  padding-top: 33px;
`;

// Preço: "R$" em Text S e valor em Title M (Baloo 24px ExtraBold).
const Price = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
  strong {
    margin-left: 4px;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.5rem;
    font-weight: 800;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

// Botão ícone do Style Guide: roxo-escuro, hover roxo.
const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.purpleDark};
  color: ${({ theme }) => theme.colors.onPurple};
  transition: background-color 0.15s ease;
  &:hover { background: ${({ theme }) => theme.colors.purple}; }
`;

export function CoffeeCard({ coffee }: { coffee: Coffee }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(coffee, quantity);
    setQuantity(1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  }

  return (
    <Card>
      <Photo src={coffee.image} alt={`Xícara de ${coffee.name}`} width={120} height={120} loading="lazy" />
      <Tags aria-label="Categorias">
        {coffee.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Tags>
      <Name>{coffee.name}</Name>
      <Description>{coffee.description}</Description>
      <Footer>
        <Price>
          R$<strong>{formatCurrency(coffee.priceInCents).replace(/^R\$\s?/, '')}</strong>
        </Price>
        <Actions>
          <QuantityInput value={quantity} onChange={setQuantity} productName={coffee.name} />
          <AddButton type="button" onClick={handleAdd} aria-label={`Adicionar ${quantity} ${coffee.name} ao carrinho`}>
            <CartIcon />
          </AddButton>
        </Actions>
      </Footer>
      <span className="sr-only" role="status">
        {added ? `${coffee.name} adicionado ao carrinho` : ''}
      </span>
    </Card>
  );
}
