# Guia de Uso de Logos - STL Festival

Este documento define como e quando usar cada versão do logo do STL Festival.

---

## 1. Versões Disponíveis

### 1.1 Logo Principal (`logo-stl.svg`)

**Arquivo**: `/public/logo/logo-stl.svg`  
**Dimensões**: 1080x1080px (SVG escalável)  
**Cores**: Múltiplas (vermelho `#ff4d2d`, laranja `#ff9d28`, índigo `#1e1876`, verde `#006a47`, creme `#fefbdf`)

**Quando usar:**
- ✅ Hero section (tamanhos grandes)
- ✅ Headers principais
- ✅ Impressão e materiais físicos
- ✅ Páginas de destaque
- ✅ Tamanhos acima de 64px

**Quando NÃO usar:**
- ❌ Tamanhos muito pequenos (< 32px)
- ❌ Favicon (usar versão simplificada)
- ❌ Ícones de navegação mobile

---

### 1.2 Logo Colorida (`logo-colorida.svg`)

**Arquivo**: `/public/logo/logo-colorida.svg`  
**Dimensões**: 916x857.8px (SVG escalável)  
**Cores**: `#fe4f2d`, `#fe9c28`, `#0d422f` (diferentes do sistema)

**Status**: ⚠️ **USO NÃO RECOMENDADO**

**Observações:**
- Cores ligeiramente diferentes do sistema de design (`#fe4f2d` vs `#ff4d2d`)
- Pode causar inconsistência visual
- Uso não documentado

**Recomendação**: 
- Usar apenas se houver necessidade específica aprovada
- Padronizar cores antes de usar em produção
- Documentar caso de uso específico

---

### 1.3 Favicon (`favicon.svg`)

**Arquivo**: `/public/favicon.svg`  
**Status**: ⚠️ **TEMPORÁRIO**

**Observações:**
- Favicon atual é temporário
- Aguardar decisão do favicon definitivo
- Suporta dark mode automático

**Quando o favicon definitivo for decidido:**
- Atualizar arquivo `/public/favicon.svg`
- Garantir legibilidade em tamanhos pequenos (16x16px, 32x32px)
- Testar em diferentes navegadores
- Criar versões para diferentes dispositivos (apple-touch-icon, etc.)

---

## 2. Regras de Uso

### 2.1 Tamanhos Mínimos e Máximos

**Logo Principal:**
- **Mínimo recomendado**: 64px (altura)
- **Máximo**: Sem limite (SVG escalável)
- **Ideal para Hero**: 128px - 256px

**Favicon:**
- **16x16px**: Navegadores desktop
- **32x32px**: Navegadores desktop (alta resolução)
- **180x180px**: Apple touch icon (iOS)

### 2.2 Espaçamento

**Zona de Proteção:**
- Manter espaço livre equivalente a 20% da altura do logo ao redor
- Não colocar texto ou elementos muito próximos

**Exemplo:**
```
Logo de 100px de altura → 20px de espaço livre mínimo
```

### 2.3 Contraste e Legibilidade

**Fundos Claros (Creme, Branco):**
- ✅ Logo principal funciona bem
- ✅ Cores originais mantidas

**Fundos Escuros (Índigo, Preto):**
- ✅ Logo principal funciona bem
- ⚠️ Considerar versão com cores ajustadas se necessário

**Fundos Coloridos:**
- ⚠️ Testar contraste antes de usar
- Garantir legibilidade de todos os elementos

---

## 3. Implementação Técnica

### 3.1 HTML/JSX

**Logo no Hero:**
```html
<img
  src="/logo/logo-stl.svg"
  alt="STL Festival Logo"
  class="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16"
  width="64"
  height="64"
  loading="eager"
  decoding="async"
/>
```

**Logo em Header:**
```html
<a href="/" aria-label="Voltar ao início">
  <img
    src="/logo/logo-stl.svg"
    alt="STL Festival"
    class="h-10 w-10 md:h-12 md:w-12"
    width="48"
    height="48"
  />
</a>
```

**Favicon (temporário):**
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

### 3.2 Astro Component

**Exemplo de componente reutilizável:**

```astro
---
// components/Logo.astro
interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'colorida'
  class?: string
}

const {
  size = 'md',
  variant = 'default',
  class: className = '',
} = Astro.props

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
  xl: 'h-24 w-24',
}

const logoPath = variant === 'colorida' 
  ? '/logo/logo-colorida.svg' 
  : '/logo/logo-stl.svg'
---

<img
  src={logoPath}
  alt="STL Festival Logo"
  class={`${sizeClasses[size]} ${className}`}
  width="64"
  height="64"
  loading="eager"
  decoding="async"
/>
```

**Uso:**
```astro
<Logo size="lg" />
<Logo size="md" variant="colorida" />
```

---

## 4. Casos de Uso Específicos

### 4.1 Hero Section

**Tamanho**: Grande (128px - 256px)  
**Posição**: Canto superior esquerdo ou centralizado  
**Fundo**: Sobre vídeo/imagem com overlay

```html
<div class="hero-logo fixed left-4 top-4 z-20">
  <img
    src="/logo/logo-stl.svg"
    alt="STL Festival Logo"
    class="h-16 w-16 md:h-20 md:w-20"
  />
</div>
```

### 4.2 Header/Navegação

**Tamanho**: Médio (48px - 64px)  
**Posição**: Esquerda do header  
**Fundo**: Sobre fundo claro ou escuro

```html
<header class="bg-white">
  <a href="/">
    <img
      src="/logo/logo-stl.svg"
      alt="STL Festival"
      class="h-12 w-12"
    />
  </a>
</header>
```

### 4.3 Footer

**Tamanho**: Pequeno a Médio (32px - 48px)  
**Posição**: Centralizado ou à esquerda  
**Fundo**: Geralmente escuro

```html
<footer class="bg-bg-dark">
  <img
    src="/logo/logo-stl.svg"
    alt="STL Festival"
    class="h-10 w-10 mx-auto"
  />
</footer>
```

### 4.4 Impressão

**Tamanho**: Grande (mínimo 1cm de altura)  
**Formato**: SVG ou PNG alta resolução  
**Cores**: Cores originais ou versão monocromática

---

## 5. Versões Futuras Recomendadas

### 5.1 Logo Simplificado

**Necessidade**: Para uso em tamanhos pequenos  
**Características**:
- Versão simplificada do logo principal
- Menos detalhes
- Mantém identidade visual
- Legível em 16px - 32px

**Quando criar:**
- Quando houver necessidade de favicon definitivo
- Para uso em mobile navigation
- Para ícones de app

### 5.2 Logo Monocromático

**Necessidade**: Para uso em fundos coloridos ou impressão  
**Características**:
- Versão em uma cor só
- Branco para fundos escuros
- Preto para fundos claros

**Quando criar:**
- Impressão em uma cor
- Fundos muito coloridos
- Necessidade de contraste específico

### 5.3 Logo Horizontal

**Necessidade**: Para espaços horizontais  
**Características**:
- Logo + texto "STL Festival" lado a lado
- Proporção horizontal
- Versão compacta

**Quando criar:**
- Headers com espaço horizontal limitado
- Assinaturas de email
- Materiais impressos horizontais

---

## 6. Checklist de Uso

Antes de usar qualquer logo, verificar:

- [ ] Tamanho adequado para o contexto
- [ ] Contraste suficiente com o fundo
- [ ] Espaçamento adequado ao redor
- [ ] Formato SVG (quando possível)
- [ ] Alt text descritivo
- [ ] Loading otimizado (eager para acima da dobra)
- [ ] Responsividade testada

---

## 7. Problemas Conhecidos

### 7.1 Inconsistência de Cores

**Problema**: Logo colorida usa cores diferentes (`#fe4f2d` vs `#ff4d2d`)

**Solução**: 
- Padronizar cores antes de usar em produção
- Ou documentar caso de uso específico

### 7.2 Favicon Temporário

**Problema**: Favicon atual é temporário

**Solução**: 
- Aguardar decisão do favicon definitivo
- Criar versão simplificada quando decidido

### 7.3 Complexidade em Tamanhos Pequenos

**Problema**: Logo principal muito detalhado para tamanhos pequenos

**Solução**: 
- Criar versão simplificada
- Usar apenas em tamanhos adequados (> 64px)

---

## 8. Recursos

- **Análise Completa**: `docs/analise-identidade-visual.md`
- **Guia de Uso Geral**: `docs/guia-uso-identidade-visual.md`
- **Arquivos**: `/public/logo/`

---

**Última atualização**: Janeiro 2025  
**Versão**: 1.0
