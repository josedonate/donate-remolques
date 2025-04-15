"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import * as THREE from "three";

interface Props {
  url: string;
}

function Model({ url }: { url: string }) {
  const gltf = useGLTF(url);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const size = new THREE.Vector3();
    box.getSize(size);

    const maxDimension = Math.max(size.x, size.y, size.z);
    const idealSize = 2;
    const scaleFactor = idealSize / maxDimension;

    setScale(scaleFactor);
  }, [gltf]);

  return <primitive object={gltf.scene} scale={scale} castShadow receiveShadow />;
}

export default function Remolque3DViewer({ url }: Props) {
  return (
    <div className="relative w-full h-[350px] sm:h-[500px] lg:h-[550px] lg:max-w-[700px] mx-auto">
      {/* Icono giratorio en la esquina */}
      <div className="absolute top-2 right-2 z-10 bg-blue-200 text-black text-xs px-2 py-1 rounded shadow-sm flex items-center gap-1">
        <svg
          className="w-4 h-4 animate-spin-slow"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9M20 20v-5h-.581m-15.357-2a8.001 8.001 0 0015.357 2"
          />
        </svg>
        3D interactivo
      </div>

      <Canvas
        camera={{ position: [2, 2, 2], fov: 45 }}
        shadows
        className="w-full h-full"
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
        <Suspense fallback={null}>
          <Model url={url} />
        </Suspense>
        <OrbitControls
          enableZoom
          minDistance={1}
          maxDistance={3.5}
          //minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 2.15}
        />
      </Canvas>
    </div>
  );
}

