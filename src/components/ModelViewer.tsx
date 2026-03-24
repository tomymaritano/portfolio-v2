"use client";

import { Suspense, lazy } from "react";
import styles from "./ModelViewer.module.css";

const Scene = lazy(() => import("./ModelScene"));

function Fallback() {
  return (
    <div className={styles.fallback}>
      <div className={styles.spinner} />
    </div>
  );
}

export function ModelViewer() {
  return (
    <div className={styles.container}>
      <Suspense fallback={<Fallback />}>
        <Scene />
      </Suspense>
    </div>
  );
}
