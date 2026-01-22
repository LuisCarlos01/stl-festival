/**
 * Preloader - Componente de cortinas verticais
 * Exibe logo e frase motivacional, abre ao scroll virtual
 * O scroll não move a página, apenas controla a animação das cortinas
 *
 * Stack: Astro + React Islands + Framer Motion
 */

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

interface PreloaderProps {
  logoSrc: string
  phraseTop: string
  phraseBottom: string
}

export default function Preloader({ logoSrc, phraseTop, phraseBottom }: PreloaderProps) {
  const [isComplete, setIsComplete] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  // Initialize reducedMotion with the current value
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  // Motion value para progresso animado
  const progressMotion = useMotionValue(0)
  const springProgress = useSpring(progressMotion, {
    stiffness: 150, // Aumentado para resposta mais rápida
    damping: 25, // Reduzido para animação mais ágil
  })

  // Verificar preferência de reduced motion
  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Detectar se é mobile
  useEffect(() => {
    if (typeof window === 'undefined') return

    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth < 1024
      setIsMobile(isTouchDevice && isSmallScreen)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Ref para manter progresso atual sem causar re-renders
  const progressRef = useRef(0)

  // Transformar progresso animado em valores de animação
  const topCurtainY = useTransform(springProgress, [0, 100], ['0%', '-100%'])
  const bottomCurtainY = useTransform(springProgress, [0, 100], ['0%', '100%'])
  const logoOpacity = useTransform(springProgress, [0, 50, 100], [1, 0, 0])
  const phraseOpacity = useTransform(springProgress, [0, 50, 100], [1, 0, 0])
  const preloaderOpacity = useTransform(springProgress, [50, 100], [1, 0])

  // Opacidade do indicador de mouse (some ao scrollar) - MOVIDO PARA ANTES DO RETURN
  const mouseIndicatorOpacity = useTransform(springProgress, [0, 20], [1, 0])

  // Auto-play no mobile
  useEffect(() => {
    if (!isMobile || reducedMotion || isComplete) return

    const autoPlayTimer = setTimeout(() => {
      let currentProgress = 0
      const autoPlayInterval = setInterval(() => {
        currentProgress += 2

        if (currentProgress >= 100) {
          currentProgress = 100
          clearInterval(autoPlayInterval)
        }

        progressRef.current = currentProgress
        progressMotion.set(currentProgress)
        window.dispatchEvent(new CustomEvent('preloader-progress', { detail: currentProgress }))

        if (currentProgress >= 100) {
          setIsComplete(true)
          window.dispatchEvent(new CustomEvent('preloader-complete'))
          setTimeout(() => {
            document.body.style.overflow = ''
            window.scrollTo(0, 0)
          }, 500)
        }
      }, 50)

      return () => clearInterval(autoPlayInterval)
    }, 500)

    return () => clearTimeout(autoPlayTimer)
  }, [isMobile, reducedMotion, isComplete, progressMotion])

  // Capturar eventos de scroll e controlar progresso (apenas desktop)
  useEffect(() => {
    if (isComplete || reducedMotion || isMobile) return

    let lastTouchY = 0

    const updateProgress = (newProgress: number) => {
      progressRef.current = newProgress
      progressMotion.set(newProgress)
      window.dispatchEvent(new CustomEvent('preloader-progress', { detail: newProgress }))

      if (newProgress >= 100 && !isComplete) {
        setIsComplete(true)
        window.dispatchEvent(new CustomEvent('preloader-complete'))
        // Garantir que usuário permanece no topo (seção Hero)
        window.scrollTo(0, 0)
        setTimeout(() => {
          document.body.style.overflow = ''
        }, 500)
      }
    }

    const handleWheel = (e: WheelEvent) => {
      if (isComplete) return

      e.preventDefault()
      e.stopPropagation()

      // Incrementar progresso baseado na direção do scroll
      // Aumentado para animação mais rápida
      const delta = e.deltaY > 0 ? 8 : -8 // Velocidade de abertura aumentada
      const newProgress = Math.max(0, Math.min(100, progressRef.current + delta))
      updateProgress(newProgress)
    }

    const handleTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isComplete) return

      e.preventDefault()

      const touchY = e.touches[0].clientY
      const deltaY = lastTouchY - touchY
      const delta = deltaY > 0 ? 12 : -12 // Touch mais rápido e responsivo
      const newProgress = Math.max(0, Math.min(100, progressRef.current + delta))

      updateProgress(newProgress)
      lastTouchY = touchY
    }

    // Prevenir scroll padrão enquanto preloader está ativo
    document.body.style.overflow = 'hidden'
    // Garantir que usuário permanece no topo durante toda a animação
    window.scrollTo(0, 0)

    // Adicionar listeners
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })

    // Sincronizar motion value inicial
    progressMotion.set(progressRef.current)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      document.body.style.overflow = ''
    }
  }, [isComplete, reducedMotion, isMobile, progressMotion])

  // Se reduced motion ou completo, não renderizar preloader
  if (reducedMotion || isComplete) {
    return null
  }

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{ opacity: preloaderOpacity }}
    >
      {/* Cortina Superior */}
      <motion.div
        className="absolute left-0 right-0 top-0 flex h-1/2 items-center justify-center bg-black"
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
            className="h-40 w-40 object-contain sm:h-48 sm:w-48 md:h-56 md:w-56"
            width="224"
            height="224"
            loading="eager"
            decoding="async"
            style={{ opacity: logoOpacity }}
          />

          {/* Primeira parte da frase */}
          <motion.p className="max-w-xl px-4 text-center font-body text-xl font-light text-white sm:text-2xl md:text-3xl">
            {phraseTop}
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Cortina Inferior */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 flex h-1/2 items-center justify-center bg-black"
        style={{
          y: bottomCurtainY,
        }}
      >
        <motion.p
          className="max-w-2xl px-6 text-center font-body text-base leading-relaxed text-white sm:text-lg md:px-8 md:text-xl"
          style={{ opacity: phraseOpacity }}
        >
          {phraseBottom}
        </motion.p>
      </motion.div>

      {/* Indicador de Mouse - apenas desktop */}
      {!isMobile && (
        <motion.div
          className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: mouseIndicatorOpacity }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Mouse SVG com animação mais pronunciada */}
            <svg
              width="36"
              height="56"
              viewBox="0 0 36 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]"
            >
              {/* Corpo do mouse com brilho pulsante */}
              <motion.rect
                x="2"
                y="2"
                width="32"
                height="52"
                rx="16"
                stroke="white"
                strokeWidth="2.5"
                fill="transparent"
                animate={{
                  strokeOpacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              {/* Rodinha animada com movimento mais evidente */}
              <motion.rect
                x="16"
                y="12"
                width="4"
                height="10"
                rx="2"
                fill="white"
                animate={{
                  y: [12, 26, 12],
                  opacity: [1, 0.4, 1],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
