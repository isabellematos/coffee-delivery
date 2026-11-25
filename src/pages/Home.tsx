import type { ReactNode } from 'react';
import styled from 'styled-components';
import { CoffeeCatalog } from '../components/CoffeeCatalog';
import { CartIcon, CoffeeIcon, PackageIcon, TimerIcon } from '../components/icons';
import { PageLayout } from '../components/PageLayout';
import { media } from '../styles/media';

// Hero do protótipo: título XL, subtítulo e 4 benefícios com ícones em círculos coloridos.
const Hero = styled.section`
  position: relative;
  display: grid;
  gap: 40px;
  align-items: center;
  padding: 32px 0 64px;
  ${media.lg} { grid-template-columns: 1fr 476px; gap: 56px; padding: 72px 0 108px; }
  /* Fundo desfocado amarelo/roxo, como no protótipo */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      radial-gradient(30% 40% at 30% 45%, ${({ theme }) => theme.colors.yellowLight} 0%, transparent 100%),
      radial-gradient(25% 35% at 75% 60%, ${({ theme }) => theme.colors.purpleLight} 0%, transparent 100%);
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  ${media.md} { font-size: 3rem; }
`;

const Lead = styled.p`
  margin-top: 16px;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.subtitle};
  ${media.md} { font-size: 1.25rem; }
`;

const Features = styled.ul`
  display: grid;
  gap: 20px 40px;
  margin: 40px 0 0;
  padding: 0;
  list-style: none;
  ${media.sm} { grid-template-columns: auto auto; justify-content: start; }
  ${media.md} { margin-top: 66px; }
`;

const Feature = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

type FeatureColor = 'yellowDark' | 'text' | 'yellow' | 'purple';

const FeatureIcon = styled.span<{ $color: FeatureColor }>`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme, $color }) => theme.colors[$color]};
  color: ${({ theme }) => theme.colors.background};
`;

const Visual = styled.div`
  display: none;
  ${media.lg} {
    display: block;
    aspect-ratio: 1;
    width: 100%;
    overflow: hidden;
    border-radius: 50%;
    box-shadow: 0 24px 48px ${({ theme }) => theme.colors.shadow};
    img { width: 100%; height: 100%; object-fit: cover; }
  }
`;

const features: { icon: ReactNode; color: FeatureColor; text: string }[] = [
  { icon: <CartIcon size={16} />, color: 'yellowDark', text: 'Compra simples e segura' },
  { icon: <PackageIcon />, color: 'text', text: 'Embalagem mantém o café intacto' },
  { icon: <TimerIcon />, color: 'yellow', text: 'Entrega rápida e rastreada' },
  { icon: <CoffeeIcon />, color: 'purple', text: 'O café chega fresquinho até você' },
];

export function Home() {
  return (
    <PageLayout>
      <Hero aria-labelledby="hero-titulo">
        <div>
          <Title id="hero-titulo">Encontre o café perfeito para qualquer hora do dia</Title>
          <Lead>Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora</Lead>
          <Features>
            {features.map((feature) => (
              <Feature key={feature.text}>
                <FeatureIcon $color={feature.color} aria-hidden="true">
                  {feature.icon}
                </FeatureIcon>
                {feature.text}
              </Feature>
            ))}
          </Features>
        </div>
        <Visual aria-hidden="true">
          <img src="/coffees/latte.jpg" alt="" width={476} height={476} />
        </Visual>
      </Hero>
      <CoffeeCatalog />
    </PageLayout>
  );
}
