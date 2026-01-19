# Guia de Otimização: Performance + Animações

## Estratégias para Manter Performance Excelente com Animações

Este guia apresenta estratégias práticas para garantir que o site mantenha Performance > 90 no Lighthouse mesmo com animações.

---

## 1. Lazy Loading Estratégico

### Preloader

**Problema**: Preloader carrega no início, pode impactar LCP.

**Solução**:

```javascript
// Carregar Preloader apenas se necessário
if (typeof window !== 'undefined' && !sessionStorage.getItem('preloader-shown')) {
  import('./Preloader').then(({ default: Preloader }) => {
    // Renderizar Preloader
  })
}
```

**Benefício**: Preloader não bloqueia conteúdo crítico após primeira visita.

---

### Animações de Hero Section

**Problema**: Hero section acima da dobra precisa carregar rápido.

**Solução**:

```astro
<!-- Astro: Hero como componente estático -->
<Hero client:load />
```

**Ou com Next.js**:

```tsx
// Next.js: Hero como Server Component quando possível
import Hero from './Hero'

export default function Page() {
  return <Hero /> // Server Component
}
```

**Benefício**: Hero renderizado no servidor, zero JS inicial.

---

### Animações de Transição

**Problema**: Transições entre seções podem carregar JS desnecessário.

**Solução**:

```astro
<!-- Astro: Lazy load apenas quando visível -->
<TransitionSection client:visible />
```

**Benefício**: JS carregado apenas quando necessário.

---

## 2. Code Splitting Agressivo

### Separar Animações por Seção

**Estratégia**: Cada seção com animações carrega seu próprio bundle.

```javascript
// Exemplo: GSAP apenas para Hero
const loadHeroAnimation = async () => {
  const { gsap } = await import('gsap')
  // Inicializar animações do Hero
}

// Exemplo: Framer Motion apenas para Preloader
const loadPreloader = async () => {
  const { motion } = await import('framer-motion')
  // Renderizar Preloader
}
```

**Benefício**: Bundle inicial menor, animações carregadas sob demanda.

---

### Dynamic Imports

**Astro**:

```astro
<script>
  import('./animations/hero').then(module => {
    module.initHeroAnimations()
  })
</script>
```

**Next.js**:

```tsx
import dynamic from 'next/dynamic'

const AnimatedSection = dynamic(() => import('./AnimatedSection'), {
  loading: () => <SectionSkeleton />,
  ssr: false, // Se animação não precisa SSR
})
```

**Benefício**: Reduz bundle inicial significativamente.

---

## 3. Animações GPU-Accelerated

### Propriedades Otimizadas

**✅ Usar** (GPU-accelerated):

- `transform` (translateX, translateY, scale, rotate)
- `opacity`
- `filter` (com moderação)

**❌ Evitar** (causam reflow):

- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`
- `background-color`

**Exemplo GSAP**:

```javascript
// ✅ Bom
gsap.to('.element', {
  x: 100, // transform: translateX
  y: 50, // transform: translateY
  opacity: 0.5,
  duration: 1,
})

// ❌ Ruim
gsap.to('.element', {
  left: 100, // causa reflow
  top: 50, // causa reflow
  width: 200, // causa reflow
  duration: 1,
})
```

**Exemplo Framer Motion**:

```tsx
// ✅ Bom
<motion.div
  animate={{
    x: 100,
    y: 50,
    opacity: 0.5
  }}
/>

// ❌ Ruim
<motion.div
  animate={{
    left: 100,
    top: 50,
    width: 200
  }}
/>
```

**Benefício**: 60fps consistente, sem jank.

---

### will-change com Moderação

**Usar apenas quando necessário**:

```css
.animating-element {
  will-change: transform, opacity;
}

/* Remover após animação */
.animating-element.animation-complete {
  will-change: auto;
}
```

**JavaScript**:

```javascript
element.style.willChange = 'transform, opacity'
// Após animação
element.style.willChange = 'auto'
```

**Benefício**: Browser otimiza antecipadamente, mas não mantém overhead desnecessário.

---

## 4. Progressive Enhancement

### Animações como Melhoria, Não Requisito

**Estratégia**: Site funciona sem JS, animações são enhancement.

```astro
<!-- Conteúdo crítico sempre visível -->
<section class="hero">
  <h1>STL Festival</h1>
  <p>Conteúdo importante</p>
</section>

<!-- Animações apenas se JS disponível -->
<script>
  if (typeof window !== 'undefined') {
    // Inicializar animações
  }
</script>
```

**Benefício**: SEO garantido, performance inicial melhor.

---

### Reduced Motion

**Sempre respeitar**:

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (prefersReducedMotion) {
  // Pular animações ou versão simplificada
  return
}

// Animações normais
```

**CSS**:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Benefício**: Acessibilidade e performance em dispositivos lentos.

---

## 5. Otimização de Imagens e Assets

### Imagens do Hero

**Problema**: Hero section acima da dobra precisa carregar rápido.

**Solução**:

```astro
<!-- Astro: Otimização automática -->
<img
  src="/hero.jpg"
  alt="STL Festival"
  width="1920"
  height="1080"
  loading="eager"
  decoding="async"
  format="webp"
/>
```

**Next.js**:

```tsx
import Image from 'next/image'
;<Image
  src="/hero.jpg"
  alt="STL Festival"
  width={1920}
  height={1080}
  priority // Preload
  quality={85}
/>
```

**Benefício**: LCP melhorado significativamente.

---

### Lazy Loading de Imagens Abaixo da Dobra

```astro
<img src="/section-image.jpg" loading="lazy" decoding="async" />
```

**Benefício**: Não bloqueia renderização inicial.

---

### Fontes Otimizadas

**Preload de fontes críticas**:

```html
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin />
```

**Subset de fontes**:

```css
@font-face {
  font-family: 'Main';
  src: url('/fonts/main-subset.woff2') format('woff2');
  unicode-range: U+0020-007F; /* Apenas ASCII */
}
```

**Benefício**: FCP melhorado, menos bloqueio de renderização.

---

## 6. Minimizar Re-renders

### React: useMemo e useCallback

**Problema**: Re-renders desnecessários durante animações.

**Solução**:

```tsx
const AnimatedComponent = () => {
  const progress = useMotionValue(0)

  // Memoizar valores transformados
  const opacity = useTransform(progress, [0, 100], [1, 0])
  const y = useTransform(progress, [0, 100], ['0%', '-100%'])

  // Memoizar callbacks
  const handleComplete = useCallback(() => {
    // Lógica
  }, [])

  return <motion.div style={{ opacity, y }} onAnimationComplete={handleComplete} />
}
```

**Benefício**: Menos re-renders = melhor performance.

---

### GSAP: Reutilizar Timelines

**Problema**: Criar novas timelines a cada render.

**Solução**:

```javascript
// Criar timeline uma vez
const tl = gsap.timeline()

// Reutilizar
function animateHero() {
  tl.to('.hero-title', { opacity: 1, duration: 1 }).to(
    '.hero-subtitle',
    { opacity: 1, duration: 1 },
    '-=0.5'
  )
}

// Não recriar a cada vez
```

**Benefício**: Menos overhead, animações mais suaves.

---

## 7. Monitoramento e Métricas

### Core Web Vitals

**Implementar tracking**:

```javascript
// web-vitals library
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(console.log)
getFID(console.log)
getFCP(console.log)
getLCP(console.log)
getTTFB(console.log)
```

**Benefício**: Dados reais para otimização contínua.

---

### Performance Budget

**Definir limites**:

```json
{
  "budget": [
    {
      "path": "/*",
      "timings": [
        { "metric": "interactive", "budget": 3000 },
        { "metric": "first-meaningful-paint", "budget": 1000 }
      ],
      "resourceSizes": [
        { "resourceType": "script", "budget": 200 },
        { "resourceType": "total", "budget": 500 }
      ]
    }
  ]
}
```

**Benefício**: CI/CD pode bloquear builds que ultrapassam budget.

---

## 8. Checklist de Otimização

### Antes do Deploy

- [ ] Bundle inicial < 200kb (gzipped)
- [ ] LCP < 2.5s
- [ ] FCP < 1.8s
- [ ] TTI < 3.5s
- [ ] CLS < 0.1
- [ ] Animações usando `transform` e `opacity`
- [ ] Imagens otimizadas (WebP/AVIF)
- [ ] Fontes com subset
- [ ] Lazy loading de assets não críticos
- [ ] Reduced motion respeitado
- [ ] Code splitting implementado
- [ ] Lighthouse Performance > 90

---

## Conclusão

Estas estratégias garantem que o site mantenha performance excelente mesmo com animações. A chave é:

1. **Lazy loading** de animações não críticas
2. **GPU-accelerated** properties apenas
3. **Progressive enhancement** (site funciona sem JS)
4. **Code splitting** agressivo
5. **Monitoramento** contínuo

Seguindo estas práticas, é possível ter animações suaves e performance > 90 no Lighthouse.
