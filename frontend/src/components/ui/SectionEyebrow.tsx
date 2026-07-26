interface SectionEyebrowProps {
  index: string;
  label: string;
}

/**
 * Small coordinate-style tag, e.g. "02 — READING". Echoes the brief's
 * "ancient observatory / instrument" framing: these read like labels on
 * a piece of equipment, not decorative numbering for its own sake.
 */
export default function SectionEyebrow({ index, label }: SectionEyebrowProps) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs tracking-widest2 text-dawn-white/50">
      <span className="text-gold/70">{index}</span>
      <span className="h-px w-8 bg-dawn-white/20" />
      <span className="uppercase">{label}</span>
    </div>
  );
}
