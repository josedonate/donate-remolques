'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';
//import * as THREE from 'three';

interface Props {
  modelo: string; // Ej: "alfa"
}

function ModeloRemolque({ modelo }: Props) {
  const { scene } = useGLTF(`/models/${modelo}.glb`);
  return <primitive object={scene} />;
}

export default function Viewer3D({ modelo }: Props) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [2, 2, 2], fov: 35 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <Suspense fallback={null}>
          <ModeloRemolque modelo={modelo} />
        </Suspense>

        <OrbitControls
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={0}
        />
      </Canvas>
    </div>
  );
}
