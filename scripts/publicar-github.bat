@echo off
REM Publica o Coffee Delivery no GitHub com commits semânticos agrupados por assunto.
REM Uso (Windows), na raiz do projeto:  scripts\publicar-github.bat
REM Equivalente para macOS/Linux: sh scripts/publicar-github.sh
chcp 65001 >nul
setlocal

set REMOTE=https://github.com/isabellematos/coffee-delivery.git
cd /d "%~dp0.."

if exist .git (
  echo Ja existe um repositorio Git nesta pasta. Nada foi alterado.
  exit /b 1
)

echo == Conferindo qualidade antes de publicar ==
call npm run lint || exit /b 1
call npm test || exit /b 1
call npm run build || exit /b 1

git init || exit /b 1
git branch -M main

git add package.json package-lock.json tsconfig.json vite.config.ts eslint.config.js index.html .gitignore render.yaml vercel.json public/_redirects scripts
git commit -m "chore: configura Vite, React, TypeScript strict, ESLint e deploy no Render" || exit /b 1

git add src/types src/data src/utils public/coffees
git commit -m "feat: adiciona tipos, catálogo de cafés e utilitários de dinheiro, carrinho e CEP" || exit /b 1

git add src/reducers src/contexts src/hooks
git commit -m "feat: implementa carrinho com Context API, useReducer e persistência em localStorage" || exit /b 1

git add src/App.tsx src/main.tsx src/AppProviders.tsx src/vite-env.d.ts src/pages src/schemas src/components
git commit -m "feat: cria páginas, rotas, checkout com ViaCEP e Zod e tela de sucesso" || exit /b 1

git add src/styles public/favicon.png public/apple-touch-icon.png public/logo-mark.png docs/branding
git commit -m "style: aplica tokens do Style Guide do Figma, temas claro/escuro e logo gerada com IA" || exit /b 1

git add src/tests
git commit -m "test: cobre reducer, cálculos, persistência, schema, useCep e fluxo de compra" || exit /b 1

git add AGENTS.md README.md docs
git commit -m "docs: adiciona PRD, TECH e TASKS SPEC, AGENTS, registro de uso de IA e screenshots" || exit /b 1

REM Seguranca: algum arquivo ficou de fora dos grupos acima?
for /f %%i in ('git status --porcelain') do (
  echo Ha arquivos nao incluidos nos commits. Revise com "git status". Nada foi enviado.
  exit /b 1
)

git remote add origin %REMOTE%
git push -u origin main || exit /b 1

echo == Publicado em %REMOTE% ==
endlocal
