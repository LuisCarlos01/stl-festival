# Guia de Setup - STL Festival

## Pré-requisitos

- Node.js 18+
- npm ou yarn ou pnpm

## Passo a Passo

### 1. Instalar Dependências

```bash
npm install
```

### 2. Verificar Estrutura

O projeto já está configurado com:

- ✅ Astro configurado (`astro.config.mjs`)
- ✅ React integrado (`@astrojs/react`)
- ✅ Tailwind CSS configurado (`tailwind.config.mjs`)
- ✅ TypeScript configurado (`tsconfig.json`)
- ✅ Preloader criado (`src/components/Preloader.tsx`)
- ✅ Página inicial criada (`src/pages/index.astro`)

### 3. Adicionar Logo

Coloque o logo do STL Festival em `public/logo.png` (ou ajuste o caminho no `index.astro`).

### 4. Executar em Desenvolvimento

```bash
npm run dev
```

O servidor iniciará em `http://localhost:4321`

### 5. Build para Produção

```bash
npm run build
```

Os arquivos estáticos serão gerados em `dist/`

## Estrutura Criada

```
stl-festival/
├── src/
│   ├── components/
│   │   └── Preloader.tsx      # ✅ Preloader React + Framer Motion
│   ├── pages/
│   │   └── index.astro         # ✅ Página principal
│   └── env.d.ts               # ✅ Types do Astro
├── public/                    # (criar e adicionar assets aqui)
├── astro.config.mjs          # ✅ Config Astro
├── tailwind.config.mjs       # ✅ Config Tailwind
├── tsconfig.json             # ✅ Config TypeScript
└── package.json              # ✅ Dependências
```

## Preloader

O Preloader está pronto e configurado para usar com Astro:

**Localização**: `src/components/Preloader.tsx`

**Uso no Astro**:

```astro
---
import Preloader from '../components/Preloader'
---

<Preloader
  client:load
  logoSrc="/logo.png"
  phraseTop="Bem-vindo ao STL Festival"
  phraseBottom="Uma experiência única de música e cultura"
/>
```

**Features**:

- ✅ Cortinas verticais animadas
- ✅ Scroll controlado (não move página)
- ✅ Auto-play no mobile
- ✅ Respeita `prefers-reduced-motion`
- ✅ Performance otimizada

## Próximos Passos

1. ✅ Instalar dependências (`npm install`)
2. ✅ Adicionar logo em `public/logo.png`
3. ✅ Ajustar textos do Preloader se necessário
4. ✅ Desenvolver resto do site seguindo guidelines
5. ✅ Consultar `.cursor/rules/arquitetura/stack-definitiva.md` para regras

## Troubleshooting

### Erro: "Cannot find module 'framer-motion'"

**Solução**: Execute `npm install` novamente.

### Preloader não aparece

**Verificar**:

1. Preloader está usando `client:load` no Astro?
2. Logo existe no caminho especificado?
3. Console do navegador tem erros?

### TypeScript errors

**Solução**: Verifique se `tsconfig.json` está correto e execute `npm install` novamente.

## Referências

- [Astro Docs](https://docs.astro.build)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com)
- Guidelines: `.cursor/rules/arquitetura/stack-definitiva.md`
