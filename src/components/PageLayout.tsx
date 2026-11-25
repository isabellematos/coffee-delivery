import type { ReactNode } from 'react';
import styled from 'styled-components';
import { media } from '../styles/media';
import { Container } from '../styles/layout';
import { Header } from './Header';

const SkipLink = styled.a`
  position: absolute;
  left: 8px;
  top: -60px;
  z-index: 20;
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-weight: 700;
  background: ${({ theme }) => theme.colors.purpleDark};
  color: ${({ theme }) => theme.colors.onPurple};
  &:focus { top: 8px; }
`;

const Main = styled(Container).attrs({ as: 'main' })`
  padding-top: 16px;
  padding-bottom: 56px;
  ${media.md} { padding-top: 24px; padding-bottom: 96px; }
`;

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SkipLink href="#conteudo">Pular para o conteúdo</SkipLink>
      <Header />
      <Main id="conteudo">{children}</Main>
    </>
  );
}
