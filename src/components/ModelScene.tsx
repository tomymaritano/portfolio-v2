"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/3dmodel.glb";

type ModelSceneProps = {
  onReady?: () => void;
};

function Model({ onReady }: ModelSceneProps) {
  const { scene } = useGLTF(MODEL_PATH, false, false);
  const groupRef = useRef<THREE.Group>(null);
  const readyRef = useRef(false);
  const introProgressRef = useRef(0);
  const { invalidate } = useThree();
  const model = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = false;
        child.receiveShadow = false;
      }
    });

    if (!readyRef.current) {
      readyRef.current = true;
      onReady?.();
    }

    invalidate();
  }, [invalidate, model, onReady]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    introProgressRef.current = Math.min(introProgressRef.current + delta / 1.1, 1);

    const intro = introProgressRef.current;
    const eased = 1 - (1 - intro) * (1 - intro);
    const idle = Math.sin(intro * Math.PI) * 0.06;
    const scale = THREE.MathUtils.lerp(0.72, 1, eased);

    group.scale.setScalar(scale);
    group.position.y = THREE.MathUtils.lerp(0.45, 0, eased) + idle;
    group.rotation.x = THREE.MathUtils.lerp(-0.35, -0.08, eased);
    group.rotation.y = THREE.MathUtils.lerp(-0.85, 0.2, eased);

    if (intro < 1) {
      invalidate();
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={model} />
      </Center>
    </group>
  );
}

useGLTF.preload(MODEL_PATH, false, false);

export default function ModelScene({ onReady }: ModelSceneProps) {
  return (
    <Canvas
      camera={{ fov: 32, near: 0.1, far: 100, position: [0, 0.35, 5.5] }}
      dpr={[1, 1.25]}
      frameloop="demand"
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <hemisphereLight intensity={1.1} color="#f5f7ff" groundColor="#253040" />
      <directionalLight position={[5, 6, 4]} intensity={1.35} color="#ffffff" />
      <directionalLight position={[-4, -2, 3]} intensity={0.25} color="#8fb3ff" />
      <Model onReady={onReady} />
    </Canvas>
  );
}
