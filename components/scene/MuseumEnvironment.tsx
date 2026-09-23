"use client";

import { ContactShadows } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { AtmosphericSky } from "./AtmosphericSky";
import { CloudField } from "./CloudField";
import { EntranceCamera } from "./EntranceCamera";

type Props = { isMobile: boolean; onSceneReady: () => void; reducedMotion: boolean };

export function MuseumEnvironment(props: Props) {
  const announced = useRef(false);

  useFrame(() => {
    if (!announced.current) {
      announced.current = true;
      props.onSceneReady();
    }
  });

  return (
    <>
      <AtmosphericSky />
      <fog attach="fog" args={["#d7bdd8", 27, 60]} />
      <ambientLight intensity={1.15} color="#fff5eb" />
      <hemisphereLight args={["#ffe5c9", "#74638f", 1.75]} />
      <directionalLight
        castShadow
        position={[8, 12, 11]}
        intensity={3.8}
        color="#ffd698"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={32}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={11}
        shadow-camera-bottom={-7}
        shadow-bias={-0.0004}
      />
      <pointLight position={[-7, 5, 8]} intensity={7} distance={19} color="#cab9ef" />
      <pointLight position={[5, 4, 5]} intensity={8} distance={14} color="#ffc890" />
      <EntranceCamera isMobile={props.isMobile} reducedMotion={props.reducedMotion} />
      <CloudField compact={props.isMobile} reducedMotion={props.reducedMotion} />
      {/* <FloatingPath /> */}
      {/* <EntranceArch reducedMotion={props.reducedMotion} /> */}
      {!props.isMobile && <ContactShadows position={[0, -.34, 2.8]} scale={12} opacity={.24} blur={3.2} far={7} color="#695678" />}
    </>
  );
}
