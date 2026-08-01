import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.3 }}
    >
      <Link to="/" className="pointer-events-auto flex items-center gap-2 group">
        <div
          className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-300 to-orange-500 opacity-90 group-hover:opacity-100 transition-opacity"
          style={{ boxShadow: '0 0 16px 4px rgba(255,180,50,0.45)' }}
        />
        <span className="font-display text-sm tracking-[0.25em] text-white/70 group-hover:text-amber-200 transition-colors">
          MERIDIAN
        </span>
      </Link>
    </motion.header>
  )
}
