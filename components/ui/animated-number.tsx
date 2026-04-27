"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";

export function AnimatedNumber({
  value,
  format,
  duration = 1.2,
  className,
}: {
  value: number;
  format?: (n: number) => string;
  duration?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) =>
    format ? format(latest) : Math.round(latest).toString()
  );

  React.useEffect(() => {
    if (inView) {
      const controls = animate(motionValue, value, {
        duration,
        ease: [0.32, 0.72, 0, 1],
      });
      return controls.stop;
    }
  }, [inView, value, motionValue, duration]);

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  );
}
