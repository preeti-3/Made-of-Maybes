import { PALETTE } from "@/experience/config";

function Island({
  position,
  kind,
}: {
  position: [number, number, number];
  kind: "book" | "door" | "orb";
}) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[2.2, 1.6, 0.45, 12]} />
        <meshStandardMaterial color="#d9c9bd" roughness={0.95} />
      </mesh>
      <mesh position={[0, -0.9, 0]}>
        <coneGeometry args={[1.55, 1.5, 8]} />
        <meshStandardMaterial color="#a58b9d" roughness={1} />
      </mesh>
      {kind === "book" && (
        <group position={[0, 0.65, 0]} rotation={[0, -0.3, 0]}>
          <mesh position={[-0.5, 0, 0]} rotation={[0, 0, 0.18]}>
            <boxGeometry args={[1, 0.08, 1.35]} />
            <meshStandardMaterial color={PALETTE.ivory} />
          </mesh>
          <mesh position={[0.5, 0, 0]} rotation={[0, 0, -0.18]}>
            <boxGeometry args={[1, 0.08, 1.35]} />
            <meshStandardMaterial color={PALETTE.ivory} />
          </mesh>
        </group>
      )}
      {kind === "door" && (
        <group position={[0, 1, 0]}>
          <mesh>
            <boxGeometry args={[1.8, 2.6, 0.25]} />
            <meshStandardMaterial color={PALETTE.ivory} />
          </mesh>
          <mesh position={[0, 0, 0.16]}>
            <boxGeometry args={[1.25, 2.1, 0.08]} />
            <meshStandardMaterial color="#8c6f91" />
          </mesh>
        </group>
      )}
      {kind === "orb" && (
        <group position={[0, 0.9, 0]}>
          <mesh>
            <sphereGeometry args={[0.45, 18, 18]} />
            <meshStandardMaterial
              color={PALETTE.gold}
              emissive={PALETTE.gold}
              emissiveIntensity={0.35}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.9, 0.03, 6, 32]} />
            <meshBasicMaterial color={PALETTE.violet} />
          </mesh>
        </group>
      )}
    </group>
  );
}

export function FutureExhibits({ compact }: { compact: boolean }) {
  return (
    <group>
      <Island position={[-6, 1.3, -14]} kind="book" />
      <Island position={[6, 2.1, -17]} kind="door" />
      {!compact && <Island position={[0.5, 4.2, -23]} kind="orb" />}
    </group>
  );
}
