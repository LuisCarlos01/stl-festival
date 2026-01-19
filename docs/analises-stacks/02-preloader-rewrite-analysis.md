# Análise de Viabilidade: Reescrever Preloader

## Contexto do Preloader Atual

**Implementação**: React + Framer Motion  
**Linhas de código**: ~300  
**Features principais**:
- Cortinas verticais (top/bottom) animadas
- Scroll controlado (não move página, apenas animação)
- Auto-play no mobile
- Respeita `prefers-reduced-motion`
- Logo e frases com fade out
- Indicador de scroll (desktop)
- Touch support para mobile

**Dependências críticas do Framer Motion**:
- `useMotionValue` - valores animados
- `useTransform` - transformações baseadas em valores
- `useSpring` - física de spring para suavidade
- `motion.div` - componentes animados

---

## Análise por Stack

### Caminho 1: Astro + React + GSAP

**Decisão**: Reescrever Preloader com GSAP

#### Viabilidade Técnica: ✅ **VIÁVEL**

**Como replicar features**:

1. **Cortinas verticais**:
   ```javascript
   // GSAP Timeline
   const tl = gsap.timeline();
   tl.to('.top-curtain', { y: '-100%', duration: 1, ease: 'power2.inOut' })
     .to('.bottom-curtain', { y: '100%', duration: 1, ease: 'power2.inOut' }, 0);
   ```

2. **Scroll controlado**:
   ```javascript
   // GSAP ScrollTrigger (mas customizado)
   let progress = 0;
   window.addEventListener('wheel', (e) => {
     e.preventDefault();
     progress = gsap.utils.clamp(0, 100, progress + (e.deltaY > 0 ? 8 : -8));
     gsap.to('.top-curtain', { y: `-${progress}%` });
     gsap.to('.bottom-curtain', { y: `${progress}%` });
   });
   ```

3. **Auto-play mobile**:
   ```javascript
   // GSAP Timeline com auto-play
   if (isMobile) {
     gsap.to({ progress: 100 }, {
       progress: 100,
       duration: 5,
       ease: 'none',
       onUpdate: function() {
         updateCurtains(this.targets()[0].progress);
       }
     });
   }
   ```

4. **Reduced motion**:
   ```javascript
   const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   if (prefersReducedMotion) {
     // Pular animação ou versão simplificada
   }
   ```

**Esforço estimado**: 4-8 horas

**Vantagens**:
- ✅ GSAP é mais performático que Framer Motion
- ✅ Controle fino de timelines
- ✅ Bundle menor (~40kb vs ~50kb)
- ✅ Melhor para animações imperativas

**Desvantagens**:
- ❌ Código mais imperativo (menos declarativo)
- ❌ Menos "React-like" (mais vanilla JS)
- ❌ Precisa reescrever ~300 linhas

**Complexidade**: Média (GSAP é poderosa mas requer mais código)

---

### Caminho 2: Astro + React + Framer Motion

**Decisão**: Manter Preloader atual

#### Viabilidade Técnica: ✅ **ZERO ESFORÇO**

**Vantagens**:
- ✅ Código já pronto
- ✅ Zero horas de desenvolvimento
- ✅ DX excelente (declarativo)
- ✅ Testado e funcionando

**Desvantagens**:
- ❌ Framer Motion adiciona ~50kb ao bundle
- ❌ Overengineering para resto do projeto (animações simples)
- ❌ Bundle maior que necessário

**Complexidade**: Zero (já está feito)

**Recomendação**: Se escolher este caminho, considerar se vale 50kb para uso pontual.

---

### Caminho 3: Astro + React + GSAP + Framer Motion

**Decisão**: Manter Preloader atual (Framer Motion) + GSAP para outras animações

#### Viabilidade Técnica: ✅ **VIÁVEL** (mas overengineering)

**Vantagens**:
- ✅ Preloader pronto
- ✅ Flexibilidade teórica máxima

**Desvantagens**:
- ❌ **DUPLICAÇÃO**: ~90kb de libs de animação
- ❌ Conflito de responsabilidades
- ❌ Decisões constantes: qual lib usar?
- ❌ Overengineering claro

**Complexidade**: Alta (duas libs para gerenciar)

**Recomendação**: ❌ **NÃO RECOMENDADO** - viola princípios de simplicidade.

---

### Caminho 4: Next.js + Framer Motion

**Decisão**: Manter Preloader atual

#### Viabilidade Técnica: ✅ **VIÁVEL** (com adaptações)

**Adaptações necessárias**:
- Preloader atual é React component - funciona nativamente
- Pode precisar ajustes para Next.js (SSR/hydration)
- Provavelmente usar `'use client'` directive

**Esforço estimado**: 1-2 horas (ajustes menores)

**Vantagens**:
- ✅ Preloader quase pronto
- ✅ Ecossistema React completo
- ✅ DX excelente

**Desvantagens**:
- ❌ Bundle maior que Astro
- ❌ Overhead de React full
- ❌ Framer Motion pode ser excesso

**Complexidade**: Baixa (ajustes menores)

---

### Caminho 5: Astro + Vanilla JS + GSAP

**Decisão**: Reescrever Preloader completamente em Vanilla JS + GSAP

#### Viabilidade Técnica: ⚠️ **VIÁVEL MAS TRABALHOSO**

**Como replicar features**:

1. **Gerenciamento de estado**:
   ```javascript
   // Vanilla JS - estado manual
   let progress = 0;
   let isComplete = false;
   let reducedMotion = false;
   
   // Verificar reduced motion
   const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
   reducedMotion = mediaQuery.matches;
   ```

2. **Cortinas animadas**:
   ```javascript
   // GSAP Timeline
   const updateCurtains = (progress) => {
     gsap.to('.top-curtain', { y: `-${progress}%`, duration: 0.3 });
     gsap.to('.bottom-curtain', { y: `${progress}%`, duration: 0.3 });
     
     // Logo e frases fade
     const logoOpacity = progress < 50 ? 1 - (progress / 50) : 0;
     gsap.to('.logo', { opacity: logoOpacity, duration: 0.3 });
   };
   ```

3. **Scroll controlado**:
   ```javascript
   // Event listeners vanilla JS
   let lastTouchY = 0;
   
   window.addEventListener('wheel', (e) => {
     e.preventDefault();
     const delta = e.deltaY > 0 ? 8 : -8;
     progress = Math.max(0, Math.min(100, progress + delta));
     updateCurtains(progress);
     
     if (progress >= 100 && !isComplete) {
       completePreloader();
     }
   });
   
   window.addEventListener('touchstart', (e) => {
     lastTouchY = e.touches[0].clientY;
   });
   
   window.addEventListener('touchmove', (e) => {
     e.preventDefault();
     const touchY = e.touches[0].clientY;
     const deltaY = lastTouchY - touchY;
     const delta = deltaY > 0 ? 12 : -12;
     progress = Math.max(0, Math.min(100, progress + delta));
     updateCurtains(progress);
     lastTouchY = touchY;
   });
   ```

4. **Auto-play mobile**:
   ```javascript
   // Auto-play com GSAP
   if (isMobile && !reducedMotion) {
     gsap.to({ progress: 0 }, {
       progress: 100,
       duration: 5,
       ease: 'none',
       onUpdate: function() {
         progress = this.targets()[0].progress * 100;
         updateCurtains(progress);
       },
       onComplete: () => completePreloader()
     });
   }
   ```

**Esforço estimado**: 8-12 horas

**Vantagens**:
- ✅ Bundle mínimo (~65-75kb total)
- ✅ Performance máxima
- ✅ Zero dependências React

**Desvantagens**:
- ❌ Código mais verboso
- ❌ Gerenciamento de estado manual
- ❌ Menos abstrações = mais trabalho
- ❌ Mais difícil de manter

**Complexidade**: Alta (mais código manual)

**Recomendação**: ⚠️ Viável, mas esforço alto. Só vale se performance for absolutamente crítica.

---

### Caminho 6: SvelteKit + Motion/GSAP

**Decisão**: Reescrever Preloader em Svelte

#### Viabilidade Técnica: ✅ **VIÁVEL** (com aprendizado)

**Como replicar features**:

1. **Cortinas com Svelte transitions**:
   ```svelte
   <script>
     let progress = 0;
     let isComplete = false;
     
     // Svelte reactive statements
     $: topCurtainY = `-${progress}%`;
     $: bottomCurtainY = `${progress}%`;
     $: logoOpacity = progress < 50 ? 1 - (progress / 50) : 0;
   </script>
   
   <div class="top-curtain" style="transform: translateY({topCurtainY})">
     <!-- Logo e frase -->
   </div>
   ```

2. **Scroll controlado**:
   ```svelte
   <script>
     import { onMount } from 'svelte';
     
     let progress = 0;
     
     onMount(() => {
       const handleWheel = (e) => {
         e.preventDefault();
         progress = Math.max(0, Math.min(100, progress + (e.deltaY > 0 ? 8 : -8)));
       };
       
       window.addEventListener('wheel', handleWheel, { passive: false });
       return () => window.removeEventListener('wheel', handleWheel);
     });
   </script>
   ```

3. **Auto-play mobile**:
   ```svelte
   <script>
     import { onMount } from 'svelte';
     
     onMount(() => {
       if (isMobile && !reducedMotion) {
         const interval = setInterval(() => {
           progress += 2;
           if (progress >= 100) {
             progress = 100;
             clearInterval(interval);
             isComplete = true;
           }
         }, 50);
         
         return () => clearInterval(interval);
       }
     });
   </script>
   ```

**Esforço estimado**: 8-12 horas + aprendizado Svelte

**Vantagens**:
- ✅ Svelte tem transições nativas poderosas
- ✅ Código mais limpo que vanilla JS
- ✅ Bundle leve
- ✅ Performance excelente

**Desvantagens**:
- ❌ Equipe precisa aprender Svelte
- ❌ Ecossistema menor
- ❌ Reescrita completa necessária

**Complexidade**: Média-Alta (aprendizado + reescrita)

**Recomendação**: ⚠️ Viável se equipe estiver disposta a aprender Svelte.

---

## Comparação de Esforço

| Caminho | Esforço | Complexidade | Bundle Impact |
|---------|---------|--------------|---------------|
| 1. Astro + React + GSAP | 4-8h | Média | ~40kb (GSAP) |
| 2. Astro + React + Framer | 0h | Zero | ~50kb (Framer) |
| 3. Astro + React + GSAP + Framer | 0h | Alta* | ~90kb (ambas) |
| 4. Next.js + Framer | 1-2h | Baixa | ~50kb (Framer) |
| 5. Astro + Vanilla + GSAP | 8-12h | Alta | ~40kb (GSAP) |
| 6. SvelteKit + Motion/GSAP | 8-12h + aprendizado | Média-Alta | ~15-40kb |

*Complexidade alta por gerenciar duas libs

---

## Recomendação por Viabilidade

### ✅ **Mais Viável**: Caminho 2 (Astro + React + Framer Motion)
- Zero esforço
- Preloader pronto
- Trade-off: 50kb de bundle

### ✅ **Bom Equilíbrio**: Caminho 1 (Astro + React + GSAP)
- Esforço moderado (4-8h)
- Bundle menor (~40kb)
- Performance melhor

### ⚠️ **Se Performance Crítica**: Caminho 5 (Astro + Vanilla + GSAP)
- Esforço alto (8-12h)
- Bundle mínimo (~65-75kb total)
- Performance máxima

### ❌ **Não Recomendado**: Caminho 3 (GSAP + Framer Motion)
- Overengineering claro
- Duplicação de libs
- Complexidade desnecessária

---

## Conclusão

**A reescrita do Preloader é VIÁVEL em todos os caminhos**, mas com diferentes níveis de esforço:

- **Menor esforço**: Manter Framer Motion (Caminhos 2, 4)
- **Esforço moderado**: Reescrever com GSAP em React (Caminho 1)
- **Maior esforço**: Reescrever em Vanilla JS ou Svelte (Caminhos 5, 6)

**Decisão final dependerá do equilíbrio entre**:
- Esforço de desenvolvimento
- Performance desejada
- Bundle size aceitável
- Manutenibilidade futura
