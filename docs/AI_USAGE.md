# Registro de uso de IA — Coffee Delivery

> Versão 1.0 · Atende à seção 8 do enunciado (mínimo de 3 interações) e à regra "Registro de uso de IA" do `AGENTS.md`.
> Cada registro segue o mesmo formato: contexto fornecido, prompt, objetivo, resposta resumida, decisão (aceita / ajustada / rejeitada) com justificativa, validação e evidência, e requisitos afetados.
>
> Os prompts estão registrados na versão estruturada (papel, contexto, tarefa, restrições, formato de saída e critério de aceite), consolidando as mensagens trocadas em cada etapa.

## 1. Ferramentas e forma de uso

| Ferramenta | Uso | Acesso ao projeto |
| --- | --- | --- |
| **Kiro** (assistente de IA no IDE, modelo selecionado automaticamente) | Análise dos SPECs, planejamento, implementação em etapas, revisão, testes e documentação | Leitura e escrita nos arquivos do repositório e execução de comandos (`npm`, testes, Playwright) |
| Ferramenta de geração de imagem (ver seção 4) | Propostas de logo | Nenhum; imagens importadas manualmente |

**Regras seguidas em todas as interações** (definidas no `AGENTS.md`):

- O agente lê `PRD_SPEC.md`, `TECH_SPEC.md` e `TASKS_SPEC.md` antes de alterar código.
- Ele trabalha em tarefas pequenas e propõe um plano antes de implementar.
- Uma tarefa só termina depois de `npm run lint`, `npm test` e `npm run build`.
- Nenhuma mudança de requisito acontece sem atualizar o SPEC correspondente.
- A aluna valida cada direção antes do avanço (por exemplo, a escolha da identidade visual).

## 2. Resumo das interações

| ID | Fase | Objetivo | Decisão | Requisitos |
| --- | --- | --- | --- | --- |
| IA-01 | Análise | Entender o enunciado e comparar com o estado do projeto | Aceita | todos |
| IA-02 | Interface | Propor e aplicar uma nova identidade visual | **Rejeitada depois** (ver IA-03) | RF-14, RF-15, RF-16 |
| IA-03 | Interface | Voltar à paleta e à tipografia do Style Guide do Figma | Aceita com ajustes de contraste | RF-14, RF-15, RF-16, NFR |
| IA-04 | Qualidade | Lacunas, ESLint, logo, teclado e responsividade | Aceita; 3 defeitos encontrados e corrigidos | RF-11, RF-13, RF-15, RF-16 |
| IA-05 | Verificação | Conferir RF-01 a RF-16 e RN-01 a RN-10, com evidência de cada um | Aceita; 1 afirmação falsa no SPEC corrigida | todos |

---

## IA-01 — Análise do enunciado e do projeto

- **Data:** 2026-11-24
- **Contexto fornecido:** o enunciado completo (seções 1 a 13), `AGENTS.md`, `docs/*.md` e o código em `src/`.
- **Prompt:**
  ```text
  Atue como mentor sênior de React e TypeScript no projeto final Coffee Delivery.

  Contexto: segue o enunciado completo da disciplina (anexo). Leia também AGENTS.md,
  docs/PRD_SPEC.md, docs/TECH_SPEC.md, docs/TASKS_SPEC.md e o código em src/.

  Tarefa:
  1. Liste os requisitos obrigatórios (RF-01 a RF-16, RN-01 a RN-10, seções 4, 5, 8 e 11).
  2. Compare com o estado atual do projeto. Rode npm run lint, npm test e npm run build
     e informe o resultado real.
  3. Aponte o que falta, com o peso de cada item na rubrica.
  4. Indique riscos para a apresentação (código que eu precise saber explicar).

  Restrições: não altere nenhum arquivo nesta etapa. Não suponha; cite o arquivo ou
  o comando que comprova cada afirmação.

  Formato: tabela "item | situação | pontos da rubrica", depois a próxima tarefa
  sugerida com critérios de aceite. Termine pedindo minha validação.
  ```
- **Objetivo:** mapear requisitos, rubrica e pendências antes de qualquer mudança.
- **Resposta resumida:**
  - A IA leu os três SPECs e rodou `npm install`, `lint`, `test` e `build`. Todos passaram: 33 testes, sem uso de `any`.
  - A IA montou uma tabela de pendências com o peso de cada uma na rubrica: pasta sem Git, `TASKS_SPEC` sem nenhum item marcado, decisões **[DECISÃO]** abertas, logo provisória, `AI_USAGE` vazio, sem prints e sem deploy.
  - A IA apontou um risco: o código existe sem histórico de tarefas, e a aluna precisa conseguir explicar tudo.
  - A IA propôs a T-01 como próxima tarefa e não implementou nada.
- **Decisão:** **aceita.** A tabela de pendências virou o plano de trabalho.
- **Validação / evidência:** a saída dos comandos (`Tests 33 passed`, build OK) e a tabela de pendências na conversa.
- **Requisitos:** todos (diagnóstico).

## IA-02 — Nova identidade visual (descartada)

- **Data:** 2026-11-24
- **Contexto fornecido:** `styles/themes.ts`, todos os componentes e os testes que dependem de textos visíveis.
- **Prompt:**
  ```text
  Quero redesenhar a interface do Coffee Delivery sem mudar o comportamento.

  Pode mudar: cores, tipografia, espaçamentos, layout, ícones e estilo dos componentes.
  Não pode mudar: reducer, contextos, hooks, schema Zod, integração ViaCEP, persistência,
  regras de negócio e os nomes acessíveis usados pelos testes (labels, aria-label, títulos).

  Etapa 1: proponha 3 direções visuais em tabela (conceito, paleta claro/escuro, fontes)
  e um plano em subtarefas com arquivos afetados e critérios de aceite. Aguarde minha escolha.

  Etapa 2 (após a escolha): implemente usando apenas tokens do tema (nenhum hex nos
  componentes). Mantenha o nome "Coffee Delivery". Não faça commits nesta etapa.

  Critério de aceite: lint, testes e build verdes; sem rolagem horizontal em 320, 390,
  768 e 1280 px; contraste mínimo 4,5:1 nos dois temas. Mostre prints de verificação.
  ```
- **Objetivo:** mudar só a aparência, mantendo regras de negócio, estado e testes.
- **Resposta resumida:**
  - A IA propôs 3 direções em tabela, com conceito, cores e fontes, e um plano de 7 subtarefas com critérios de aceite. Depois esperou a escolha da aluna.
  - Com a opção B escolhida, aplicou verde-oliva e laranja com Poppins e Inter.
  - Preservou os nomes acessíveis usados nos testes.
  - Em seguida conferiu o resultado com prints automáticos em 4 larguras e 2 temas. Assim encontrou e corrigiu uma rolagem horizontal de 2 px em 320 px.
- **Decisão:** **rejeitada depois** pela aluna (ver IA-03). A IA criou uma identidade nova sem perguntar se a fidelidade ao Figma devia ser mantida. A rubrica dá 15 pontos para "fidelidade ao Figma".
- **Lição registrada:** ao pedir uma mudança visual, deixar explícito o que não pode mudar (paleta e tipografia do protótipo).
- **Validação / evidência:** prints de antes e depois na conversa, testes verdes. As mudanças foram substituídas na IA-03.
- **Requisitos:** RF-14, RF-15, RF-16.

## IA-03 — Volta ao Style Guide do Figma com acessibilidade

- **Data:** 2026-11-24
- **Contexto fornecido:** um print do Style Guide do Figma (Cores, Tipografia, Ícones, Componentes) e `styles/themes.ts`.
- **Prompt:**
  ```text
  A direção visual anterior se afastou do protótipo e a rubrica avalia fidelidade ao Figma.
  Descarte a identidade verde/laranja e volte ao Style Guide do Figma (print anexado).

  Tarefa:
  1. Recrie os tokens com os nomes e valores do Style Guide: cores de produto
     (yellow, yellowDark, yellowLight, purple, purpleDark, purpleLight) e base
     (title, subtitle, text, label, hover, button, input, card, background, white).
  2. Use Baloo 2 nos títulos e Roboto nos textos, com os tamanhos da tabela de tipografia.
  3. Reproduza os componentes do Style Guide: Button (primary/secondary/icon), Cart
     (empty/full), Select, Input Text, Input Number e o card do catálogo (cantos 6/36 px).
  4. Antes de aplicar, meça o contraste de cada combinação texto/fundo. Se alguma
     reprovar no WCAG AA, proponha o menor ajuste possível e documente antes/depois
     no TECH_SPEC.
  5. Crie o tema escuro a partir da mesma paleta, com as mesmas chaves de token.

  Restrições: não altere comportamento nem testes; registre a decisão no PRD_SPEC.

  Critério de aceite: visual equivalente ao Figma no tema claro, contraste AA nos dois
  temas, lint/test/build verdes e prints de Home, Checkout e Sucesso.
  ```
- **Objetivo:** reproduzir a paleta amarelo + roxo, as fontes Baloo 2 + Roboto e os componentes do Style Guide (Button, Cart, Select, Input Text, Input Number, Card).
- **Resposta resumida:**
  - **Antes de aplicar a paleta, a IA mediu o contraste das cores do Figma.** Quatro combinações reprovavam no WCAG AA. Por exemplo, o texto branco no botão amarelo ficava em 2,1:1, abaixo do mínimo de 4,5:1.
  - A IA propôs tokens de ajuste (`ctaText`, `tagText`, `textMuted`, `badgeText`) e documentou cada um com o valor antes e depois.
  - Os nomes dos tokens seguem o Style Guide (`yellowDark`, `purpleLight`, `card`, `button`...).
  - O tema escuro não existe no Figma. Foi derivado da mesma paleta e mantém as mesmas chaves, garantidas pelo tipo `AppTheme`.
- **Decisão:** **aceita com ajustes.** Os valores do Figma foram mantidos sempre que passavam no contraste. Só as 4 cores reprovadas mudaram.
- **Validação / evidência:**
  - Script de contraste rodado nos dois temas.
  - Prints em 320, 390, 768 e 1280 px, sem rolagem horizontal.
  - 33 testes verdes.
  - Tabela de ajustes no `TECH_SPEC.md` §8 e decisão registrada no `PRD_SPEC.md` §9.
- **Requisitos:** RF-14, RF-15, RF-16, requisito não funcional de acessibilidade.

## IA-04 — Lacunas, logo, ESLint e verificação de comportamento

- **Data:** 2026-11-24
- **Contexto fornecido:** checklist da seção 10 do enunciado, rubrica e `public/logo.png` e `public/logo.jpg` (propostas de logo geradas com IA).
- **Prompt:**
  ```text
  Compare o projeto com o checklist de validação final (seção 10 do enunciado) e a rubrica.
  Depois execute tudo o que não depende das minhas contas externas.

  Escopo: incluído — ESLint, logo, favicon, screenshots, acessibilidade, TASKS_SPEC e
  AI_USAGE. Excluído por enquanto — git init, commits, GitHub e deploy.

  Logo: reutilize as propostas já geradas com IA (public/logo.png e public/logo.jpg).
  Extraia um símbolo legível em 40 px para o Header e gere favicon e apple-touch-icon.
  Teste a legibilidade em 32 e 16 px e salve a evidência em docs/branding/.

  Acessibilidade: execute o fluxo completo de compra apenas com teclado em navegador
  real e confirme foco visível em todos os elementos.

  Documentação: preencha TASKS_SPEC (status real de cada tarefa e registro de testes)
  seguindo boas práticas de especificação: rastreabilidade com RF/RN, critério de
  pronto verificável e evidência para cada item. Não marque como feito o que não foi
  verificado.

  Critério de aceite: lint/test/build verdes; nenhum arquivo pesado em public/;
  cada afirmação do TASKS_SPEC comprovável por arquivo, teste ou comando.
  ```
- **Objetivo:** fechar as pendências que não dependem do GitHub.
- **Resposta resumida:**
  - **Escopo respeitado:** a IA não iniciou Git, não publicou e não fez deploy, porque essas ações exigem login na conta da aluna.
  - **ESLint 9:** instalado com `typescript-eslint` e `react-hooks`, e a regra `no-explicit-any` passou a dar erro. Um caso de `_variavel` descartada de propósito foi resolvido na configuração da regra, sem alterar o teste.
  - **Avisos do React Router:** eliminados nos testes com as flags `future` no `MemoryRouter`.
  - **Logo:** o símbolo da xícara foi recortado da proposta principal, porque o texto fica ilegível em 40 px. A IA gerou `favicon.png`, `apple-touch-icon.png` e `logo-mark.png` e testou a leitura em 32 e 16 px. Os originais (4 MB) saíram de `public/` para não pesar no build.
  - **Defeito 1, achado em teste de teclado:** depois de confirmar o pedido, a tela mostrava "Seu carrinho está vazio" por um instante antes do sucesso. A causa é que o React Router faz a navegação como transição e o `CLEAR` renderiza antes. A correção foi um `useRef` (`submittedRef`). O comportamento foi conferido gravando os títulos `h1` exibidos na tela.
  - **Defeito 2:** a primeira recorte da logo incluía pedaços das letras. A IA refez o recorte e conferiu de novo.
  - **Defeito 3:** os prints de verificação estavam sendo salvos na raiz do projeto. A IA percebeu porque os tamanhos dos arquivos não mudavam, moveu os arquivos e limpou a raiz.
- **Decisão:** **aceita.**
- **Validação / evidência:**
  - Playwright: compra completa só com teclado e foco visível em todos os elementos.
  - Sequência de títulos `['Complete seu pedido', 'Uhu! Pedido confirmado']`.
  - `docs/branding/teste-32px.png` e `docs/screenshots/` (10 prints).
- **Requisitos:** RF-11, RF-13, RF-15, RF-16.

## IA-05 — Verificação requisito a requisito

- **Data:** 2026-11-24
- **Contexto fornecido:** a seção 3 do enunciado (RF-01 a RF-16 e RN-01 a RN-10) e o `TASKS_SPEC.md`.
- **Prompt:**
  ```text
  Faça uma auditoria de conformidade com a seção 3 do enunciado (tabela anexa:
  RF-01 a RF-16 e RN-01 a RN-10).

  Para cada requisito, informe: atende (sim / parcial / não) e a evidência concreta
  (arquivo, nome do teste ou comando executado). Não use "deve estar" ou suposições:
  se não houver evidência, marque como não verificado.

  Em seguida, execute as verificações que estiverem pendentes (por exemplo, se o
  favicon e a logo são servidos com HTTP 200 no build de produção) e corrija qualquer
  afirmação dos SPECs que não se confirmar, preferindo completar o que falta (ex.:
  escrever o teste ausente) em vez de apagar o registro.

  Formato: duas tabelas (RF e RN) e, ao final, a lista do que ainda falta.
  ```
- **Objetivo:** confirmar com evidência, e não por suposição, que cada requisito está atendido.
- **Resposta resumida:**
  - Para cada RF e RN, a IA apontou o arquivo ou teste que comprova o atendimento.
  - O RF-16 ficou marcado como parcial, porque falta a documentação da ferramenta e do prompt da logo.
  - A IA conferiu por HTTP que o favicon e as imagens carregam (status 200).
  - **A IA encontrou uma afirmação falsa que ela mesma tinha escrito no `TASKS_SPEC.md`:** que a rota 404 estava testada. Ela criou o teste que faltava, em vez de só apagar a frase.
- **Decisão:** **aceita.**
- **Validação / evidência:** `Tests 34 passed`, saída do `curl` com `200 image/png` e o teste novo em `src/tests/checkoutFlow.test.tsx`.
- **Requisitos:** todos.

---

## 3. Análise crítica

**Onde a IA ajudou:**
- Medir contraste e verificar o comportamento em navegador real (rolagem horizontal, teclado, piscada de tela). Essas checagens não aparecem nos testes unitários.
- Rastrear cada requisito do PRD até um arquivo ou um teste.

**Onde a IA errou ou precisou de correção humana:**
- Criou uma identidade visual nova sem checar a fidelidade ao Figma (IA-02). A aluna corrigiu a direção.
- Registrou um teste que não existia (IA-05). A própria IA corrigiu quando foi pedida a verificação.
- Fez um primeiro recorte ruim da logo e salvou arquivos no lugar errado (IA-04). Ela mesma percebeu e corrigiu.

**O que não foi delegado à IA:**
- A escolha da identidade e a decisão de seguir o protótipo.
- O que entra no escopo, como deixar o GitHub para depois.
- A publicação e a conta de deploy.

**Como a aluna validou:** revisando os prints de cada tela, conferindo os RF e RN contra o enunciado e exigindo que os comandos de qualidade passassem antes de seguir.

## 4. Branding com IA (logo)

Detalhes completos na seção "Branding com IA" do `README.md`. Arquivos em `docs/branding/`:

| Arquivo | O que é |
| --- | --- |
| `originais/logo-principal.png` | Proposta escolhida: xícara com vapor, grão de café e nome em serifa, em tons de café |
| `originais/logo-alternativa.jpg` | Segunda proposta, minimalista, com o slogan "Café fresquinho" |
| `teste-32px.png`, `teste-16px.png` | Teste de legibilidade do símbolo em tamanho de favicon |

> **Prompt reconstruído:** o prompt original da geração das logos não ficou salvo. O texto no README foi reescrito para reproduzir as mesmas propostas e está marcado como **reconstruído**. Para ter evidência completa, rode esse prompt na ferramenta, salve o resultado em `docs/branding/` e registre a ferramenta usada.
