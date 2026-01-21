# Guia Prático de Uso - Identidade Visual STL Festival

Este guia fornece instruções práticas para usar corretamente os elementos da identidade visual do STL Festival em desenvolvimento e design.

---

## 1. Paleta de Cores

### 1.1 Cores Primárias

Use estas cores para elementos principais e de destaque:

```css
/* Vermelho - Energia, impacto, ação */
--color-primary-red: #ff4d2d

/* Laranja - Calor humano, alegria, festival */
--color-primary-orange: #ff9d28

/* Índigo - Profundidade, contraste elegante */
--color-primary-indigo: #1e1876
```

**Quando usar:**
- **Vermelho**: CTAs principais, badges de urgência, elementos de destaque
- **Laranja**: Elementos de festividade, destaques secundários, hover states
- **Índigo**: Texto principal, headers, elementos de profundidade

### 1.2 Cores Secundárias

Use para elementos de apoio e contexto:

```css
/* Verde - Natural, orgânico, sustentável */
--color-secondary-green: #006a47

/* Teal - Moderno, tecnológico */
--color-secondary-teal: #007b9a
```

**Quando usar:**
- **Verde**: Seções sobre natureza/sustentabilidade, badges ecológicos
- **Teal**: Elementos tecnológicos, links secundários (uso limitado)

### 1.3 Cores Neutras

```css
/* Creme - Background principal */
--color-neutral-cream: #fefbdf

/* Branco */
--color-neutral-white: #ffffff

/* Preto */
--color-neutral-black: #000000
```

**Quando usar:**
- **Creme**: Background principal do site, respiro visual
- **Branco**: Texto sobre fundos escuros, backgrounds de cards
- **Preto**: Texto sobre fundos claros, elementos de contraste

### 1.4 Cores Funcionais

```css
/* Texto */
--color-text-primary: #1e1876    /* Índigo */
--color-text-secondary: #006a47   /* Verde */
--color-text-light: #fefbdf       /* Creme */

/* Backgrounds */
--color-bg-primary: #fefbdf       /* Creme */
--color-bg-dark: #1e1876          /* Índigo */
--color-bg-accent: #ff4d2d        /* Vermelho */
```

---

## 2. Tipografia

### 2.1 Fontes Disponíveis

**Jairo (Display)**
- **Uso**: Headlines (h1-h3), CTAs, elementos de destaque
- **Classe CSS**: `.font-display`
- **Peso**: Normal (400)
- **Letter-spacing**: -0.02em a -0.03em

**Inter (Body)**
- **Uso**: Corpo de texto, navegação, labels, parágrafos
- **Classe CSS**: `.font-body`
- **Pesos**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

**Superbusy Activity (Decorative)**
- **Status**: ⚠️ Decisão pendente sobre uso
- **Uso sugerido**: Badges decorativos, elementos lúdicos (se aprovado)

### 2.2 Escala Tipográfica

```css
--text-xs: 0.75rem;    /* 12px - Labels pequenos */
--text-sm: 0.875rem;   /* 14px - Texto secundário */
--text-base: 1rem;     /* 16px - Corpo de texto */
--text-lg: 1.125rem;   /* 18px - Destaques */
--text-xl: 1.25rem;    /* 20px - Subtítulos */
--text-2xl: 1.5rem;   /* 24px - h4 */
--text-3xl: 1.875rem;  /* 30px - h3 */
--text-4xl: 2.25rem;   /* 36px - h2 */
--text-5xl: 3rem;      /* 48px - h1 mobile */
--text-6xl: 3.75rem;   /* 60px - h1 tablet */
--text-7xl: 4.5rem;    /* 72px - h1 desktop */
```

### 2.3 Exemplos de Uso

**Headline Principal (Hero)**
```html
<h1 class="font-display text-5xl md:text-6xl lg:text-7xl text-white">
  STL Festival 2026
</h1>
```

**CTA Button**
```html
<button class="font-display text-xl text-white bg-primary-red px-8 py-4">
  Comprar Ingressos
</button>
```

**Corpo de Texto**
```html
<p class="font-body text-base text-text-primary">
  O STL Festival é mais do que música...
</p>
```

---

## 3. Logos

### 3.1 Versões Disponíveis

**Logo Principal** (`/logo/logo-stl.svg`)
- **Uso**: Hero section, headers grandes, impressão
- **Dimensões**: 1080x1080px (SVG escalável)
- **Cores**: Múltiplas (vermelho, laranja, índigo, verde, creme)

**Logo Colorida** (`/logo/logo-colorida.svg`)
- **Status**: ⚠️ Uso não documentado
- **Recomendação**: Usar apenas se houver necessidade específica

**Favicon** (`/favicon.svg`)
- **Status**: ⚠️ TEMPORÁRIO - Aguardar decisão do favicon definitivo
- **Uso**: Favicon do site

### 3.2 Implementação

**No Hero Section:**
```html
<img
  src="/logo/logo-stl.svg"
  alt="STL Festival Logo"
  class="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16"
/>
```

**Como Favicon (temporário):**
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

### 3.3 Regras de Uso

✅ **FAZER:**
- Usar logo principal em tamanhos grandes (Hero, headers)
- Manter proporção original
- Garantir contraste adequado com fundo
- Usar formato SVG para escalabilidade

❌ **NÃO FAZER:**
- Distorcer ou alterar proporções
- Usar em tamanhos muito pequenos (< 32px) sem versão simplificada
- Alterar cores do logo
- Usar logo colorida sem justificativa

---

## 4. Cores por Seção

### 4.1 Hero Section
- **Background**: Vídeo/imagem com overlay escuro
- **Texto**: Branco sobre overlay
- **Badge Spotify**: Glassmorphism translúcido
- **Logo**: Branco/creme

### 4.2 Sobre o Festival
- **Background**: Branco ou Creme claro
- **Texto**: Índigo (`#1e1876`)
- **Badge Spotify**: Verde profundo (`#006a47`) com acento laranja
- **Destaques**: Verde secundário

### 4.3 Line-up
- **Background**: Creme (`#fefbdf`)
- **Texto**: Índigo
- **Badge Spotify**: Laranja (`#ff9d28`) com acento índigo
- **Destaques**: Laranja

### 4.4 Ingressos
- **Background**: Índigo (`#1e1876`)
- **Texto**: Branco/Creme
- **Badge Spotify**: Vermelho (`#ff4d2d`) com acento creme
- **CTAs**: Vermelho ou Laranja

### 4.5 Playlist
- **Background**: Creme
- **Texto**: Índigo
- **Badge Spotify**: Índigo (`#1e1876`) com acento vermelho
- **Destaques**: Índigo

---

## 5. Componentes Padrão

### 5.1 Botões

**CTA Principal:**
```html
<button class="font-display text-xl text-white bg-primary-red px-8 py-4 rounded-lg hover:bg-opacity-90 transition-all">
  Comprar Ingressos
</button>
```

**CTA Secundário:**
```html
<button class="font-display text-lg text-primary-indigo bg-transparent border-2 border-primary-indigo px-6 py-3 rounded-lg hover:bg-primary-indigo hover:text-white transition-all">
  Saiba Mais
</button>
```

### 5.2 Cards

**Card Padrão:**
```html
<div class="bg-white rounded-xl shadow-lg p-6">
  <h3 class="font-display text-2xl text-primary-indigo mb-4">Título</h3>
  <p class="font-body text-base text-text-primary">Conteúdo...</p>
</div>
```

### 5.3 Badges

**Badge de Destaque:**
```html
<span class="font-display text-sm text-white bg-primary-orange px-4 py-2 rounded-full">
  Novo
</span>
```

---

## 6. Acessibilidade

### 6.1 Contraste

**Combinações Aprovadas:**
- ✅ Índigo (`#1e1876`) sobre Creme (`#fefbdf`) - Contraste: 12.5:1
- ✅ Branco sobre Índigo - Contraste: 15.8:1
- ✅ Índigo sobre Branco - Contraste: 15.8:1
- ⚠️ Verde (`#006a47`) sobre Creme - Contraste: 4.2:1 (verificar uso)

**Regras:**
- Texto normal: mínimo 4.5:1
- Texto grande: mínimo 3:1
- Elementos não-texto: mínimo 3:1

### 6.2 Focus States

Todos os elementos interativos devem ter focus visible:
```css
:focus-visible {
  outline: 2px solid var(--color-primary-red);
  outline-offset: 2px;
}
```

### 6.3 Reduced Motion

Respeitar preferência do usuário:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 7. Checklist de Implementação

### 7.1 Cores
- [ ] Usar variáveis CSS do sistema (`tokens.css`)
- [ ] Integrar cores no Tailwind config
- [ ] Verificar contraste de todas as combinações
- [ ] Testar em modo escuro (se aplicável)

### 7.2 Tipografia
- [ ] Usar `.font-display` para headlines
- [ ] Usar `.font-body` para corpo de texto
- [ ] Respeitar escala tipográfica
- [ ] Garantir legibilidade em mobile

### 7.3 Logos
- [ ] Usar logo principal em tamanhos adequados
- [ ] Manter proporção original
- [ ] Garantir contraste com fundo
- [ ] Usar formato SVG

### 7.4 Componentes
- [ ] Seguir padrões de botões
- [ ] Usar cards padrão
- [ ] Implementar badges conforme guia
- [ ] Garantir acessibilidade

---

## 8. Recursos e Referências

### 8.1 Arquivos Principais
- `src/styles/tokens.css` - Sistema de design tokens
- `src/styles/global.css` - Estilos globais
- `public/logo/logo-stl.svg` - Logo principal
- `docs/analise-identidade-visual.md` - Análise completa

### 8.2 Ferramentas Úteis
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors](https://coolors.co/) - Para explorar paleta
- [Type Scale](https://type-scale.com/) - Para escala tipográfica

---

**Última atualização**: Janeiro 2025  
**Versão**: 1.0
