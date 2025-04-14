"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

interface Props {
  url: string;
}

function Model({ url }: { url: string }) {
  const gltf = useGLTF(`${url}`);
  return <primitive object={gltf.scene} scale={1} />;
}

export default function Remolque3DViewer({ url }: Props) {
  return (
    <div className="w-full h-[400px] border rounded-lg shadow-md">
      <Canvas camera={{ position: [2, 2, 2] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <Model url={url} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
