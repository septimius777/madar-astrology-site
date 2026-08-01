import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function JupiterSection() {
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
      <motion.div style={{ opacity, y, scale }} className="relative flex items-center justify-center">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 400,
            height: 400,
            background:
              'radial-gradient(circle, rgba(232,180,100,0.2) 0%, rgba(180,120,40,0.05) 50%, transparent 72%)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 300,
            height: 300,
            background: 'radial-gradient(circle, rgba(255,200,120,0.18) 0%, transparent 65%)',
            boxShadow: '0 0 60px 18px rgba(232,180,100,0.18)',
          }}
          animate={{ scale: [1.04, 0.96, 1.04] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          className="absolute rounded-full border border-amber-300/[0.07]"
          style={{ width: 340, height: 340 }}
        />

        {/* Io */}
        <motion.div
          className="absolute"
          style={{ width: 300, height: 300 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: 18,
              height: 18,
              top: 0,
              left: '50%',
              marginLeft: -9,
              background: 'radial-gradient(circle at 35% 28%, #f0d080 0%, #c09030 65%, #806018 100%)',
              boxShadow: '0 0 12px 3px rgba(220,180,60,0.45)',
            }}
          />
        </motion.div>

        <motion.div
          className="relative z-10 rounded-full overflow-hidden"
          style={{
            width: 210,
            height: 210,
            background:
              'linear-gradient(180deg, #f5d8a8 0%, #e8b87a 10%, #d09050 24%, #e8b87a 38%, #c88040 52%, #e0a868 66%, #d09050 80%, #b87838 100%)',
            boxShadow:
              '0 0 55px 16px rgba(232,180,100,0.38), inset -16px -10px 34px rgba(0,0,0,0.35)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        >
          <motion.div
            className="absolute left-0 right-0 bg-orange-900/28"
            style={{ height: '7%', top: '9%' }}
            animate={{ x: ['-5%', '5%', '-5%'] }}
            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute left-0 right-0 bg-amber-900/22"
            style={{ height: '5%', top: '24%' }}
            animate={{ x: ['8%', '-8%', '8%'] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute left-0 right-0 bg-orange-800/32"
            style={{ height: '8%', top: '42%' }}
            animate={{ x: ['-6%', '6%', '-6%'] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute left-0 right-0 bg-amber-800/18"
            style={{ height: '5%', top: '62%' }}
            animate={{ x: ['10%', '-5%', '10%'] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute left-0 right-0 bg-orange-900/22" style={{ height: '6%', top: '78%' }} />
          <motion.div
            className="absolute rounded-full"
            style={{
              width: '24%',
              height: '15%',
              top: '38%',
              left: '55%',
              background:
                'radial-gradient(ellipse, rgba(180,50,30,0.55) 0%, rgba(140,40,20,0.28) 60%, transparent 100%)',
            }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 28% 20%, rgba(255,255,230,0.25) 0%, transparent 40%)',
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: 'linear-gradient(110deg, transparent 30%, rgba(0,0,0,0.35) 100%)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
