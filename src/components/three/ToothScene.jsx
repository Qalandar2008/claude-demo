import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { ToothModel } from './ToothModel';
import { useDarkMode } from '../../hooks/useDarkMode';

/* 3D canvas wrapper with lights, environment, and orbit controls for the tooth. */
export function ToothScene() {
  const [isDark] = useDarkMode();

  return (
    <div className="w-full h-[350px] sm:h-[420px] lg:h-[520px]">
      <Canvas
        camera={{ position: [0, 0.5, 3.2], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, 3, -3]} color="#06b6d4" intensity={0.8} />
        <pointLight position={[5, 0, 3]} color="#4ade80" intensity={0.3} />

        <Suspense fallback={null}>
          <ToothModel isDark={isDark} />
          <Environment preset="studio" />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
