import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import SectionEyebrow from "../ui/SectionEyebrow";
import GlassPanel from "../ui/GlassPanel";

export default function ContactSection() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // NOTE: demo only — wire this up to an email/CRM endpoint in production.
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-14 px-6 py-32 text-center sm:px-10"
    >
      {/* Decorative moon — static, purely atmospheric */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-8 h-40 w-40 -translate-x-1/2 rounded-full opacity-90 sm:h-52 sm:w-52"
        style={{
          background:
            "radial-gradient(circle at 38% 35%, #FFFDF8 0%, #F1ECE2 45%, #CFCBC0 80%, rgba(207,203,192,0) 100%)",
          boxShadow:
            "0 0 90px 30px rgba(241,236,226,0.2), 0 0 200px 90px rgba(160,190,220,0.06)",
        }}
      />

      <div className="mt-28 flex flex-col items-center gap-6 sm:mt-36">
        <SectionEyebrow index="05" label="Begin" />
        <h2 className="max-w-xl text-balance font-display text-3xl font-medium leading-tight text-dawn-white sm:text-5xl">
          The sky already knows the time. Let's talk about what it means.
        </h2>
      </div>

      <GlassPanel className="w-full max-w-md p-8 text-left sm:p-10" glow>
        {sent ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center font-display text-xl text-dawn-white"
          >
            Message sent. We'll be in touch soon.
          </motion.p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <label className="flex flex-col gap-2">
              <span className="font-mono text-[11px] uppercase tracking-widest2 text-dawn-white/50">
                Email
              </span>
              <input
                type="email"
                required
                placeholder="you@domain.com"
                className="w-full border-b border-white/15 bg-transparent py-2 font-body text-base text-dawn-white placeholder:text-dawn-white/25 focus:border-gold/60"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-mono text-[11px] uppercase tracking-widest2 text-dawn-white/50">
                Message
              </span>
              <textarea
                required
                rows={3}
                placeholder="What are you hoping to understand?"
                className="w-full resize-none border-b border-white/15 bg-transparent py-2 font-body text-base text-dawn-white placeholder:text-dawn-white/25 focus:border-gold/60"
              />
            </label>
            <motion.button
              type="submit"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="mt-2 self-start rounded-full border border-gold/40 bg-gold/10 px-7 py-3 font-mono text-xs uppercase tracking-widest2 text-gold transition-colors hover:bg-gold/20"
            >
              Send message
            </motion.button>
          </form>
        )}
      </GlassPanel>

      <p className="font-mono text-[11px] uppercase tracking-widest2 text-dawn-white/30">
        Meridian — readings cast worldwide
      </p>
    </section>
  );
}
