/**
 * Mobile Indicator - Indicador de scroll para dispositivos móveis
 * Aparece após preloader e desaparece ao scrollar
 */

/**
 * Configura indicador de scroll para mobile
 */
export function setupMobileScrollIndicator() {
  const indicator = document.getElementById('mobile-scroll-indicator')
  if (!indicator) return

  // Detectar se é mobile
  const isMobile = window.innerWidth < 1024
  if (!isMobile) return

  // Adicionar funcionalidade de scroll suave ao clicar
  indicator.addEventListener('click', (e) => {
    e.preventDefault()
    const target = indicator.getAttribute('data-scroll-to')
    if (target) {
      const targetElement = document.querySelector(target)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
        // Esconder indicador após clicar
        indicator.style.opacity = '0'
      }
    }
  })

  // Mostrar indicador após preloader
  window.addEventListener('preloader-complete', () => {
    setTimeout(() => {
      indicator.style.opacity = '1'
    }, 800)
  })

  // Esconder indicador ao começar a scrollar
  const hideOnScroll = () => {
    if (window.scrollY > 50) {
      indicator.style.opacity = '0'
      window.removeEventListener('scroll', hideOnScroll)
    }
  }

  window.addEventListener('scroll', hideOnScroll, { passive: true })

  // Auto-esconder após 5 segundos
  setTimeout(() => {
    indicator.style.opacity = '0'
  }, 5000)
}
