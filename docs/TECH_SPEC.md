# TECH_SPEC — Coffee Delivery

> Referencia os IDs de `PRD_SPEC.md` (RF-xx / RN-xx). Versão 0.2.

## 1. Stack e justificativa

| Tecnologia | Por quê |
| --- | --- |
| React + Vite + TypeScript | SPA com tipagem forte e build rápido (RF-07) |
| React Router | Rotas `/`, `/checkout`, `/success` (RF-07) |
| Context API + useReducer | Estado global do carrinho com ações previsíveis (RF-03 a RF-05) |
| React Hook Form + Zod | Formulário de endereço com validação tipada (RF-08, RF-11) |
| styled-components | Estilização com tema via `ThemeProvider` e tokens (RF-14) |
| localStorage | Carrinho e tema (RF-06, RF-14) |
| Vitest + Testing Library (+ user-event) | Testes de reducer, cálculos, schema, hook de CEP e fluxo de compra |
| ViaCEP | API pública de CEP (RF-08, RN-07) |
| Render (site estático) | Deploy via `render.yaml`, com rewrite de `/*` para `/index.html` (RF-07) |

## 2. Arquitetura

Separação por responsabilidade: **dados** (`data`), **tipos** (`types`), **regras puras** (`reducers`, `utils`), **estado** (`contexts`, `hooks`), **UI** (`components`, `pages`), **validação** (`schemas`), **estilo** (`styles`).

Regra: regras de negócio ficam em funções puras testáveis (reducer e utils), nunca dentro dos componentes nem no `App.tsx`. Sem `any`.

## 3. Estrutura de diretórios

```
src/
├── assets/        # logo e imagens dos cafés
├── components/    # Header, ThemeToggle, CoffeeCard, CoffeeCatalog, QuantityInput,
│                  # CartBadge, CartItem, CartSummary, DeliveryAddressForm,
│                  # PaymentMethodSelector, OrderSuccess, EmptyCart, PageLayout
├── pages/         # Home, Checkout, Success
├── contexts/      # CartContext, ThemeContext (providers)
├── reducers/      # cartReducer + actions
├── hooks/         # useCart, useTheme, useLocalStorage, useCep
├── data/          # coffees.ts
├── types/         # coffee.ts, cart.ts, order.ts, index.ts
├── schemas/       # checkoutSchema.ts
├── utils/         # money.ts, cart.ts (totais), cep.ts, storage.ts, cartStorage.ts, order.ts, payment.ts
├── styles/        # tokens, themes (light/dark), GlobalStyle
└── tests/
```

## 4. Tipos

```ts
export interface Coffee {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
  tags: string[];
  image: string;
}

export interface CartItem {
  coffeeId: string;
  name: string;
  priceInCents: number;
  image: string;
  quantity: number;
}

export type PaymentMethod = 'credit' | 'debit' | 'cash';

export interface DeliveryAddress {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string; // UF
}

export interface Order {
  id: string;
  createdAt: string; // ISO
  items: CartItem[]; // cópia (snapshot)
  address: DeliveryAddress;
  paymentMethod: PaymentMethod;
  subtotalInCents: number;
  deliveryFeeInCents: number;
  totalInCents: number;
}
```

Guardar nome e preço no `CartItem` evita depender do catálogo para exibir o carrinho e o snapshot (RN-06).

## 5. Estado global (Context + useReducer)

**Estado do carrinho:** `{ items: CartItem[] }`

**Ações:**

| Ação | Efeito | Requisito |
| --- | --- | --- |
| `ADD_ITEM { coffee, quantity }` | Se existe (`find`), soma; senão adiciona (`map` / spread) | RF-03, RN-02 |
| `INCREMENT { coffeeId }` | quantity + 1 | RF-05 |
| `DECREMENT { coffeeId }` | quantity − 1, mínimo 1 | RF-05, RN-01 |
| `REMOVE_ITEM { coffeeId }` | `filter` | RF-05 |
| `CLEAR` | `items: []` | RF-13 |

Reducer sempre retorna novo objeto/array (imutabilidade). Valores derivados (`totalUnits`, `subtotal`, `total`) são calculados com `reduce` em `utils/cart.ts`, não guardados no estado.

**Entrega zerada no carrinho vazio:** `getTotals([])` devolve taxa 0 (não há o que entregar).

**Pedido concluído:** salvo em chave separada do localStorage (`coffee-delivery:last-order`) e lido pela página `/success` (RN-06, RF-13).

## 6. Hooks, efeitos e persistência

- `useLocalStorage<T>(key, initial)`: lê com `try/catch` (JSON inválido volta ao inicial) e grava em `useEffect`.
- `CartProvider`: `useReducer` com estado inicial vindo do localStorage (`lazy init`); `useEffect` grava a cada mudança. Chave: `coffee-delivery:cart`.
- `ThemeProvider`: lê `coffee-delivery:theme`; sem valor, usa `matchMedia('(prefers-color-scheme: dark)')`.
- `useCep`: chama o ViaCEP, expõe `status` (`idle | loading | success | notFound | error`) e cancela requisição anterior com `AbortController`.

## 7. Rotas, formulário e cálculos

- `/` Home · `/checkout` Checkout · `/success` Sucesso · `*` página 404 simples.
- Checkout sem itens → `EmptyCart`. Success sem pedido → mensagem de estado vazio (RN-09).
- **Schema Zod:** CEP com 8 dígitos (máscara `00000-000`), rua/bairro/cidade obrigatórios, UF com 2 letras, número obrigatório, complemento opcional, pagamento obrigatório (`z.enum`).
- **CEP:** ao completar 8 dígitos, consulta `https://viacep.com.br/ws/{cep}/json/`. Resposta com `erro: true` → "CEP não encontrado". Falha de rede → mensagem de erro e campos liberados para digitação.
- **Valores:** centavos inteiros; `formatCurrency(cents)` com `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`; `DELIVERY_FEE_IN_CENTS = 350` em `utils/money.ts` (RN-03, RN-04).
- **Confirmar:** valida formulário e carrinho → monta `Order` → salva snapshot → `CLEAR` → `navigate('/success')`.
  - O React Router v7 faz a navegação como transição (menos urgente), então o `CLEAR` renderiza antes dela. Um `useRef` (`submittedRef`) marca que o pedido foi enviado e o Checkout não mostra o `EmptyCart` nesse intervalo.

## 8. Tema, tokens, breakpoints e acessibilidade

- **Tokens (`styles/themes.ts`), nomes vindos do Style Guide do Figma:**
  - Base: `background`, `surface`, `card`, `button`, `buttonHover`, `input`, `border`, `title`, `subtitle`, `text`, `textMuted`.
  - Produto: `yellow`, `yellowDark`, `yellowLight`, `purple`, `purpleDark`, `purpleLight`, `onPurple`, `ctaText`, `tagText`, `badgeText`.
  - Feedback/estados: `danger`, `dangerBg`, `success`, `focusRing`, `shadow`.
  - `fonts` (heading: Baloo 2, body: Roboto) e `radii` (`sm`, `md`, `card` 6/36px, `cardLg` 6/44px, `pill`), iguais nos dois temas.
  - Dois objetos (`lightTheme`, `darkTheme`) com as mesmas chaves (garantido pelo tipo `AppTheme`), entregues pelo `ThemeProvider`.
- **Ajustes de contraste sobre o Figma** (medidos com a fórmula de luminância relativa da WCAG):

  | Uso | Figma | Contraste | Ajuste | Contraste |
  | --- | --- | --- | --- | --- |
  | Texto do botão amarelo | branco sobre `#DBAC2C` | 2,1:1 | `ctaText` `#272221` | 7,4:1 |
  | Tag do card | `#C47F17` sobre `#F1E9C9` | 2,7:1 | `tagText` `#8A5A0B` | 4,9:1 |
  | Descrição/label | `#8D8686` sobre `#F3F2F2` | 3,2:1 | `textMuted` `#6B6363` | 5,2:1 |
  | Número do contador | branco sobre `#C47F17` | 3,3:1 | `badgeText` `#272221` | ≥ 4,5:1 |

- **Estilos compartilhados (`styles/layout.ts`):** `Container`, `primaryButton` (botão amarelo do Style Guide) e `secondaryButton` (botão "Remover"). `FormSection` padroniza os blocos do checkout (endereço e pagamento).
- **Breakpoints (mobile first):** base 320+, `768px` tablet, `1024px` desktop; container máximo ~1120px.
- **Acessibilidade:** `<label>` ligado a cada campo; `aria-invalid` e `aria-describedby` nos erros; `role="alert"` para erros do CEP; botões de ícone com `aria-label`; foco visível; `ThemeToggle` com `aria-pressed`; contraste conferido nos dois temas.

## 9. Testes e execução

| Caso | Tipo | Requisito |
| --- | --- | --- |
| Reducer: adicionar item novo e repetido (sem duplicar linha) | Unitário | RF-03, RN-02 |
| Reducer: incrementar, decrementar (mínimo 1), remover, limpar; não muta o estado | Unitário | RF-05, RN-01 |
| Contador soma unidades | Unitário | RF-04 |
| Subtotal, entrega e total em centavos | Unitário | RF-10, RN-03/04 |
| `formatCurrency` | Unitário | RN-04 |
| Schema Zod: CEP inválido, campos vazios, complemento opcional | Unitário | RF-08, RF-11 |
| `useCep` com `fetch` mockado: sucesso, não encontrado, erro | Hook | RF-08 |
| Persistência: carrinho recarregado do localStorage; JSON inválido | Unitário | RF-06 |
| Fluxo: adicionar → checkout → confirmar → sucesso com carrinho vazio | Componente | RF-12, RF-13 |

Ferramentas: ESLint 9 (`typescript-eslint` + `react-hooks`, com `no-explicit-any` como erro) e TypeScript `strict`, ambos em `npm run lint`; Vitest + Testing Library em `npm test`. Scripts: `npm run dev`, `build`, `lint`, `test`, `preview`.

Verificações manuais feitas com Playwright (navegador Chrome, fora do projeto):
- Sem rolagem horizontal em 320, 390, 768 e 1280 px, nos dois temas, nas três rotas.
- Fluxo completo só com teclado (Tab/Enter/Espaço): adicionar café → carrinho → CEP → número → pagamento → confirmar → sucesso, com foco visível em todos os elementos.
- Após confirmar, a tela vai direto para `/success` (sem piscar o estado "carrinho vazio").
