import { BackSide } from "three";

const vertexShader = `
  varying vec3 vWorldPosition;
  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vWorldPosition;
  void main() {
    float h = normalize(vWorldPosition).y * 0.5 + 0.5;
    vec3 low = vec3(0.95, 0.66, 0.55);
    vec3 mid = vec3(0.78, 0.69, 0.86);
    vec3 high = vec3(0.38, 0.35, 0.60);
    vec3 color = mix(low, mid, smoothstep(0.1, 0.56, h));
    color = mix(color, high, smoothstep(0.62, 1.0, h));
    gl_FragColor = vec4(color, 1.0);
  }
`;

export function AtmosphericSky() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[70, 32, 20]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} side={BackSide} />
      </mesh>
      <mesh position={[18, 10, -28]}>
        <sphereGeometry args={[2.2, 24, 24]} />
        <meshBasicMaterial color="#ffe8ab" />
      </mesh>
      <pointLight position={[18, 10, -28]} color="#ffd490" intensity={40} distance={45} />
    </group>
  );
}
