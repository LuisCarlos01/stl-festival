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

3. **Validar antes de commit**
   ```bash
   npm run lint:fix    # Corrige problemas de lint
   npm run format      # Formata código
   npm run typecheck   # Verifica tipos
   npm run build       # Garante que build funciona
   ```

4. **Commit usando Conventional Commits**
   ```bash
   git commit -m "feat(hero): add video autoplay"
   ```

5. **Push e abrir PR**
   ```bash
   git push origin feat/nova-feature
   ```

6. **CI automático** valida o código
   - ✅ ESLint
   - ✅ Prettier
   - ✅ TypeScript
   - ✅ Build

7. **Preview deploy** gerado automaticamente pelo Vercel
   - URL comentada automaticamente no PR

8. **Code review** por outro desenvolvedor

9. **Merge** após aprovação
   - Production deploy automático após merge

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
