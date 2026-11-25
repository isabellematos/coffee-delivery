import styled from 'styled-components';

// Badge do Style Guide (Cart / Full): círculo amarelo-escuro com número branco.
const Badge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border-radius: ${({ theme }) => theme.radii.pill};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1;
  background: ${({ theme }) => theme.colors.yellowDark};
  color: ${({ theme }) => theme.colors.badgeText};
`;

// aria-hidden: a contagem já está no aria-label do link do carrinho.
export function CartBadge({ count }: { count: number }) {
  if (count < 1) return null;
  return <Badge aria-hidden="true">{count}</Badge>;
}
