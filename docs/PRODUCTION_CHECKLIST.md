# Checklist de Produção - STL Festival

Use este checklist antes do primeiro deploy em produção.

## ✅ Pré-requisitos

### 1. Instalação Local
- [ ] `npm install` executado com sucesso
- [ ] `npm run lint` passa sem erros
- [ ] `npm run typecheck` passa sem erros
- [ ] `npm run build` gera arquivos em `dist/`
- [ ] `npm run preview` funciona localmente

### 2. Configuração no Vercel
- [ ] Projeto criado no Vercel
- [ ] Repositório GitHub conectado ao Vercel
- [ ] Variáveis de ambiente configuradas:
  - [ ] `CLOUDINARY_VIDEO_URL` (e outras necessárias)
- [ ] Build settings verificadas:
  - [ ] Framework: Astro
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `dist`
  - [ ] Install Command: `npm ci`

### 3. Secrets no GitHub
- [ ] `VERCEL_TOKEN` configurado em **Settings → Secrets and variables → Actions**
- [ ] `VERCEL_ORG_ID` configurado
- [ ] `VERCEL_PROJECT_ID` configurado

**Como obter:**
```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Link projeto (mostra IDs)
vercel link

# Ou executar deploy (mostra IDs no output)
vercel --token=$VERCEL_TOKEN
```

### 4. Branch Protection Rules
- [ ] Acessar **Settings → Branches → Add rule** para `main`
- [ ] ✅ Require pull request reviews before merging (1 approval mínimo)
- [ ] ✅ Require status checks to pass before merging
  - [ ] Status check: `validate` (do workflow CI)
  - [ ] Require branches to be up to date
- [ ] ✅ Require conversation resolution before merging
- [ ] ✅ Do not allow bypassing (inclui admins)

## 🧪 Testes Finais

### Teste de CI/CD
- [ ] Criar branch de teste: `git checkout -b test/ci-setup`
- [ ] Fazer pequena mudança (ex: adicionar comentário)
- [ ] Commit: `git commit -m "test: verify CI/CD setup"`
- [ ] Push: `git push origin test/ci-setup`
- [ ] Abrir PR para `main`
- [ ] Verificar que CI workflow roda e passa
- [ ] Verificar que preview deploy é gerado
- [ ] Verificar que URL de preview aparece como comentário no PR
- [ ] Merge PR
- [ ] Verificar que production deploy é executado automaticamente

### Validação de Produção
- [ ] Site acessível na URL de produção
- [ ] Todas as páginas carregam corretamente
- [ ] Vídeo do Hero carrega (se aplicável)
- [ ] Preloader funciona corretamente
- [ ] Responsividade testada (mobile/desktop)
- [ ] Console do navegador sem erros críticos
- [ ] Performance aceitável (Lighthouse score > 90)

## 📋 Pós-Deploy

### Monitoramento
- [ ] Configurar notificações do GitHub Actions (falhas)
- [ ] Configurar webhook do Vercel para Slack/Discord (opcional)
- [ ] Verificar logs do Vercel dashboard
- [ ] Verificar analytics (se configurado)

### Manutenção Contínua
- [ ] Revisar PRs do Dependabot semanalmente
- [ ] Manter `.env.example` atualizado
- [ ] Documentar mudanças significativas
- [ ] Rotacionar `VERCEL_TOKEN` a cada 90 dias

## 🚨 Troubleshooting

### CI falha
- Verificar logs em **Actions** tab
- Executar localmente: `npm run lint`, `npm run typecheck`, `npm run build`
- Corrigir erros e fazer novo commit

### Deploy falha
- Verificar se secrets estão configurados
- Verificar logs do workflow `cd.yml`
- Verificar se build local funciona
- Verificar variáveis de ambiente no Vercel

### Preview não aparece no PR
- Verificar se workflow `cd.yml` está rodando
- Verificar logs do GitHub Actions
- Verificar se secrets estão configurados corretamente

## 📚 Documentação

- [CI/CD Setup Completo](CI_CD_SETUP.md)
- [README Principal](../README.md)

## ✅ Tudo Pronto?

Se todos os itens acima estão marcados, você está pronto para produção! 🚀
