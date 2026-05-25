import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Mail, MapPin, Phone, Plus, Minus } from "lucide-react";
import { PageShell } from "@/components/PageShell";

const faqs = [
  { q: "How fresh are your cookies?", a: "Every cookie ships within 24 hours of baking, sealed in nitrogen-flushed packaging to stay perfect for 7 days." },
  { q: "Do you deliver pan-India?", a: "Yes — we ship across all major Indian cities. Delivery is free on orders above ₹1500." },
  { q: "Can I customise a gift box?", a: "Absolutely. Pick any 6, 9 or 12 cookies and add a handwritten note at checkout." },
  { q: "Do you cater for events?", a: "We do. Reach us at hello@crumble99.com for weddings, launches and private dinners." },
];

const Contact = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <PageShell eyebrow="Say Hello" title={<>Let's <span className="text-gold">talk</span> cookies.</>}>
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10">
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={(e) => { e.preventDefault(); alert("Thanks! We'll be in touch shortly."); }}
          className="glass rounded-3xl p-8 space-y-4"
        >
          <p className="text-[10px] tracking-[0.4em] text-gold uppercase">Drop us a line</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <Input label="Name" required />
            <Input label="Email" type="email" required />
          </div>
          <Input label="Subject" />
          <label className="block">
            <span className="text-cream/60 text-xs tracking-wider uppercase block mb-1.5">Message</span>
            <textarea rows={5} required className="w-full px-4 py-2.5 rounded-2xl bg-cream/5 border border-cream/10 text-cream placeholder:text-cream/30 text-sm focus:outline-none focus:border-gold/50 transition-colors resize-none" />
          </label>
          <button type="submit" className="px-7 py-3 rounded-full bg-cream text-primary-foreground text-sm font-medium hover:scale-105 transition-transform">
            Send Message
          </button>
        </motion.form>

        <div className="space-y-5">
          <div className="glass rounded-3xl p-6 space-y-4">
            <Item icon={MapPin} label="Atelier" value="A-99, Bandra West, Mumbai 400050" />
            <Item icon={Phone} label="Call" value="+91 99999 99999" />
            <Item icon={Mail} label="Email" value="hello@crumble99.com" />
            <Item icon={Instagram} label="Follow" value="@crumble99" />
          </div>
          <div className="glass rounded-3xl overflow-hidden aspect-[4/3]">
            <iframe
              title="Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=72.82%2C19.05%2C72.85%2C19.07&amp;layer=mapnik"
              className="w-full h-full grayscale contrast-125 opacity-80"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="font-display text-cream text-4xl md:text-5xl text-center mb-10">Frequently <span className="text-gold">whispered</span>.</h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-display text-cream text-lg">{f.q}</span>
                {open === i ? <Minus className="w-4 h-4 text-gold" /> : <Plus className="w-4 h-4 text-gold" />}
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-5 text-cream/70 text-sm leading-relaxed">{f.a}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
};

const Input = ({ label, ...p }: any) => (
  <label className="block">
    <span className="text-cream/60 text-xs tracking-wider uppercase block mb-1.5">{label}</span>
    <input {...p} className="w-full px-4 py-2.5 rounded-2xl bg-cream/5 border border-cream/10 text-cream placeholder:text-cream/30 text-sm focus:outline-none focus:border-gold/50 transition-colors" />
  </label>
);

const Item = ({ icon: Icon, label, value }: any) => (
  <div className="flex items-start gap-3">
    <span className="w-10 h-10 shrink-0 rounded-full bg-gold/15 text-gold flex items-center justify-center"><Icon className="w-4 h-4" /></span>
    <div>
      <p className="text-[10px] tracking-[0.4em] text-cream/50 uppercase">{label}</p>
      <p className="text-cream">{value}</p>
    </div>
  </div>
);

export default Contact;
