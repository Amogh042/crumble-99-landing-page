import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, Star } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { SpiralShowcase } from "@/components/SpiralShowcase";
import { cookies, tagOptions, Tag } from "@/data/cookies";
import { useCart } from "@/context/CartContext";

const Shop = () => {
  const [q, setQ] = useState("");
  const [active, setActive] = useState<Tag | "All">("All");
  const { add } = useCart();

  const filtered = useMemo(() => {
    return cookies.filter((c) => {
      const matchesQ = q.trim() === "" || (c.name + c.description + c.tagline).toLowerCase().includes(q.toLowerCase());
      const matchesT = active === "All" || c.tags.includes(active);
      return matchesQ && matchesT;
    });
  }, [q, active]);

  return (
    <PageShell
      eyebrow="The Atelier"
      title={<>Our <span className="text-gold">Cookies</span></>}
      lede="Fifteen small obsessions. Drag the spiral, lose yourself, then pick your favourite."
    >
      <SpiralShowcase cookies={cookies} />

      {/* Filter bar */}
      <div className="mt-20 mb-10 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search cookies, flavours, moods…"
            className="w-full pl-11 pr-4 py-3 rounded-full bg-cream/5 border border-cream/10 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold/50 transition-colors text-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["All", ...tagOptions] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActive(t as any)}
              className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all ${
                active === t ? "bg-gold text-jet" : "bg-cream/5 text-cream/70 hover:text-cream hover:bg-cream/10"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((c, i) => (
          <motion.div
            key={c.id}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.6 }}
            className="group glass rounded-3xl overflow-hidden hover:shadow-[0_30px_80px_-20px_hsl(var(--gold)/0.3)] transition-shadow duration-500"
          >
            <Link to={`/shop/${c.id}`} className="block relative aspect-[4/3] overflow-hidden">
              <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1500ms] ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-jet via-jet/30 to-transparent" />
              <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                {c.tags.slice(0, 2).map((t) => (
                  <span key={t} className="px-2 py-0.5 text-[9px] tracking-widest uppercase rounded-full bg-jet/60 backdrop-blur text-gold border border-gold/20">{t}</span>
                ))}
              </div>
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-cream text-jet text-xs font-bold">₹{c.price}</div>
            </Link>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3 mb-1">
                <h3 className="font-display text-cream text-xl leading-tight">{c.name}</h3>
                <span className="flex items-center gap-1 text-xs text-cream/60 shrink-0 mt-1"><Star className="w-3 h-3 fill-gold text-gold" />{c.rating}</span>
              </div>
              <p className="text-cream/50 text-xs mb-4 line-clamp-2">{c.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => add(c.id)}
                  className="flex-1 px-3 py-2 rounded-full bg-cream/10 hover:bg-cream/20 text-cream text-xs font-medium transition-colors"
                >
                  Add to Cart
                </button>
                <Link
                  to={`/shop/${c.id}`}
                  className="flex-1 text-center px-3 py-2 rounded-full bg-cream text-primary-foreground text-xs font-medium hover:scale-105 transition-transform"
                >
                  Order Now
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center text-cream/40 py-16">No cookies match that craving.</p>
      )}
    </PageShell>
  );
};

export default Shop;
