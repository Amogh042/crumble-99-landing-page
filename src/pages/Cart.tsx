import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { PageShell } from "@/components/PageShell";
import { findCookie, useCart } from "@/context/CartContext";

const Cart = () => {
  const { items, setQty, remove, subtotal, delivery, tax, total } = useCart();

  if (items.length === 0) {
    return (
      <PageShell eyebrow="The Cart" title={<>An <span className="text-gold">empty</span> tin.</>}>
        <div className="flex flex-col items-center text-center gap-5 py-10">
          <div className="w-24 h-24 rounded-full bg-cream/5 flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-cream/40" />
          </div>
          <p className="text-cream/60 max-w-sm">Your cart is waiting to be filled with something extraordinary.</p>
          <Link to="/shop" className="px-7 py-3 rounded-full bg-cream text-primary-foreground text-sm font-medium hover:scale-105 transition-transform">
            Discover Cookies
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell eyebrow="The Cart" title={<>Your <span className="text-gold">selection</span>.</>}>
      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="space-y-4">
          {items.map((it, i) => {
            const c = findCookie(it.id)!;
            return (
              <motion.div
                key={it.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="glass rounded-3xl p-5 flex gap-5 items-center"
              >
                <Link to={`/shop/${c.id}`} className="shrink-0">
                  <img src={c.image} alt={c.name} className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/shop/${c.id}`} className="block">
                    <h3 className="font-display text-cream text-xl md:text-2xl">{c.name}</h3>
                  </Link>
                  <p className="text-cream/50 text-xs mb-3 line-clamp-1">{c.tagline}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-cream/5 border border-cream/10">
                      <button onClick={() => setQty(it.id, it.qty - 1)} className="w-7 h-7 rounded-full bg-cream/10 hover:bg-cream/20 text-cream flex items-center justify-center"><Minus className="w-3 h-3" /></button>
                      <span className="text-cream w-6 text-center text-sm">{it.qty}</span>
                      <button onClick={() => setQty(it.id, it.qty + 1)} className="w-7 h-7 rounded-full bg-cream/10 hover:bg-cream/20 text-cream flex items-center justify-center"><Plus className="w-3 h-3" /></button>
                    </div>
                    <button onClick={() => remove(it.id)} className="text-cream/50 hover:text-destructive text-xs flex items-center gap-1.5"><Trash2 className="w-3 h-3" />Remove</button>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-display text-gold text-2xl">₹{c.price * it.qty}</p>
                  <p className="text-cream/40 text-xs">₹{c.price} each</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <aside className="glass rounded-3xl p-6 h-fit lg:sticky lg:top-28 space-y-4">
          <p className="text-[10px] tracking-[0.4em] text-gold uppercase">Order Summary</p>
          <Row label="Subtotal" value={`₹${subtotal}`} />
          <Row label="Delivery" value={delivery === 0 ? "Free" : `₹${delivery}`} />
          <Row label="GST (5%)" value={`₹${tax}`} />
          <div className="h-px bg-cream/10" />
          <div className="flex items-baseline justify-between">
            <span className="text-cream/70 text-sm">Total</span>
            <span className="font-display text-gold text-4xl">₹{total}</span>
          </div>
          <Link to="/checkout" className="block text-center w-full px-6 py-3.5 rounded-full bg-cream text-primary-foreground text-sm font-medium hover:scale-[1.02] transition-transform">
            Checkout
          </Link>
          <Link to="/shop" className="block text-center w-full text-cream/60 hover:text-cream text-xs tracking-widest uppercase">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </PageShell>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-sm"><span className="text-cream/60">{label}</span><span className="text-cream">{value}</span></div>
);

export default Cart;
