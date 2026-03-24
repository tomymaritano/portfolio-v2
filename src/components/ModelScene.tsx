"use client";

import { useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, Center, Bounds } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/3dmodel.glb";

function Model() {
  const { scene } = useGLTF(MODEL_PATH);
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    // Center the model at origin based on its bounding box
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);
  }, [scene]);

  return (
    <group ref={ref}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(MODEL_PATH);

function CameraSetup() {
  const { camera } = useThree();

  useEffect(() => {
    // Position camera above and to the side for an isometric-ish view
    camera.position.set(3, 3, 5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
}

export default function ModelScene() {
  return (
    <Canvas
      camera={{ fov: 35, near: 0.1, far: 100 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <CameraSetup />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <directionalLight position={[-3, 4, -2]} intensity={0.4} />
      <Bounds fit clip observe margin={1.4}>
        <Center>
          <Model />
        </Center>
      </Bounds>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.5}
        target={[0, 0, 0]}
      />
      <Environment preset="city" />
    </Canvas>
  );
}
