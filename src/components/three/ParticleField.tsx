import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  count?: number;
  intensity?: number;
}

function Particles({ count = 3000, intensity = 1 }: ParticlesProps) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors, scales } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    const indigo = new THREE.Color('#7B61FF');
    const mint = new THREE.Color('#00F5C4');
    const magenta = new THREE.Color('#FF2D9D');

    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const pick = Math.random();
      const c = pick < 0.55 ? indigo : pick < 0.94 ? mint : magenta;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      sc[i] = 0.6 + Math.random() * 1.6;
    }
    return { positions: pos, colors: col, scales: sc };
  }, [count]);

  const { size } = useThree();
  const target = useRef(new THREE.Vector2(0, 0));

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.045 * intensity;
    ref.current.rotation.x += delta * 0.012 * intensity;
    // Pointer parallax
    const px = state.pointer.x;
    const py = state.pointer.y;
    target.current.x = THREE.MathUtils.lerp(target.current.x, px * 0.35, 0.04);
    target.current.y = THREE.MathUtils.lerp(target.current.y, py * 0.25, 0.04);
    ref.current.position.x = target.current.x;
    ref.current.position.y = target.current.y;
    void size;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={colors.length / 3}
        />
        <bufferAttribute attach="attributes-scale" args={[scales, 1]} count={scales.length} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.92}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GlowOrb({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime;
      ref.current.position.x = position[0] + Math.sin(t * 0.4) * 0.4;
      ref.current.position.y = position[1] + Math.cos(t * 0.3) * 0.3;
    }
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[1, 24, 24]} />
      <meshBasicMaterial color={color} transparent opacity={0.08} />
    </mesh>
  );
}

interface Props {
  count?: number;
  className?: string;
  intensity?: number;
  reducedMotion?: boolean;
}

export default function ParticleField({
  count = 3000,
  className,
  intensity = 1,
  reducedMotion = false,
}: Props) {
  return (
    <div className={`absolute inset-0 ${className ?? ''}`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 55 }}
        dpr={[1, 1.6]}
        frameloop={reducedMotion ? 'never' : 'always'}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#08080F']} />
        <fog attach="fog" args={['#08080F', 12, 26]} />
        <Particles count={count} intensity={intensity} />
        <GlowOrb position={[-4, 2, -3]} color="#7B61FF" scale={3.2} />
        <GlowOrb position={[5, -1.5, -2]} color="#00F5C4" scale={2.6} />
      </Canvas>
    </div>
  );
}
