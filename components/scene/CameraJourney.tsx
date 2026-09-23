"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { CatmullRomCurve3, MathUtils, Vector3 } from "three";
import { CAMERA_STOPS_DESKTOP, CAMERA_STOPS_MOBILE } from "@/experience/config";

export function CameraJourney({ isMobile, progress, reducedMotion }: { isMobile: boolean; progress: number; reducedMotion: boolean }) {
  const { camera } = useThree();
  const curves = useMemo(() => {
    const stops = isMobile ? CAMERA_STOPS_MOBILE : CAMERA_STOPS_DESKTOP;
    return {
      position: new CatmullRomCurve3(stops.map((stop) => new Vector3(...stop.position)), false, "catmullrom", 0.3),
      target: new CatmullRomCurve3(stops.map((stop) => new Vector3(...stop.target)), false, "catmullrom", 0.3),
    };
  }, [isMobile]);

  useFrame((_, delta) => {
    const destination = curves.position.getPointAt(MathUtils.clamp(progress, 0, 1));
    const target = curves.target.getPointAt(MathUtils.clamp(progress, 0, 1));
    if (reducedMotion) camera.position.copy(destination);
    else camera.position.lerp(destination, 1 - Math.exp(-delta * 3.6));
    camera.lookAt(target);
  });

  return null;
}
