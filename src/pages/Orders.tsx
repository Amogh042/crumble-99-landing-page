import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Cookie as CookieIcon, Truck, ChefHat, Package, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { useCart } from "@/context/CartContext";

const stages = [
  { key: "Processing", label: "Processing", icon: Package },
  { key: "Baking", label: "Baking", icon: ChefHat },
  { key: "Out for Delivery", label: "Out for Delivery", icon: Truck },
  { key: "Delivered", label: "Delivered", icon: CheckCircle2 },
] as const;

const Orders = () => {
  const { orders, add } = useCart();

  if (orders.length === 0) {
    return (
      <PageShell eyebrow="Your Orders" title={<>No orders, <span className="text-gold">yet</span>.</>}>
        <div className="text-center flex flex-col items-center gap-5">
          <div className="w-24 h-24 rounded-full bg-cream/5 flex items-center justify-center">
            <CookieIcon className="w-10 h-10 text-cream/40" />
          </div>
          <p className="text-cream/60 max-w-sm">Place your first order to start your indulgence journey.</p>
          <Link to="/shop" className="px-7 py-3 rounded-full bg-cream text-primary-foreground text-sm font-medium hover:scale-105 transition-transform">
            Order Cookies
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell eyebrow="Your Orders" title={<>The <span className="text-gold">history</span> of your cravings.</>}>
      <div className="space-y-6">
        {orders.map((o, i) => {
          const stageIdx = stages.findIndex((s) => s.key === o.status);
          return (
            <motion.article
              key={o.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-3xl p-6 md:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-[10px] tracking-[0.4em] text-gold uppercase mb-1">Order {o.id}</p>
                  <p className="font-display text-cream text-2xl">{new Date(o.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                  <p className="text-cream/50 text-xs mt-1">ETA: {new Date(o.estimatedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</p>
                </div>
                <span className="px-4 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs tracking-widest uppercase">{o.status}</span>
              </div>

              {/* Timeline */}
              <div className="relative mb-6">
                <div className="absolute top-5 left-5 right-5 h-px bg-cream/10" />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(stageIdx / (stages.length - 1)) * 100}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute top-5 left-5 h-px bg-gold"
                  style={{ maxWidth: "calc(100% - 2.5rem)" }}
                />
                <div className="relative grid grid-cols-4 gap-2">
                  {stages.map((s, si) => {
                    const done = si <= stageIdx;
                    return (
                      <div key={s.key} className="flex flex-col items-center text-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${done ? "bg-gold border-gold text-jet" : "bg-jet border-cream/20 text-cream/40"}`}>
                          <s.icon className="w-4 h-4" />
                        </div>
                        <span className={`text-[10px] tracking-wider uppercase mt-2 ${done ? "text-cream" : "text-cream/40"}`}>{s.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid md:grid-cols-[1fr_auto] gap-5 items-end">
                <div className="flex gap-3 flex-wrap">
                  {o.items.map((it) => (
                    <div key={it.id} className="flex items-center gap-3 glass rounded-2xl p-2 pr-4">
                      <img src={it.image} alt={it.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <p className="text-cream text-sm">{it.name}</p>
                        <p className="text-cream/40 text-xs">× {it.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-cream/50 text-xs">Total</p>
                    <p className="font-display text-gold text-3xl">₹{o.total}</p>
                  </div>
                  <button
                    onClick={() => o.items.forEach((it) => add(it.id, it.qty))}
                    className="px-5 py-2.5 rounded-full bg-cream/10 hover:bg-cream/20 text-cream text-xs tracking-widest uppercase transition-colors"
                  >
                    Reorder
                  </button>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </PageShell>
  );
};

export default Orders;
