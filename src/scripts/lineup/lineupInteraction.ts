/**
 * Lineup Interaction - Gerencia interatividade da seção Line-up
 * Controla vídeo, imagens dos artistas e animações
 */

interface LineupElements {
  video: HTMLVideoElement | null
  videoContainer: HTMLElement | null
  artistContainers: HTMLElement[]
  artistButtons: HTMLButtonElement[]
}

let selectedArtistId: number | null = null
let _videoPlaying = false

/**
 * Mostra a imagem ou vídeo do artista no celular
 */
function showArtistImage(artistId: number, elements: LineupElements) {
  const { video, videoContainer, artistContainers, artistButtons } = elements

  // Se já está selecionado, deselecionar
  if (selectedArtistId === artistId) {
    hideArtistImage(elements)
    return
  }

  // Pausar vídeo principal e esconder container
  if (video && !video.paused) {
    video.pause()
    _videoPlaying = false
  }
  if (videoContainer) {
    videoContainer.classList.add('paused')
  }

  // Pausar e esconder todos os containers de artistas
  artistContainers.forEach(container => {
    container.classList.remove('active')
    // Pausar vídeos de artistas se houver
    const artistVideo = container.querySelector<HTMLVideoElement>('.lineup-artist-video')
    if (artistVideo && !artistVideo.paused) {
      artistVideo.pause()
    }
  })

  // Remover active de todos os botões
  artistButtons.forEach(btn => {
    btn.classList.remove('active')
  })

  // Mostrar container do artista selecionado
  const selectedContainer = Array.from(artistContainers).find(
    container => container.dataset.artistId === artistId.toString()
  )

  const selectedButton = Array.from(artistButtons).find(
    btn => btn.dataset.artistId === artistId.toString()
  )

  if (selectedContainer) {
    selectedContainer.classList.add('active')

    // Se o artista tem vídeo, reproduzir
    const artistVideo = selectedContainer.querySelector<HTMLVideoElement>('.lineup-artist-video')
    if (artistVideo) {
      artistVideo.play().catch(error => {
        console.warn('Erro ao reproduzir vídeo do artista:', error)
      })
    }
  }

  if (selectedButton) {
    selectedButton.classList.add('active')
  }

  selectedArtistId = artistId
}

/**
 * Esconde a imagem/vídeo do artista e retorna o vídeo principal
 */
function hideArtistImage(elements: LineupElements) {
  const { video, videoContainer, artistContainers, artistButtons } = elements

  // Esconder e pausar todos os containers de artistas
  artistContainers.forEach(container => {
    container.classList.remove('active')
    // Pausar vídeos de artistas se houver
    const artistVideo = container.querySelector<HTMLVideoElement>('.lineup-artist-video')
    if (artistVideo && !artistVideo.paused) {
      artistVideo.pause()
    }
  })

  // Remover active de todos os botões
  artistButtons.forEach(btn => {
    btn.classList.remove('active')
  })

  // Retomar vídeo principal e mostrar container
  if (videoContainer) {
    videoContainer.classList.remove('paused')
  }
  if (video && video.paused) {
    video
      .play()
      .then(() => {
        _videoPlaying = true
      })
      .catch(error => {
        console.warn('Erro ao retomar vídeo:', error)
      })
  }

  selectedArtistId = null
}

/**
 * Inicia o vídeo quando a seção entra no viewport
 */
function setupVideoIntersectionObserver(video: HTMLVideoElement) {
  if (!('IntersectionObserver' in window)) {
    // Fallback: iniciar vídeo imediatamente se não houver suporte
    video.play().catch(error => {
      console.warn('Erro ao iniciar vídeo:', error)
    })
    return
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && video.paused && selectedArtistId === null) {
          // Vídeo visível e nenhum artista selecionado
          video
            .play()
            .then(() => {
              _videoPlaying = true
            })
            .catch(error => {
              console.warn('Erro ao reproduzir vídeo:', error)
            })
        } else if (!entry.isIntersecting && !video.paused) {
          // Vídeo saiu do viewport, pausar para economizar recursos
          video.pause()
          _videoPlaying = false
        }
      })
    },
    {
      threshold: 0.3, // Iniciar quando 30% visível
    }
  )

  observer.observe(video)
}

/**
 * Configura navegação por teclado
 */
function setupKeyboardNavigation(elements: LineupElements) {
  const { artistButtons } = elements

  artistButtons.forEach(button => {
    button.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        const artistId = parseInt(button.dataset.artistId || '0', 10)
        if (artistId) {
          showArtistImage(artistId, elements)
        }
      }
    })
  })
}

/**
 * Função principal de setup
 */
export function setupLineupInteraction() {
  // Aguardar DOM estar pronto
  if (typeof document === 'undefined') return

  const lineupSection = document.getElementById('lineup')
  if (!lineupSection) {
    console.warn('[Lineup] Seção não encontrada')
    return
  }

  // Aguardar um frame para garantir que elementos estão renderizados
  requestAnimationFrame(() => {
    const video = lineupSection.querySelector<HTMLVideoElement>('#lineup-video')
    const videoContainer = lineupSection.querySelector<HTMLElement>('.video-content')
    const artistContainers = Array.from(
      lineupSection.querySelectorAll<HTMLElement>('.artist-content')
    )
    const artistButtons = Array.from(
      lineupSection.querySelectorAll<HTMLButtonElement>('.artist-name')
    )

    const elements: LineupElements = {
      video,
      videoContainer,
      artistContainers,
      artistButtons,
    }

    if (!video) {
      console.warn('[Lineup] Vídeo não encontrado')
      return
    }

    if (artistContainers.length === 0) {
      console.warn('[Lineup] Containers dos artistas não encontrados')
      return
    }

    if (artistButtons.length === 0) {
      console.warn('[Lineup] Botões dos artistas não encontrados')
      return
    }

    // Configurar Intersection Observer para vídeo
    setupVideoIntersectionObserver(video)

    // Adicionar event listeners nos botões
    artistButtons.forEach(button => {
      button.addEventListener('click', () => {
        const artistId = parseInt(button.dataset.artistId || '0', 10)
        if (artistId) {
          showArtistImage(artistId, elements)
        }
      })
    })

    // Configurar navegação por teclado
    setupKeyboardNavigation(elements)

    // Click fora da seção para deselecionar (opcional)
    document.addEventListener('click', e => {
      const target = e.target as HTMLElement
      if (
        selectedArtistId !== null &&
        !lineupSection.contains(target) &&
        !target.closest('.artist-name')
      ) {
        hideArtistImage(elements)
      }
    })

    console.log('[Lineup] Interatividade configurada com sucesso')
  })
}
