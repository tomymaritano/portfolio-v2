import styles from "./Skeleton.module.css";

interface SkeletonProps {
  variant?: "text" | "card" | "avatar" | "image" | "title" | "button";
  width?: string;
  height?: string;
  className?: string;
}

export function Skeleton({
  variant = "text",
  width,
  height,
  className
}: SkeletonProps) {
  return (
    <div
      className={`${styles.skeleton} ${styles[variant]} ${className || ""}`}
      style={{ width, height }}
    />
  );
}

// Pre-built skeleton layouts
export function CardSkeleton() {
  return (
    <div className={styles.cardSkeleton}>
      <Skeleton variant="image" />
      <div className={styles.cardContent}>
        <Skeleton variant="text" width="30%" />
        <Skeleton variant="title" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="80%" />
        <div className={styles.cardTags}>
          <Skeleton variant="button" width="60px" />
          <Skeleton variant="button" width="80px" />
          <Skeleton variant="button" width="50px" />
        </div>
      </div>
    </div>
  );
}

export function PostSkeleton() {
  return (
    <div className={styles.postSkeleton}>
      <Skeleton variant="text" width="100px" />
      <Skeleton variant="title" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="60%" />
    </div>
  );
}
