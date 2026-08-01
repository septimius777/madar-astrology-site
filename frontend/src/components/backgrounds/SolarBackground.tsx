import { useMemo } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import '../../styles/SolarBackground.css'

/** Deterministic pseudo-random for stable star positions */
function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function generateStars(count: number, seed: number) {
  const rand = seededRandom(seed)
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${rand() * 100}%`,
    top: `${rand() * 100}%`,
    dur: `${3 + rand() * 5}s`,
    delay: `${rand() * 6}s`,
    minOp: (0.15 + rand() * 0.25).toFixed(2),
    maxOp: (0.55 + rand() * 0.45).toFixed(2),
  }))
}

/**
 * Scroll-reactive galaxy background.
 * Journey: warm solar near-space → mid purple → deep cold void at Neptune.
 */
export default function SolarBackground() {
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 30, restDelta: 0.001 })

  const farStars = useMemo(() => generateStars(100, 42), [])
  const midStars = useMemo(() => generateStars(70, 99), [])
  const nearStars = useMemo(() => generateStars(40, 17), [])

  // ── Background color journey ──
  // 0.00 Sun      → warm deep black-orange
  // 0.25 Venus    → soft amber-purple
  // 0.45 Mars     → dusty red-purple
  // 0.65 Jupiter  → deep indigo
  // 1.00 Neptune  → near-black cold blue
  const bgColor = useTransform(
    smooth,
    [0, 0.15, 0.35, 0.55, 0.75, 1],
    [
      'rgb(12, 4, 8)',
      'rgb(10, 4, 18)',
      'rgb(8, 4, 22)',
      'rgb(4, 4, 24)',
      'rgb(2, 6, 22)',
      'rgb(1, 4, 16)',
    ]
  )

  // Warm solar haze (strong at top, gone by Mars)
  const solarHazeOpacity = useTransform(smooth, [0, 0.12, 0.28], [0.85, 0.4, 0])

  // Nebula tints shift through the journey
  const nebula1Opacity = useTransform(smooth, [0, 0.3, 0.6, 1], [0.45, 0.35, 0.2, 0.12])
  const nebula2Opacity = useTransform(smooth, [0, 0.4, 0.7, 1], [0.2, 0.4, 0.35, 0.15])
  const nebula3Opacity = useTransform(smooth, [0, 0.5, 0.8, 1], [0.15, 0.25, 0.4, 0.3])

  // Nebula color shifts (via CSS filter hue-rotate approximation with opacity layers)
  const warmNebulaOpacity = useTransform(smooth, [0, 0.25, 0.45], [0.5, 0.2, 0])
  const coolNebulaOpacity = useTransform(smooth, [0.35, 0.6, 1], [0, 0.35, 0.5])

  // Star parallax — intensifies as we go deeper
  const farY = useTransform(smooth, [0, 1], ['0%', '6%'])
  const midY = useTransform(smooth, [0, 1], ['0%', '14%'])
  const nearY = useTransform(smooth, [0, 1], ['0%', '26%'])

  // Slight "zoom out into the void" feel
  const starScale = useTransform(smooth, [0, 1], [1.04, 0.94])

  // Vignette deepens in outer system
  const vignetteStrength = useTransform(smooth, [0, 1], [0.45, 0.7])

  // Dust rotation speed feel via opacity
  const dustOpacity = useTransform(smooth, [0, 0.5, 1], [0.5, 0.7, 0.4])

  // Distant blue void glow (appears late)
  const voidGlowOpacity = useTransform(smooth, [0.55, 0.8, 1], [0, 0.25, 0.4])

  // Shooting star intensity (more in mid journey)
  const shootOpacity = useTransform(smooth, [0, 0.3, 0.6, 1], [0.3, 1, 0.8, 0.4])

  return (
    <motion.div className="solar-bg" style={{ backgroundColor: bgColor }} aria-hidden>
      {/* Base gradient layers that shift */}
      <div className="solar-bg__base" />

      {/* Warm solar haze — fades as we leave the Sun */}
      <motion.div
        className="solar-bg__solar-haze"
        style={{ opacity: solarHazeOpacity }}
      />

      {/* Warm nebulae (inner system) */}
      <motion.div
        className="solar-bg__nebula solar-bg__nebula--warm"
        style={{ opacity: warmNebulaOpacity }}
      />

      {/* Classic purple nebulae */}
      <motion.div
        className="solar-bg__nebula solar-bg__nebula--1"
        style={{ opacity: nebula1Opacity }}
      />
      <motion.div
        className="solar-bg__nebula solar-bg__nebula--2"
        style={{ opacity: nebula2Opacity }}
      />
      <motion.div
        className="solar-bg__nebula solar-bg__nebula--3"
        style={{ opacity: nebula3Opacity }}
      />

      {/* Cool outer-system nebula */}
      <motion.div
        className="solar-bg__nebula solar-bg__nebula--cool"
        style={{ opacity: coolNebulaOpacity }}
      />

      {/* Deep void glow at the end of the journey */}
      <motion.div
        className="solar-bg__void-glow"
        style={{ opacity: voidGlowOpacity }}
      />

      {/* Star layers with parallax */}
      <motion.div
        className="solar-bg__stars solar-bg__stars--far"
        style={{ y: farY, scale: starScale }}
      >
        {farStars.map((s) => (
          <span
            key={s.id}
            className="solar-bg__star"
            style={{
              left: s.left,
              top: s.top,
              ['--dur' as string]: s.dur,
              ['--delay' as string]: s.delay,
              ['--min-op' as string]: s.minOp,
              ['--max-op' as string]: s.maxOp,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="solar-bg__stars solar-bg__stars--mid"
        style={{ y: midY, scale: starScale }}
      >
        {midStars.map((s) => (
          <span
            key={s.id}
            className="solar-bg__star"
            style={{
              left: s.left,
              top: s.top,
              ['--dur' as string]: s.dur,
              ['--delay' as string]: s.delay,
              ['--min-op' as string]: s.minOp,
              ['--max-op' as string]: s.maxOp,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="solar-bg__stars solar-bg__stars--near"
        style={{ y: nearY, scale: starScale }}
      >
        {nearStars.map((s) => (
          <span
            key={s.id}
            className="solar-bg__star"
            style={{
              left: s.left,
              top: s.top,
              ['--dur' as string]: s.dur,
              ['--delay' as string]: s.delay,
              ['--min-op' as string]: s.minOp,
              ['--max-op' as string]: s.maxOp,
            }}
          />
        ))}
      </motion.div>

      {/* Shooting stars */}
      <motion.div style={{ opacity: shootOpacity }}>
        <div className="solar-bg__shooting solar-bg__shooting--1" />
        <div className="solar-bg__shooting solar-bg__shooting--2" />
        <div className="solar-bg__shooting solar-bg__shooting--3" />
      </motion.div>

      {/* Cosmic dust */}
      <motion.div className="solar-bg__dust" style={{ opacity: dustOpacity }} />

      {/* Dynamic vignette */}
      <motion.div
        className="solar-bg__vignette"
        style={{
          opacity: vignetteStrength,
        }}
      />
    </motion.div>
  )
}
