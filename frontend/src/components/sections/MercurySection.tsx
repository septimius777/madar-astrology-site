import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function MercurySection() {
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
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 240,
            height: 240,
            background: 'radial-gradient(circle, rgba(180,180,190,0.22) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.65, 0.3] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          className="absolute rounded-full border border-white/[0.06]"
          style={{ width: 220, height: 220 }}
        />
        <motion.div
          className="relative z-10 rounded-full overflow-hidden"
          style={{
            width: 110,
            height: 110,
            background:
              'radial-gradient(circle at 28% 25%, #e8e8e8 0%, #c0c0c0 20%, #989898 45%, #686868 70%, #404040 90%, #282828 100%)',
            boxShadow:
              '0 0 35px 8px rgba(160,160,170,0.35), inset -12px -8px 24px rgba(0,0,0,0.55)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute rounded-full bg-black/35" style={{ width: '24%', height: '22%', top: '12%', left: '48%' }} />
          <div className="absolute rounded-full bg-black/28" style={{ width: '16%', height: '15%', top: '40%', left: '15%' }} />
          <div className="absolute rounded-full bg-black/22" style={{ width: '18%', height: '16%', top: '55%', left: '52%' }} />
          <div className="absolute rounded-full bg-black/20" style={{ width: '12%', height: '11%', top: '25%', left: '20%' }} />
          <div className="absolute rounded-full bg-black/25" style={{ width: '14%', height: '13%', top: '68%', left: '28%' }} />
          <div className="absolute rounded-full bg-black/18" style={{ width: '10%', height: '9%', top: '38%', left: '70%' }} />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 28% 22%, rgba(255,255,255,0.28) 0%, transparent 42%)',
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: 'linear-gradient(118deg, transparent 32%, rgba(0,0,0,0.45) 100%)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
