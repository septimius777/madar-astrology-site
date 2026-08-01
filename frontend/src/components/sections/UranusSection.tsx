import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * Uranus — ice giant with faint tilted rings (SVG, always centered).
 * Rings are nearly edge-on (very flat ellipse) and rotated ~18° to match
 * Uranus's extreme axial tilt. No CSS rotateX — avoids transform conflicts.
 */
export default function UranusSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.78, 1], [0, 1, 1, 0.15])
  const y = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [90, 0, 0, -70])
  const scale = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0.5, 1, 1, 0.75])

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center">
      <motion.div style={{ opacity, y, scale }} className="relative flex items-center justify-center">

        {/* Outer atmosphere bloom */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 320,
            height: 320,
            background:
              'radial-gradient(circle, rgba(126,200,232,0.22) 0%, rgba(80,160,200,0.05) 48%, transparent 72%)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 220,
            height: 220,
            background: 'radial-gradient(circle, rgba(160,230,250,0.15) 0%, transparent 65%)',
            boxShadow: '0 0 45px 12px rgba(126,200,232,0.15)',
          }}
          animate={{ scale: [1.04, 0.96, 1.04] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Soft orbital guide */}
        <div
          className="absolute rounded-full border border-cyan-300/[0.06]"
          style={{ width: 270, height: 270 }}
        />

        {/* ═══ RINGS — SVG, centered, tilted with 2D rotate only ═══ */}
        {/* Back half */}
        <svg
          className="absolute pointer-events-none"
          width="340"
          height="90"
          viewBox="0 0 340 90"
          style={{
            left: '50%',
            top: '50%',
            marginLeft: -170,
            marginTop: -45,
            zIndex: 1,
            transform: 'rotate(18deg)',
          }}
        >
          <ellipse
            cx="170"
            cy="45"
            rx="165"
            ry="16"
            fill="none"
            stroke="rgba(160,220,240,0.35)"
            strokeWidth="2"
          />
          <ellipse
            cx="170"
            cy="45"
            rx="150"
            ry="14"
            fill="none"
            stroke="rgba(140,210,230,0.22)"
            strokeWidth="1.5"
          />
          <ellipse
            cx="170"
            cy="45"
            rx="135"
            ry="12"
            fill="none"
            stroke="rgba(180,230,250,0.28)"
            strokeWidth="1.5"
          />
        </svg>

        {/* Planet body */}
        <motion.div
          className="relative rounded-full overflow-hidden"
          style={{
            width: 150,
            height: 150,
            zIndex: 10,
            background:
              'radial-gradient(circle at 30% 26%, #d0f8ff 0%, #9ad8f0 20%, #6ec0e0 40%, #4aa0c0 60%, #2a7890 80%, #185060 100%)',
            boxShadow:
              '0 0 45px 14px rgba(126,200,232,0.4), inset -14px -8px 28px rgba(0,0,0,0.3)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 65, repeat: Infinity, ease: 'linear' }}
        >
          {/* Soft atmospheric banding */}
          <div
            className="absolute left-0 right-0"
            style={{
              height: '12%',
              top: '22%',
              background: 'linear-gradient(90deg, transparent, rgba(100,180,200,0.12), transparent)',
            }}
          />
          <div
            className="absolute left-0 right-0"
            style={{
              height: '10%',
              top: '48%',
              background: 'linear-gradient(90deg, transparent, rgba(60,140,160,0.1), transparent)',
            }}
          />
          <div
            className="absolute left-0 right-0"
            style={{
              height: '8%',
              top: '70%',
              background: 'linear-gradient(90deg, transparent, rgba(80,160,180,0.08), transparent)',
            }}
          />
          {/* Specular highlight */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 28% 24%, rgba(230,255,255,0.4) 0%, transparent 42%)',
            }}
          />
          {/* Terminator shadow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'linear-gradient(115deg, transparent 32%, rgba(0,0,0,0.3) 100%)',
            }}
          />
        </motion.div>

        {/* Front half of rings (bottom arc over planet) */}
        <svg
          className="absolute pointer-events-none"
          width="340"
          height="90"
          viewBox="0 0 340 90"
          style={{
            left: '50%',
            top: '50%',
            marginLeft: -170,
            marginTop: -45,
            zIndex: 20,
            transform: 'rotate(18deg)',
          }}
        >
          <defs>
            <clipPath id="uranusRingFront">
              <rect x="0" y="45" width="340" height="45" />
            </clipPath>
          </defs>
          <g clipPath="url(#uranusRingFront)">
            <ellipse
              cx="170"
              cy="45"
              rx="165"
              ry="16"
              fill="none"
              stroke="rgba(180,235,255,0.5)"
              strokeWidth="2"
              style={{ filter: 'drop-shadow(0 0 4px rgba(140,210,240,0.3))' }}
            />
            <ellipse
              cx="170"
              cy="45"
              rx="150"
              ry="14"
              fill="none"
              stroke="rgba(160,220,240,0.3)"
              strokeWidth="1.5"
            />
            <ellipse
              cx="170"
              cy="45"
              rx="135"
              ry="12"
              fill="none"
              stroke="rgba(200,240,255,0.35)"
              strokeWidth="1.5"
            />
          </g>
        </svg>

        {/* Miranda — small icy moon */}
        <motion.div
          className="absolute"
          style={{ width: 250, height: 250, zIndex: 15 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: 14,
              height: 14,
              top: 0,
              left: '50%',
              marginLeft: -7,
              background:
                'radial-gradient(circle at 35% 28%, #e0f4f8 0%, #90c0d0 55%, #507880 100%)',
              boxShadow: '0 0 10px 2px rgba(140,200,220,0.4)',
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
