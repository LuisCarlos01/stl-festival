/**
 * Preloader - Componente de cortinas verticais
 * Exibe logo e frase motivacional, abre ao scroll virtual
 * O scroll não move a página, apenas controla a animação das cortinas
 * 
 * Stack: Astro + React Islands + Framer Motion
 */

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface PreloaderProps {
  logoSrc: string;
  phraseTop: string;
  phraseBottom: string;
}

export default function Preloader({ logoSrc, phraseTop, phraseBottom }: PreloaderProps) {
  const [progress, setProgress] = useState(0); // 0-100
  const [isComplete, setIsComplete] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Motion value para progresso animado
  const progressMotion = useMotionValue(0);
  const springProgress = useSpring(progressMotion, {
    stiffness: 150, // Aumentado para resposta mais rápida
    damping: 25, // Reduzido para animação mais ágil
  });

  // Verificar preferência de reduced motion
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Detectar se é mobile
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 1024;
      setIsMobile(isTouchDevice && isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Ref para manter progresso atual sem causar re-renders
  const progressRef = useRef(0);

  // Transformar progresso animado em valores de animação
  const topCurtainY = useTransform(springProgress, [0, 100], ['0%', '-100%']);
  const bottomCurtainY = useTransform(springProgress, [0, 100], ['0%', '100%']);
  const logoOpacity = useTransform(springProgress, [0, 50, 100], [1, 0, 0]);
  const phraseOpacity = useTransform(springProgress, [0, 50, 100], [1, 0, 0]);
  const preloaderOpacity = useTransform(springProgress, [50, 100], [1, 0]);

  // Auto-play no mobile
  useEffect(() => {
    if (!isMobile || reducedMotion || isComplete) return;

    const autoPlayTimer = setTimeout(() => {
      let currentProgress = 0;
      const autoPlayInterval = setInterval(() => {
        currentProgress += 2;

        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(autoPlayInterval);
        }

        progressRef.current = currentProgress;
        setProgress(currentProgress);
        progressMotion.set(currentProgress);
        window.dispatchEvent(new CustomEvent('preloader-progress', { detail: currentProgress }));

        if (currentProgress >= 100) {
          setIsComplete(true);
          window.dispatchEvent(new CustomEvent('preloader-complete'));
          setTimeout(() => {
            document.body.style.overflow = '';
            window.scrollTo(0, 0);
          }, 500);
        }
      }, 50);

      return () => clearInterval(autoPlayInterval);
    }, 500);

    return () => clearTimeout(autoPlayTimer);
  }, [isMobile, reducedMotion, isComplete, progressMotion]);

  // Capturar eventos de scroll e controlar progresso (apenas desktop)
  useEffect(() => {
    if (isComplete || reducedMotion || isMobile) return;

    let lastTouchY = 0;

    const updateProgress = (newProgress: number) => {
      progressRef.current = newProgress;
      setProgress(newProgress);
      progressMotion.set(newProgress);
      window.dispatchEvent(new CustomEvent('preloader-progress', { detail: newProgress }));

      if (newProgress >= 100 && !isComplete) {
        setIsComplete(true);
        window.dispatchEvent(new CustomEvent('preloader-complete'));
        // Garantir que usuário permanece no topo (seção Hero)
        window.scrollTo(0, 0);
        setTimeout(() => {
          document.body.style.overflow = '';
        }, 500);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (isComplete) return;

      e.preventDefault();
      e.stopPropagation();

      // Incrementar progresso baseado na direção do scroll
      // Aumentado para animação mais rápida
      const delta = e.deltaY > 0 ? 8 : -8; // Velocidade de abertura aumentada
      const newProgress = Math.max(0, Math.min(100, progressRef.current + delta));
      updateProgress(newProgress);
    };

    const handleTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isComplete) return;

      e.preventDefault();

      const touchY = e.touches[0].clientY;
      const deltaY = lastTouchY - touchY;
      const delta = deltaY > 0 ? 12 : -12; // Touch mais rápido e responsivo
      const newProgress = Math.max(0, Math.min(100, progressRef.current + delta));

      updateProgress(newProgress);
      lastTouchY = touchY;
    };

    // Prevenir scroll padrão enquanto preloader está ativo
    document.body.style.overflow = 'hidden';
    // Garantir que usuário permanece no topo durante toda a animação
    window.scrollTo(0, 0);

    // Adicionar listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Sincronizar motion value inicial
    progressMotion.set(progressRef.current);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      document.body.style.overflow = '';
    };
  }, [isComplete, reducedMotion, isMobile, progressMotion]);

  // Se reduced motion ou completo, não renderizar preloader
  if (reducedMotion || isComplete) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] pointer-events-none"
      style={{ opacity: preloaderOpacity }}
    >
      {/* Indicador de Scroll (apenas desktop) */}
      {!isMobile && progress < 10 && (
        <motion.div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[101] flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="scroll-indicator">
            <div className="scroll-indicator-mouse">
              <div className="scroll-indicator-wheel"></div>
            </div>
          </div>
          <motion.p
            className="text-white/60 text-xs font-body uppercase tracking-wider"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Role para começar
          </motion.p>
        </motion.div>
      )}

      {/* Cortina Superior */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1/2 bg-black flex items-center justify-center"
        style={{
          y: topCurtainY,
        }}
      >
        <motion.div
          className="flex flex-col items-center justify-center gap-6 px-6 md:px-8"
          style={{ opacity: phraseOpacity }}
        >
          {/* Logo */}
          <motion.img
            src={logoSrc}
            alt="STL Festival"
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 object-contain"
            width="224"
            height="224"
            loading="eager"
            decoding="async"
            style={{ opacity: logoOpacity }}
          />

          {/* Primeira parte da frase */}
          <motion.p className="font-body text-white text-xl sm:text-2xl md:text-3xl text-center max-w-xl font-light px-4">
            {phraseTop}
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Cortina Inferior */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-black flex items-center justify-center"
        style={{
          y: bottomCurtainY,
        }}
      >
        <motion.p
          className="font-body text-white text-base sm:text-lg md:text-xl text-center px-6 md:px-8 max-w-2xl leading-relaxed"
          style={{ opacity: phraseOpacity }}
        >
          {phraseBottom}
        </motion.p>
      </motion.div>

      {/* Estilos do indicador de scroll */}
      <style>{`
        .scroll-indicator-mouse {
          width: 26px;
          height: 40px;
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-radius: 13px;
          position: relative;
          display: flex;
          justify-content: center;
          padding-top: 8px;
        }

        .scroll-indicator-wheel {
          width: 3px;
          height: 8px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 2px;
          animation: scroll-animation 1.5s infinite;
        }

        @keyframes scroll-animation {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(12px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .scroll-indicator-wheel {
            animation: none;
          }
        }
      `}</style>
    </motion.div>
  );
}
