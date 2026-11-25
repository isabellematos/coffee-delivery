import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { primaryButton } from '../styles/layout';
import { CartIcon } from './icons';

const Box = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 560px;
  margin: 32px auto 0;
  padding: 48px 20px;
  text-align: center;
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.card};
  h1 { font-size: 1.5rem; color: ${({ theme }) => theme.colors.subtitle}; }
  p { color: ${({ theme }) => theme.colors.text}; }
`;

// Mesmo estilo do carrinho vazio do Style Guide (Cart / Empty).
const IconBox = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.yellowLight};
  color: ${({ theme }) => theme.colors.tagText};
`;

const Cta = styled(Link)`
  ${primaryButton}
  margin-top: 8px;
`;

interface Props {
  title?: string;
  description?: string;
}

export function EmptyCart({ title = 'Seu carrinho está vazio', description = 'Escolha seus cafés favoritos na Home para começar o pedido.' }: Props) {
  return (
    <Box aria-labelledby="vazio-titulo">
      <IconBox aria-hidden="true">
        <CartIcon size={32} />
      </IconBox>
      <h1 id="vazio-titulo">{title}</h1>
      <p>{description}</p>
      <Cta to="/">Ver cafés</Cta>
    </Box>
  );
}
