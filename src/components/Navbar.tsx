import { motion } from "framer-motion";

const items = ["Home", "Our Cookies", "Flavors", "Experience", "Order"];

export const Navbar = () => (
  <motion.nav
    initial={{ y: -40, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
    className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
  >
    <div className="glass rounded-full px-2 py-2 flex items-center gap-1 shadow-2xl">
      <div className="px-4 py-1.5 font-display text-gold text-lg">C99</div>
      <div className="hidden md:flex items-center gap-1">
        {items.map((it) => (
          <a
            key={it}
            href="#"
            className="px-4 py-2 text-sm text-cream/80 hover:text-cream rounded-full hover:bg-cream/10 transition-all duration-300"
          >
            {it}
          </a>
        ))}
      </div>
      <button className="ml-1 px-4 py-2 text-sm rounded-full bg-cream text-primary-foreground font-medium hover:scale-105 transition-transform">
        Order
      </button>
    </div>
  </motion.nav>
);
