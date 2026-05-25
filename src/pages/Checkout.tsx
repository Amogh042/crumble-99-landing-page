import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, CreditCard, Smartphone, Wallet } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { useCart } from "@/context/CartContext";

const Checkout = () => {
  const { items, subtotal, delivery, tax, total, placeOrder } = useCart();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [pay, setPay] = useState("card");
  const [promo, setPromo] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const nav = useNavigate();

  if (items.length === 0 && !success) {
    return (
      <PageShell eyebrow="Checkout" title="Nothing to check out.">
        <div className="text-center">
          <Link to="/shop" className="px-7 py-3 rounded-full bg-cream text-primary-foreground text-sm font-medium hover:scale-105 transition-transform inline-block">
            Browse Cookies
          </Link>
        </div>
      </PageShell>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const o = placeOrder(form);
    setSuccess(o.id);
    setTimeout(() => nav("/orders"), 2400);
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  return (
    <PageShell eyebrow="The Final Step" title={<>The <span className="text-gold">checkout</span>.</>}>
      <form onSubmit={submit} className="grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="space-y-8">
          <Section title="Customer">
            <div className="grid sm:grid-cols-2 gap-3">
              <Input label="Full name" value={form.name} onChange={set("name")} required />
              <Input label="Email" type="email" value={form.email} onChange={set("email")} required />
              <Input label="Phone" type="tel" value={form.phone} onChange={set("phone")} required />
            </div>
          </Section>

          <Section title="Delivery address">
            <TextArea label="Address, city, pincode" value={form.address} onChange={set("address")} required rows={3} />
          </Section>

          <Section title="Payment">
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { id: "card", label: "Card", icon: CreditCard },
                { id: "upi", label: "UPI", icon: Smartphone },
                { id: "cod", label: "Cash on Delivery", icon: Wallet },
              ].map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setPay(m.id)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    pay === m.id ? "border-gold bg-gold/10" : "border-cream/10 bg-cream/5 hover:bg-cream/10"
                  }`}
                >
                  <m.icon className={`w-5 h-5 mb-2 ${pay === m.id ? "text-gold" : "text-cream/60"}`} />
                  <p className="text-cream text-sm">{m.label}</p>
                </button>
              ))}
            </div>
            {pay === "card" && (
              <div className="grid sm:grid-cols-2 gap-3 mt-3">
                <Input label="Card number" placeholder="•••• •••• •••• ••••" />
                <Input label="Name on card" />
                <Input label="Expiry" placeholder="MM/YY" />
                <Input label="CVV" placeholder="•••" />
              </div>
            )}
          </Section>
        </div>

        <aside className="glass rounded-3xl p-6 h-fit lg:sticky lg:top-28 space-y-3">
          <p className="text-[10px] tracking-[0.4em] text-gold uppercase">Order Summary</p>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {items.map((it) => (
              <div key={it.id} className="flex justify-between text-sm text-cream/70">
                <span className="truncate pr-2">× {it.qty}  ·  {it.id}</span>
              </div>
            ))}
          </div>
          <div className="h-px bg-cream/10" />
          <div className="flex gap-2">
            <input
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              placeholder="Promo code"
              className="flex-1 px-3 py-2 rounded-full bg-cream/5 border border-cream/10 text-cream text-xs placeholder:text-cream/40 focus:outline-none focus:border-gold/50"
            />
            <button type="button" className="px-3 py-2 rounded-full bg-cream/10 hover:bg-cream/20 text-cream text-xs">Apply</button>
          </div>
          <div className="space-y-1.5 pt-2">
            <Row label="Subtotal" value={`₹${subtotal}`} />
            <Row label="Delivery" value={delivery === 0 ? "Free" : `₹${delivery}`} />
            <Row label="GST" value={`₹${tax}`} />
          </div>
          <div className="h-px bg-cream/10" />
          <div className="flex items-baseline justify-between">
            <span className="text-cream/70 text-sm">Total</span>
            <span className="font-display text-gold text-4xl">₹{total}</span>
          </div>
          <button type="submit" className="block text-center w-full px-6 py-3.5 rounded-full bg-cream text-primary-foreground text-sm font-medium hover:scale-[1.02] transition-transform">
            Place Order
          </button>
        </aside>
      </form>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-jet/85 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="glass rounded-3xl p-10 text-center max-w-md"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 220 }}
                className="w-20 h-20 rounded-full bg-gold/20 border border-gold flex items-center justify-center mx-auto mb-5"
              >
                <Check className="w-10 h-10 text-gold" />
              </motion.div>
              <p className="text-[10px] tracking-[0.5em] text-gold uppercase mb-3">Confirmed</p>
              <h2 className="font-display text-cream text-4xl mb-2">Thank you.</h2>
              <p className="text-cream/60 text-sm mb-1">Your order <span className="text-cream">{success}</span> is in the oven.</p>
              <p className="text-cream/40 text-xs">Redirecting to your orders…</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="glass rounded-3xl p-6">
    <p className="text-[10px] tracking-[0.4em] text-gold uppercase mb-4">{title}</p>
    {children}
  </div>
);

const Input = ({ label, ...p }: any) => (
  <label className="block">
    <span className="text-cream/60 text-xs tracking-wider uppercase block mb-1.5">{label}</span>
    <input {...p} className="w-full px-4 py-2.5 rounded-2xl bg-cream/5 border border-cream/10 text-cream placeholder:text-cream/30 text-sm focus:outline-none focus:border-gold/50 transition-colors" />
  </label>
);

const TextArea = ({ label, ...p }: any) => (
  <label className="block">
    <span className="text-cream/60 text-xs tracking-wider uppercase block mb-1.5">{label}</span>
    <textarea {...p} className="w-full px-4 py-2.5 rounded-2xl bg-cream/5 border border-cream/10 text-cream placeholder:text-cream/30 text-sm focus:outline-none focus:border-gold/50 transition-colors resize-none" />
  </label>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-sm"><span className="text-cream/60">{label}</span><span className="text-cream">{value}</span></div>
);

export default Checkout;
