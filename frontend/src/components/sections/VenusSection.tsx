import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function VenusSection() {
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
            width: 300,
            height: 300,
            background:
              'radial-gradient(circle, rgba(232,200,100,0.25) 0%, rgba(200,150,50,0.07) 48%, transparent 72%)',
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 220,
            height: 220,
            background: 'radial-gradient(circle, rgba(255,220,140,0.18) 0%, transparent 68%)',
          }}
          animate={{ scale: [1.08, 0.96, 1.08], opacity: [0.5, 0.25, 0.5] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          className="absolute rounded-full border border-amber-200/[0.08]"
          style={{ width: 260, height: 260 }}
        />
        <motion.div
          className="relative z-10 rounded-full overflow-hidden"
          style={{
            width: 145,
            height: 145,
            background:
              'radial-gradient(circle at 30% 26%, #faf0c8 0%, #e8c87a 28%, #d4a850 52%, #b88830 75%, #8a6420 100%)',
            boxShadow:
              '0 0 45px 12px rgba(232,200,100,0.4), inset -14px -8px 28px rgba(0,0,0,0.28)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
        >
          <motion.div
            className="absolute left-0 right-0"
            style={{
              height: '15%',
              top: '16%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)',
            }}
            animate={{ x: ['-18%', '18%', '-18%'] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute left-0 right-0"
            style={{
              height: '11%',
              top: '38%',
              background: 'linear-gradient(90deg, transparent, rgba(255,240,180,0.16), transparent)',
            }}
            animate={{ x: ['14%', '-14%', '14%'] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute left-0 right-0"
            style={{
              height: '13%',
              top: '58%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)',
            }}
            animate={{ x: ['-12%', '20%', '-12%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 28% 22%, rgba(255,255,245,0.38) 0%, transparent 45%)',
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: 'linear-gradient(118deg, transparent 30%, rgba(0,0,0,0.3) 100%)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
