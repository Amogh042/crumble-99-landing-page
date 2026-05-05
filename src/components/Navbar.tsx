import { motion } from "framer-motion";

const items = ["Home", "Our Cookies", "Flavors", "Experience", "Order"];

export const Navbar = () => (
  <motion.nav
    initial={{ y: -40, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
    className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
  >
    <div className="glass rounded-full pl-2 pr-2 py-2 flex items-center gap-1 shadow-2xl pointer-events-auto max-w-[calc(100vw-2rem)]">
      <div className="px-3 py-1.5 font-display text-gold text-lg shrink-0">C99</div>
      <div className="hidden md:flex items-center gap-0.5">
        {items.map((it) => (
          <a
            key={it}
            href="#"
            className="px-3 py-1.5 text-xs lg:text-sm text-cream/80 hover:text-cream rounded-full hover:bg-cream/10 transition-all duration-300 whitespace-nowrap"
          >
            {it}
          </a>
        ))}
      </div>
      <button className="ml-1 px-4 py-1.5 text-xs lg:text-sm rounded-full bg-cream text-primary-foreground font-medium hover:scale-105 transition-transform shrink-0">
        Order
      </button>
    </div>
  </motion.nav>
);
