import { motion } from "framer-motion";
import { siteContent } from "../../content/site";

export default function ScrollHint() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 1 }}
      className="absolute bottom-10 flex flex-col items-center gap-2 text-white/50"
    >
      <span className="text-xs tracking-[0.2em]">{siteContent.scrollHint}</span>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-9 w-6 items-start justify-center rounded-full border border-white/30 p-1.5"
      >
        <motion.span
          animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-1.5 w-1.5 rounded-full bg-white/70"
        />
      </motion.div>
    </motion.div>
  );
}
