# CI/CD Setup - STL Festival

Este documento descreve a infraestrutura completa de CI/CD configurada para o projeto STL Festival.

## Visão Geral

O projeto utiliza GitHub Actions para automação de CI/CD com deploy automático no Vercel. A estratégia garante qualidade de código, segurança e confiabilidade antes de qualquer deploy em produção.

## Estrutura de Workflows

### CI Workflow (`.github/workflows/ci.yml`)

**Gatilhos:**

- Push em qualquer branch
- Pull Requests para `main` ou `master`

**Validações executadas:**

1. ✅ ESLint (linting de código)
2. ✅ Prettier (verificação de formatação)
3. ✅ TypeScript (type checking)
4. ✅ Build (compilação do projeto)

**Características:**

- Cache de dependências npm para acelerar execuções
- Matrix strategy preparada para múltiplas versões do Node.js
- Falha imediata se qualquer validação falhar

### CD Workflow (`.github/workflows/cd.yml`)

**Gatilhos:**

- Push para `main` ou `master` (production deploy)
- Pull Requests (preview deploy)

**Processo:**

1. Build do projeto
2. Deploy no Vercel:
   - **Preview Deploy**: Para PRs (comentário automático com URL)
   - **Production Deploy**: Para branch `main`

**Secrets GitHub necessários:**

- `VERCEL_TOKEN`: Token de deploy do Vercel
- `VERCEL_ORG_ID`: ID da organização Vercel
- `VERCEL_PROJECT_ID`: ID do projeto Vercel

## Scripts Disponíveis

```bash
# Linting e Formatação
npm run lint          # Executa ESLint
npm run lint:fix      # Executa ESLint e corrige automaticamente
npm run format        # Formata código com Prettier
npm run format:check  # Verifica formatação sem modificar arquivos

# Validação
npm run typecheck     # Verifica tipos TypeScript sem compilar

# Build
npm run build         # Build de produção
npm run dev           # Servidor de desenvolvimento
npm run preview       # Preview do build de produção
```

## Configuração Inicial

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Secrets no GitHub

1. Acesse: **Settings → Secrets and variables → Actions**
2. Adicione os seguintes secrets:

   **VERCEL_TOKEN:**
   - Acesse: https://vercel.com/account/tokens
   - Crie um novo token
   - Copie e adicione como secret

   **VERCEL_ORG_ID e VERCEL_PROJECT_ID:**

   ```bash
   # Instalar Vercel CLI globalmente
   npm install -g vercel

   # Fazer login
   vercel login

   # Obter informações do projeto
   vercel link
   # Ou executar:
   vercel --token=$VERCEL_TOKEN
   ```

   - Os IDs serão exibidos no output ou em `.vercel/project.json`

### 3. Configurar Branch Protection Rules

**Settings → Branches → Add rule** para `main`:

1. ✅ **Require pull request reviews before merging**
   - Require approvals: 1 (ou mais conforme seu time)
   - Dismiss stale reviews when new commits are pushed

2. ✅ **Require status checks to pass before merging**
   - Require branches to be up to date before merging
   - Status checks: `validate` (do workflow CI)

3. ✅ **Require conversation resolution before merging**

4. ✅ **Do not allow bypassing the above settings**
   - Inclui administrators (recomendado)

5. ⚠️ **Require linear history** (opcional)
   - Força rebases em vez de merge commits

### 4. Configurar Variáveis de Ambiente no Vercel

1. Acesse o dashboard do Vercel
2. Vá em **Settings → Environment Variables**
3. Adicione:
   - `CLOUDINARY_VIDEO_URL`: URL do vídeo hospedado no Cloudinary

## Conventional Commits

Todos os commits devem seguir o padrão **Conventional Commits**:

```
type(scope): description

Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore
```

**Exemplos:**

- `feat(hero): add video autoplay on scroll`
- `fix(preloader): resolve mobile detection issue`
- `chore(deps): update framer-motion to 11.1.0`
- `ci: add typecheck step to CI workflow`

## Git Hooks (Husky)

O projeto utiliza **Husky** para executar validações automáticas antes de commits e pushes, garantindo qualidade de código e padronização antes mesmo do código chegar ao CI.

### Hooks Configurados

#### 1. `pre-commit` - Validação Rápida

Executado automaticamente antes de cada commit:

- ✅ **Lint-staged**: Executa ESLint e Prettier apenas nos arquivos staged
- ⚡ **Performance**: Rápido (2-5 segundos)
- 🔧 **Correção automática**: ESLint corrige problemas automaticamente quando possível

**O que acontece:**

- Arquivos `.js`, `.jsx`, `.ts`, `.tsx` → ESLint + Prettier
- Arquivos `.astro`, `.json`, `.md` → Prettier

#### 2. `commit-msg` - Validação de Mensagens

Executado automaticamente para validar o formato da mensagem de commit:

- ✅ **Commitlint**: Valida formato Conventional Commits
- ⚡ **Performance**: Instantâneo (<1 segundo)
- 🚫 **Bloqueia commits**: Falha se formato incorreto

**Tipos permitidos:**

- `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`

**Scopes permitidos:**

- `hero`, `preloader`, `deps`, `config`, `ci`, `docs`

**Exemplos válidos:**

- ✅ `feat(hero): add video autoplay`
- ✅ `fix(preloader): resolve mobile detection`
- ❌ `fix: bug` (falta scope)
- ❌ `add feature` (formato incorreto)

#### 3. `pre-push` - Validações Completas

Executado automaticamente antes de cada push:

- ✅ **TypeScript**: Type checking completo
- ✅ **Build**: Garante que o projeto compila
- ⏱️ **Performance**: Mais lento (10-30 segundos), mas garante qualidade

**Justificativa:**

- Typecheck completo é mais lento, mas garante que não há erros de tipo
- Build garante que o projeto compila corretamente
- Executado apenas antes do push (não bloqueia commits locais rápidos)

### Workflow com Git Hooks

1. **Desenvolvedor faz alterações**

   ```bash
   # Edita arquivos...
   ```

2. **Adiciona arquivos ao staging**

   ```bash
   git add .
   ```

3. **Faz commit** → **`pre-commit`** roda automaticamente
   - Lint-staged valida e corrige arquivos staged
   - Se houver erros não corrigíveis, commit é bloqueado

4. **Mensagem de commit** → **`commit-msg`** valida automaticamente

   ```bash
   git commit -m "feat(hero): add video autoplay"
   ```

   - Se formato incorreto, commit é bloqueado

5. **Push** → **`pre-push`** roda automaticamente

   ```bash
   git push origin feat/nova-feature
   ```

   - Typecheck completo
   - Build do projeto
   - Se algum falhar, push é bloqueado

6. **CI no GitHub Actions** valida novamente (redundância proposital)

### Bypass de Hooks (Emergências)

Em situações críticas, hooks podem ser bypassados:

```bash
# Bypass pre-commit e commit-msg
git commit --no-verify -m "emergency fix"

# Bypass pre-push
git push --no-verify
```

⚠️ **Atenção**: Use apenas em emergências. O CI ainda validará o código.

### Troubleshooting Git Hooks

#### Hook não está executando

```bash
# Verificar se Husky está instalado
ls -la .husky/

# Reinstalar hooks (executado automaticamente no npm install)
npm run prepare

# Verificar permissões dos hooks
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
chmod +x .husky/pre-push
```

#### Pre-commit falha com erros de lint

```bash
# Corrigir manualmente antes de commitar
npm run lint:fix
npm run format

# Ou deixar o lint-staged corrigir automaticamente
git add .
git commit -m "feat: your message"
```

#### Commit-msg rejeita mensagem válida

Verifique o formato:

- ✅ `type(scope): description`
- ✅ Scope deve estar na lista permitida (ver `commitlint.config.js`)
- ✅ Type deve estar na lista permitida

#### Pre-push falha com erros de TypeScript

```bash
# Verificar erros localmente
npm run typecheck

# Corrigir erros antes de fazer push
```

### Integração com CI/CD

- **Husky não substitui o CI**: O GitHub Actions continua validando tudo
- **Husky previne problemas**: Desenvolvedores recebem feedback antes de fazer push
- **Economia de recursos**: Menos execuções de CI com código inválido
- **Redundância proposital**: CI valida novamente para garantir consistência

## Dependabot

O projeto está configurado com Dependabot para atualizações automáticas:

- **Frequência**: Semanal (segundas-feiras às 09:00)
- **Limite de PRs abertos**: 5 (npm) + 3 (GitHub Actions)
- **Agrupamento**: Dependências de produção e desenvolvimento separadas
- **Labels automáticos**: `dependencies`, `npm`, `ci`

### Revisar PRs do Dependabot

1. PRs são criados automaticamente
2. CI roda automaticamente em cada PR
3. Revisar e mergear quando apropriado
4. Breaking changes serão destacados no PR

## Fluxo de Trabalho Diário

1. **Criar feature branch** a partir de `main`

   ```bash
   git checkout -b feat/nova-feature
   ```

2. **Desenvolver** localmente

   ```bash
   npm run dev
   ```

3. **Adicionar arquivos ao staging**

   ```bash
   git add .
   ```

4. **Commit usando Conventional Commits**

   ```bash
   git commit -m "feat(hero): add video autoplay"
   ```

   **Git Hooks executam automaticamente:**
   - ✅ **pre-commit**: Lint-staged valida e corrige arquivos staged (ESLint + Prettier)
   - ✅ **commit-msg**: Commitlint valida formato da mensagem

   ⚠️ Se algum hook falhar, o commit será bloqueado. Corrija os problemas antes de tentar novamente.

5. **Push e abrir PR**

   ```bash
   git push origin feat/nova-feature
   ```

   **Git Hook executa automaticamente:**
   - ✅ **pre-push**: Typecheck completo + Build do projeto

   ⚠️ Se o hook falhar, o push será bloqueado. Corrija os problemas antes de tentar novamente.

6. **CI automático** valida o código (redundância proposital)
   - ✅ ESLint
   - ✅ Prettier
   - ✅ TypeScript
   - ✅ Build

7. **Preview deploy** gerado automaticamente pelo Vercel
   - URL comentada automaticamente no PR

8. **Code review** por outro desenvolvedor

9. **Merge** após aprovação
   - Production deploy automático após merge

### Validação Manual (Opcional)

Se preferir validar manualmente antes de commitar:

```bash
npm run lint:fix    # Corrige problemas de lint
npm run format      # Formata código
npm run typecheck   # Verifica tipos
npm run build       # Garante que build funciona
```

**Nota**: Os Git Hooks executam essas validações automaticamente, mas você pode executá-las manualmente se preferir.

## Troubleshooting

### CI falha com erros de lint

```bash
# Corrigir automaticamente
npm run lint:fix

# Verificar formatação
npm run format:check
npm run format  # Se necessário
```

### CI falha com erros de TypeScript

```bash
# Verificar tipos localmente
npm run typecheck

# Corrigir erros de tipo
# (geralmente requer mudanças no código)
```

### Deploy falha no Vercel

1. Verificar se secrets estão configurados corretamente
2. Verificar logs do workflow no GitHub Actions
3. Verificar se build local funciona: `npm run build`
4. Verificar variáveis de ambiente no Vercel

### Preview deploy não aparece no PR

1. Verificar se workflow `cd.yml` está rodando
2. Verificar se secrets estão configurados
3. Verificar logs do GitHub Actions

## Monitoramento

### GitHub Actions

- Acesse: **Actions** tab no GitHub
- Monitore execuções dos workflows
- Configure notifications para falhas

### Vercel Dashboard

- Acesse: https://vercel.com/dashboard
- Monitore deploys e logs
- Configure webhooks para notificações (Slack, Discord, etc.)

## Próximos Passos (Futuro)

- [ ] Adicionar testes unitários (Vitest)
- [ ] Lighthouse CI para performance budgets
- [ ] Visual regression testing (Chromatic/Percy)
- [ ] Sentry para error tracking
- [ ] Renovate.bot como alternativa ao Dependabot

## Referências

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files-new)
- [Prettier Documentation](https://prettier.io/docs/en/)
