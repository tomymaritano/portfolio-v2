"use client";

import { Suspense, lazy, useState, useEffect } from "react";
import styles from "./ModelViewer.module.css";

const Scene = lazy(() => import("./ModelScene"));

export function ModelViewer() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Defer 3D load until after the main content has painted
    requestIdleCallback?.(() => setReady(true)) ??
      setTimeout(() => setReady(true), 100);
  }, []);

  if (!ready) return null;

  return (
    <div className={styles.container}>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </div>
  );
}
