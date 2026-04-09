"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/batman2.glb";
const INTRO_DURATION = 1.05;

type ModelSceneProps = {
  onReady?: () => void;
};

function Model({ onReady }: ModelSceneProps) {
  const { scene } = useGLTF(MODEL_PATH, false, false);
  const groupRef = useRef<THREE.Group>(null);
  const readyRef = useRef(false);
  const introProgressRef = useRef(0);
  const { model, scale } = useMemo(() => {
    const clonedScene = scene.clone(true);

    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = false;
        child.receiveShadow = false;
      }
    });

    const box = new THREE.Box3().setFromObject(clonedScene);
    const center = box.getCenter(new THREE.Vector3());
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    const fittedScale = sphere.radius > 0 ? 1.5 / sphere.radius : 1;

    clonedScene.position.sub(center);

    return {
      model: clonedScene,
      scale: fittedScale,
    };
  }, [scene]);

  useEffect(() => {
    if (!readyRef.current) {
      readyRef.current = true;
      onReady?.();
    }
  }, [onReady]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    introProgressRef.current = Math.min(introProgressRef.current + delta / INTRO_DURATION, 1);

    const intro = introProgressRef.current;
    const eased = 1 - Math.pow(1 - intro, 3);
    const idle = Math.sin(state.clock.elapsedTime * 0.9) * 0.018;
    const animatedScale = THREE.MathUtils.lerp(scale * 0.88, scale, eased);

    group.scale.setScalar(animatedScale);
    group.position.y = THREE.MathUtils.lerp(0.28, 0, eased) + idle;
    group.rotation.x = THREE.MathUtils.lerp(-0.14, 0, eased);
    group.rotation.z = THREE.MathUtils.lerp(-0.08, 0, eased);
  });

  return (
    <group ref={groupRef}>
      <primitive object={model} />
    </group>
  );
}

useGLTF.preload(MODEL_PATH, false, false);

function CameraSetup() {
  const { camera } = useThree();

  useEffect(() => {
    // Position camera above and to the side for an isometric-ish view
    camera.position.set(3, 3, 5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
}

export default function ModelScene({ onReady }: ModelSceneProps) {
  return (
    <Canvas
      camera={{ fov: 35, near: 0.1, far: 100 }}
      dpr={[1, 1.15]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      style={{ background: "transparent" }}
    >
      <CameraSetup />
      <ambientLight intensity={0.68} />
      <hemisphereLight intensity={0.92} color="#edf2ff" groundColor="#262d38" />
      <directionalLight position={[5, 8, 5]} intensity={1} />
      <directionalLight position={[-3, 4, -2]} intensity={0.24} color="#7f9cff" />
      <Model onReady={onReady} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.06}
        autoRotate
        autoRotateSpeed={1.05}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.5}
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}
