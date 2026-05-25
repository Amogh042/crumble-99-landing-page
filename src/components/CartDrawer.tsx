import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart, findCookie } from "@/context/CartContext";

export const CartDrawer = () => {
  const { drawerOpen, closeDrawer, items, setQty, remove, subtotal, delivery, tax, total } = useCart();

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-jet/70 backdrop-blur-sm z-[60]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[440px] z-[70] bg-jet border-l border-cream/10 flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-cream/10">
              <div>
                <p className="text-[10px] tracking-[0.4em] text-gold uppercase">Your Selection</p>
                <h2 className="font-display text-cream text-2xl">The Cart</h2>
              </div>
              <button onClick={closeDrawer} className="w-9 h-9 rounded-full bg-cream/10 hover:bg-cream/20 text-cream flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-6 gap-4">
                <div className="w-20 h-20 rounded-full bg-cream/5 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-cream/40" />
                </div>
                <div>
                  <p className="text-cream font-display text-2xl mb-1">Your cart is empty</p>
                  <p className="text-cream/50 text-sm">A little indulgence is one click away.</p>
                </div>
                <Link
                  to="/shop"
                  onClick={closeDrawer}
                  className="mt-2 px-6 py-2.5 rounded-full bg-cream text-primary-foreground text-sm font-medium hover:scale-105 transition-transform"
                >
                  Browse Cookies
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                  {items.map((it) => {
                    const c = findCookie(it.id);
                    if (!c) return null;
                    return (
                      <motion.div
                        key={it.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        className="flex gap-3 p-3 glass rounded-2xl"
                      >
                        <img src={c.image} alt={c.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-cream text-sm font-medium truncate">{c.name}</p>
                          <p className="text-gold text-xs mb-2">₹{c.price}</p>
                          <div className="flex items-center gap-2">
                            <button onClick={() => setQty(it.id, it.qty - 1)} className="w-6 h-6 rounded-full bg-cream/10 hover:bg-cream/20 text-cream flex items-center justify-center"><Minus className="w-3 h-3" /></button>
                            <span className="text-cream text-sm w-6 text-center">{it.qty}</span>
                            <button onClick={() => setQty(it.id, it.qty + 1)} className="w-6 h-6 rounded-full bg-cream/10 hover:bg-cream/20 text-cream flex items-center justify-center"><Plus className="w-3 h-3" /></button>
                            <button onClick={() => remove(it.id)} className="ml-auto w-6 h-6 rounded-full text-cream/50 hover:text-cream flex items-center justify-center"><Trash2 className="w-3 h-3" /></button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="border-t border-cream/10 px-6 py-5 space-y-3">
                  <Row label="Subtotal" value={`₹${subtotal}`} />
                  <Row label="Delivery" value={delivery === 0 ? "Free" : `₹${delivery}`} />
                  <Row label="GST (5%)" value={`₹${tax}`} />
                  <div className="h-px bg-cream/10 my-2" />
                  <div className="flex items-baseline justify-between">
                    <span className="text-cream/70 text-sm">Total</span>
                    <span className="font-display text-gold text-3xl">₹{total}</span>
                  </div>
                  <Link
                    to="/checkout"
                    onClick={closeDrawer}
                    className="block text-center w-full px-6 py-3 rounded-full bg-cream text-primary-foreground text-sm font-medium hover:scale-[1.02] transition-transform mt-2"
                  >
                    Proceed to Checkout
                  </Link>
                  <button
                    onClick={closeDrawer}
                    className="block text-center w-full text-cream/60 hover:text-cream text-xs tracking-widest uppercase pt-1"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-cream/60">{label}</span>
    <span className="text-cream">{value}</span>
  </div>
);
