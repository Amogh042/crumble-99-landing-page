import { ReactNode } from "react";
import { motion } from "framer-motion";

export const PageShell = ({
  eyebrow, title, lede, children,
}: { eyebrow?: string; title: ReactNode; lede?: string; children: ReactNode }) => (
  <main className="bg-jet min-h-screen overflow-x-hidden pt-28 pb-24">
    <div className="px-6 md:px-12 max-w-7xl mx-auto">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14"
      >
        {eyebrow && <p className="text-[10px] tracking-[0.5em] text-gold uppercase mb-4">{eyebrow}</p>}
        <h1 className="font-display text-cream text-5xl md:text-7xl leading-[0.95]">{title}</h1>
        {lede && <p className="text-cream/60 mt-5 max-w-xl mx-auto">{lede}</p>}
      </motion.header>
      {children}
    </div>
  </main>
);
