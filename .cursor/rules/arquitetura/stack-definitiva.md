# Stack Definitiva — STL Festival Project

> **Regras obrigatórias** para uso de tecnologias neste projeto.
> Estas diretrizes foram validadas através de análise Tree of Thought completa.
> **Stack escolhida**: Astro + React Islands + Framer Motion + Tailwind CSS

---

## 1. Stack Oficial

### Tecnologias Aprovadas

```
Base: Astro 4.x (SSG/SSR)
Interatividade: React 18+ (islands pattern)
Animações: Framer Motion 11+
Styling: Tailwind CSS 3.x
TypeScript: Sim (recomendado)
```

### ⚠️ Tecnologias Proibidas

- ❌ **GSAP** (não usar junto com Framer Motion)
- ❌ **Next.js** (Astro é a base)
- ❌ **Svelte** (React é padrão)
- ❌ **Outras libs de animação** (Framer Motion é suficiente)

**Justificativa**: Análise ToT mostrou que duplicação de libs de animação é overengineering.

---

## 2. Princípios Arquiteturais Fundamentais

### Prioridades Absolutas

1. **Performance > Complexidade**
   - Lighthouse Performance Score > 90 (OBRIGATÓRIO)
   - Bundle inicial < 200kb gzipped (OBRIGATÓRIO)
   - LCP < 2.5s (OBRIGATÓRIO)

2. **SEO é Requisito, Não Opção**
   - Conteúdo crítico sempre renderizado no servidor
   - Meta tags dinâmicas obrigatórias
   - Structured data quando aplicável

3. **Simplicidade Intencional**
   - Evitar overengineering
   - YAGNI é regra absoluta
   - CSS para animações simples, Framer Motion apenas quando necessário

4. **Mobile-First Obrigatório**
   - Design sempre mobile-first
   - Breakpoints bem definidos
   - Touch-friendly por padrão

---

## 3. Quando Usar React (Islands Pattern)

### ✅ USE React quando:

- Componente precisa de **estado complexo** (múltiplos estados interdependentes)
- Interatividade requer **event handlers avançados** (drag, scroll customizado)
- Componente precisa de **ciclo de vida** (useEffect, timers, subscriptions)
- Animações complexas que **beneficiam de hooks** (useMotionValue, useSpring)
- **Preloader** (já implementado, obrigatório)

**Exemplo válido**: `Preloader.tsx` — precisa controlar scroll, estado de progresso, animações sincronizadas.

### ❌ NÃO USE React quando:

- Componente é **puramente estático** (apenas HTML/CSS)
- Conteúdo é **crítico para SEO** (texto, headings, meta tags)
- Interatividade pode ser resolvida com **vanilla JS** ou CSS
- Componente não precisa de **re-renders** ou estado

**Exemplo correto**: `Hero.astro` — conteúdo estático, sem necessidade de React.

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

## 4. Diretrizes sobre Animações

### Quando Animar

✅ **Anime quando**:

- Animação **melhora a compreensão** (transições de estado, feedback visual)
- Animação **guia a atenção** do usuário (scroll indicators, loading states)
- Animação **cria atmosfera** alinhada ao propósito (preloader, hero)
- Animação é **sutil e não distrai** do conteúdo principal

### Quando Evitar Animações

❌ **Evite animar quando**:

- Animação é **puramente decorativa** sem propósito funcional
- Animação pode **atrasar acesso ao conteúdo** (splash screens longos)
- Animação **compete com conteúdo** importante
- Animação não respeita `prefers-reduced-motion`

### Regra de Ouro: CSS Primeiro, Framer Motion Depois

**Hierarquia obrigatória**:

1. **CSS transitions/animations** → Para animações simples (hover, fade, slide)
2. **Framer Motion** → Apenas se CSS não for suficiente

**Exemplo**:
```css
/* ✅ Correto: CSS para hover simples */
.button {
  transition: opacity 0.2s;
}
.button:hover {
  opacity: 0.8;
}
```

```tsx
// ✅ Correto: Framer Motion para animação complexa
<motion.div
  animate={{ x: 100, opacity: 0 }}
  transition={{ type: 'spring', stiffness: 100 }}
/>
```

```tsx
// ❌ Proibido: Framer Motion para hover simples
<motion.div whileHover={{ opacity: 0.8 }} />
// Use CSS!
```

---

## 5. Framer Motion — Regras de Uso

### Quando Usar Framer Motion

✅ **USE Framer Motion quando**:

- Componente é **React** (`.tsx`)
- Animações são **complexas** (múltiplas propriedades, timelines)
- Precisa de **hooks do React** (useMotionValue, useSpring, useTransform)
- Animações são **baseadas em estado React**
- **Preloader** (já implementado)

**Exemplo válido**: `Preloader.tsx` — usa Framer Motion para animações sincronizadas com estado.

### Quando NÃO Usar Framer Motion

❌ **NÃO USE Framer Motion quando**:

- Animação pode ser feita com **CSS puro**
- Componente é **Astro** (`.astro`)
- Animação é **simples** (fade, slide básico)
- Não precisa de **estado React**

**Exemplo correto**: Hero section com fade-in → usar CSS, não Framer Motion.

### Impacto em Performance

**Regras obrigatórias**:

1. **Sempre respeitar `prefers-reduced-motion`**

   ```tsx
   const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   if (prefersReducedMotion) {
     // Pular animação ou usar versão simplificada
     return null;
   }
   ```

2. **Usar propriedades GPU-accelerated apenas**

   ```tsx
   // ✅ Correto
   <motion.div animate={{ x: 100, opacity: 0.5 }} />
   
   // ❌ Proibido
   <motion.div animate={{ left: 100, width: 200 }} />
   ```

3. **Lazy load de animações não críticas**

   ```astro
   <!-- ✅ Correto: Lazy load quando visível -->
   <AnimatedSection client:visible />
   ```

---

## 6. Regras para Agentes de IA

### Proibições Absolutas

❌ **NÃO pode**:

- Introduzir **GSAP** ou outras libs de animação
- Transformar páginas estáticas em **SPAs React**
- Animar por **exibicionismo técnico** (sem propósito funcional)
- Usar **Framer Motion** onde CSS resolve
- Criar abstrações "para o futuro" sem necessidade atual
- Adicionar **React** onde vanilla JS resolve
- Duplicar libs de animação

### Obrigações

✅ **DEVE**:

- Priorizar **simplicidade** sobre complexidade
- Usar **React apenas quando necessário** (ver seção 3)
- Escolher **CSS ou Framer Motion** baseado na complexidade (ver seção 4)
- Respeitar **prefers-reduced-motion** em todas as animações
- Considerar **impacto em bundle size** antes de adicionar libs
- Seguir **padrões estabelecidos** no projeto
- Manter **bundle < 200kb** (gzipped)

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
5. ✅ Estou usando **CSS primeiro** ou realmente preciso de Framer Motion?

Se qualquer resposta for NÃO → **revisar decisão**.

---

## 7. Estrutura de Decisão Técnica

### Fluxo de Decisão

```
Preciso adicionar interatividade/animação?
│
├─ Pode ser CSS puro? → Usar CSS
│
├─ Pode ser vanilla JS? → Usar vanilla JS
│
├─ Precisa de React? → Usar React + Framer Motion (se complexo)
│
└─ Precisa de animação complexa? → Framer Motion (apenas em React)
```

### Exemplos Práticos

**Exemplo 1: Botão com hover**
- ✅ **Solução**: CSS (`:hover`, `transition`)
- ❌ **Errado**: React + Framer Motion

**Exemplo 2: Preloader com scroll controlado**
- ✅ **Solução**: React + Framer Motion (já implementado)
- ✅ **Correto**: Precisa de estado, hooks, animações complexas

**Exemplo 3: Hero section com fade-in**
- ✅ **Solução**: CSS (`@keyframes`, `animation`)
- ❌ **Errado**: Framer Motion (overengineering)

**Exemplo 4: Seção estática com texto**
- ✅ **Solução**: Astro component puro (sem JS)
- ❌ **Errado**: React component (desnecessário)

---

## 8. Métricas e Validação

### Métricas de Sucesso

- **Bundle size**: < 200kb gzipped (OBRIGATÓRIO)
- **Performance**: Lighthouse > 90, LCP < 2.5s (OBRIGATÓRIO)
- **SEO**: Conteúdo crítico renderizado no servidor (OBRIGATÓRIO)
- **Acessibilidade**: Todas animações respeitam `prefers-reduced-motion` (OBRIGATÓRIO)

### Validação de Decisões

Antes de commitar código que adiciona:

- **React**: Validar que vanilla JS não resolve
- **Framer Motion**: Validar que componente é React E animação é complexa
- **Nova dependência**: Justificar em PR/comentário

---

## 9. Resumo Executivo

### Stack Atual (Validada)

- **Astro**: Framework base (static-first, islands)
- **Tailwind CSS**: Estilização (utility-first, mobile-first)
- **React**: Apenas onde necessário (ilhas interativas)
- **Framer Motion**: Apenas em componentes React com animações complexas

### Regras de Ouro

1. **Simplicidade sempre vence**
2. **React apenas quando necessário**
3. **CSS primeiro, Framer Motion depois**
4. **Performance e SEO são requisitos, não opções**
5. **YAGNI é lei**
6. **Preloader já está pronto** (não reescrever)

---

## 10. Referências e Contexto

- **Projeto**: Site institucional de festival (STL Festival)
- **Objetivo**: Performance máxima + SEO + experiência visual
- **Não é**: Sistema enterprise, SPA complexa, app interativo
- **É**: Site estático com ilhas de interatividade pontuais

**Última atualização**: Baseado em análise Tree of Thought completa (2024).  
**Aplicável a**: Desenvolvedores e agentes de IA trabalhando no projeto STL Festival.

---

## 11. Checklist de Validação

Antes de fazer qualquer mudança na stack, validar:

- [ ] Esta mudança resolve um problema real e atual?
- [ ] É a solução mais simples possível?
- [ ] O benefício supera claramente o custo?
- [ ] Está alinhado com este arquivo de rules?
- [ ] Não viola princípios de simplicidade?
- [ ] Não adiciona libs desnecessárias?

👉 Se alguma resposta for **NÃO** → **NÃO IMPLEMENTAR**

---

**Mantra do Projeto**:

> **"Site institucional não é sistema enterprise."**  
> **"Simplicidade intencional vence complexidade desnecessária."**  
> **"CSS primeiro, Framer Motion depois."**
