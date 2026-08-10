"use client";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, MotionValue, useMotionValue, useSpring, useTransform } from "motion/react";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  magnification?: number;
  distance?: number;
  children: React.ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
  "mx-auto w-max h-full p-2 flex items-end rounded-full border"
);

// Create context to pass mouse position and config to DockIcon children
interface DockContextValue {
  mouseX: MotionValue<number>;
  magnification: number;
  distance: number;
}

const DockContext = createContext<DockContextValue | null>(null);

const useDock = () => {
  const context = useContext(DockContext);
  if (!context) {
    throw new Error("DockIcon must be used within a Dock component");
  }
  return context;
};

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(Infinity);

    // Magnification is a mouse-proximity effect: it only makes sense on
    // devices with a real hover-capable pointer. On touch, the same tap
    // that triggers navigation would also fire a synthetic mousemove with
    // no matching mouseleave, leaving the icon magnified indefinitely.
    const [canHover, setCanHover] = useState(false);

    useEffect(() => {
      const query = window.matchMedia("(hover: hover) and (pointer: fine)");
      setCanHover(query.matches);
      const handleChange = (e: MediaQueryListEvent) => {
        setCanHover(e.matches);
        if (!e.matches) mouseX.set(Infinity);
      };
      query.addEventListener("change", handleChange);
      return () => query.removeEventListener("change", handleChange);
    }, [mouseX]);

    return (
      <DockContext.Provider value={{ mouseX, magnification, distance }}>
        <motion.div
          ref={ref}
          onMouseMove={(e) => canHover && mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          {...props}
          className={cn(dockVariants({ className }))}
        >
          {children}
        </motion.div>
      </DockContext.Provider>
    );
  }
);

Dock.displayName = "Dock";

export interface DockIconProps {
  size?: number;
  className?: string;
  children?: React.ReactNode;
}

const DockIcon = ({
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { mouseX, magnification, distance } = useDock();

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  let width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };
