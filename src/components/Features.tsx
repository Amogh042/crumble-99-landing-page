import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check, Play } from "lucide-react";
import { ReactNode, useRef } from "react";

const TiltCard = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
      className={`glass rounded-3xl p-6 relative overflow-hidden hover:shadow-[0_30px_80px_-20px_hsl(var(--gold)/0.3)] transition-shadow duration-500 ${className}`}
    >
      {children}
    </motion.div>
  );
};

const Checklist = ({ items }: { items: string[] }) => (
  <ul className="space-y-3 mt-6">
    {items.map((it) => (
      <li key={it} className="flex items-center gap-3 text-cream/85 text-sm">
        <span className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
          <Check className="w-3 h-3 text-gold" />
        </span>
        {it}
      </li>
    ))}
  </ul>
);

export const Features = () => (
  <section className="relative px-3 md:px-6 py-20">
    <div className="absolute inset-0 noise opacity-[0.06] pointer-events-none" />

    <div className="text-center mb-16 space-y-2">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold text-cream leading-tight"
      >
        Designed for your <span className="font-display text-gold">cravings.</span>
        <br />
        Built for <span className="font-display text-gold">indulgence.</span>
      </motion.h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
      <TiltCard className="lg:col-span-1 min-h-[380px] !p-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-pouring-melted-chocolate-2633/1080p.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="relative h-full p-6 flex flex-col justify-between min-h-[380px]">
          <span className="w-10 h-10 rounded-full bg-cream/90 text-primary-foreground flex items-center justify-center">
            <Play className="w-4 h-4 fill-current" />
          </span>
          <h3 className="text-2xl font-bold text-cream">
            See the magic <span className="font-display text-gold">unfold.</span>
          </h3>
        </div>
      </TiltCard>

      <TiltCard>
        <div className="text-xs tracking-widest text-gold uppercase mb-2">02</div>
        <h3 className="text-2xl font-bold text-cream">Premium Ingredients</h3>
        <Checklist items={["Belgian Chocolate", "Organic Flour", "Real Butter", "No Preservatives"]} />
      </TiltCard>

      <TiltCard>
        <div className="text-xs tracking-widest text-gold uppercase mb-2">03</div>
        <h3 className="text-2xl font-bold text-cream">Fresh Baking</h3>
        <Checklist items={["Baked daily", "Warm delivery", "Perfect texture", "Soft center"]} />
      </TiltCard>

      <TiltCard>
        <div className="text-xs tracking-widest text-gold uppercase mb-2">04</div>
        <h3 className="text-2xl font-bold text-cream">Flavor Experience</h3>
        <Checklist items={["Classic Chocolate Chip", "Double Choco Lava", "Caramel Crunch", "Custom flavors"]} />
      </TiltCard>
    </div>
  </section>
);
