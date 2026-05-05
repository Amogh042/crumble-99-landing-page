import { motion } from "framer-motion";
import { useMemo } from "react";

export const Crumbs = ({ count = 14 }: { count?: number }) => {
  const crumbs = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: 2 + Math.random() * 5,
        d: 6 + Math.random() * 10,
        delay: Math.random() * 4,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {crumbs.map((c, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: c.s,
            height: c.s,
            background: `hsl(var(--gold) / 0.7)`,
            boxShadow: `0 0 ${c.s * 2}px hsl(var(--gold) / 0.5)`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 1, 0.2] }}
          transition={{ duration: c.d, delay: c.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};
