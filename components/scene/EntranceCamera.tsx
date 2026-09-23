"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { Vector3 } from "three";

export function EntranceCamera({ isMobile, reducedMotion }: { isMobile: boolean; reducedMotion: boolean }) {
  const { camera } = useThree();
  const base = useMemo(() => new Vector3(0, isMobile ? 3.9 : 4.15, isMobile ? 16.2 : 15.4), [isMobile]);
  const destination = useMemo(() => new Vector3(), []);
  const lookTarget = useMemo(() => new Vector3(), []);

  useFrame((state, delta) => {
    const pointerX = reducedMotion ? 0 : state.pointer.x;
    const pointerY = reducedMotion ? 0 : state.pointer.y;
    destination.copy(base).add(new Vector3(pointerX * .18, pointerY * .1, 0));
    camera.position.lerp(destination, 1 - Math.exp(-delta * 2.4));
    lookTarget.set(pointerX * .12, 2.15 + pointerY * .08, 2.15);
    camera.lookAt(lookTarget);
  });

  return null;
}
