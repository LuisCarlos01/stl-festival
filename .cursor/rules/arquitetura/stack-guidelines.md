# Stack Guidelines — STL Festival Project

> **Regras obrigatórias** para uso de tecnologias neste projeto.
> Estas diretrizes devem ser seguidas por desenvolvedores e agentes de IA.

---

## 1. Princípios Arquiteturais Fundamentais

### Prioridades Absolutas

1. **Simplicidade > Complexidade**
   - Evitar abstrações desnecessárias
   - Preferir soluções nativas quando possível
   - Complexidade só é aceita quando traz benefício claro e mensurável

2. **Performance e SEO são Requisitos, Não Bônus**
   - Toda decisão técnica deve considerar impacto em Core Web Vitals
   - SEO não pode ser sacrificado por "elegância técnica"
   - Métricas-alvo: LCP < 2.5s, Lighthouse Performance > 90

3. **Evitar Overengineering**
   - Não criar estruturas "para o futuro"
   - Não adicionar dependências sem necessidade real
   - YAGNI (You Aren't Gonna Need It) é regra absoluta

---

## 2. Diretrizes sobre React

### Quando Usar React

✅ **USE React quando:**

- Componente precisa de **estado complexo** (múltiplos estados interdependentes)
- Interatividade requer **event handlers avançados** (drag, scroll customizado, gestos)
- Componente precisa de **ciclo de vida** (useEffect, timers, subscriptions)
- Animações complexas que **beneficiam de hooks** (useMotionValue, useSpring)

**Exemplo válido:** `Preloader.tsx` — precisa controlar scroll, estado de progresso, e animações sincronizadas.

### Quando NÃO Usar React

❌ **NÃO USE React quando:**

- Componente é **puramente estático** (apenas HTML/CSS)
- Conteúdo é **crítico para SEO** (texto, headings, meta tags)
- Interatividade pode ser resolvida com **vanilla JS** ou CSS
- Componente não precisa de **re-renders** ou estado

**Exemplo correto:** `Hero.astro` — usa vanilla JS para controle de vídeo, sem necessidade de React.

### Pattern: React como Ilhas no Astro

- React deve ser usado **apenas como ilhas interativas**
- Sempre usar directives do Astro: `client:load`, `client:visible`, `client:idle`
- **Nunca** transformar páginas Astro em SPAs React
- Componentes React devem ser **isolados** e **auto-contidos**

```astro
<!-- ✅ Correto: React apenas onde necessário -->
<Preloader client:load {...props} />

<!-- ❌ Proibido: React desnecessário -->
<StaticContent client:load />
<!-- Não precisa de React! -->
```

---

## 3. Diretrizes sobre Animações

### Quando Animar

✅ **Anime quando:**

- Animação **melhora a compreensão** (transições de estado, feedback visual)
- Animação **guia a atenção** do usuário (scroll indicators, loading states)
- Animação **cria atmosfera** alinhada ao propósito do site (preloader, hero)
- Animação é **sutil e não distrai** do conteúdo principal

### Quando Evitar Animações

❌ **Evite animar quando:**

- Animação é **puramente decorativa** sem propósito funcional
- Animação pode **atrasar acesso ao conteúdo** (splash screens longos)
- Animação **compete com conteúdo** importante
- Animação não respeita `prefers-reduced-motion`

### Impacto em Performance e UX

**Regras obrigatórias:**

1. **Sempre respeitar `prefers-reduced-motion`**

   ```tsx
   const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
   if (prefersReducedMotion) {
     // Pular animação ou usar versão simplificada
   }
   ```

2. **Usar `will-change` com moderação**
   - Aplicar apenas em elementos que realmente animam
   - Remover após animação completar

3. **Evitar animações em scroll pesadas**
   - Preferir `transform` e `opacity` (GPU-accelerated)
   - Evitar animar `width`, `height`, `top`, `left`

4. **Lazy load de animações**
   - Animar apenas elementos visíveis (`IntersectionObserver`)
   - Não carregar libs de animação até necessário

---

## 4. GSAP vs Framer Motion — Separação de Responsabilidades

### ⚠️ REGRA CRÍTICA: Não Misturar

**PROIBIÇÃO ABSOLUTA:** Misturar GSAP e Framer Motion no mesmo elemento ou componente.

### Quando Usar Framer Motion

✅ **USE Framer Motion quando:**

- Componente é **React** (`.tsx`)
- Animações são **declarativas** e integradas ao JSX
- Precisa de **hooks do React** (useMotionValue, useSpring, useTransform)
- Animações são **baseadas em estado React**

**Exemplo válido:** `Preloader.tsx` — componente React que usa Framer Motion para animações sincronizadas com estado.

```tsx
// ✅ Correto: Framer Motion em componente React
import { motion, useMotionValue } from 'framer-motion'

export default function Preloader() {
  const progress = useMotionValue(0)
  return <motion.div animate={{ opacity: 1 }} />
}
```

### Quando Usar GSAP

✅ **USE GSAP quando:**

- Componente é **Astro** (`.astro`) ou **vanilla JS**
- Animações são **scroll-driven** (ScrollTrigger)
- Precisa de **timelines complexas** e controle fino
- Animações são **imperativas** e não dependem de estado React
- Precisa de **performance máxima** em animações pesadas

**Exemplo válido:** Animações em `Hero.astro` usando GSAP para scroll parallax, marquee sincronizado.

```astro
<!-- ✅ Correto: GSAP em componente Astro -->
<script>
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  gsap.registerPlugin(ScrollTrigger)
  // Animações scroll-driven aqui
</script>
```

### Justificativa Técnica

**Framer Motion:**

- **Vantagem:** Integração nativa com React, API declarativa, hooks úteis
- **Desvantagem:** Bundle maior (~50kb), overhead do React, não funciona bem fora de React

**GSAP:**

- **Vantagem:** Performance superior, controle fino, ScrollTrigger poderoso, funciona em qualquer contexto
- **Desvantagem:** API imperativa, curva de aprendizado maior, não integra com hooks React

**Separação clara:**

- React components → Framer Motion
- Astro components / vanilla JS → GSAP
- **Nunca misturar** → evita conflitos, bundle duplicado, confusão arquitetural

---

## 5. Regras para Agentes de IA

### Proibições Absolutas

❌ **NÃO pode:**

- Introduzir novas dependências sem **justificativa técnica clara**
- Transformar páginas estáticas em SPAs React
- Animar por exibicionismo técnico (sem propósito funcional)
- Misturar GSAP e Framer Motion no mesmo elemento
- Criar abstrações "para o futuro" sem necessidade atual
- Adicionar React onde vanilla JS resolve

### Obrigações

✅ **DEVE:**

- Priorizar **simplicidade** sobre complexidade
- Usar **React apenas quando necessário** (ver seção 2)
- Escolher **GSAP ou Framer Motion** baseado no contexto (ver seção 4)
- Respeitar **prefers-reduced-motion** em todas as animações
- Considerar **impacto em bundle size** antes de adicionar libs
- Seguir **padrões estabelecidos** no projeto

### Checklist Antes de Adicionar Interatividade

Antes de adicionar qualquer interatividade, responder:

1. ✅ Isso pode ser resolvido com **CSS puro**?
2. ✅ Isso pode ser resolvido com **vanilla JS**?
3. ✅ Isso realmente precisa de **React**?
4. ✅ O benefício justifica o **custo em bundle**?

Se resposta 1 ou 2 for SIM → **não usar React**.

### Checklist Antes de Animar

Antes de adicionar qualquer animação, responder:

1. ✅ A animação **melhora a UX** ou apenas "fica bonita"?
2. ✅ A animação respeita **prefers-reduced-motion**?
3. ✅ A animação usa **propriedades GPU-accelerated** (transform, opacity)?
4. ✅ A animação não **atrasa acesso ao conteúdo**?
5. ✅ Estou usando a **lib correta** (GSAP vs Framer Motion)?

Se qualquer resposta for NÃO → **revisar decisão**.

### Checklist Antes de Usar React

Antes de criar componente React, responder:

1. ✅ Este componente precisa de **estado complexo**?
2. ✅ Este componente precisa de **hooks do React**?
3. ✅ Este componente precisa de **re-renders** baseados em estado?
4. ✅ Vanilla JS **não resolve** este problema?

Se resposta 4 for NÃO → **não usar React**.

---

## 6. Estrutura de Decisão Técnica

### Fluxo de Decisão

```
Preciso adicionar interatividade/animação?
│
├─ Pode ser CSS puro? → Usar CSS
│
├─ Pode ser vanilla JS? → Usar vanilla JS
│
├─ Precisa de React? → Usar React + Framer Motion
│
└─ Precisa de animação scroll-driven/imperativa? → Usar GSAP
```

### Exemplos Práticos

**Exemplo 1: Botão com hover**

- ✅ **Solução:** CSS (`:hover`, `transition`)
- ❌ **Errado:** React + Framer Motion

**Exemplo 2: Preloader com scroll controlado**

- ✅ **Solução:** React + Framer Motion (precisa de estado, hooks)
- ❌ **Errado:** GSAP (não integra bem com React state)

**Exemplo 3: Marquee sincronizado com scroll**

- ✅ **Solução:** GSAP ScrollTrigger (vanilla JS, scroll-driven)
- ❌ **Errado:** Framer Motion (não tem ScrollTrigger nativo)

**Exemplo 4: Seção estática com texto**

- ✅ **Solução:** Astro component puro (sem JS)
- ❌ **Errado:** React component (desnecessário)

---

## 7. Métricas e Validação

### Métricas de Sucesso

- **Bundle size:** React apenas onde necessário (< 50kb adicional por componente React)
- **Performance:** Lighthouse > 90, LCP < 2.5s
- **SEO:** Conteúdo crítico renderizado no servidor (Astro)
- **Acessibilidade:** Todas animações respeitam `prefers-reduced-motion`

### Validação de Decisões

Antes de commitar código que adiciona:

- **React:** Validar que vanilla JS não resolve
- **Framer Motion:** Validar que componente é React
- **GSAP:** Validar que não é componente React ou que precisa de ScrollTrigger
- **Nova dependência:** Justificar em PR/comentário

---

## 8. Resumo Executivo

### Stack Atual (Validada)

- **Astro:** Framework base (static-first, islands)
- **Tailwind CSS:** Estilização (utility-first)
- **React:** Apenas onde necessário (ilhas interativas)
- **Framer Motion:** Apenas em componentes React
- **GSAP:** Apenas em componentes Astro/vanilla JS

### Regras de Ouro

1. **Simplicidade sempre vence**
2. **React apenas quando necessário**
3. **GSAP e Framer Motion nunca se misturam**
4. **Performance e SEO são requisitos, não opções**
5. **YAGNI é lei**

---

## 9. Referências e Contexto

- **Projeto:** Landing page institucional (STL Festival)
- **Objetivo:** Performance máxima + SEO + experiência visual
- **Não é:** Sistema enterprise, SPA complexa, app interativo
- **É:** Site estático com ilhas de interatividade pontuais

---

**Última atualização:** Baseado em análise técnica da stack atual do projeto.
**Aplicável a:** Desenvolvedores e agentes de IA trabalhando no projeto STL Festival.
