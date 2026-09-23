"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { PCFSoftShadowMap } from "three";
import { MuseumEnvironment } from "./MuseumEnvironment";

type Props = {
  isMobile: boolean;
  onRendererReady: () => void;
  onSceneReady: () => void;
  reducedMotion: boolean;
  visible: boolean;
};

export function ExperienceCanvas(props: Props) {
  const dpr: [number, number] = [1, props.isMobile ? 1.25 : 1.65];

  return (
    <Canvas
      shadows
      className="experience__canvas"
      dpr={dpr}
      frameloop={props.visible ? "always" : "never"}
      camera={{ position: [0, 4.25, 15], fov: props.isMobile ? 62 : 43, near: 0.1, far: 90 }}
      gl={{ alpha: false, antialias: !props.isMobile, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor("#d9bfd2");
        gl.shadowMap.type = PCFSoftShadowMap;
        props.onRendererReady();
      }}
    >
      <Suspense fallback={null}>
        <MuseumEnvironment isMobile={props.isMobile} onSceneReady={props.onSceneReady} reducedMotion={props.reducedMotion} />
      </Suspense>
    </Canvas>
  );
}
