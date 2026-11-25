# TASKS_SPEC — Coffee Delivery

> Versão 0.2 · Plano de implementação em tarefas pequenas, na ordem de execução.
> Cada tarefa aponta para os requisitos do `PRD_SPEC.md` e para a seção do `TECH_SPEC.md` que define o "como".

Ao concluir cada tarefa: marcar o status, registrar o teste feito (tabela no fim) e fazer um commit semântico (`feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `style:`).

Status: ⬜ pendente · 🟨 em andamento / parcial · ✅ feito

## Checklist

| ID | Tarefa | Requisitos | Arquivos | Pronto quando | Status |
| --- | --- | --- | --- | --- | --- |
| T-01 | Revisar PRD/TECH com IA e fechar as decisões (frete, regra do −, marca) | todos | `docs/*` | Decisões **[DECISÃO]** confirmadas | ✅ |
| T-02 | Criar projeto Vite + React + TS, Git, ESLint, repositório no GitHub | RF-07 | raiz, `package.json`, `eslint.config.js` | `npm run dev` abre sem erro; primeiro commit | 🟨 Vite + TS + ESLint prontos; **Git/GitHub pendentes** |
| T-03 | Instalar dependências e criar estrutura de pastas | — | `src/*` | Build passa | ✅ |
| T-04 | Logo com IA, favicon e variações claro/escuro | RF-16 | `public/`, `docs/branding/` | Logo legível em 32 px; prompt e resultado salvos | 🟨 logo aplicada e testada em 32/16 px; **ferramenta e prompt originais a preencher no README** |
| T-05 | Tokens, temas light/dark e GlobalStyle (Style Guide do Figma) | RF-14 | `src/styles/*` | Dois temas com as mesmas chaves; contraste AA | ✅ |
| T-06 | Tipos, catálogo tipado e utils de dinheiro | RF-01, RN-04 | `types`, `data`, `utils/money.ts` | `formatCurrency` testado | ✅ |
| T-07 | `PageLayout`, `Header`, rotas e páginas | RF-07 | `components`, `pages`, `App.tsx` | Navega entre as 3 rotas sem recarregar | ✅ |
| T-08 | `CoffeeCard`, `QuantityInput`, `CoffeeCatalog` | RF-01, RF-02 | `components` | Catálogo completo na Home | ✅ |
| T-09 | `cartReducer` + testes | RF-03, RF-05, RN-01, RN-02 | `reducers`, `tests` | Testes verdes, sem mutação | ✅ |
| T-10 | `CartContext`, `useCart`, ligar botões e `CartBadge` | RF-03, RF-04 | `contexts`, `hooks`, `components` | Badge soma unidades | ✅ |
| T-11 | Persistência do carrinho (`useLocalStorage` / `cartStorage`) | RF-06 | `hooks`, `utils` | Carrinho sobrevive ao F5 | ✅ |
| T-12 | `CartItem`, `CartSummary`, `EmptyCart` no checkout | RF-05, RF-10, RN-09 | `components`, `utils/cart.ts` | Totais corretos e atualizando | ✅ |
| T-13 | Schema Zod do endereço + `DeliveryAddressForm` | RF-08, RF-11 | `schemas`, `components` | Erros acessíveis nos campos | ✅ |
| T-14 | `useCep` + integração ViaCEP e tratamento de erros | RF-08, RN-07 | `hooks`, `utils/cep.ts` | Preenche rua/bairro/cidade/UF; 3 erros tratados | ✅ |
| T-15 | `PaymentMethodSelector` | RF-09 | `components` | Pagamento obrigatório | ✅ |
| T-16 | Confirmar pedido: snapshot, limpar carrinho, navegar | RF-11, RF-12, RF-13, RN-06, RN-10 | `pages/Checkout`, `utils/order.ts` | Sucesso correto com carrinho vazio | ✅ |
| T-17 | Página de sucesso e estado sem pedido | RF-12, RN-09 | `pages/Success`, `OrderSuccess` | Mostra endereço e pagamento | ✅ |
| T-18 | `ThemeProvider`, `ThemeToggle` e persistência | RF-14 | `contexts`, `components` | Tema persiste e respeita o sistema | ✅ |
| T-19 | Responsividade (320/375/768/1280) | RF-15 | `styles`, componentes | Sem rolagem horizontal; fluxo completo no celular | ✅ |
| T-20 | Acessibilidade (foco, labels, contraste, teclado) | NFR | todos | Fluxo inteiro só no teclado; contraste conferido | ✅ |
| T-21 | Testes restantes (schema, useCep, fluxo) | vários | `tests` | `npm test` verde | ✅ |
| T-22 | `AI_USAGE.md` com pelo menos 3 interações | Enunciado §8 | `docs/AI_USAGE.md` | 3 registros com prompt, decisão e evidência | ✅ (revisar e complementar com suas palavras) |
| T-23 | README, prints (Home, Checkout, Sucesso, Dark mobile), demo | Enunciado §11 | `README.md`, `docs/screenshots/` | Checklist de entrega completo | 🟨 prints prontos; **vídeo/GIF da demo e link pendentes** |
| T-24 | Deploy no Render e revisão final | todos | `render.yaml` | Link funcionando; F5 em `/checkout` e `/success` sem 404; console limpo | ⬜ (`render.yaml` pronto; depende do GitHub) |

## Registro de testes por tarefa

Comandos usados em todas as verificações: `npm run lint` (ESLint + `tsc --noEmit`), `npm test` (Vitest) e `npm run build`.
Verificações visuais e de teclado feitas com Playwright + Chrome contra o build de produção (`vite preview`).
Coluna "Commit": ainda sem hash, porque o repositório Git não foi iniciado (T-02).

| Data | Tarefa | O que foi testado | Resultado | Commit |
| --- | --- | --- | --- | --- |
| 2026-11-24 | T-01 | Revisão dos três SPECs contra o enunciado; decisões registradas no PRD §9 | OK | — |
| 2026-11-24 | T-02, T-03 | `npm install`, `npm run lint` (ESLint 9 + TS strict), `npm run build` | 0 erros; build de 98 módulos | — |
| 2026-11-24 | T-04 | Símbolo da logo reduzido para 32 px e 16 px (`docs/branding/teste-32px.png`, `teste-16px.png`); `favicon.png`, `apple-touch-icon.png` e `logo-mark.png` servidos com HTTP 200 | Xícara reconhecível em 32 px; em 16 px só a silhueta | — |
| 2026-11-24 | T-05 | Contraste dos pares de tokens (fórmula WCAG) nos dois temas; mesmas chaves garantidas pelo tipo `AppTheme` | Textos ≥ 4,5:1, ícones/foco ≥ 3:1 após ajustes (TECH §8) | — |
| 2026-11-24 | T-06 | `utils.test.ts`: `formatCurrency`, soma em centavos (0,1 + 0,2) | 11/11 ✅ | — |
| 2026-11-24 | T-07 | `checkoutFlow.test.tsx`: navegação `/` → `/checkout` → `/success` com `MemoryRouter`; rota `*` → 404 | ✅ | — |
| 2026-11-24 | T-08 | Fluxo: aumentar quantidade e adicionar 2 unidades pelo card | ✅ | — |
| 2026-11-24 | T-09 | `cartReducer.test.ts`: adicionar novo/repetido, ignorar 0/negativo/decimal, incrementar, decrementar (mín. 1), remover, limpar, imutabilidade | 6/6 ✅ | — |
| 2026-11-24 | T-10 | `getTotalUnits` soma unidades; link "Carrinho, 3 unidades" no fluxo | ✅ | — |
| 2026-11-24 | T-11 | Salvar/recarregar carrinho; JSON inválido volta a vazio; carrinho reaparece ao recarregar | ✅ | — |
| 2026-11-24 | T-12 | Subtotal R$ 29,70 + entrega R$ 3,50 = R$ 33,20 no fluxo; carrinho vazio sem entrega | ✅ | — |
| 2026-11-24 | T-13 | `checkoutSchema.test.ts`: CEP inválido, obrigatórios, complemento opcional, pagamento | 4/4 ✅ | — |
| 2026-11-24 | T-14 | `useCep.test.ts` com `fetch` simulado: loading → success, notFound, error | 6/6 ✅ | — |
| 2026-11-24 | T-15 | Fluxo: confirmar sem pagamento mostra "Escolha uma forma de pagamento" | ✅ | — |
| 2026-11-24 | T-16 | Fluxo completo: sucesso mostra endereço e pagamento com carrinho já vazio. Playwright: sem "piscar" o estado vazio após confirmar (corrigido com `submittedRef`) | ✅ | — |
| 2026-11-24 | T-17 | `/success` sem pedido mostra "Nenhum pedido encontrado" | ✅ | — |
| 2026-11-24 | T-18 | Fluxo: alternar tema e persistir; script no `index.html` evita flash de tema | ✅ | — |
| 2026-11-24 | T-19 | Playwright: `scrollWidth` ≤ largura em 320/390/768/1280 px, 2 temas × 3 rotas | 0 casos de rolagem horizontal | — |
| 2026-11-24 | T-20 | Playwright: compra completa só com teclado; foco visível (outline) em todos os elementos focados | ✅ | — |
| 2026-11-24 | T-21 | Suíte completa | 34/34 ✅, sem warnings do React Router | — |
| 2026-11-24 | T-23 | 10 prints gerados em `docs/screenshots/` (Home, Checkout, Sucesso; desktop e mobile; claro e escuro) | ✅ | — |
