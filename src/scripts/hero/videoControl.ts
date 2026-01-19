/**
 * Video Control - Gerencia vídeo e fallback do Hero
 * Controla opacidade, playback e error handling
 * Versão 2.0: Com detecção e correção automática de travamentos
 */

export interface VideoControlElements {
  video: HTMLVideoElement | null;
  fallbackImage: HTMLImageElement | null;
  logo: HTMLElement | null;
  badge: HTMLElement | null;
}

// Contador de travamentos para fallback automático
let stallCount = 0;
const MAX_STALLS = 2; // Após 2 travamentos, usa imagem

/**
 * Atualiza opacidade do vídeo/imagem baseado no progresso do preloader
 */
export function updateHeroContent(progress: number, elements: VideoControlElements) {
  const { video, fallbackImage, logo, badge } = elements;

  // Vídeo ou imagem aparece gradualmente conforme cortinas abrem (0-100%)
  const mediaOpacity = Math.min(1, progress / 100);

  if (video && stallCount < MAX_STALLS) {
    video.style.opacity = mediaOpacity.toString();

    // Iniciar playback no primeiro movimento, mas apenas se vídeo estiver pronto
    if (progress > 0 && video.paused && video.readyState >= 2) {
      video.play().catch((error) => {
        console.warn('Erro ao reproduzir vídeo, usando fallback:', error);
        switchToFallback(video, fallbackImage, mediaOpacity);
      });
    }
  } else if (fallbackImage) {
    // Se não houver vídeo OU atingiu limite de travamentos, usar imagem
    if (video && stallCount >= MAX_STALLS) {
      switchToFallback(video, fallbackImage, mediaOpacity);
    } else {
      fallbackImage.style.opacity = mediaOpacity.toString();
    }
  }

  // Logo aparece aos 70% do progresso
  if (logo) {
    if (progress >= 70) {
      const opacity = Math.min(1, (progress - 70) / 30); // 70-100% = fade in
      logo.style.opacity = opacity.toString();
    } else {
      logo.style.opacity = '0';
    }
  }

  // Badge aparece aos 80% do progresso
  if (badge) {
    if (progress >= 80) {
      const opacity = Math.min(1, (progress - 80) / 20); // 80-100% = fade in
      badge.style.opacity = opacity.toString();
    } else {
      badge.style.opacity = '0';
    }
  }
}

/**
 * Muda para imagem de fallback
 */
function switchToFallback(
  video: HTMLVideoElement,
  fallbackImage: HTMLImageElement | null,
  opacity: number
) {
  console.warn('Alternando para imagem de fallback devido a problemas no vídeo');
  video.pause();
  video.style.display = 'none';
  if (fallbackImage) {
    fallbackImage.style.display = 'block';
    fallbackImage.style.opacity = opacity.toString();
  }
}

/**
 * Garante vídeo ou fallback visível quando preloader completar
 */
export function startVideo(elements: VideoControlElements) {
  const { video, fallbackImage } = elements;

  // Se já atingiu limite de travamentos, ir direto para imagem
  if (stallCount >= MAX_STALLS && video) {
    console.warn('Limite de travamentos atingido, usando imagem estática');
    switchToFallback(video, fallbackImage, 1);
    return;
  }

  if (video) {
    video.style.opacity = '1';
    
    // Tentar reproduzir apenas quando vídeo estiver pronto
    const tryPlay = () => {
      if (video.paused && video.readyState >= 2) {
        // Reduzir playback rate para melhor buffer (opcional)
        video.playbackRate = 1.0;
        
        video.play().catch((error) => {
          console.warn('Erro ao reproduzir vídeo, usando fallback:', error);
          switchToFallback(video, fallbackImage, 1);
        });
      } else if (video.readyState < 2) {
        // Se vídeo não está pronto, aguardar evento canplaythrough
        video.addEventListener(
          'canplaythrough',
          () => {
            tryPlay();
          },
          { once: true }
        );
        
        // Timeout de segurança: após 5s sem carregar, usa imagem
        setTimeout(() => {
          if (video.readyState < 2) {
            console.warn('Timeout: vídeo não carregou a tempo, usando fallback');
            switchToFallback(video, fallbackImage, 1);
          }
        }, 5000);
      }
    };
    
    tryPlay();
  } else if (fallbackImage) {
    // Se não houver vídeo, garantir que imagem está visível
    fallbackImage.style.opacity = '1';
  }
}

/**
 * Configura tratamento de erros para vídeo e imagem
 */
export function setupVideoErrorHandling(elements: VideoControlElements) {
  const { video, fallbackImage } = elements;

  if (video && fallbackImage) {
    // Erro ao carregar vídeo
    video.addEventListener('error', () => {
      console.error('Erro ao carregar vídeo, usando imagem de fallback');
      switchToFallback(video, fallbackImage, parseFloat(video.style.opacity) || 1);
    });

    // Se imagem Cloudinary falhar, usar fallback local
    fallbackImage.addEventListener('error', () => {
      console.warn('Erro ao carregar imagem Cloudinary, usando fallback local');
      fallbackImage.src = '/images/fallback-hero/foto-95.jpg';
    });

    // Vídeo carregou com sucesso
    video.addEventListener('loadeddata', () => {
      console.log('Vídeo carregado com sucesso');
    });

    // CRÍTICO: Detectar travamentos e agir
    let stallTimeout: number;
    video.addEventListener('stalled', () => {
      stallCount++;
      console.warn(`Vídeo travado (${stallCount}/${MAX_STALLS})...`);
      
      if (stallCount >= MAX_STALLS) {
        console.error('Muitos travamentos, alternando para imagem permanentemente');
        switchToFallback(video, fallbackImage, parseFloat(video.style.opacity) || 1);
      } else {
        // Tentar recarregar buffer
        console.log('Tentando recarregar buffer...');
        const currentTime = video.currentTime;
        video.load();
        
        // Restaurar posição após reload
        video.addEventListener(
          'loadedmetadata',
          () => {
            video.currentTime = currentTime;
            video.play().catch(() => {
              console.error('Falha ao retomar após reload');
              switchToFallback(video, fallbackImage, 1);
            });
          },
          { once: true }
        );
      }
    });

    // Detectar quando está buffering
    video.addEventListener('waiting', () => {
      console.log('Vídeo buffering...');
      
      // Se ficar buffering por mais de 3 segundos, considerar como stall
      stallTimeout = window.setTimeout(() => {
        stallCount++;
        console.warn(`Buffering excessivo detectado (${stallCount}/${MAX_STALLS})`);
        
        if (stallCount >= MAX_STALLS) {
          switchToFallback(video, fallbackImage, parseFloat(video.style.opacity) || 1);
        }
      }, 3000);
    });

    // Limpar timeout quando vídeo retomar
    video.addEventListener('playing', () => {
      clearTimeout(stallTimeout);
      console.log('Vídeo reproduzindo normalmente');
    });

    // Detectar quando pode reproduzir (suficiente buffer)
    video.addEventListener('canplay', () => {
      console.log('Vídeo pronto para reproduzir');
    });

    // Detecção de conexão lenta (usar imagem imediatamente)
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection && connection.effectiveType) {
        const slowConnections = ['slow-2g', '2g'];
        if (slowConnections.includes(connection.effectiveType)) {
          console.warn('Conexão muito lenta detectada, usando imagem ao invés de vídeo');
          stallCount = MAX_STALLS; // Forçar uso de imagem
          switchToFallback(video, fallbackImage, 1);
        }
      }
    }

    // Monitorar mudanças de conexão
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection) {
        connection.addEventListener('change', () => {
          console.log(`Conexão mudou: ${connection.effectiveType}`);
          if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            console.warn('Conexão ficou lenta, alternando para imagem');
            switchToFallback(video, fallbackImage, parseFloat(video.style.opacity) || 1);
          }
        });
      }
    }
  }
}

/**
 * Reseta contador de travamentos (útil para testes)
 */
export function resetStallCount() {
  stallCount = 0;
}
