import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function SunSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.9, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.55])
  const y = useTransform(scrollYProgress, [0, 1], [0, -120])

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ opacity, scale, y }} className="relative flex items-center justify-center">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 640,
            height: 640,
            background:
              'radial-gradient(circle, rgba(255,150,30,0.07) 0%, rgba(255,80,10,0.02) 40%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 460,
            height: 460,
            background:
              'radial-gradient(circle, rgba(255,200,60,0.2) 0%, rgba(255,140,30,0.07) 45%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 360,
            height: 360,
            background:
              'radial-gradient(circle, rgba(255,230,120,0.2) 0%, transparent 65%)',
          }}
          animate={{ scale: [1.06, 0.96, 1.06], opacity: [0.7, 0.35, 0.7] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 300,
            height: 300,
            background:
              'radial-gradient(circle, rgba(255,220,100,0.55) 0%, rgba(255,160,40,0.2) 50%, transparent 72%)',
            boxShadow: '0 0 100px 30px rgba(255,180,50,0.4)',
          }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute"
          style={{ width: 480, height: 480 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        >
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 origin-bottom"
              style={{
                width: i % 3 === 0 ? 2.5 : 1.2,
                height: i % 3 === 0 ? 200 : 155,
                marginLeft: i % 3 === 0 ? -1.25 : -0.6,
                marginTop: i % 3 === 0 ? -200 : -155,
                background:
                  'linear-gradient(to top, transparent 0%, rgba(255,220,100,0.3) 35%, rgba(255,240,180,0.12) 65%, transparent 100%)',
                transform: `rotate(${i * 20}deg)`,
              }}
            />
          ))}
        </motion.div>
        <motion.div
          className="absolute"
          style={{ width: 420, height: 420 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 130, repeat: Infinity, ease: 'linear' }}
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 origin-bottom"
              style={{
                width: 1,
                height: 175,
                marginLeft: -0.5,
                marginTop: -175,
                background:
                  'linear-gradient(to top, transparent, rgba(255,180,50,0.22), transparent)',
                transform: `rotate(${i * 40 + 10}deg)`,
              }}
            />
          ))}
        </motion.div>
        <motion.div
          className="relative z-10 rounded-full"
          style={{
            width: 230,
            height: 230,
            background:
              'radial-gradient(circle at 34% 30%, #fffef5 0%, #ffe890 15%, #ffd040 32%, #ff9a18 55%, #e84808 85%, #c03000 100%)',
            boxShadow:
              '0 0 60px 18px rgba(255,200,80,0.75), 0 0 120px 45px rgba(255,140,30,0.4), 0 0 200px 70px rgba(255,100,10,0.15)',
          }}
          animate={{ scale: [1, 1.035, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute rounded-full"
            style={{
              width: '38%',
              height: '32%',
              top: '15%',
              left: '38%',
              background: 'radial-gradient(circle, rgba(255,255,230,0.55) 0%, transparent 70%)',
            }}
            animate={{ opacity: [0.35, 0.9, 0.35], scale: [1, 1.15, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              width: '28%',
              height: '24%',
              top: '52%',
              left: '18%',
              background: 'radial-gradient(circle, rgba(255,180,50,0.4) 0%, transparent 70%)',
            }}
            animate={{ opacity: [0.25, 0.65, 0.25] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 62% 42%, transparent 25%, rgba(180,50,0,0.3) 100%)',
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
