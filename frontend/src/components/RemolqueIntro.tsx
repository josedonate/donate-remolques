import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF, Text, Billboard } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function RemolqueModel() {
  const gltf = useGLTF("/models/remolque.glb");
  const ref = useRef<THREE.Object3D>(null!);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.003;
    }
  });

  return  (
    <primitive 
      object={gltf.scene} 
      scale={0.9} 
      ref={ref}
      position={[0, -0.5, 0]}
    />
  );
}

function RemolquesDonateText() {
  return (
    <Billboard 
      follow={true}       // hace que el billboard siempre mire a la cámara
      lockX={false}
      lockY={false}
      lockZ={false}
      position={[-5, 0.7, 0]} 
    >
      <Text
        font="/fonts/Geliat-ExtraBold.otf"
        fontSize={0.8}
        color="#008fc3"
        anchorX="left"
        anchorY="bottom"
        material-toneMapped={false}
        material-transparent={false}
        material-opacity={1}
      >
        REMOLQUES DONATE
      </Text>
    </Billboard>
  );
}

export default function RemolqueIntro() {
  return (
    <div className="w-full h-[420px] mb-6 overflow-hidden bg-[var(--background)]">
      <Canvas camera={{ position: [8, 2, 5], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <Suspense fallback={null}>
          <RemolqueModel />
          <RemolquesDonateText />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
}
