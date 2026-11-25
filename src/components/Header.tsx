import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../hooks/useCart';
import { media } from '../styles/media';
import { Container } from '../styles/layout';
import { CartBadge } from './CartBadge';
import { CartIcon } from './icons';
import { ThemeToggle } from './ThemeToggle';

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${({ theme }) => theme.colors.background};
`;

const Inner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  height: 80px;
  ${media.md} { height: 104px; }
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  min-width: 0;
  border-radius: ${({ theme }) => theme.radii.md};
`;

// Símbolo da logo gerada com IA (xícara), recortado da versão completa para caber em 40 px.
const Mark = styled.img`
  border-radius: ${({ theme }) => theme.radii.md};
`;

const BrandName = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 800;
  font-size: 1.15rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.title};
  span { display: block; color: ${({ theme }) => theme.colors.yellowDark}; }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CartLink = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.yellowLight};
  color: ${({ theme }) => theme.colors.tagText};
  transition: filter 0.15s ease;
  &:hover { filter: brightness(0.95); }
`;

export function Header() {
  const { totalUnits } = useCart();
  const cartLabel = `Carrinho, ${totalUnits} ${totalUnits === 1 ? 'unidade' : 'unidades'}`;

  return (
    <Bar>
      <Inner>
        <Brand to="/" aria-label="Coffee Delivery, página inicial">
          <Mark src="/logo-mark.png" alt="" width={44} height={44} />
          <BrandName>
            Coffee <span>Delivery</span>
          </BrandName>
        </Brand>
        <Actions>
          <ThemeToggle />
          <CartLink to="/checkout" aria-label={cartLabel}>
            <CartIcon />
            <CartBadge count={totalUnits} />
          </CartLink>
        </Actions>
      </Inner>
    </Bar>
  );
}
