"use client";

import { Suspense, useEffect, useState } from "react";
import ModelScene from "./ModelScene";
import styles from "./ModelViewer.module.css";

const MODEL_PATH = "/batman2.glb";

function LoadingState({ visible }: { visible: boolean }) {
  return (
    <div
      className={`${styles.overlay} ${visible ? "" : styles.overlayHidden}`}
      aria-hidden={!visible}
    >
      <div className={styles.fallback}>
        <span className={styles.ring} />
        <span className={styles.spark} />
      </div>
    </div>
  );
}

export function ModelViewer() {
  const [shouldRenderScene, setShouldRenderScene] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    const preloadSelector = `link[data-model-preload="${MODEL_PATH}"]`;
    let preloadLink = document.head.querySelector(preloadSelector) as HTMLLinkElement | null;

    if (!preloadLink) {
      preloadLink = document.createElement("link");
      preloadLink.rel = "preload";
      preloadLink.as = "fetch";
      preloadLink.href = MODEL_PATH;
      preloadLink.type = "model/gltf-binary";
      preloadLink.crossOrigin = "anonymous";
      preloadLink.dataset.modelPreload = MODEL_PATH;
      document.head.appendChild(preloadLink);
    }

    void fetch(MODEL_PATH, {
      cache: "force-cache",
      credentials: "same-origin",
    }).catch(() => undefined);

    const frameId = window.requestAnimationFrame(() => {
      setShouldRenderScene(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return (
    <div
      className={`${styles.container} ${sceneReady ? styles.containerLoaded : ""}`}
      aria-busy={!sceneReady}
    >
      <LoadingState visible={!sceneReady} />
      {shouldRenderScene ? (
        <Suspense fallback={null}>
          <ModelScene onReady={() => setSceneReady(true)} />
        </Suspense>
      ) : null}
    </div>
  );
}
