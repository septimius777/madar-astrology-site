import type { Service } from "../types";

export const services: Service[] = [
  {
    id: "natal",
    name: "The Natal Reading",
    duration: "75 minutes",
    price: "$220",
    description:
      "A full instrument reading of the sky at the exact minute you were born — your placements, your aspects, the shape of the chart as a whole.",
    includes: [
      "Full chart calculation",
      "Recorded session",
      "Written summary within 48 hours",
    ],
  },
  {
    id: "synastry",
    name: "Synastry Session",
    duration: "90 minutes",
    price: "$280",
    description:
      "Two charts, overlaid. Where your instruments agree, where they don't, and what that friction is actually telling you.",
    includes: [
      "Two-chart comparison",
      "Composite chart overview",
      "Recorded session",
    ],
  },
  {
    id: "forecast",
    name: "Yearly Forecast",
    duration: "60 minutes",
    price: "$180",
    description:
      "The transits ahead, mapped against your natal chart. Not predictions — coordinates for the weather you're already moving through.",
    includes: [
      "12-month transit map",
      "Key date list",
      "Written summary",
    ],
  },
  {
    id: "practice",
    name: "Ongoing Practice",
    duration: "Monthly",
    price: "$140/mo",
    description:
      "A standing monthly check-in as things move. For clients who'd rather track the sky continuously than read it once a year.",
    includes: [
      "Monthly 30-minute session",
      "Priority scheduling",
      "Between-session messages",
    ],
  },
];
