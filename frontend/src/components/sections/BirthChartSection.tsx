import { useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import GlassPanel from "../ui/GlassPanel";
import SectionEyebrow from "../ui/SectionEyebrow";
import ConstellationSVG from "../celestial/ConstellationSVG";
import { constellations } from "../../data/constellations";
import type { BirthChartFormState } from "../../types";

const emptyForm: BirthChartFormState = {
  name: "",
  date: "",
  time: "",
  location: "",
};

const fieldOrder: (keyof BirthChartFormState)[] = [
  "name",
  "date",
  "time",
  "location",
];

// One constellation per field, positioned in a quadrant of the composite
// chart preview so the whole figure visibly assembles as fields are filled.
const quadrantPosition: Record<(typeof fieldOrder)[number], string> = {
  name: "left-0 top-0",
  date: "right-0 top-0",
  time: "left-0 bottom-0",
  location: "right-0 bottom-0",
};

export default function BirthChartSection() {
  const [form, setForm] = useState<BirthChartFormState>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filledCount = useMemo(
    () => fieldOrder.filter((key) => form[key].trim().length > 0).length,
    [form]
  );

  const handleChange =
    (key: keyof BirthChartFormState) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // NOTE: this is a demo form with no backend wired up. In production,
    // POST `form` to your booking/email service of choice here.
    setSubmitted(true);
  };

  return (
    <section
      id="chart"
      ref={containerRef}
      className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-16 px-6 py-32 sm:px-10"
    >
      <div className="flex flex-col gap-6">
        <SectionEyebrow index="02" label="Construct Your Chart" />
        <h2 className="max-w-2xl text-balance font-display text-3xl font-medium leading-tight text-dawn-white sm:text-5xl">
          Four details. One instrument reading.
        </h2>
        <p className="max-w-lg text-sm leading-relaxed text-dawn-white/60">
          Nothing is sent until you submit — but watch the chart as you type.
          Each field you complete lights part of it.
        </p>
      </div>

      <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.85fr]">
        <GlassPanel className="p-8 sm:p-10" glow>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex min-h-[280px] flex-col items-center justify-center gap-4 text-center"
            >
              <p className="font-mono text-xs uppercase tracking-widest2 text-gold/80">
                Noted
              </p>
              <h3 className="font-display text-2xl text-dawn-white">
                Your chart request is in.
              </h3>
              <p className="max-w-sm text-sm text-dawn-white/60">
                We'll follow up by email to confirm a time for your reading.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
              <Field
                label="Full name"
                type="text"
                value={form.name}
                onChange={handleChange("name")}
                placeholder="Jordan Ellis"
                autoComplete="name"
              />
              <Field
                label="Date of birth"
                type="date"
                value={form.date}
                onChange={handleChange("date")}
              />
              <Field
                label="Time of birth"
                type="time"
                value={form.time}
                onChange={handleChange("time")}
              />
              <Field
                label="Place of birth"
                type="text"
                value={form.location}
                onChange={handleChange("location")}
                placeholder="City, country"
                autoComplete="off"
              />

              <motion.button
                type="submit"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="mt-2 self-start rounded-full border border-gold/40 bg-gold/10 px-7 py-3 font-mono text-xs uppercase tracking-widest2 text-gold transition-colors hover:bg-gold/20"
              >
                Construct my chart
              </motion.button>
            </form>
          )}
        </GlassPanel>

        <div className="relative mx-auto aspect-square w-full max-w-sm">
          <div className="absolute inset-[18%] rounded-full border border-white/10" />
          <div className="absolute inset-[32%] rounded-full border border-gold/15" />
          <p className="absolute inset-0 flex items-center justify-center font-mono text-[11px] uppercase tracking-widest2 text-dawn-white/30">
            {filledCount}/4 aligned
          </p>

          {fieldOrder.map((key, i) => (
            <div
              key={key}
              className={`absolute h-[42%] w-[42%] ${quadrantPosition[key]}`}
            >
              <ConstellationSVG
                constellation={constellations[i]}
                lit={form[key].trim().length > 0}
                color={i % 2 === 0 ? "#F2A94D" : "#F1ECE2"}
                className="h-full w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
}

function Field({ label, type, value, onChange, placeholder, autoComplete }: FieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[11px] uppercase tracking-widest2 text-dawn-white/50">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        className="w-full border-b border-white/15 bg-transparent py-2 font-body text-base text-dawn-white placeholder:text-dawn-white/25 focus:border-gold/60"
      />
    </label>
  );
}
