# PRD_SPEC — Coffee Delivery

> Versão 0.2 · Documento vivo: atualizar durante a implementação.
> Itens marcados com **[DECISÃO]** são escolhas de produto. Todas foram confirmadas na T-01 (ver seção 9).

## 1. Visão geral

**Problema:** o cliente de uma cafeteria precisa de um jeito simples de ver os cafés, montar um pedido e finalizar a compra pelo celular ou computador.

**Objetivo:** SPA de e-commerce fictício, com catálogo, carrinho, checkout e confirmação, sem backend e sem pagamento real.

**Público-alvo:** pessoas que pedem café com frequência e usam principalmente o celular.

**Objetivo acadêmico:** consolidar React, TypeScript, Context API, useReducer, Hooks, React Router, formulários com validação, persistência local, testes e uso documentado de IA.

## 2. Escopo

**Dentro do escopo:** catálogo, seleção de quantidade, carrinho, contador no Header, persistência do carrinho, checkout com endereço (consulta de CEP), forma de pagamento, resumo financeiro, tela de sucesso, tema claro/escuro, layout responsivo, logo criada com IA.

**Fora do escopo:** backend próprio, autenticação, banco de dados, pagamento real, rastreio de entrega, painel administrativo.

**Extras (só depois do fluxo principal):** busca/filtro por categoria, histórico de pedidos local, cupom, testes E2E com Playwright, animações com `prefers-reduced-motion`.

## 3. Fluxos de usuário

1. **Compra:** Home → escolhe quantidade → adiciona ao carrinho → clica no carrinho do Header → Checkout → preenche endereço e pagamento → confirma → Sucesso.
2. **Carrinho vazio:** Checkout mostra estado vazio com botão para voltar à Home.
3. **Acesso direto a `/success` sem pedido:** mostra mensagem de pedido não encontrado e link para a Home.
4. **Erro de CEP:** usuário vê a mensagem, corrige o CEP e continua.

## 4. Requisitos funcionais

| ID | Requisito | Critério de aceite verificável |
| --- | --- | --- |
| RF-01 | Catálogo com imagem, nome, descrição, preço e tag | Todos os cafés de `data/coffees.ts` aparecem na Home com os 5 campos |
| RF-02 | Selecionar quantidade antes de adicionar | Input aceita só inteiro ≥ 1; botões + e − funcionam |
| RF-03 | Adicionar ao carrinho acumulando repetidos | Adicionar 2 e depois 3 do mesmo café resulta em 1 linha com quantidade 5 |
| RF-04 | Contador no Header | Mostra a soma das unidades (2 + 3 = 5), não a quantidade de linhas |
| RF-05 | Aumentar, diminuir e remover itens | Subtotal, total e contador atualizam na hora |
| RF-06 | Persistir carrinho em localStorage | Após F5 o carrinho continua igual |
| RF-07 | Rotas `/`, `/checkout`, `/success` | Navegação sem recarregar a página |
| RF-08 | Endereço com consulta de CEP | CEP válido preenche rua, bairro, cidade e UF; número e complemento ficam manuais; erros para CEP inválido, não encontrado e falha da API |
| RF-09 | Forma de pagamento (crédito, débito, dinheiro) | Sem opção selecionada, o pedido não finaliza |
| RF-10 | Subtotal, entrega e total | Valores batem com a fórmula da RN-03 |
| RF-11 | Bloquear finalização inválida | Botão desabilitado ou erro acessível com carrinho vazio ou formulário inválido |
| RF-12 | Confirmar pedido e mostrar resumo | Tela de sucesso exibe endereço e pagamento escolhidos |
| RF-13 | Limpar carrinho após confirmar | Carrinho vazio, mas `/success` continua correto |
| RF-14 | Alternar light/dark | Tema vale para todas as telas e persiste após F5 |
| RF-15 | Layout mobile | Fluxo completo utilizável em 320/375/390 px |
| RF-16 | Logo criada com IA | Logo no Header, favicon e seção "Branding com IA" no README |

## 5. Regras de negócio

- **RN-01 Quantidades:** na adição, mínimo 1. **[DECISÃO ✅]** No carrinho, o botão − não desce de 1 (fica desabilitado); para remover, usa-se o botão de lixeira.
- **RN-02 Produto único:** adicionar o mesmo café soma na linha existente.
- **RN-03 Cálculo:** `subtotal = Σ(preço em centavos × quantidade)`; `total = subtotal + taxa de entrega`. **[DECISÃO ✅]** Taxa fixa de R$ 3,50 (350 centavos), definida em uma única constante.
- **RN-04 Moeda:** valores guardados em centavos (inteiros) e exibidos em BRL com 2 casas via `Intl.NumberFormat`.
- **RN-05 Pagamento:** só informativo, sem transação.
- **RN-06 Persistência:** o carrinho vive no localStorage; o pedido confirmado é um snapshot independente (cópia dos itens, endereço, pagamento e totais).
- **RN-07 Endereço:** complemento opcional; CEP consultado em API pública (ViaCEP); tratar CEP inválido, não encontrado, carregamento e API indisponível, permitindo editar os campos manualmente em caso de falha.
- **RN-08 Dados:** catálogo em arquivo local tipado.
- **RN-09 Estados vazios:** mensagem para carrinho vazio e para confirmação sem pedido válido.
- **RN-10 Navegação:** não confirmar com erro de validação ou carrinho vazio.

## 6. Requisitos não funcionais

- **Acessibilidade:** referência WCAG 2.2 AA; labels associados, foco visível, navegação por teclado, erros anunciados (`aria-live` / `role="alert"`), contraste mínimo 4.5:1 nos dois temas.
- **Responsividade:** testar 320, 375/390, 768 e 1280/1440 px; sem rolagem horizontal; alvos de toque de pelo menos 44 px.
- **Desempenho:** imagens otimizadas, carregamento inicial rápido, sem warnings no console.
- **Persistência:** carrinho e tema em localStorage com tratamento de JSON inválido.
- **Compatibilidade:** versões atuais de Chrome, Firefox, Safari e Edge.

## 7. Marca e temas

- Nome: **Coffee Delivery** (mantido). **[DECISÃO ✅]**
- Logo gerada com ferramenta de IA, com variações para fundo claro e escuro, legível em tamanho pequeno (favicon).
- **Identidade visual do protótipo (Style Guide do Figma):** paleta amarelo + roxo, cores base em tons de cinza quente, tipografia Baloo 2 (títulos) e Roboto (texto), ícones no estilo Phosphor e cards com cantos assimétricos (6px/36px).
- **Ajustes de acessibilidade sobre o Style Guide** (contraste WCAG AA, ver TECH_SPEC §8): texto do botão amarelo escuro em vez de branco; tag e ícone do carrinho em amarelo-escuro mais fechado; base-label um pouco mais escuro. Os demais valores seguem o Figma.
- **Tema escuro:** não existe no protótipo; foi derivado da mesma paleta (amarelo e roxo mais claros sobre fundo café escuro), mantendo as mesmas chaves de token.
- **Logo:** proposta gerada com IA em `docs/branding/originais/`; o símbolo (xícara) foi recortado para o Header e o favicon (ver README, seção Branding com IA).
- Tema inicial segue `prefers-color-scheme` se não houver escolha salva.
- Todos os componentes (cards, formulário, carrinho, sucesso) respeitam o tema por tokens semânticos.

## 8. Critérios de aceite gerais

- Projeto compila e roda sem erros nem warnings.
- Checklist da seção 10 do enunciado 100% marcado.
- Specs, AGENTS.md, README e AI_USAGE no GitHub; app publicada; prints de Home, Checkout, Sucesso e Dark Mode mobile; demo curta do fluxo.

## 9. Registro de decisões

| Data | Decisão | Motivo | Requisitos |
| --- | --- | --- | --- |
| 2026-11-24 | Botão − no carrinho não desce de 1; remoção pela lixeira | Evita remoção acidental; regra única e testada no reducer | RN-01, RF-05 |
| 2026-11-24 | Taxa de entrega fixa de R$ 3,50 (350 centavos); carrinho vazio não cobra | Valor fictício simples, em uma única constante | RN-03, RF-10 |
| 2026-11-24 | Manter o nome Coffee Delivery | Coerente com o protótipo e com a logo gerada | RF-16 |
| 2026-11-24 | Seguir a paleta e a tipografia do Style Guide do Figma | Fidelidade ao protótipo (rubrica). Uma identidade alternativa (verde/laranja) foi testada e descartada | RF-14, RF-16 |
| 2026-11-24 | Ajustar 4 cores do Style Guide para contraste AA | Requisito não funcional de acessibilidade (4,5:1 texto, 3:1 ícones) | NFR acessibilidade |

