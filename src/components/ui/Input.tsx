import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import styles from "./Input.module.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, icon, ...props }, ref) => {
    return (
      <div className={cn(styles.wrapper, error && styles.error, className)}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input
          ref={ref}
          className={cn(styles.input, !!icon && styles.withIcon)}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
