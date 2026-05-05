import { motion } from "framer-motion";
import { WordsPullUpMultiStyle } from "./WordsPullUp";
import { ScrollReveal } from "./ScrollReveal";

export const About = () => (
  <section className="px-3 md:px-6 py-20">
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1 }}
      className="relative rounded-3xl overflow-hidden p-10 md:p-24"
      style={{ background: "hsl(0 0% 7%)" }}
    >
      <div className="absolute inset-0 noise opacity-10 pointer-events-none" />
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "hsl(var(--gold))" }}
      />

      <div className="relative max-w-4xl mx-auto text-center space-y-10">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-cream">
          <WordsPullUpMultiStyle
            parts={[
              { text: "We don't just bake cookies —" },
              { text: "we craft", className: "text-cream" },
              { text: "experiences.", className: "font-display text-gold" },
            ]}
          />
        </h2>
        <ScrollReveal
          text="From rich chocolate chunks to perfectly golden edges, every cookie is handcrafted using premium ingredients and baked to perfection."
          className="text-lg md:text-xl text-cream/70 leading-relaxed max-w-2xl mx-auto"
        />
      </div>
    </motion.div>
  </section>
);
