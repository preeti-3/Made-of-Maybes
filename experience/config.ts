import type { Vector3Tuple } from "three";

export const PALETTE = {
  ivory: "#F3E7D3",
  peach: "#F2B6A0",
  lavender: "#C8B7E8",
  violet: "#3F315D",
  cobalt: "#4169E1",
  gold: "#D7A84B",
  cloud: "#F7F2EB",
} as const;

export const CONTENT = {
  title: "Made of Maybes",
  premise: "Every finished thing was once only a maybe.",
  exhibitTitle: "The Idea That Almost Worked",
  prompt: "Complete the idea.",
  reflection: "Some ideas aren’t failures. They’re waiting for another version of you.",
  ending: "More maybes are waiting.",
} as const;

export const TIMINGS = {
  camera: 2.4,
  activation: 1.9,
  reflectionDelay: 3200,
} as const;

export type CameraStop = { position: Vector3Tuple; target: Vector3Tuple };

export const CAMERA_STOPS_DESKTOP: CameraStop[] = [
  { position: [0.2, 5.4, 15], target: [0, 3.1, 2.2] },
  { position: [-0.4, 3.55, 9.2], target: [0, 2.8, 2.2] },
  { position: [0.15, 2.8, 3.6], target: [0, 2.45, -1.4] },
  { position: [2.2, 3.4, -1.5], target: [1.2, 2.2, -6.1] },
  { position: [1.45, 3.25, -0.8], target: [0.8, 2.2, -6.2] },
  { position: [-1.6, 4.5, -7.4], target: [1.2, 2.8, -12] },
];

export const CAMERA_STOPS_MOBILE: CameraStop[] = [
  { position: [0.2, 5.1, 15.8], target: [0, 3, 2.4] },
  { position: [0, 3.6, 10.9], target: [0, 2.75, 2] },
  { position: [0.2, 2.9, 4.2], target: [0, 2.3, -2] },
  { position: [1.8, 3.6, -0.6], target: [0.7, 2.2, -6.1] },
  { position: [1.35, 3.45, -0.4], target: [0.7, 2.2, -6.1] },
  { position: [-1.2, 4.2, -7], target: [1, 2.6, -12] },
];

export const JOURNEY_STOPS = [0, 0.2, 0.42, 0.66, 0.79, 1] as const;
