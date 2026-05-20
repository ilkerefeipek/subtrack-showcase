import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function GlowOrb({
  position,
  color,
  scale,
  speed = 0.4,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.x = position[0] + Math.sin(t * speed) * 0.8;
    ref.current.position.y = position[1] + Math.cos(t * speed * 0.7) * 0.6;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[1, 24, 24]} />
      <meshBasicMaterial color={color} transparent opacity={0.12} />
    </mesh>
  );
}

function Stars({ count = 800 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useRef<Float32Array>(
    (() => {
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        arr[i * 3] = (Math.random() - 0.5) * 28;
        arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
        arr[i * 3 + 2] = -2 - Math.random() * 8;
      }
      return arr;
    })(),
  );
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += dt * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        sizeAttenuation
        color="#A0A0B8"
        transparent
        opacity={0.6}
        depthWrite={false}
      />
    </points>
  );
}

interface Props {
  reducedMotion?: boolean;
  starCount?: number;
}

export default function FloatingScene({ reducedMotion = false, starCount = 600 }: Props) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.6]}
        frameloop={reducedMotion ? 'never' : 'always'}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#08080F']} />
        <fog attach="fog" args={['#08080F', 6, 22]} />
        <Stars count={reducedMotion ? 0 : starCount} />
        <GlowOrb position={[-5, 2, -4]} color="#7B61FF" scale={3.6} speed={0.3} />
        <GlowOrb position={[5, -2, -3]} color="#00F5C4" scale={2.8} speed={0.5} />
        <GlowOrb position={[0, 0, -5]} color="#FF2D9D" scale={2.2} speed={0.4} />
      </Canvas>
    </div>
  );
}
