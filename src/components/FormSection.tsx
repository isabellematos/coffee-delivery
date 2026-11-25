import type { ReactNode } from 'react';
import styled from 'styled-components';
import { media } from '../styles/media';

// Bloco do checkout do protótipo: fundo base-card, ícone colorido, título e descrição.
const Fieldset = styled.fieldset`
  margin: 0;
  padding: 24px 16px;
  min-width: 0;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.card};
  ${media.md} { padding: 40px; }
`;

// O <legend> fica só para leitor de tela; o cabeçalho visual é decorativo (evita leitura dupla).
const Header = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
`;

const Icon = styled.span<{ $color: 'yellowDark' | 'purple' }>`
  flex-shrink: 0;
  display: inline-flex;
  color: ${({ theme, $color }) => theme.colors[$color]};
`;

const Title = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.subtitle};
`;

const Description = styled.p`
  margin-top: 2px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
`;

interface Props {
  title: string;
  description: string;
  icon: ReactNode;
  iconColor: 'yellowDark' | 'purple';
  children: ReactNode;
  describedBy?: string;
}

export function FormSection({ title, description, icon, iconColor, children, describedBy }: Props) {
  return (
    <Fieldset aria-describedby={describedBy}>
      <legend className="sr-only">{title}</legend>
      <Header aria-hidden="true">
        <Icon $color={iconColor}>{icon}</Icon>
        <div>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </div>
      </Header>
      {children}
    </Fieldset>
  );
}
