import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { PlanetData } from "../../types/planet";

interface PlanetProps {
  planet: PlanetData;
}

const BASE_PX = 130;

export default function Planet({ planet }: PlanetProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);

  const size = Math.round(BASE_PX * planet.size);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(wrapRef.current, {
        y: -18,
        duration: planet.orbitSpeed / 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(sphereRef.current, {
        rotate: 360,
        duration: planet.orbitSpeed,
        repeat: -1,
        ease: "none",
      });
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          rotate: -360,
          duration: planet.orbitSpeed * 2.2,
          repeat: -1,
          ease: "none",
        });
      }
      if (moonRef.current) {
        gsap.to(moonRef.current, {
          rotate: 360,
          duration: planet.orbitSpeed * 0.6,
          repeat: -1,
          ease: "none",
          transformOrigin: `${size * 0.9}px ${size * 0.9}px`,
        });
      }
    });
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planet.id]);

  return (
    <div
      ref={wrapRef}
      className="relative flex items-center justify-center"
      style={{ width: size * 2.2, height: size * 2.2 }}
    >
      {/* ambient glow behind planet */}
      <div
        className="absolute rounded-full blur-[60px]"
        style={{
          width: size * 1.4,
          height: size * 1.4,
          backgroundColor: planet.color,
          opacity: 0.35,
        }}
      />

      {planet.hasRing && (
        <div
          ref={ringRef}
          className="absolute rounded-[50%] border"
          style={{
            width: size * 2.05,
            height: size * 0.62,
            borderWidth: size * 0.05,
            borderColor: `${planet.colorSoft}99`,
            transform: "rotate(-18deg)",
            boxShadow: `0 0 30px 2px ${planet.color}44`,
          }}
        />
      )}

      <div
        ref={sphereRef}
        className="relative rounded-full"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 32% 28%, ${planet.colorSoft} 0%, ${planet.color} 45%, ${planet.colorDeep} 100%)`,
          boxShadow: `inset -${size * 0.12}px -${size * 0.1}px ${size * 0.3}px rgba(0,0,0,0.55), 0 0 ${size * 0.4}px ${planet.color}55`,
        }}
      >
        {planet.id === "earth" && (
          <div
            className="absolute inset-0 rounded-full opacity-70 mix-blend-overlay"
            style={{
              background:
                "radial-gradient(circle at 60% 40%, rgba(255,255,255,0.5) 0%, transparent 35%), radial-gradient(circle at 30% 70%, rgba(80,180,100,0.6) 0%, transparent 40%)",
            }}
          />
        )}
        {(planet.id === "jupiter" || planet.id === "saturn") && (
          <div
            className="absolute inset-0 rounded-full opacity-50"
            style={{
              background:
                "repeating-linear-gradient(180deg, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 6px, transparent 6px, transparent 14px)",
            }}
          />
        )}
      </div>

      {planet.moons && planet.moons > 0 && (
        <div
          ref={moonRef}
          className="absolute rounded-full bg-neutral-300"
          style={{
            width: size * 0.14,
            height: size * 0.14,
            top: size * 0.15,
            left: size * 1.7,
            boxShadow: "0 0 10px rgba(255,255,255,0.6)",
          }}
        />
      )}
    </div>
  );
}
