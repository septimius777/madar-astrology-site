import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function EarthSection() {
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

        {/* Atmosphere layers */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 300,
            height: 300,
            background:
              'radial-gradient(circle, rgba(74,160,255,0.18) 0%, rgba(100,180,255,0.05) 45%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.75, 0.4] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 230,
            height: 230,
            background: 'radial-gradient(circle, rgba(120,200,255,0.22) 0%, transparent 65%)',
            boxShadow: '0 0 50px 12px rgba(74,158,255,0.18)',
          }}
          animate={{ scale: [1.04, 0.96, 1.04] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div
          className="absolute rounded-full border border-sky-300/[0.08]"
          style={{ width: 270, height: 270 }}
        />

        {/* Moon */}
        <motion.div
          className="absolute"
          style={{ width: 250, height: 250 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: 28,
              height: 28,
              top: -6,
              left: '50%',
              marginLeft: -14,
              background:
                'radial-gradient(circle at 35% 28%, #f4f4ec 0%, #d0d0c8 40%, #989890 100%)',
              boxShadow: '0 0 14px 3px rgba(200,200,190,0.35)',
            }}
          >
            <div className="absolute rounded-full bg-black/15" style={{ width: '30%', height: '28%', top: '20%', left: '45%' }} />
            <div className="absolute rounded-full bg-black/10" style={{ width: '20%', height: '18%', top: '55%', left: '25%' }} />
          </div>
        </motion.div>

        {/* Body */}
        <motion.div
          className="relative z-10 rounded-full overflow-hidden"
          style={{
            width: 155,
            height: 155,
            background:
              'radial-gradient(circle at 28% 24%, #a0dcff 0%, #4a9ee8 28%, #2a6fc0 55%, #1a4a90 80%, #0a2860 100%)',
            boxShadow:
              '0 0 45px 12px rgba(74,158,255,0.38), inset -14px -8px 28px rgba(0,0,0,0.35)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        >
          {/* Continents */}
          <div className="absolute rounded-[42%] bg-emerald-600/85" style={{ width: '34%', height: '28%', top: '16%', left: '10%' }} />
          <div className="absolute rounded-[48%] bg-emerald-700/80" style={{ width: '26%', height: '24%', top: '42%', left: '48%' }} />
          <div className="absolute rounded-[38%] bg-emerald-600/75" style={{ width: '22%', height: '18%', top: '55%', left: '12%' }} />
          <div className="absolute rounded-[35%] bg-lime-800/65" style={{ width: '16%', height: '14%', top: '28%', left: '58%' }} />
          <div className="absolute rounded-[40%] bg-emerald-700/60" style={{ width: '14%', height: '12%', top: '68%', left: '42%' }} />
          {/* Polar ice */}
          <div className="absolute rounded-full bg-white/50" style={{ width: '32%', height: '13%', top: '1%', left: '34%' }} />
          <div className="absolute rounded-full bg-white/35" style={{ width: '28%', height: '11%', bottom: '1%', left: '36%' }} />
          {/* Clouds */}
          <motion.div
            className="absolute rounded-full bg-white/28"
            style={{ width: '42%', height: '11%', top: '20%', left: '22%' }}
            animate={{ x: [0, 14, 0], opacity: [0.2, 0.38, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute rounded-full bg-white/20"
            style={{ width: '30%', height: '9%', top: '62%', left: '38%' }}
            animate={{ x: [0, -12, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 28% 22%, rgba(255,255,255,0.32) 0%, transparent 40%)',
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: 'linear-gradient(112deg, transparent 34%, rgba(0,0,0,0.38) 100%)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
