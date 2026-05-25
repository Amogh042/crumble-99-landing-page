import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, Star } from "lucide-react";
import { findCookie, useCart } from "@/context/CartContext";
import { cookies } from "@/data/cookies";

const reviews = [
  { name: "Aanya R.", text: "I've never tasted anything like this. The molten centre is unreal.", rating: 5 },
  { name: "Vikram S.", text: "Worth every rupee. Packaging alone made my week.", rating: 5 },
  { name: "Mira K.", text: "Bought as a gift. Got asked where to buy more, twice.", rating: 5 },
];

const ProductDetail = () => {
  const { id } = useParams();
  const cookie = findCookie(id || "");
  const { add } = useCart();
  const nav = useNavigate();
  const [qty, setQty] = useState(1);

  if (!cookie) {
    return (
      <main className="bg-jet min-h-screen flex items-center justify-center px-6 text-center">
        <div>
          <p className="font-display text-cream text-3xl mb-3">Cookie not found</p>
          <Link to="/shop" className="text-gold underline">Back to shop</Link>
        </div>
      </main>
    );
  }

  const related = cookies.filter((c) => c.id !== cookie.id && c.tags.some((t) => cookie.tags.includes(t))).slice(0, 3);

  return (
    <main className="bg-jet min-h-screen overflow-x-hidden pt-24 pb-24">
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <button onClick={() => nav(-1)} className="inline-flex items-center gap-2 text-cream/60 hover:text-cream text-sm mb-8">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Floating gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square"
          >
            <div className="absolute -inset-8 rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(circle, hsl(var(--gold)/0.5), transparent 70%)" }} />
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-full overflow-hidden border border-gold/30 shadow-[0_40px_120px_-20px_hsl(var(--gold)/0.5)]"
            >
              <img src={cookie.image} alt={cookie.name} className="w-full aspect-square object-cover" />
            </motion.div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[cookie.image, cookie.image, cookie.image].map((src, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-cream/10">
                  <img src={src} alt="" className="w-full h-full object-cover" style={{ filter: `hue-rotate(${i * 10}deg)` }} />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex gap-2 flex-wrap mb-4">
              {cookie.tags.map((t) => (
                <span key={t} className="px-3 py-1 text-[10px] tracking-[0.3em] uppercase rounded-full bg-gold/10 text-gold border border-gold/20">{t}</span>
              ))}
            </div>
            <h1 className="font-display text-cream text-5xl md:text-6xl leading-[0.95] mb-3">{cookie.name}</h1>
            <p className="text-gold italic text-lg mb-5">{cookie.tagline}</p>

            <div className="flex items-center gap-4 mb-7">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(cookie.rating) ? "fill-gold text-gold" : "text-cream/20"}`} />
                ))}
                <span className="text-cream/70 text-sm ml-2">{cookie.rating}</span>
              </div>
              <span className="text-cream/30">·</span>
              <span className="font-display text-cream text-4xl">₹{cookie.price}</span>
            </div>

            <p className="text-cream/70 leading-relaxed mb-8">{cookie.description}</p>

            <div className="glass rounded-2xl p-5 mb-8">
              <p className="text-[10px] tracking-[0.4em] text-gold uppercase mb-2">The Story</p>
              <p className="text-cream/80 italic">"{cookie.story}"</p>
            </div>

            <div className="mb-8">
              <p className="text-[10px] tracking-[0.4em] text-gold uppercase mb-3">Ingredients</p>
              <div className="flex flex-wrap gap-2">
                {cookie.ingredients.map((ing) => (
                  <span key={ing} className="px-3 py-1.5 text-xs rounded-full bg-cream/5 border border-cream/10 text-cream/70">{ing}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-cream/5 border border-cream/10">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-7 h-7 rounded-full bg-cream/10 hover:bg-cream/20 text-cream flex items-center justify-center"><Minus className="w-3 h-3" /></button>
                <span className="text-cream w-6 text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-7 h-7 rounded-full bg-cream/10 hover:bg-cream/20 text-cream flex items-center justify-center"><Plus className="w-3 h-3" /></button>
              </div>
              <button
                onClick={() => add(cookie.id, qty)}
                className="flex-1 px-5 py-3 rounded-full bg-cream/10 hover:bg-cream/20 text-cream text-sm font-medium transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={() => { add(cookie.id, qty); nav("/checkout"); }}
                className="flex-1 px-5 py-3 rounded-full bg-cream text-primary-foreground text-sm font-medium hover:scale-105 transition-transform"
              >
                Buy Now
              </button>
            </div>
          </motion.div>
        </div>

        {/* Reviews */}
        <section className="mt-24">
          <p className="text-[10px] tracking-[0.5em] text-gold uppercase mb-3 text-center">Whispers from our patrons</p>
          <h2 className="font-display text-cream text-4xl md:text-5xl text-center mb-12">What they're saying.</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {reviews.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-3xl p-6"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="w-3 h-3 fill-gold text-gold" />)}
                </div>
                <p className="text-cream/80 italic mb-4">"{r.text}"</p>
                <p className="text-gold text-xs tracking-widest uppercase">— {r.name}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="font-display text-cream text-3xl md:text-4xl mb-8">You may also <span className="text-gold">crave</span>.</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((c) => (
                <Link key={c.id} to={`/shop/${c.id}`} className="group glass rounded-3xl overflow-hidden block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-jet to-transparent" />
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <h3 className="font-display text-cream text-lg">{c.name}</h3>
                    <span className="text-gold text-sm">₹{c.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ProductDetail;
