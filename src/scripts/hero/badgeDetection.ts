/**
 * Badge Detection - Muda cor do badge baseado na seção visível
 * Usa IntersectionObserver para performance otimizada
 */

interface Section {
  selector: string
  class: string
  element?: Element
}

/**
 * Configura detecção de seção para mudar cor do badge
 */
export function setupBadgeColorDetection() {
  const badge = document.querySelector('.spotify-badge') as HTMLElement
  if (!badge) return

  // Mapear seções e suas cores da paleta STL
  const sections: Section[] = [
    { selector: '.hero', class: 'badge-hero' }, // Translúcido
    { selector: '#sobre', class: 'badge-sobre' }, // Verde profundo #006a47
    { selector: '#lineup', class: 'badge-lineup' }, // Laranja intenso #ff9d28
    { selector: '#ingressos', class: 'badge-ingressos' }, // Vermelho vibrante #ff4d2d
    { selector: '#playlist', class: 'badge-playlist' }, // Azul-índigo #1e1876
  ]

  const sectionElements = sections
    .map(s => ({ ...s, element: document.querySelector(s.selector) }))
    .filter(s => s.element !== null)

  if (sectionElements.length === 0) return

  // Função para remover todas as classes de cor
  const removeAllColorClasses = () => {
    sections.forEach(s => badge.classList.remove(s.class))
  }

  // Criar observer para cada seção
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Encontrar qual seção está visível
          const section = sectionElements.find(s => s.element === entry.target)
          if (section) {
            removeAllColorClasses()
            badge.classList.add(section.class)
          }
        }
      })
    },
    {
      threshold: 0.3, // Detecta quando 30% da seção está visível
      rootMargin: '-20% 0px -20% 0px', // Detecção mais sensível
    }
  )

  // Observar todas as seções
  sectionElements.forEach(s => {
    if (s.element) observer.observe(s.element)
  })

  // Inicializar com cor da Hero
  badge.classList.add('badge-hero')
}
