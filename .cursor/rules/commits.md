# Conventional Commits - Guidelines

## Padrão Obrigatório

Todos os commits devem seguir o padrão **Conventional Commits** e estar em **inglês**.

## Formato

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Tipos de Commit

### `feat`

Nova funcionalidade para o usuário (não uma nova funcionalidade para build script)

```bash
feat(preloader): add scroll-controlled curtain animation
feat(hero): implement hero section with fade-in animation
```

### `fix`

Correção de bug para o usuário (não uma correção para build script)

```bash
fix(preloader): prevent scroll during animation on mobile
fix(seo): correct meta tags for social sharing
```

### `docs`

Mudanças apenas na documentação

```bash
docs: update setup instructions
docs(api): add JSDoc comments to Preloader component
```

### `style`

Mudanças que não afetam o significado do código (espaço em branco, formatação, ponto e vírgula faltando, etc)

```bash
style: format code with Prettier
style(preloader): fix indentation
```

### `refactor`

Refatoração de código de produção, ex. renomear uma variável

```bash
refactor(preloader): extract scroll handler to separate function
refactor: reorganize component structure
```

### `perf`

Mudança de código que melhora performance

```bash
perf(preloader): optimize animation with GPU-accelerated properties
perf: reduce bundle size by code splitting
```

### `test`

Adicionar testes ausentes ou corrigir testes existentes

```bash
test(preloader): add unit tests for scroll control
test: add e2e tests for hero section
```

### `build`

Mudanças que afetam o sistema de build ou dependências externas (ex: npm, gulp, webpack, etc)

```bash
build: update Astro to v4.1.0
build(deps): add framer-motion dependency
```

### `ci`

Mudanças em arquivos e scripts de CI (ex: GitHub Actions, CircleCI, etc)

```bash
ci: add Lighthouse performance check
ci: configure automated testing workflow
```

### `chore`

Outras mudanças que não modificam src ou arquivos de teste

```bash
chore: update .gitignore
chore: configure ESLint rules
```

## Escopo (Opcional)

Escopo especifica a área do código afetada. Exemplos:

- `preloader` - Componente Preloader
- `hero` - Seção Hero
- `stack` - Configuração da stack
- `seo` - Otimizações SEO
- `performance` - Otimizações de performance
- `responsive` - Ajustes de responsividade

## Descrição

- Use o modo imperativo, presente do indicativo ("add" não "adds" nem "added")
- Não capitalize a primeira letra
- Sem ponto (.) no final
- Máximo 72 caracteres

## Corpo (Opcional)

- Use para explicar o **o que** e **por que** vs. **como**
- Separe do título com uma linha em branco
- Quebre linhas em 72 caracteres
- Pode ter múltiplos parágrafos

## Footer (Opcional)

- Referências a issues: `Closes #123`, `Fixes #456`
- Breaking changes: `BREAKING CHANGE: description`

## Exemplos

### Commit Simples

```bash
feat(preloader): add mobile auto-play functionality
```

### Commit com Corpo

```bash
feat(hero): implement hero section with animations

Add hero section component with fade-in animation and
scroll-triggered parallax effect. Uses Framer Motion
for smooth GPU-accelerated animations.

- Hero image with lazy loading
- Animated title and subtitle
- Scroll indicator
- Mobile-responsive layout
```

### Commit com Breaking Change

```bash
feat(preloader): change scroll control API

BREAKING CHANGE: Preloader now requires `onComplete` prop
instead of dispatching custom events. Update usage:

Before:
<Preloader logoSrc="..." />

After:
<Preloader logoSrc="..." onComplete={handleComplete} />
```

### Commit de Fix

```bash
fix(preloader): prevent body scroll during animation

Fix issue where page scroll was not properly disabled
during preloader animation on mobile devices.
```

### Commit de Refactor

```bash
refactor(preloader): extract scroll handlers to hooks

Extract wheel and touch event handlers to custom hooks
for better code organization and reusability.
```

## Checklist Antes de Commitar

- [ ] Commit segue formato Conventional Commits?
- [ ] Mensagem está em inglês?
- [ ] Tipo de commit está correto?
- [ ] Escopo está correto (se aplicável)?
- [ ] Descrição é clara e concisa?
- [ ] Corpo explica o que e por que (se necessário)?
- [ ] Breaking changes documentados (se houver)?

## Referências

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
