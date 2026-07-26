import type { Constellation } from "../types";

/**
 * Stylized, simplified constellation figures plotted on a 0–100 x 0–100
 * viewBox. These are decorative approximations, not astronomically exact
 * star charts — chosen for silhouette and rhythm rather than precision.
 */
export const constellations: Constellation[] = [
  {
    id: "lyra",
    name: "Lyra",
    points: [
      { x: 50, y: 12 },
      { x: 38, y: 30 },
      { x: 62, y: 30 },
      { x: 34, y: 58 },
      { x: 66, y: 58 },
      { x: 44, y: 82 },
      { x: 56, y: 82 },
    ],
    lines: [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 4],
      [3, 5],
      [4, 6],
      [5, 6],
    ],
  },
  {
    id: "cassiopeia",
    name: "Cassiopeia",
    points: [
      { x: 10, y: 60 },
      { x: 30, y: 30 },
      { x: 50, y: 55 },
      { x: 70, y: 25 },
      { x: 90, y: 50 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
  },
  {
    id: "aquila",
    name: "Aquila",
    points: [
      { x: 50, y: 10 },
      { x: 50, y: 40 },
      { x: 20, y: 55 },
      { x: 80, y: 55 },
      { x: 35, y: 85 },
      { x: 65, y: 85 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [1, 3],
      [2, 4],
      [3, 5],
    ],
  },
  {
    id: "corona",
    name: "Corona Borealis",
    points: [
      { x: 12, y: 55 },
      { x: 26, y: 32 },
      { x: 44, y: 18 },
      { x: 64, y: 18 },
      { x: 82, y: 32 },
      { x: 92, y: 55 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
    ],
  },
];

export const getConstellationById = (id: string): Constellation =>
  constellations.find((c) => c.id === id) ?? constellations[0];
