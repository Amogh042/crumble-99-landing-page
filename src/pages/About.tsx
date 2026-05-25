import { motion } from "framer-motion";
import { PageShell } from "@/components/PageShell";

const founders = [
  { name: "Aarav Mehta", role: "Founder · Head Pastry", img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=85" },
  { name: "Léa Dumont", role: "Creative Director", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=85" },
  { name: "Kabir Rao", role: "Chocolatier", img: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=600&q=85" },
];

const About = () => (
  <PageShell eyebrow="Our Story" title={<>A small obsession, <span className="text-gold">baked large</span>.</>}>
    <section className="grid md:grid-cols-2 gap-12 items-center mb-24">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-[10px] tracking-[0.5em] text-gold uppercase mb-4">Est. 2026</p>
        <h2 className="font-display text-cream text-4xl md:text-5xl mb-6 leading-tight">
          From one oven, <span className="text-gold">to yours</span>.
        </h2>
        <p className="text-cream/70 leading-relaxed mb-4">
          Crumble 99 began as a single rented oven, a stack of imported chocolate, and one stubborn belief — that a cookie can be art.
        </p>
        <p className="text-cream/70 leading-relaxed">
          Today, we ship our small obsessions across India, hand-finished with the same patience we started with on day one.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative aspect-square rounded-3xl overflow-hidden glass"
      >
        <img src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=1200&q=85" alt="Bakery" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-jet/60 to-transparent" />
      </motion.div>
    </section>

    <section className="mb-24">
      <h2 className="font-display text-cream text-4xl md:text-5xl text-center mb-12">Our <span className="text-gold">philosophy</span>.</h2>
      <div className="grid md:grid-cols-3 gap-5">
        {[
          { t: "Single Origin", d: "Cocoa, vanilla, hazelnut — all traced to a single farm, every time." },
          { t: "Cultured Butter", d: "Slow-fermented French butter, never margarine, never shortening." },
          { t: "Small Batches", d: "Nothing leaves our kitchen older than 48 hours from the oven." },
        ].map((p, i) => (
          <motion.div
            key={p.t}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-3xl p-7"
          >
            <p className="text-[10px] tracking-[0.4em] text-gold uppercase mb-3">0{i + 1}</p>
            <h3 className="font-display text-cream text-2xl mb-2">{p.t}</h3>
            <p className="text-cream/60 text-sm leading-relaxed">{p.d}</p>
          </motion.div>
        ))}
      </div>
    </section>

    <section>
      <h2 className="font-display text-cream text-4xl md:text-5xl text-center mb-12">The <span className="text-gold">makers</span>.</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {founders.map((f, i) => (
          <motion.div
            key={f.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-4">
              <img src={f.img} alt={f.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-jet/80 to-transparent" />
            </div>
            <h3 className="font-display text-cream text-2xl">{f.name}</h3>
            <p className="text-gold text-xs tracking-widest uppercase">{f.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  </PageShell>
);

export default About;
