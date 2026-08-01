import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * Saturn — rings use SVG ellipses so they stay perfectly centered
 * and never break into stretched loops.
 */
export default function SaturnSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.78, 1], [0, 1, 1, 0.15])
  const y = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [90, 0, 0, -70])
  const scale = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0.45, 1, 1, 0.75])

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center">
      <motion.div
        style={{ opacity, y, scale }}
        className="relative flex items-center justify-center"
      >
        {/* Soft glow */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 360,
            height: 360,
            background:
              'radial-gradient(circle, rgba(212,200,154,0.22) 0%, rgba(180,160,100,0.05) 50%, transparent 72%)',
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Back half of rings (behind planet) */}
        <svg
          className="absolute pointer-events-none"
          width="400"
          height="160"
          viewBox="0 0 400 160"
          style={{
            left: '50%',
            top: '50%',
            marginLeft: -200,
            marginTop: -80,
            zIndex: 1,
          }}
        >
          <ellipse cx="200" cy="80" rx="195" ry="48" fill="none"
            stroke="rgba(230,210,160,0.35)" strokeWidth="5"
            style={{ filter: 'drop-shadow(0 0 6px rgba(212,200,154,0.3))' }} />
          <ellipse cx="200" cy="80" rx="165" ry="40" fill="none"
            stroke="rgba(200,180,130,0.3)" strokeWidth="3.5" />
          <ellipse cx="200" cy="80" rx="135" ry="32" fill="none"
            stroke="rgba(220,200,150,0.4)" strokeWidth="6" />
          <ellipse cx="200" cy="80" rx="178" ry="43" fill="none"
            stroke="rgba(20,15,10,0.4)" strokeWidth="4" />
        </svg>

        {/* Planet body */}
        <motion.div
          className="relative rounded-full overflow-hidden"
          style={{
            width: 160,
            height: 160,
            zIndex: 10,
            background:
              'radial-gradient(circle at 28% 24%, #f2e6c0 0%, #d4c89a 32%, #b0a070 60%, #908050 85%, #706038 100%)',
            boxShadow:
              '0 0 40px 12px rgba(212,200,154,0.35), inset -14px -8px 28px rgba(0,0,0,0.3)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute left-0 right-0 bg-amber-900/12" style={{ height: '9%', top: '26%' }} />
          <div className="absolute left-0 right-0 bg-amber-800/10" style={{ height: '7%', top: '50%' }} />
          <div className="absolute left-0 right-0 bg-amber-900/8" style={{ height: '6%', top: '70%' }} />
          <div className="absolute inset-0 rounded-full"
            style={{ background: 'radial-gradient(circle at 28% 22%, rgba(255,255,240,0.3) 0%, transparent 42%)' }} />
          <div className="absolute inset-0 rounded-full"
            style={{ background: 'linear-gradient(112deg, transparent 34%, rgba(0,0,0,0.32) 100%)' }} />
        </motion.div>

        {/* Front half of rings (clipped to bottom arc, over planet) */}
        <svg
          className="absolute pointer-events-none"
          width="400"
          height="160"
          viewBox="0 0 400 160"
          style={{
            left: '50%',
            top: '50%',
            marginLeft: -200,
            marginTop: -80,
            zIndex: 20,
          }}
        >
          <defs>
            <clipPath id="ringFront">
              <rect x="0" y="80" width="400" height="80" />
            </clipPath>
          </defs>
          <g clipPath="url(#ringFront)">
            <ellipse cx="200" cy="80" rx="195" ry="48" fill="none"
              stroke="rgba(240,220,170,0.55)" strokeWidth="5"
              style={{ filter: 'drop-shadow(0 0 8px rgba(212,200,154,0.4))' }} />
            <ellipse cx="200" cy="80" rx="165" ry="40" fill="none"
              stroke="rgba(210,190,140,0.4)" strokeWidth="3.5" />
            <ellipse cx="200" cy="80" rx="135" ry="32" fill="none"
              stroke="rgba(230,210,160,0.5)" strokeWidth="6" />
            <ellipse cx="200" cy="80" rx="178" ry="43" fill="none"
              stroke="rgba(20,15,10,0.35)" strokeWidth="4" />
          </g>
        </svg>
      </motion.div>
    </section>
  )
}