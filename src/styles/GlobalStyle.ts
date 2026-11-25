import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html { color-scheme: ${({ theme }) => theme.name}; -webkit-text-size-adjust: 100%; }
  body {
    margin: 0;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 1rem;
    line-height: 1.3;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    transition: background-color 0.2s ease, color 0.2s ease;
  }
  h1, h2, h3 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 800;
    line-height: 1.3;
    margin: 0;
    color: ${({ theme }) => theme.colors.title};
  }
  p { margin: 0; }
  img { max-width: 100%; display: block; }
  a { color: inherit; }
  button, input { font: inherit; color: inherit; }
  button { cursor: pointer; }
  button:disabled { cursor: not-allowed; }
  :focus-visible { outline: 3px solid ${({ theme }) => theme.colors.focusRing}; outline-offset: 2px; }
  ::selection { background: ${({ theme }) => theme.colors.purpleLight}; }

  .sr-only {
    position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation: none !important; transition: none !important; }
  }
`;
