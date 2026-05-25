import { motion } from "framer-motion";
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, ShoppingBag, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { useCart } from "@/context/CartContext";

const items = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Orders", to: "/orders" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const Navbar = () => {
  const { count, openDrawer } = useCart();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
    >
      <div className="glass rounded-full pl-3 pr-2 py-2 flex items-center gap-2 shadow-2xl pointer-events-auto max-w-[calc(100vw-2rem)]">
        <Link to="/" className="shrink-0">
          <img src={logo} alt="Crumble 99" className="h-9 w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" />
        </Link>
        <div className="hidden md:flex items-center gap-0.5 ml-1">
          {items.map((it) => {
            const active = it.to === "/" ? location.pathname === "/" : location.pathname.startsWith(it.to);
            return (
              <NavLink
                key={it.to}
                to={it.to}
                className={`relative px-3 py-1.5 text-xs lg:text-sm rounded-full transition-all duration-300 whitespace-nowrap ${
                  active ? "text-cream bg-cream/10" : "text-cream/70 hover:text-cream hover:bg-cream/5"
                }`}
              >
                {it.label}
                {active && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold"
                  />
                )}
              </NavLink>
            );
          })}
        </div>
        <button
          onClick={openDrawer}
          aria-label="Open cart"
          className="relative ml-1 w-9 h-9 rounded-full bg-cream/10 hover:bg-cream/20 text-cream flex items-center justify-center transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          {count > 0 && (
            <motion.span
              key={count}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-gold text-jet text-[10px] font-bold flex items-center justify-center"
            >
              {count}
            </motion.span>
          )}
        </button>
        <Link
          to="/shop"
          className="hidden sm:inline-block px-4 py-1.5 text-xs lg:text-sm rounded-full bg-cream text-primary-foreground font-medium hover:scale-105 transition-transform shrink-0"
        >
          Order
        </Link>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="md:hidden w-9 h-9 rounded-full bg-cream/10 text-cream flex items-center justify-center"
        >
          {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden fixed top-20 inset-x-4 glass rounded-3xl p-3 flex flex-col gap-1 pointer-events-auto"
        >
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 text-sm rounded-2xl transition-colors ${
                  isActive ? "bg-cream/10 text-cream" : "text-cream/70 hover:bg-cream/5"
                }`
              }
            >
              {it.label}
            </NavLink>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};
