// Paleta e tipografia do Style Guide do Figma (Coffee Delivery): amarelo + roxo, Baloo 2 + Roboto.
// Os dois temas têm exatamente as mesmas chaves; os componentes só usam esses tokens.
//
// Ajustes de acessibilidade (WCAG AA, contraste mínimo 4,5:1 para texto):
// - ctaText: texto escuro no botão amarelo (branco no amarelo dá só 2,1:1).
// - tagText: amarelo-escuro mais fechado na tag (o original dá 2,7:1 sobre o amarelo-claro).
// - textMuted: base-label um pouco mais escuro (o original dá ~3:1 sobre o card).
// - Ícone do carrinho usa tagText (amarelo-escuro original dá 2,7:1 sobre o amarelo-claro).
// - badgeText: número do contador escuro (branco sobre amarelo-escuro dá 3,3:1).

const shared = {
  fonts: {
    heading: "'Baloo 2', 'Roboto', system-ui, sans-serif",
    body: "'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif",
  },
  radii: {
    sm: '6px',
    md: '8px',
    // Card "assimétrico" do protótipo (cantos 6px e 36px alternados).
    card: '6px 36px 6px 36px',
    cardLg: '6px 44px 6px 44px',
    pill: '999px',
  },
};

export interface AppTheme {
  name: 'light' | 'dark';
  fonts: typeof shared.fonts;
  radii: typeof shared.radii;
  colors: {
    // Base
    background: string;
    surface: string;
    card: string;
    button: string;
    buttonHover: string;
    input: string;
    border: string;
    title: string;
    subtitle: string;
    text: string;
    textMuted: string;
    // Produto
    yellow: string;
    yellowDark: string;
    yellowLight: string;
    purple: string;
    purpleDark: string;
    purpleLight: string;
    onPurple: string;
    ctaText: string;
    tagText: string;
    badgeText: string;
    // Feedback e estados
    danger: string;
    dangerBg: string;
    success: string;
    focusRing: string;
    shadow: string;
  };
}

export const lightTheme: AppTheme = {
  name: 'light',
  ...shared,
  colors: {
    background: '#fafafa',
    surface: '#ffffff',
    card: '#f3f2f2',
    button: '#e6e5e5',
    buttonHover: '#d7d5d5',
    input: '#ededed',
    border: '#e6e5e5',
    title: '#272221',
    subtitle: '#403937',
    text: '#574f4d',
    textMuted: '#6b6363',
    yellow: '#dbac2c',
    yellowDark: '#c47f17',
    yellowLight: '#f1e9c9',
    purple: '#8047f8',
    purpleDark: '#4b2995',
    purpleLight: '#ebe5f9',
    onPurple: '#ffffff',
    ctaText: '#272221',
    tagText: '#8a5a0b',
    badgeText: '#272221',
    danger: '#b3261e',
    dangerBg: '#fde8e6',
    success: '#1d6b3a',
    focusRing: '#8047f8',
    shadow: 'rgba(39, 34, 33, 0.08)',
  },
};

// Tema escuro: mesma identidade (amarelo + roxo) com tons ajustados para fundo escuro.
export const darkTheme: AppTheme = {
  name: 'dark',
  ...shared,
  colors: {
    background: '#1a1716',
    surface: '#221e1c',
    card: '#272321',
    button: '#353130',
    buttonHover: '#46403e',
    input: '#2f2b29',
    border: '#3a3533',
    title: '#f3f2f2',
    subtitle: '#e6e5e5',
    text: '#d7d5d5',
    textMuted: '#b0a9a7',
    yellow: '#e8be4a',
    yellowDark: '#e6a643',
    yellowLight: '#3a2f14',
    purple: '#a98bff',
    purpleDark: '#5b36b8',
    purpleLight: '#2e2546',
    onPurple: '#ffffff',
    ctaText: '#1a1716',
    tagText: '#f1d58a',
    badgeText: '#1a1716',
    danger: '#ff9a92',
    dangerBg: '#3d1c19',
    success: '#7fd9a0',
    focusRing: '#e8be4a',
    shadow: 'rgba(0, 0, 0, 0.45)',
  },
};

export const themes = { light: lightTheme, dark: darkTheme };
