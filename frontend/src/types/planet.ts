export interface PlanetTrait {
  label: string;
  value: string;
}

export interface PlanetData {
  id: string;
  order: number; // 0 = sun, 1 = mercury ... 8 = neptune
  nameFa: string;
  nameEn: string;
  tagline: string;
  description: string;
  rulesSigns?: string[]; // Persian zodiac sign names this planet rules
  traits: PlanetTrait[];
  color: string; // primary accent hex
  colorSoft: string; // soft glow hex
  colorDeep: string; // deep shadow hex
  size: number; // relative visual radius in px (base 1x scale)
  hasRing?: boolean;
  moons?: number;
  distanceLabel: string; // e.g. "58 میلیون کیلومتر از خورشید"
  orbitSpeed: number; // seconds per rotation loop for ambient animation
  starDensity: number; // 0..1 controls background star field density for this section
  starColor: string; // hex tint for the starfield in this section
  nebulaColor: string; // hex tint for the ambient nebula glow
}
