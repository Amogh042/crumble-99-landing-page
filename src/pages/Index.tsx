import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Features } from "@/components/Features";

const Index = () => (
  <main className="bg-jet min-h-screen overflow-x-hidden">
    <Navbar />
    <Hero />
    <About />
    <Features />
    <footer className="px-6 py-12 text-center text-cream/40 text-sm">
      <p className="font-display text-gold text-2xl mb-2">Crumble 99</p>
      <p>© 2099 — Baked with obsession.</p>
    </footer>
  </main>
);

export default Index;
