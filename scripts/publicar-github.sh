#!/bin/sh
# Publica o Coffee Delivery no GitHub com commits semânticos agrupados por assunto.
# Uso (macOS/Linux), na raiz do projeto:  sh scripts/publicar-github.sh
# Equivalente para Windows: scripts\publicar-github.bat
set -e

REMOTE="https://github.com/isabellematos/coffee-delivery.git"

cd "$(dirname "$0")/.."

if [ -d .git ]; then
  echo "Já existe um repositório Git nesta pasta. Nada foi alterado."
  exit 1
fi

echo "== Conferindo qualidade antes de publicar =="
npm run lint
npm test
npm run build

git init
git branch -M main

git add package.json package-lock.json tsconfig.json vite.config.ts eslint.config.js \
  index.html .gitignore render.yaml vercel.json public/_redirects scripts
git commit -m "chore: configura Vite, React, TypeScript strict, ESLint e deploy no Render"

git add src/types src/data src/utils public/coffees
git commit -m "feat: adiciona tipos, catálogo de cafés e utilitários de dinheiro, carrinho e CEP"

git add src/reducers src/contexts src/hooks
git commit -m "feat: implementa carrinho com Context API, useReducer e persistência em localStorage"

git add src/App.tsx src/main.tsx src/AppProviders.tsx src/vite-env.d.ts src/pages src/schemas src/components
git commit -m "feat: cria páginas, rotas, checkout com ViaCEP e Zod e tela de sucesso"

git add src/styles public/favicon.png public/apple-touch-icon.png public/logo-mark.png docs/branding
git commit -m "style: aplica tokens do Style Guide do Figma, temas claro/escuro e logo gerada com IA"

git add src/tests
git commit -m "test: cobre reducer, cálculos, persistência, schema, useCep e fluxo de compra"

git add AGENTS.md README.md docs
git commit -m "docs: adiciona PRD, TECH e TASKS SPEC, AGENTS, registro de uso de IA e screenshots"

# Segurança: algum arquivo ficou de fora dos grupos acima?
if [ -n "$(git status --porcelain)" ]; then
  echo "Arquivos não incluídos nos commits:"
  git status --short
  echo "Revise antes de publicar. Nada foi enviado."
  exit 1
fi

git remote add origin "$REMOTE"
git push -u origin main

echo "== Publicado em $REMOTE =="
