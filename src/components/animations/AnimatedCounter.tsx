'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  delay?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function AnimatedCounter({
  from = 0,
  to,
  delay = 0,
  className,
  suffix = '',
  prefix = '',
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        motionValue.set(to);
      }, delay * 1000);

      return () => clearTimeout(timeout);
    }
  }, [isInView, to, delay, motionValue]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>
        {springValue.get().toFixed(0)}
      </motion.span>
      {suffix}
    </span>
  );
}
