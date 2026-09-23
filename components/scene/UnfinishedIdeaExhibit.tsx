"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { AdditiveBlending, Group, MathUtils, Mesh, Vector3 } from "three";
import { PALETTE } from "@/experience/config";

const starPositions = [
  [-1.6,2.2,.2],[-1.1,2.8,-.1],[-.6,2.4,.4],[-.2,3.1,0],[.3,2.7,.2],[.9,3.3,-.2],[1.5,2.9,.25],
  [-.9,3.6,-.25],[.2,3.9,.1],[1.1,4.1,-.1],[1.8,3.6,.3],[2.2,4.3,-.2]
] as const;

type Props = { active: boolean; onActivate: () => void; reducedMotion: boolean; resolved: boolean };

export function UnfinishedIdeaExhibit({ active, onActivate, reducedMotion, resolved }: Props) {
  const machine = useRef<Group>(null);
  const rings = useRef<Group>(null);
  const missing = useRef<Mesh>(null);
  const loosePart = useRef<Mesh>(null);
  const constellation = useRef<Group>(null);
  const completion = useRef(0);
  const [hovered, setHovered] = useState(false);
  const home = useMemo(() => new Vector3(.76, 2.42, 0), []);
  const away = useMemo(() => new Vector3(2.15, 2.85, .25), []);

  useFrame((state, delta) => {
    completion.current = MathUtils.damp(completion.current, active ? 1 : 0, reducedMotion ? 30 : 2.2, delta);
    const t = state.clock.elapsedTime;
    if (machine.current && !reducedMotion) machine.current.position.y = Math.sin(t * .8) * .09;
    if (rings.current && !reducedMotion) {
      rings.current.rotation.y += delta * (.18 + completion.current * .95);
      rings.current.rotation.x = Math.sin(t * .24) * .15;
    }
    if (missing.current) {
      missing.current.position.lerpVectors(away, home, completion.current);
      missing.current.rotation.y += delta * (active ? 2.2 : .7);
      const pulse = hovered && !active ? 1.14 : 1;
      missing.current.scale.setScalar(MathUtils.damp(missing.current.scale.x, pulse, 7, delta));
    }
    if (loosePart.current) {
      const disconnect = resolved ? .72 : 0;
      loosePart.current.position.x = MathUtils.damp(loosePart.current.position.x, -.8 - disconnect, 1.4, delta);
      loosePart.current.rotation.z += delta * (reducedMotion ? 0 : .25);
    }
    if (constellation.current) {
      const show = MathUtils.smoothstep(completion.current, .58, 1);
      constellation.current.scale.setScalar(show);
      constellation.current.visible = show > .01;
      if (!reducedMotion) constellation.current.rotation.y = Math.sin(t * .18) * .18;
    }
  });

  return (
    <group position={[.95, .08, -6.2]}>
      <mesh position={[0,-.16,0]}><cylinderGeometry args={[2.5,2.75,.48,42]} /><meshStandardMaterial color="#e5d3c6" roughness={.82} /></mesh>
      <mesh position={[0,.14,0]}><cylinderGeometry args={[1.85,2.05,.35,42]} /><meshStandardMaterial color={PALETTE.ivory} roughness={.76} /></mesh>
      <mesh position={[0,.34,0]}><cylinderGeometry args={[1.52,1.62,.13,42]} /><meshStandardMaterial color={PALETTE.gold} metalness={.42} roughness={.35} /></mesh>
      <mesh position={[0,-.75,0]}><coneGeometry args={[1.75,1.4,10]} /><meshStandardMaterial color="#a78d9e" roughness={1} /></mesh>
      <mesh position={[0,.37,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[1.48,42]} /><meshStandardMaterial color="#f0e3d4" roughness={.8} /></mesh>

      <group ref={machine} position={[0,.42,0]}>
        <pointLight position={[0,1.9,0]} intensity={active ? 18 : 8} distance={6} color={active ? "#ffd16e" : "#efbd73"} />
        <mesh position={[0,1.7,0]}>
          <sphereGeometry args={[.32,20,20]} />
          <meshStandardMaterial color="#ffd47b" emissive="#d7a84b" emissiveIntensity={active ? 2.8 : 1.1} roughness={.25} />
        </mesh>
        <mesh ref={loosePart} position={[-.8,2.18,.04]} rotation={[.4,0,.4]}>
          <cylinderGeometry args={[.36,.5,.72,6]} />
          <meshStandardMaterial color={PALETTE.ivory} roughness={.5} metalness={.08} />
        </mesh>
        <mesh position={[.12,2.62,-.05]} rotation={[.25,.2,-.3]}>
          <boxGeometry args={[.72,.48,.46]} />
          <meshStandardMaterial color="#b99fc6" roughness={.52} />
        </mesh>
        <mesh position={[.68,1.78,.04]} rotation={[0,0,-.6]}>
          <coneGeometry args={[.42,.85,5]} />
          <meshStandardMaterial color="#e1c4b1" roughness={.58} />
        </mesh>
        <mesh position={[-.2,1.02,0]} rotation={[.2,0,.8]}>
          <torusGeometry args={[.48,.16,9,22,Math.PI*1.5]} />
          <meshStandardMaterial color="#a990bd" roughness={.48} />
        </mesh>
        <mesh
          ref={missing}
          position={away}
          onClick={(event) => { event.stopPropagation(); onActivate(); }}
          onPointerEnter={() => { setHovered(true); document.body.style.cursor = "pointer"; }}
          onPointerLeave={() => { setHovered(false); document.body.style.cursor = "default"; }}
        >
          <octahedronGeometry args={[.45,0]} />
          <meshStandardMaterial color={PALETTE.cobalt} emissive={PALETTE.cobalt} emissiveIntensity={active ? 2.5 : 1.2} metalness={.18} roughness={.2} />
        </mesh>

        <group ref={rings} position={[0,1.78,0]}>
          <mesh rotation={[Math.PI/2.5,.1,0]}><torusGeometry args={[1.25,.022,6,58]} /><meshBasicMaterial color={PALETTE.gold} transparent opacity={.78} /></mesh>
          <mesh rotation={[.2,Math.PI/2.6,.6]}><torusGeometry args={[1.58,.018,6,62]} /><meshBasicMaterial color="#fff0bd" transparent opacity={.52} /></mesh>
        </group>

        <group ref={constellation} position={[0,.2,-.25]} visible={false}>
          {starPositions.map((position, index) => (
            <mesh key={index} position={position} scale={index % 3 === 0 ? .055 : .032}>
              <sphereGeometry args={[1,8,8]} />
              <meshBasicMaterial color={index % 4 === 0 ? PALETTE.cobalt : "#fff0bd"} transparent opacity={.9} blending={AdditiveBlending} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}
