# STL Festival

Site institucional do STL Festival desenvolvido com Astro + React Islands + Framer Motion + Tailwind CSS.

## Stack

- **Astro 4.x** - Framework base (SSG/SSR)
- **React 18+** - Interatividade (islands pattern)
- **Framer Motion 11+** - Animações
- **Tailwind CSS 3.x** - Estilização
- **TypeScript** - Tipagem

## Estrutura do Projeto

```
stl-festival/
├── src/
│   ├── components/
│   │   └── Preloader.tsx      # Preloader (React + Framer Motion)
│   └── pages/
│       └── index.astro         # Página principal
├── docs/
│   └── analises-stacks/       # Análise ToT completa
└── .cursor/
    └── rules/
        └── arquitetura/
            └── stack-definitiva.md  # Guidelines da stack
```

## Preloader

O Preloader é um componente React que usa Framer Motion para animações de cortinas verticais. Ele:

- Exibe logo e frases motivacionais
- Controla scroll virtual (não move a página)
- Auto-play no mobile
- Respeita `prefers-reduced-motion`
- Performance otimizada (GPU-accelerated)

**Uso no Astro**:
```astro
---
import Preloader from '../components/Preloader';
---

<Preloader 
  client:load
  logoSrc="/logo.png"
  phraseTop="Bem-vindo ao STL Festival"
  phraseBottom="Uma experiência única"
/>
```

## Desenvolvimento

### Setup Inicial

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## Guidelines

Consulte `.cursor/rules/arquitetura/stack-definitiva.md` para regras completas da stack.

### Regras Principais

1. **React apenas onde necessário** (islands pattern)
2. **CSS primeiro, Framer Motion depois** (evitar overengineering)
3. **Performance > Complexidade** (Lighthouse > 90, Bundle < 200kb)
4. **Mobile-first obrigatório**
5. **SEO garantido** (conteúdo crítico server-rendered)

## Análise de Stack

A stack foi escolhida através de análise Tree of Thought completa. Veja `docs/analises-stacks/` para detalhes.

**Score**: 91/100  
**Bundle**: ~130kb (65% do limite)  
**Performance**: Lighthouse > 90 ✅

## Licença

MIT
