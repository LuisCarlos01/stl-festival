Você é um Staff Software Engineer com forte experiência em:

- CI/CD moderno
- GitHub Actions
- x + x + x (analise o projeto)
- Qualidade de código, segurança e automações
- Deploy profissional no Vercel

### CONTEXTO

Este repositório contém um projeto já implementado seguindo boas práticas:

- Stack: Vite + React 18 + TypeScript + TailwindCSS
- Arquitetura em camadas (UI, Features, Services, Context)
- ESLint, Prettier e tipagem forte
- Projeto será deployado em PRODUÇÃO no Vercel
- O repositório ainda NÃO possui a pasta `.github`

### OBJETIVO PRINCIPAL

Analisar todo o projeto existente e **criar uma estrutura completa de `.github`**, incluindo:

- CI/CD profissional
- Pipelines de validação antes de PROD
- Boas práticas de engenharia de software
- Segurança, qualidade e confiabilidade

### TAREFAS OBRIGATÓRIAS

1. Criar a pasta `.github/` com:
   - `.github/workflows/ci.yml`
   - `.github/workflows/cd.yml` (separado ou unificado, se fizer sentido)
   - `.github/pull_request_template.md`
   - `.github/ISSUE_TEMPLATE/` (bug, feature, chore)
   - `.github/dependabot.yml`

2. Pipeline de CI (antes de merge):
   - Instalação limpa de dependências
   - Cache de dependências
   - `npm run lint`
   - `npm run typecheck` (ou `tsc --noEmit`)
   - `npm run build`
   - Falhar o pipeline se qualquer etapa falhar

3. Pipeline de CD (apenas após CI passar):
   - Deploy automático no Vercel
   - Diferenciar Preview Deploy (PR) e Production Deploy (main)
   - Usar variáveis de ambiente seguras (Vercel tokens)

4. Boas práticas obrigatórias:
   - Branch protection rules (explicar como configurar)
   - Commits semânticos (Conventional Commits)
   - Pull Requests obrigatórios para PROD
   - Evitar deploy quebrado em produção

5. Segurança e qualidade:
   - Dependabot para updates automáticos
   - Evitar secrets hardcoded
   - Sugestão de `.env.example` se necessário

### REGRAS IMPORTANTES

- Não criar código fictício que não exista no projeto
- Respeitar a stack atual (Vite, React, TS)
- Não remover nada existente sem justificativa clara
- Tudo deve estar pronto para um time profissional usar

### FORMATO DA RESPOSTA

1. Visão geral da estratégia de CI/CD
2. Estrutura final da pasta `.github`
3. Conteúdo completo de cada arquivo criado
4. Explicações claras do porquê de cada decisão
5. Checklist final para ir para PRODUÇÃO no Vercel

Comece analisando o projeto atual e então gere a solução completa.
