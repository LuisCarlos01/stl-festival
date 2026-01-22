# Guia: Imagem de Fundo Mobile - Seção About

## Status Atual

A seção About usa a mesma imagem (`/about.png`) para todos os dispositivos, com ajustes de `background-position` e `background-size` via CSS.

## Como Adicionar Imagem Específica para Mobile

Se a imagem atual não estiver funcionando bem em mobile, siga estes passos:

### 1. Preparar a Imagem Mobile

- Crie uma versão otimizada da imagem para mobile
- Dimensões recomendadas: **750px de largura** (para Retina displays)
- Formato: PNG ou WebP
- Nome sugerido: `about-mobile.png` ou `about-mobile.webp`

### 2. Adicionar ao Projeto

Coloque a imagem em: `/public/about-mobile.png`

### 3. Atualizar o CSS

No arquivo `src/components/sections/About.astro`, localize a seção mobile do CSS (linha ~52) e descomente/edite:

```css
/* Mobile: imagem de fundo otimizada para mobile */
@media (max-width: 767px) {
  .about-background {
    /* Trocar para imagem específica mobile */
    background-image: url('/about-mobile.png');
    background-size: cover;
    background-position: center center;
    min-height: 100dvh;
  }
}
```

### 4. Otimizações Adicionais

#### Usar WebP com Fallback

Para melhor performance, você pode usar WebP com fallback para PNG:

```css
@media (max-width: 767px) {
  .about-background {
    background-image: url('/about-mobile.webp');
    background-image: image-set(
      url('/about-mobile.webp') type('image/webp'),
      url('/about-mobile.png') type('image/png')
    );
  }
}
```

#### Ajustar Posicionamento do Texto

Se necessário, ajuste o posicionamento do texto no mobile:

```css
@media (max-width: 767px) {
  .about-content-wrapper {
    padding-top: 30vh; /* Ajustar conforme necessário */
    padding-bottom: 10vh;
  }
}
```

## Verificação da Imagem Atual

Antes de criar uma nova imagem, teste a atual em diferentes dispositivos:

1. **Chrome DevTools** → Device Toolbar (Ctrl+Shift+M)
2. Testar em:
   - iPhone SE (375px)
   - iPhone 12 Pro (390px)
   - Samsung Galaxy S20 (360px)
   - iPad (768px)

## Critérios para Decisão

**Use a mesma imagem** se:

- ✅ O texto está legível em todos os tamanhos
- ✅ A área laranja está visível e bem posicionada
- ✅ Não há cortes importantes na imagem

**Crie imagem mobile específica** se:

- ❌ Elementos importantes são cortados
- ❌ O texto fica sobre áreas escuras/ilegíveis
- ❌ A composição não funciona em orientação vertical
- ❌ A imagem fica muito "apertada" ou distorcida

## Teste do Efeito de Highlight

Após ajustar a imagem, verifique se o efeito de highlight está funcionando:

1. Abra o console do navegador (F12)
2. Role até a seção About
3. Verifique os logs `[Highlight]`
4. O efeito deve aplicar a cor `#ff4d2d` sobre o texto

Se o efeito não funcionar:

- Verifique se `isMobile` está detectado corretamente
- Confirme que o IntersectionObserver está disparando
- Verifique se as classes `.animate` estão sendo aplicadas
