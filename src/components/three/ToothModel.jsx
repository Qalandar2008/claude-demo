import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/* Simple LatheGeometry tooth — original clean style. */
const toothProfile = [
  new THREE.Vector2(0.0,  0.0),
  new THREE.Vector2(0.15, 0.04),
  new THREE.Vector2(0.2,  0.12),
  new THREE.Vector2(0.25, 0.22),
  new THREE.Vector2(0.3,  0.32),
  new THREE.Vector2(0.48, 0.42),
  new THREE.Vector2(0.52, 0.55),
  new THREE.Vector2(0.5,  0.68),
  new THREE.Vector2(0.38, 0.8),
  new THREE.Vector2(0.15, 0.88),
  new THREE.Vector2(0.0,  0.9),
];

export function ToothModel({ isDark = false }) {
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.25;
    }
  });

  const geometry = new THREE.LatheGeometry(toothProfile, 32);
  geometry.computeVertexNormals();

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} geometry={geometry} scale={1.3} position={[0, -0.2, 0]}>
        <meshPhysicalMaterial
          color={isDark ? '#c8dce8' : '#f0f6fa'}
          metalness={0.05}
          roughness={0.12}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  );
}
