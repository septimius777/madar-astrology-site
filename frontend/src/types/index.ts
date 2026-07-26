export interface Star {
  x: number; // 0–100, percentage of container width
  y: number; // 0–100, percentage of container height
  r: number; // radius in px
  delay: number; // seconds, twinkle animation offset
  duration: number; // seconds, twinkle animation length
}

export interface ConstellationPoint {
  x: number;
  y: number;
}

export interface Constellation {
  id: string;
  name: string;
  /** Points are plotted on a 0–100 x 0–100 viewBox. */
  points: ConstellationPoint[];
  /** Pairs of point indices to connect with a line. */
  lines: [number, number][];
}

export interface Service {
  id: string;
  name: string;
  duration: string;
  price: string;
  description: string;
  includes: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  attribution: string;
  constellationId: string;
}

export interface BirthChartFormState {
  name: string;
  date: string;
  time: string;
  location: string;
}
