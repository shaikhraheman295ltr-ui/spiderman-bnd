"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function SpiderSuitMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const mesh = meshRef.current;
    const wire = wireRef.current;
    if (!mesh || !wire) return;

    const geo = mesh.geometry;
    const edges = new THREE.EdgesGeometry(geo);
    wire.geometry = edges;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
      meshRef.current.rotation.y += 0.003;
    }

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.3) * 0.2;
    }

    if (wireRef.current) {
      wireRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
      wireRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <mesh ref={meshRef} scale={2.5}>
          <icosahedronGeometry args={[1.8, 2]} />
          <meshStandardMaterial
            color="#E8192C"
            emissive="#E8192C"
            emissiveIntensity={0.15}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.85}
          />
        </mesh>
        <lineSegments ref={wireRef}>
          <lineBasicMaterial color="#FF2D3F" transparent opacity={0.3} />
        </lineSegments>

        <mesh position={[0, 0, 0]} scale={1.8}>
          <sphereGeometry args={[2.2, 32, 32]} />
          <meshBasicMaterial
            color="#1B3EFF"
            transparent
            opacity={0.04}
            wireframe
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function ThreeSpiderSuit() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#E8192C" />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color="#1B3EFF" />
      <spotLight
        position={[0, 5, 5]}
        angle={0.3}
        penumbra={0.5}
        intensity={0.5}
        color="#FF2D3F"
      />
      <SpiderSuitMesh />
    </Canvas>
  );
}
