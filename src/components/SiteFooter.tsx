import { Link } from "react-router-dom";
import { Instagram, Mail } from "lucide-react";

export const SiteFooter = () => (
  <footer className="bg-jet border-t border-cream/5 px-6 md:px-12 py-16">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
      <div className="md:col-span-2">
        <p className="font-display text-gold text-4xl mb-3">Crumble 99</p>
        <p className="text-cream/50 text-sm max-w-sm leading-relaxed">
          A small atelier of cookie-makers, baking obsessively in Mumbai since 2026.
        </p>
      </div>
      <div>
        <p className="text-[10px] tracking-[0.4em] text-gold uppercase mb-4">Explore</p>
        <ul className="space-y-2 text-sm">
          {[["/shop", "Shop"], ["/orders", "Orders"], ["/about", "About"], ["/contact", "Contact"]].map(([to, l]) => (
            <li key={to}><Link to={to} className="text-cream/60 hover:text-cream transition-colors">{l}</Link></li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-[10px] tracking-[0.4em] text-gold uppercase mb-4">Reach</p>
        <ul className="space-y-2 text-sm">
          <li><a href="mailto:hello@crumble99.com" className="text-cream/60 hover:text-cream transition-colors inline-flex items-center gap-2"><Mail className="w-3.5 h-3.5" />hello@crumble99.com</a></li>
          <li><a href="#" className="text-cream/60 hover:text-cream transition-colors inline-flex items-center gap-2"><Instagram className="w-3.5 h-3.5" />@crumble99</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-cream/5 flex flex-col md:flex-row items-center justify-between gap-3 text-cream/40 text-xs">
      <p>© 2026 Crumble 99 — Baked with obsession.</p>
      <p className="tracking-widest uppercase">Mumbai · Made small. Shipped lovingly.</p>
    </div>
  </footer>
);
