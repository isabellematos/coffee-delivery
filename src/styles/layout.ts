import styled, { css } from 'styled-components';
import { media } from './media';

export const Container = styled.div`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 16px;
  ${media.md} { padding: 0 24px; }
`;

// Botão primário do Style Guide: amarelo, texto em caixa alta (Button G: 14px bold).
export const primaryButton = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 46px;
  padding: 0 20px;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.6;
  text-transform: uppercase;
  text-decoration: none;
  background: ${({ theme }) => theme.colors.yellow};
  color: ${({ theme }) => theme.colors.ctaText};
  transition: background-color 0.15s ease;
  &:hover:not(:disabled) { background: ${({ theme }) => theme.colors.yellowDark}; }
  &:disabled { opacity: 0.5; }
`;

// Botão secundário do Style Guide (ex.: "Remover"): cinza com ícone roxo (Button M: 12px).
export const secondaryButton = css`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-height: 44px;
  padding: 0 8px;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 0.75rem;
  line-height: 1.6;
  text-transform: uppercase;
  background: ${({ theme }) => theme.colors.button};
  color: ${({ theme }) => theme.colors.text};
  transition: background-color 0.15s ease;
  svg { color: ${({ theme }) => theme.colors.purple}; }
  &:hover { background: ${({ theme }) => theme.colors.buttonHover}; }
`;
