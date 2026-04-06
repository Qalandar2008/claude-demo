import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/*
  Realistic molar tooth built from a high-density LatheGeometry profile:
  - Detailed crown with cusps, pits, and fissures via the lathe profile
  - Separate root cylinders angled outward
  - Glossy meshPhysicalMaterial simulating enamel
*/

/* LatheGeometry profile — side view from root tip to crown peak.
   Points define the half-width (x) at each height (y). */
const toothProfilePoints = [
  // Root tips (3 roots visible in profile)
  new THREE.Vector2(0.0, 0.0),
  new THREE.Vector2(0.04, 0.03),
  new THREE.Vector2(0.07, 0.08),
  new THREE.Vector2(0.09, 0.14),
  new THREE.Vector2(0.1, 0.2),

  // Lower roots area (narrow, tapering up)
  new THREE.Vector2(0.12, 0.26),
  new THREE.Vector2(0.14, 0.32),
  new THREE.Vector2(0.16, 0.38),

  // Root bifurcation area
  new THREE.Vector2(0.2, 0.44),
  new THREE.Vector2(0.24, 0.5),

  // Neck (cervix) — where roots meet crown
  new THREE.Vector2(0.3, 0.56),
  new THREE.Vector2(0.33, 0.6),
  new THREE.Vector2(0.35, 0.64),

  // Crown base — starts widening
  new THREE.Vector2(0.4, 0.68),
  new THREE.Vector2(0.46, 0.72),

  // Crown body — widest part
  new THREE.Vector2(0.52, 0.76),
  new THREE.Vector2(0.55, 0.8),
  new THREE.Vector2(0.57, 0.84),
  new THREE.Vector2(0.58, 0.88),

  // Approaching occlusal surface
  new THREE.Vector2(0.56, 0.92),
  new THREE.Vector2(0.52, 0.95),

  // Cusp peaks (buccal)
  new THREE.Vector2(0.44, 0.97),
  new THREE.Vector2(0.32, 0.99),

  // Central pit area
  new THREE.Vector2(0.18, 0.985),
  new THREE.Vector2(0.06, 0.97),

  // Cusp peaks (lingual)
  new THREE.Vector2(0.0, 0.96),
];

/* Main molar body via LatheGeometry with high radial segments for smoothness. */
function ToothBody({ isDark }) {
  const geometry = new THREE.LatheGeometry(toothProfilePoints, 48);
  geometry.computeVertexNormals();

  return (
    <mesh geometry={geometry}>
      <meshPhysicalMaterial
        color={isDark ? '#dce8ee' : '#eef4f7'}
        metalness={0.02}
        roughness={0.15}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
        envMapIntensity={1.5}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* Extra cusp details — small bumps on the occlusal surface for realism. */
function Cusps({ isDark }) {
  const mat = (
    <meshPhysicalMaterial
      color={isDark ? '#d8dfe5' : '#f5f8fa'}
      metalness={0.02}
      roughness={0.12}
      clearcoat={1.0}
      clearcoatRoughness={0.08}
      envMapIntensity={1.5}
    />
  );

  // mesiobuccal cusp
  const mbGeo = new THREE.SphereGeometry(0.12, 16, 12);
  mbGeo.scale(1, 0.55, 1);
  const mb = <mesh position={[-0.35, 0.99, 0]} geometry={mbGeo}>{mat}</mesh>;

  // distobuccal cusp (slightly smaller)
  const dbGeo = new THREE.SphereGeometry(0.1, 16, 12);
  dbGeo.scale(1, 0.5, 1);
  const db = <mesh position={[0.35, 0.98, 0]} geometry={dbGeo}>{mat}</mesh>;

  // mesiolingual cusp (tallest)
  const mlGeo = new THREE.SphereGeometry(0.13, 16, 12);
  mlGeo.scale(1, 0.6, 1);
  const ml = <mesh position={[-0.18, 0.99, 0.28]} geometry={mlGeo}>{mat}</mesh>;

  // distolingual cusp (smallest)
  const dlGeo = new THREE.SphereGeometry(0.09, 16, 12);
  dlGeo.scale(1, 0.45, 1);
  const dl = <mesh position={[0.18, 0.97, 0.28]} geometry={dlGeo}>{mat}</mesh>;

  // cusp of Carabelli (extra tubercle on mesiolingual)
  const ccGeo = new THREE.SphereGeometry(0.06, 12, 8);
  ccGeo.scale(1, 0.5, 1);
  const cc = <mesh position={[-0.3, 0.96, 0.35]} geometry={ccGeo}>{mat}</mesh>;

  return <group>{mb}{db}{ml}{dl}{cc}</group>;
}

/* Distinct 3 roots for the molar. */
function Roots({ isDark }) {
  const mat = (
    <meshPhysicalMaterial
      color={isDark ? '#c8d4da' : '#dde5ea'}
      metalness={0.01}
      roughness={0.25}
      clearcoat={0.6}
      clearcoatRoughness={0.2}
      envMapIntensity={1.0}
    />
  );

  // Mesiobuccal root
  const mbGeo = new THREE.CylinderGeometry(0.09, 0.02, 0.6, 12);
  const mesiobuccal = (
    <mesh geometry={mbGeo} position={[-0.22, -0.27, -0.05]} rotation={[0.08, 0, -0.06]}>
      {mat}
    </mesh>
  );

  // Distobuccal root (slightly narrower)
  const dbGeo = new THREE.CylinderGeometry(0.08, 0.02, 0.55, 12);
  const distobuccal = (
    <mesh geometry={dbGeo} position={[0.22, -0.25, -0.05]} rotation={[0.08, 0, 0.06]}>
      {mat}
    </mesh>
  );

  // Palatal root (longest, thickest, centered)
  const pGeo = new THREE.CylinderGeometry(0.11, 0.02, 0.75, 12);
  const palatal = (
    <mesh geometry={pGeo} position={[0.0, -0.34, 0.12]} rotation={[-0.06, 0, 0]}>
      {mat}
    </mesh>
  );

  return <group>{mesiobuccal}{distobuccal}{palatal}</group>;
}

/* Complete molar tooth model: body + cusps + roots, gently floating & rotating. */
export function ToothModel({ isDark = false }) {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <group ref={groupRef} position={[0, -0.15, 0]}>
        <ToothBody isDark={isDark} />
        <Cusps isDark={isDark} />
        <Roots isDark={isDark} />
      </group>
    </Float>
  );
}
