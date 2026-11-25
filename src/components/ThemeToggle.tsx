import styled from 'styled-components';
import { useTheme } from '../hooks/useTheme';
import { MoonIcon, SunIcon } from './icons';

// Mesmo visual do "chip" de localização do protótipo: fundo roxo-claro, ícone roxo.
const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.purpleLight};
  color: ${({ theme }) => theme.colors.purple};
  transition: filter 0.15s ease;
  &:hover { filter: brightness(0.95); }
`;

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <Button type="button" onClick={toggleTheme} aria-pressed={isDark} aria-label="Modo escuro" title="Alternar tema claro/escuro">
      {isDark ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
