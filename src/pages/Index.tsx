import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Features } from "@/components/Features";
import { SpiralShowcase } from "@/components/SpiralShowcase";
import { cookies } from "@/data/cookies";

const Index = () => (
  <main className="bg-jet min-h-screen overflow-x-hidden">
    <Hero />

    {/* Spiral teaser */}
    <section className="relative px-3 md:px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <p className="text-[10px] tracking-[0.5em] text-gold uppercase mb-3">The Atelier</p>
        <h2 className="font-display text-cream text-4xl md:text-6xl lg:text-7xl leading-[0.95]">
          Fifteen <span className="text-gold">small</span> obsessions.
        </h2>
        <p className="text-cream/50 mt-4 max-w-md mx-auto text-sm">Drag the spiral. Pull it. Let it spin. Find the one that makes you stop.</p>
      </motion.div>
      <SpiralShowcase cookies={cookies} />
      <div className="text-center mt-8">
        <Link
          to="/shop"
          className="inline-block px-7 py-3 rounded-full bg-cream text-primary-foreground text-sm font-medium hover:scale-105 transition-transform"
        >
          Explore All Cookies
        </Link>
      </div>
    </section>

    <About />
    <Features />
  </main>
);

export default Index;
