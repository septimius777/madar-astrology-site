import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * Neptune — deep blue ice giant.
 * Faint rings via SVG (no CSS rotateX — avoids transform centering bugs).
 */
export default function NeptuneSection() {
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

        {/* Deep blue atmosphere bloom */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 320,
            height: 320,
            background:
              'radial-gradient(circle, rgba(58,110,232,0.28) 0%, rgba(30,60,160,0.07) 48%, transparent 72%)',
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 220,
            height: 220,
            background: 'radial-gradient(circle, rgba(100,150,255,0.18) 0%, transparent 65%)',
            boxShadow: '0 0 50px 14px rgba(58,110,232,0.2)',
          }}
          animate={{ scale: [1.05, 0.95, 1.05] }}
          transition={{ duration: 3.3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Soft orbital guide */}
        <div
          className="absolute rounded-full border border-blue-400/[0.06]"
          style={{ width: 270, height: 270 }}
        />

        {/* ═══ FAINT RINGS — SVG, centered ═══ */}
        {/* Back half */}
        <svg
          className="absolute pointer-events-none"
          width="300"
          height="70"
          viewBox="0 0 300 70"
          style={{
            left: '50%',
            top: '50%',
            marginLeft: -150,
            marginTop: -35,
            zIndex: 1,
          }}
        >
          <ellipse
            cx="150"
            cy="35"
            rx="145"
            ry="15"
            fill="none"
            stroke="rgba(100,140,220,0.28)"
            strokeWidth="1.5"
          />
          <ellipse
            cx="150"
            cy="35"
            rx="130"
            ry="13"
            fill="none"
            stroke="rgba(80,120,200,0.18)"
            strokeWidth="1"
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
              'radial-gradient(circle at 28% 24%, #90c0ff 0%, #5080f0 22%, #3a6ee8 42%, #2048c0 65%, #183090 85%, #0c1850 100%)',
            boxShadow:
              '0 0 48px 14px rgba(58,110,232,0.45), inset -14px -8px 28px rgba(0,0,0,0.35)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
        >
          {/* High-speed wind bands */}
          <motion.div
            className="absolute left-0 right-0"
            style={{
              height: '10%',
              top: '18%',
              background: 'linear-gradient(90deg, transparent, rgba(30,40,100,0.2), transparent)',
            }}
            animate={{ x: ['-10%', '10%', '-10%'] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute left-0 right-0"
            style={{
              height: '8%',
              top: '48%',
              background: 'linear-gradient(90deg, transparent, rgba(20,30,90,0.18), transparent)',
            }}
            animate={{ x: ['12%', '-8%', '12%'] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute left-0 right-0"
            style={{
              height: '7%',
              top: '72%',
              background: 'linear-gradient(90deg, transparent, rgba(25,35,95,0.14), transparent)',
            }}
            animate={{ x: ['-6%', '10%', '-6%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Great Dark Spot — pulsing storm */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: '28%',
              height: '18%',
              top: '34%',
              left: '50%',
              background:
                'radial-gradient(ellipse, rgba(15,25,70,0.6) 0%, rgba(10,18,50,0.3) 55%, transparent 100%)',
            }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Specular highlight */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 28% 22%, rgba(180,210,255,0.35) 0%, transparent 40%)',
            }}
          />
          {/* Terminator */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'linear-gradient(114deg, transparent 32%, rgba(0,0,0,0.4) 100%)',
            }}
          />
        </motion.div>

        {/* Front half of rings */}
        <svg
          className="absolute pointer-events-none"
          width="300"
          height="70"
          viewBox="0 0 300 70"
          style={{
            left: '50%',
            top: '50%',
            marginLeft: -150,
            marginTop: -35,
            zIndex: 20,
          }}
        >
          <defs>
            <clipPath id="neptuneRingFront">
              <rect x="0" y="35" width="300" height="35" />
            </clipPath>
          </defs>
          <g clipPath="url(#neptuneRingFront)">
            <ellipse
              cx="150"
              cy="35"
              rx="145"
              ry="15"
              fill="none"
              stroke="rgba(120,160,240,0.4)"
              strokeWidth="1.5"
              style={{ filter: 'drop-shadow(0 0 3px rgba(100,140,220,0.25))' }}
            />
            <ellipse
              cx="150"
              cy="35"
              rx="130"
              ry="13"
              fill="none"
              stroke="rgba(100,140,220,0.25)"
              strokeWidth="1"
            />
          </g>
        </svg>

        {/* Triton */}
        <motion.div
          className="absolute"
          style={{ width: 250, height: 250, zIndex: 15 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: 16,
              height: 16,
              top: 0,
              left: '50%',
              marginLeft: -8,
              background:
                'radial-gradient(circle at 35% 28%, #e8f0f8 0%, #a0b0c0 50%, #607080 100%)',
              boxShadow: '0 0 12px 3px rgba(150,180,220,0.4)',
            }}
          >
            <div
              className="absolute rounded-full bg-black/15"
              style={{ width: '35%', height: '30%', top: '25%', left: '40%' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
