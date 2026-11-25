# AGENTS.md — Coffee Delivery

## Contexto

Projeto final da disciplina Single Page Application: SPA de e-commerce de cafeteria (catálogo, carrinho, checkout, confirmação). Sem backend, sem pagamento real. A aluna precisa conseguir explicar todo o código, então o objetivo é ensinar junto, não só entregar código pronto.

O protótipo do Figma é a referência visual, mas as regras de negócio vêm dos SPECs.

## Antes de escrever qualquer código

1. Ler `docs/PRD_SPEC.md`, `docs/TECH_SPEC.md` e `docs/TASKS_SPEC.md`.
2. Identificar a próxima tarefa pendente em `TASKS_SPEC.md`.
3. Se algo estiver ambíguo ou conflitar com os SPECs, perguntar antes de decidir.

## Stack

React + Vite + TypeScript (`strict`), React Router, Context API + `useReducer`, React Hook Form + Zod, styled-components, Vitest + Testing Library, ViaCEP.

## Como trabalhar

- **Uma tarefa pequena por vez.** Nunca gerar a aplicação inteira de uma vez.
- Para cada tarefa: propor o plano, os arquivos afetados, os critérios de aceite e os testes; esperar a validação da aluna; implementar; explicar as decisões.
- Explicar em linguagem simples os conceitos usados (Context, reducer, hooks, Zod) para que ela consiga defender o código na apresentação.
- Consultar a documentação oficial (e Context7 MCP, se disponível) antes de usar uma biblioteca. Playwright MCP pode apoiar testes.

## Regras de código

- Sem `any`. Tipos em `src/types`.
- Regras de negócio em funções puras (`reducers`, `utils`), não em componentes nem no `App.tsx`.
- Imutabilidade: nada de `push`, `splice` ou mutação direta do estado; usar `map`, `filter`, `find`, `reduce`, spread.
- Dinheiro sempre em centavos; formatar só na exibição.
- Taxa de entrega em uma única constante.
- Cores só por tokens do tema, nada de hex solto nos componentes.
- Acessibilidade em todo componente novo: label, foco visível, `aria-*` nos erros, navegação por teclado.
- Componentes pequenos e reutilizáveis, com Props tipadas.

## Limites de escopo

- Não adicionar backend, login ou pagamento real.
- Extras (busca, cupom, histórico, E2E) só depois de todo o fluxo obrigatório estar pronto e aprovado.
- Não mudar requisitos dos SPECs sem pedir; se uma decisão mudar, atualizar o SPEC no mesmo commit.

## Testes

- Escrever teste junto com a lógica (reducer, cálculos, schema, `useCep`, persistência).
- Rodar `npm run lint`, `npm test` e `npm run build` antes de dar a tarefa como pronta.

## Git

- Commits pequenos e semânticos: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `style:`.
- Um commit por tarefa do `TASKS_SPEC.md`, marcando o checklist e registrando o teste feito.
- Nunca commitar `node_modules`, `.env` ou segredos.

## Definição de pronto

Funcionalidade observável, requisito atendido, testes feitos, documentação atualizada, commit registrado.

## Registro de uso de IA

Ao final de interações relevantes, lembrar a aluna de registrar em `docs/AI_USAGE.md`: prompt, objetivo, resposta resumida, decisão tomada e evidência.

## Prompt inicial sugerido

> Atue como mentor de React e TypeScript neste projeto Coffee Delivery. Leia PRD_SPEC.md, TECH_SPEC.md, TASKS_SPEC.md e AGENTS.md. Identifique a próxima tarefa pendente, com critérios de aceite e plano de testes. Não implemente tudo de uma vez. Explique as decisões e peça que eu valide antes de avançar.
