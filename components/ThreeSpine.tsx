"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function SpineModel() {
  const groupRef = useRef<THREE.Group>(null);
  const vertsRef = useRef<THREE.Mesh[]>([]);
  const glowRef = useRef<THREE.Mesh>(null);

  const segments = useMemo(() => {
    const segs: { y: number; scale: number; rot: number }[] = [];
    for (let i = 0; i < 28; i++) {
      const t = i / 28;
      const y = (t - 0.5) * 7;
      const scale = 0.15 + (1 - Math.abs(t - 0.5) * 1.4) * 0.85;
      segs.push({ y, scale: Math.max(0.15, scale), rot: i * 0.25 });
    }
    return segs;
  }, []);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.08) * 0.5;
      groupRef.current.rotation.x = Math.sin(t * 0.12) * 0.08 + pointer.y * 0.03;
      groupRef.current.rotation.z = Math.sin(t * 0.09) * 0.06 + pointer.x * 0.03;
    }

    vertsRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const pulse = Math.sin(t * 0.6 + i * 0.25) * 0.12;
      mesh.position.y = segments[i].y + pulse * 0.08;
      mesh.scale.setScalar(1 + Math.sin(t * 0.4 + i * 0.3) * 0.05);
    });

    if (glowRef.current) {
      glowRef.current.rotation.z += 0.002;
      glowRef.current.scale.setScalar(1 + Math.sin(t * 0.3) * 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {segments.map((seg, i) => {
        const isRed = i % 2 === 0;
        return (
          <mesh
            key={i}
            ref={(el) => { if (el) vertsRef.current[i] = el; }}
            position={[0, seg.y, 0]}
            rotation={[0, seg.rot, 0]}
          >
            <torusGeometry args={[0.55 * seg.scale, 0.07 * seg.scale, 16, 32]} />
            <meshPhysicalMaterial
              color={isRed ? "#E8192C" : "#1B3EFF"}
              emissive={isRed ? "#E8192C" : "#1B3EFF"}
              emissiveIntensity={0.4}
              metalness={0.95}
              roughness={0.08}
              transparent
              opacity={0.85}
              clearcoat={0.3}
              clearcoatRoughness={0.2}
            />
          </mesh>
        );
      })}

      <mesh ref={glowRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.9, 64]} />
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
        />
      </mesh>

      <pointLight position={[0, 0, 2]} intensity={0.3} color="#FFD700" />
    </group>
  );
}

function Particles() {
  const count = 2000;
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 18;
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const c = Math.random() > 0.5 ? new THREE.Color("#E8192C") : new THREE.Color("#1B3EFF");
      cols[i * 3] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }
    return cols;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * 0.06;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3 + 1] += Math.sin(t + i * 0.008) * 0.001;
      pos[i3] += Math.cos(t * 0.4 + i * 0.004) * 0.0005;
      pos[i3 + 2] += Math.sin(t * 0.3 + i * 0.006) * 0.0005;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ThreeSpine() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ background: "transparent" }}
      onCreated={(state) => {
        state.gl.setClearColor(0x000000, 0);
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 5.5]} fov={45} />
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={1} color="#E8192C" />
      <pointLight position={[-3, -3, -3]} intensity={0.6} color="#1B3EFF" />
      <spotLight position={[0, 5, 3]} angle={0.4} penumbra={0.5} intensity={0.5} color="#FFD700" />

      <Float speed={0.4} rotationIntensity={0.03} floatIntensity={0.08}>
        <SpineModel />
      </Float>

      <Particles />
    </Canvas>
  );
}
