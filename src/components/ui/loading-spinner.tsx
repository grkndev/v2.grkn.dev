import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export function LoadingSpinner({
  className,
  size = 24,
  strokeWidth = 2,
}: LoadingSpinnerProps) {
  return (
    <Loader2
      className={cn("animate-spin text-primary", className)}
      size={size}
      strokeWidth={strokeWidth}
    />
  );
} 