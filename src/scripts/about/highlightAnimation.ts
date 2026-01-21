/**
 * Highlight Animation - About Section
 * Versão simplificada e direta com debug
 */

export function setupHighlightAnimation(): void {
  console.log('[Highlight] Iniciando setupHighlightAnimation')

  // Função para aplicar animação
  const applyAnimation = (highlights: HTMLElement[]) => {
    console.log('[Highlight] Aplicando animação em', highlights.length, 'elementos')
    highlights.forEach((highlight, index) => {
      console.log(`[Highlight] Adicionando classe 'animate' ao elemento ${index + 1}`)
      highlight.classList.add('animate')
      // Verificar se a classe foi adicionada
      setTimeout(() => {
        const hasClass = highlight.classList.contains('animate')
        console.log(`[Highlight] Elemento ${index + 1} tem classe 'animate':`, hasClass)
      }, 100)
    })
  }

  // Função principal de inicialização
  const init = () => {
    console.log('[Highlight] Iniciando init()')

    // Buscar seção About
    const aboutSection = document.getElementById('sobre')
    console.log('[Highlight] Seção encontrada:', !!aboutSection)

    if (!aboutSection) {
      console.log('[Highlight] Seção não encontrada, tentando novamente em 500ms')
      setTimeout(init, 500)
      return
    }

    // Buscar elementos com highlight
    const highlights = Array.from(
      aboutSection.querySelectorAll('.brush-highlight')
    ) as HTMLElement[]
    console.log('[Highlight] Elementos encontrados:', highlights.length)

    if (highlights.length === 0) {
      console.log('[Highlight] Nenhum elemento encontrado, tentando novamente em 500ms')
      setTimeout(init, 500)
      return
    }

    // Verificar reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    console.log('[Highlight] Reduced motion:', prefersReducedMotion)

    if (prefersReducedMotion) {
      console.log('[Highlight] Aplicando animação imediatamente (reduced motion)')
      applyAnimation(highlights)
      return
    }

    // Verificar se já está visível
    const checkVisibility = () => {
      const rect = aboutSection.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const isVisible = rect.top < windowHeight && rect.bottom > 0
      console.log('[Highlight] Verificando visibilidade:', {
        top: rect.top,
        bottom: rect.bottom,
        windowHeight,
        isVisible,
      })
      return isVisible
    }

    // Se já está visível, aplicar imediatamente
    if (checkVisibility()) {
      console.log('[Highlight] Seção já visível, aplicando animação')
      applyAnimation(highlights)
      return
    }

    // Configurar IntersectionObserver
    console.log('[Highlight] Configurando IntersectionObserver')
    const observer = new IntersectionObserver(
      entries => {
        console.log('[Highlight] IntersectionObserver callback chamado', entries.length, 'entradas')
        entries.forEach(entry => {
          console.log('[Highlight] Entry:', {
            isIntersecting: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio,
            boundingClientRect: entry.boundingClientRect,
          })

          if (entry.isIntersecting) {
            console.log('[Highlight] Seção entrou na viewport!')
            applyAnimation(highlights)
            observer.disconnect()
            console.log('[Highlight] Observer desconectado')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
      }
    )

    observer.observe(aboutSection)
    console.log('[Highlight] Observer configurado e observando seção')

    // Fallback após 5 segundos
    setTimeout(() => {
      if (checkVisibility()) {
        console.log('[Highlight] Fallback: aplicando animação após timeout')
        applyAnimation(highlights)
        observer.disconnect()
      }
    }, 5000)
  }

  // Aguardar DOM estar pronto
  if (typeof window === 'undefined') {
    console.log('[Highlight] Window não disponível')
    return
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log('[Highlight] DOM pronto, iniciando imediatamente')
    setTimeout(init, 100)
  } else {
    console.log('[Highlight] Aguardando DOMContentLoaded')
    document.addEventListener('DOMContentLoaded', init, { once: true })
    window.addEventListener('load', init, { once: true })
  }
}
