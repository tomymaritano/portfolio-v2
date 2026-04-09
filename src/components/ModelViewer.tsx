"use client";

import { Suspense, lazy, startTransition, useEffect, useState } from "react";
import styles from "./ModelViewer.module.css";

const MODEL_PATH = "/3dmodel.glb";
const loadScene = () => import("./ModelScene");
const Scene = lazy(loadScene);

function LoadingState({ loaded }: { loaded: boolean }) {
  return (
    <div
      className={`${styles.overlay} ${loaded ? styles.overlayHidden : ""}`}
      aria-hidden={loaded}
    >
      <div className={styles.fallback}>
        <div className={styles.grid} />
        <div className={styles.glow} />
        <div className={styles.spinner} />
        <p className={styles.caption}>Loading 3D preview</p>
      </div>
    </div>
  );
}

export function ModelViewer() {
  const [shouldRenderScene, setShouldRenderScene] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      void loadScene();
      startTransition(() => setShouldRenderScene(true));
    });

    const preloadSelector = `link[rel="preload"][href="${MODEL_PATH}"]`;
    let preloadLink = document.head.querySelector(preloadSelector) as HTMLLinkElement | null;

    if (!preloadLink) {
      preloadLink = document.createElement("link");
      preloadLink.rel = "preload";
      preloadLink.as = "fetch";
      preloadLink.href = MODEL_PATH;
      preloadLink.type = "model/gltf-binary";
      preloadLink.crossOrigin = "anonymous";
      document.head.appendChild(preloadLink);
    }

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return (
    <div
      className={`${styles.container} ${sceneReady ? styles.containerLoaded : ""}`}
      aria-busy={!sceneReady}
    >
      <LoadingState loaded={sceneReady} />
      {shouldRenderScene ? (
        <Suspense fallback={null}>
          <Scene onReady={() => setSceneReady(true)} />
        </Suspense>
      ) : null}
    </div>
  );
}
