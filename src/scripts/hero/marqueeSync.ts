/**
 * Marquee Sync - Sincroniza marquee com scroll (parallax-style)
 */

/**
 * Interpolação suave (lerp) para movimento fluido
 */
function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/**
 * Configura sincronização do marquee com scroll
 */
export function setupMarqueeScrollSync(): (() => void) | undefined {
  const marqueeElement = document.getElementById('marquee-text');
  if (!marqueeElement) return;

  const marquee = marqueeElement as HTMLElement;

  // Calcular largura do conteúdo para loop infinito
  const marqueeWidth = marquee.scrollWidth / 2; // Dividir por 2 porque temos 8 itens duplicados
  if (marqueeWidth === 0) return;

  let currentX = 0; // Posição atual do marquee
  let targetX = 0; // Posição alvo baseada no scroll
  let lastScrollY = 0;
  let animationId: number;

  // Fator de movimento: quanto o marquee se move em relação ao scroll
  const scrollFactor = 0.5; // 0.5 = move metade da velocidade do scroll (mais suave)

  function updateMarquee() {
    const scrollY = window.scrollY;
    const scrollDelta = scrollY - lastScrollY;

    // Scroll para baixo (positivo) → texto para esquerda (negativo)
    // Scroll para cima (negativo) → texto para direita (positivo)
    targetX -= scrollDelta * scrollFactor;

    // Loop infinito: resetar posição quando ultrapassar metade do conteúdo
    if (targetX < -marqueeWidth) {
      targetX += marqueeWidth;
      currentX += marqueeWidth;
    } else if (targetX > 0) {
      targetX -= marqueeWidth;
      currentX -= marqueeWidth;
    }

    // Interpolar suavemente entre posição atual e alvo (easing)
    currentX = lerp(currentX, targetX, 0.1); // 0.1 = muito suave

    // Aplicar transformação
    marquee.style.transform = `translateX(${currentX}px)`;

    lastScrollY = scrollY;

    // Continuar animação
    animationId = requestAnimationFrame(updateMarquee);
  }

  // Iniciar animação
  animationId = requestAnimationFrame(updateMarquee);

  // Cleanup (se necessário)
  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  };
}
