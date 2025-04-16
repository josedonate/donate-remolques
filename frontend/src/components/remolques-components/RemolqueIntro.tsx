"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";

function RemolqueModel({ onLoad }: { onLoad: () => void }) {
  const gltf = useGLTF("/models/remolque.glb", true);
  const ref = useRef<THREE.Object3D>(null!);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.003;
    }
  });

  useState(() => {
    if (gltf && gltf.scene) {
      onLoad();
    }
  });

  return (
    <primitive
      object={gltf.scene}
      scale={1.6}
      ref={ref}
      position={[0, -1, 0]}
    />
  );
}

export default function RemolqueIntro() {
  const [modeloCargado, setModeloCargado] = useState(false);

  return (
    <div className="relative w-full h-[420px] mb-6 overflow-hidden bg-[var(--background)]">
      {modeloCargado && (
        <h1 className="absolute top-13 left-1/2 -translate-x-1/2 text-[#008fc3] text-5xl font-extrabold text-center z-10">
          REMOLQUES DONATE
        </h1>
      )}

      <Canvas shadows camera={{ position: [8, 2, 5], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <directionalLight castShadow position={[10, 10, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <RemolqueModel onLoad={() => setModeloCargado(true)} />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
}
