"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { InstancedMesh, Matrix4, Quaternion, Vector3 } from "three";

const cloudSeeds = [
  [-10, 1, 8], [-5, -1.3, 5], [7, .2, 7], [11, 2, 1], [-10, 3, -5],
  [8, -.6, -4], [-7, -1, -10], [11, 2.2, -13], [-2, -2.8, -15], [4, 5, -22],
] as const;

export function CloudField({ compact, reducedMotion }: { compact: boolean; reducedMotion: boolean }) {
  const mesh = useRef<InstancedMesh>(null);
  const seeds = useMemo(() => (compact ? cloudSeeds.slice(0, 6) : cloudSeeds), [compact]);
  const pieces = seeds.flatMap((seed, cloudIndex) => [0, 1, 2].map((part) => ({ seed, cloudIndex, part })));

  useFrame((state) => {
    if (!mesh.current) return;
    const matrix = new Matrix4();
    const quaternion = new Quaternion();
    pieces.forEach(({ seed, cloudIndex, part }, index) => {
      const drift = reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * .08 + cloudIndex) * .18;
      const x = seed[0] + (part - 1) * 1.05 + drift;
      const y = seed[1] + Math.abs(part - 1) * -.2;
      const z = seed[2] + part * .18;
      const scale = new Vector3(1.8 - part * .22, .76 + (part === 1 ? .25 : 0), 1.1);
      matrix.compose(new Vector3(x, y, z), quaternion, scale);
      mesh.current!.setMatrixAt(index, matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, pieces.length]} frustumCulled={false}>
      <dodecahedronGeometry args={[1, 1]} />
      <meshStandardMaterial color="#f2e9ea" roughness={1} transparent opacity={.9} />
    </instancedMesh>
  );
}
