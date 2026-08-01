import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function MarsSection() {
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

        {/* Red dust glow */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 270,
            height: 270,
            background:
              'radial-gradient(circle, rgba(232,90,50,0.28) 0%, rgba(180,50,20,0.07) 48%, transparent 72%)',
          }}
          animate={{ scale: [1, 1.14, 1], opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 190,
            height: 190,
            background: 'radial-gradient(circle, rgba(255,120,60,0.16) 0%, transparent 65%)',
          }}
          animate={{ scale: [1.06, 0.94, 1.06] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div
          className="absolute rounded-full border border-orange-400/[0.08]"
          style={{ width: 240, height: 240 }}
        />

        {/* Phobos */}
        <motion.div
          className="absolute"
          style={{ width: 210, height: 210 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: 10,
              height: 8,
              top: 2,
              left: '50%',
              marginLeft: -5,
              background: 'radial-gradient(circle at 35% 30%, #c0a080 0%, #806040 100%)',
              boxShadow: '0 0 6px 1px rgba(180,100,60,0.35)',
            }}
          />
        </motion.div>

        {/* Body */}
        <motion.div
          className="relative z-10 rounded-full overflow-hidden"
          style={{
            width: 125,
            height: 125,
            background:
              'radial-gradient(circle at 28% 24%, #f89868 0%, #e85a3a 28%, #c03820 55%, #902010 80%, #601008 100%)',
            boxShadow:
              '0 0 40px 10px rgba(232,90,50,0.42), inset -12px -7px 24px rgba(0,0,0,0.42)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        >
          {/* Polar caps */}
          <div className="absolute rounded-full bg-white/60" style={{ width: '34%', height: '15%', top: '1%', left: '33%' }} />
          <div className="absolute rounded-full bg-white/28" style={{ width: '24%', height: '10%', bottom: '2%', left: '38%' }} />
          {/* Surface features */}
          <div className="absolute rounded-full bg-black/28" style={{ width: '26%', height: '15%', top: '30%', left: '48%' }} />
          <div className="absolute rounded-full bg-black/20" style={{ width: '18%', height: '12%', top: '50%', left: '15%' }} />
          <div className="absolute rounded-full bg-red-950/35" style={{ width: '20%', height: '13%', top: '58%', left: '55%' }} />
          <div className="absolute rounded-full bg-black/16" style={{ width: '14%', height: '10%', top: '22%', left: '18%' }} />
          <div className="absolute rounded-full bg-black/14" style={{ width: '11%', height: '9%', top: '70%', left: '35%' }} />
          {/* Dust storm */}
          <motion.div
            className="absolute left-0 right-0"
            style={{
              height: '16%',
              top: '38%',
              background: 'linear-gradient(90deg, transparent, rgba(255,180,100,0.14), transparent)',
            }}
            animate={{ x: ['-28%', '28%', '-28%'], opacity: [0.1, 0.35, 0.1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 28% 22%, rgba(255,200,150,0.28) 0%, transparent 40%)',
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: 'linear-gradient(114deg, transparent 32%, rgba(0,0,0,0.42) 100%)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
