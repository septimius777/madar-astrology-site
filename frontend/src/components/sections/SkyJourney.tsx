import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Sun from "../celestial/Sun";
import Moon from "../celestial/Moon";
import Clouds from "../celestial/Clouds";
import Starfield from "../celestial/Starfield";
import ConstellationSVG from "../celestial/ConstellationSVG";
import { constellations } from "../../data/constellations";
import { createSkyJourneyTimeline } from "../../animations/skyJourney";

/**
 * Hero + the "signature moment" scroll transition, combined into one
 * pinned section: the page opens on sunrise, then a single continuous
 * scroll compresses a full day into night, ending with the moon holding
 * the second headline. See animations/skyJourney.ts for the timeline.
 */
export default function SkyJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const headlineARef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const skyMorningRef = useRef<HTMLDivElement>(null);
  const skyGoldenRef = useRef<HTMLDivElement>(null);
  const skySunsetRef = useRef<HTMLDivElement>(null);
  const skyTwilightRef = useRef<HTMLDivElement>(null);
  const skyNightRef = useRef<HTMLDivElement>(null);
  const starsWrapperRef = useRef<HTMLDivElement>(null);
  const constellationsRef = useRef<SVGSVGElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);
  const headlineBRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (
      !sectionRef.current ||
      !sunRef.current ||
      !headlineARef.current ||
      !cloudsRef.current ||
      !skyMorningRef.current ||
      !skyGoldenRef.current ||
      !skySunsetRef.current ||
      !skyTwilightRef.current ||
      !skyNightRef.current ||
      !starsWrapperRef.current ||
      !constellationsRef.current ||
      !moonRef.current ||
      !headlineBRef.current ||
      !scrollCueRef.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      createSkyJourneyTimeline({
        section: sectionRef.current!,
        sun: sunRef.current!,
        headlineA: headlineARef.current!,
        clouds: cloudsRef.current!,
        skyMorning: skyMorningRef.current!,
        skyGolden: skyGoldenRef.current!,
        skySunset: skySunsetRef.current!,
        skyTwilight: skyTwilightRef.current!,
        skyNight: skyNightRef.current!,
        starsWrapper: starsWrapperRef.current!,
        constellations: constellationsRef.current!,
        moon: moonRef.current!,
        headlineB: headlineBRef.current!,
        scrollCue: scrollCueRef.current!,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-night-navy"
    >
      {/* Sky layers, stacked and cross-faded by the timeline */}
      <div
        ref={skyMorningRef}
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #FBF3E7 0%, #E7EEF2 38%, #9FC1D9 100%)",
        }}
      />
      <div
        ref={skyGoldenRef}
        className="absolute inset-0 opacity-0"
        style={{
          background:
            "linear-gradient(to bottom, #FDEBC7 0%, #F7CE8A 45%, #F2A94D 100%)",
        }}
      />
      <div
        ref={skySunsetRef}
        className="absolute inset-0 opacity-0"
        style={{
          background:
            "linear-gradient(to bottom, #F6C39A 0%, #E1552E 55%, #7C2E3A 100%)",
        }}
      />
      <div
        ref={skyTwilightRef}
        className="absolute inset-0 opacity-0"
        style={{
          background:
            "linear-gradient(to bottom, #5C4A78 0%, #2A2560 55%, #131233 100%)",
        }}
      />
      <div
        ref={skyNightRef}
        className="absolute inset-0 opacity-0"
        style={{
          background:
            "linear-gradient(to bottom, #0E1130 0%, #070B22 60%, #05070F 100%)",
        }}
      />

      {/* Stars, dormant until twilight */}
      <div ref={starsWrapperRef} className="absolute inset-0 opacity-0">
        <Starfield density={1.1} />
      </div>

      {/* Constellations, drawn in once night settles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <ConstellationSVG
          ref={constellationsRef}
          constellation={constellations[0]}
          className="h-[70vmin] w-[70vmin] opacity-90"
        />
      </div>

      <Clouds ref={cloudsRef} />

      <Sun ref={sunRef}>
        <div ref={headlineARef}>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-widest2 text-night-navy/50">
            Meridian
          </p>
          <h1 className="text-balance font-display text-4xl font-medium leading-[1.05] text-night-navy sm:text-5xl">
            Everything Is Timed
          </h1>
          <p className="mt-4 text-balance font-body text-sm text-night-navy/70 sm:text-base">
            Precision guidance from the movements of the sky, cast for the
            exact moment you were born.
          </p>
        </div>
      </Sun>

      <Moon ref={moonRef}>
        <div ref={headlineBRef} className="opacity-0">
          <h2 className="text-balance font-display text-2xl font-medium leading-tight text-night-navy sm:text-3xl">
            Your Chart Is Waiting
          </h2>
        </div>
      </Moon>

      <div
        ref={scrollCueRef}
        className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-dawn-white/60"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest2">
          Scroll
        </span>
        <span className="h-8 w-px animate-pulse bg-current" />
      </div>
    </section>
  );
}
