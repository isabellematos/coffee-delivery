import { createContext, useCallback, useEffect, useMemo, type ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { GlobalStyle } from '../styles/GlobalStyle';
import { themes } from '../styles/themes';

export type ThemeName = 'light' | 'dark';

interface ThemeContextValue {
  theme: ThemeName;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_STORAGE_KEY = 'coffee-delivery:theme';

function isStoredTheme(value: unknown): value is ThemeName | null {
  return value === null || value === 'light' || value === 'dark';
}

function getSystemTheme(): ThemeName {
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // null = usuário ainda não escolheu: segue a preferência do sistema.
  const [stored, setStored] = useLocalStorage<ThemeName | null>(THEME_STORAGE_KEY, null, isStoredTheme);
  const theme = stored ?? getSystemTheme();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => setStored(theme === 'dark' ? 'light' : 'dark'), [theme, setStored]);
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={themes[theme]}>
        <GlobalStyle />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}
