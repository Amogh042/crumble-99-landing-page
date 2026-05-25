import { motion, useMotionValue, useSpring, useAnimationFrame, animate } from "framer-motion";
import { useRef, useState, PointerEvent as RPE, useMemo } from "react";
import { Cookie } from "@/data/cookies";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

interface Props {
  cookies: Cookie[];
}

export const SpiralShowcase = ({ cookies }: Props) => {
  const rotation = useMotionValue(0);
  const smooth = useSpring(rotation, { stiffness: 60, damping: 18, mass: 0.6 });
  const containerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ startX: number; startRot: number; lastX: number; lastT: number; vel: number; active: boolean }>({
    startX: 0, startRot: 0, lastX: 0, lastT: 0, vel: 0, active: false,
  });
  const [active, setActive] = useState(0);

  const n = cookies.length;
  const step = 360 / n;

  // Auto-rotate when idle
  useAnimationFrame((_, delta) => {
    if (!dragState.current.active) {
      rotation.set(rotation.get() + (delta / 1000) * 6); // 6deg/s drift
    }
  });

  // Track active card
  useAnimationFrame(() => {
    const r = ((smooth.get() % 360) + 360) % 360;
    const idx = Math.round(-r / step + n) % n;
    if (idx !== active) setActive(idx);
  });

  const onPointerDown = (e: RPE<HTMLDivElement>) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragState.current = {
      startX: e.clientX, startRot: rotation.get(),
      lastX: e.clientX, lastT: performance.now(),
      vel: 0, active: true,
    };
  };
  const onPointerMove = (e: RPE<HTMLDivElement>) => {
    const s = dragState.current;
    if (!s.active) return;
    const dx = e.clientX - s.startX;
    const w = containerRef.current?.clientWidth || window.innerWidth;
    const newRot = s.startRot + (dx / w) * 360;
    rotation.set(newRot);
    const now = performance.now();
    const dt = Math.max(1, now - s.lastT);
    s.vel = ((e.clientX - s.lastX) / w) * 360 / dt * 1000;
    s.lastX = e.clientX;
    s.lastT = now;
  };
  const onPointerUp = () => {
    const s = dragState.current;
    if (!s.active) return;
    s.active = false;
    const projected = rotation.get() + s.vel * 0.25;
    const snapped = Math.round(projected / step) * step;
    animate(rotation, snapped, { type: "spring", stiffness: 80, damping: 18, velocity: s.vel });
  };

  const goto = (idx: number) => {
    const target = -idx * step;
    animate(rotation, target, { type: "spring", stiffness: 90, damping: 20 });
  };

  // Wheel scroll
  const onWheel = (e: React.WheelEvent) => {
    rotation.set(rotation.get() - e.deltaY * 0.2);
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onWheel={onWheel}
      className="relative w-full h-[640px] md:h-[760px] select-none cursor-grab active:cursor-grabbing overflow-hidden"
      style={{ perspective: "1600px", touchAction: "pan-y" }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(var(--gold)/0.3), transparent 60%)" }} />

      <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
        <motion.div
          className="relative"
          style={{ rotateY: smooth, transformStyle: "preserve-3d", width: 1, height: 1 }}
        >
          {cookies.map((c, i) => {
            const angle = i * step;
            const radius = 520;
            return (
              <SpiralCard
                key={c.id}
                cookie={c}
                angle={angle}
                radius={radius}
                isActive={i === active}
                rotation={smooth}
                onSelect={() => goto(i)}
              />
            );
          })}
        </motion.div>
      </div>

      {/* Active card overlay info */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10 px-4">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[10px] tracking-[0.4em] text-gold uppercase mb-2">
            {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </p>
          <h3 className="font-display text-cream text-3xl md:text-5xl mb-1">{cookies[active].name}</h3>
          <p className="text-cream/60 text-sm md:text-base mb-3">{cookies[active].tagline}</p>
          <div className="flex items-center justify-center gap-4 text-sm text-cream/80">
            <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-gold text-gold" />{cookies[active].rating}</span>
            <span>·</span>
            <span className="text-gold font-medium">₹{cookies[active].price}</span>
          </div>
          <Link
            to={`/shop/${cookies[active].id}`}
            className="pointer-events-auto inline-block mt-4 px-6 py-2 rounded-full bg-cream text-primary-foreground text-sm font-medium hover:scale-105 transition-transform"
          >
            View Cookie
          </Link>
        </motion.div>
      </div>

      {/* Hint */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] text-cream/40 uppercase pointer-events-none">
        ⟵ drag · scroll · swipe ⟶
      </div>
    </div>
  );
};

const SpiralCard = ({
  cookie, angle, radius, isActive, rotation, onSelect,
}: {
  cookie: Cookie;
  angle: number;
  radius: number;
  isActive: boolean;
  rotation: any;
  onSelect: () => void;
}) => {
  const opacity = useMotionValue(1);
  const scale = useMotionValue(1);
  const filter = useMotionValue("blur(0px)");

  useAnimationFrame(() => {
    const total = ((rotation.get() + angle) % 360 + 360) % 360;
    const facing = Math.min(total, 360 - total);
    const norm = facing / 180;
    opacity.set(1 - norm * 0.85);
    scale.set(1 - norm * 0.25);
    filter.set(`blur(${norm * 6}px)`);
  });

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
      style={{
        transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
        transformStyle: "preserve-3d",
        opacity,
        scale,
        filter,
      }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4 + (angle % 7) * 0.3, repeat: Infinity, ease: "easeInOut" }}
        className={`relative rounded-full overflow-hidden border ${isActive ? "border-gold/60 shadow-[0_30px_80px_hsl(var(--gold)/0.4)]" : "border-cream/10"} `}
      >
        <div
          className={`relative ${isActive ? "w-[260px] h-[260px] md:w-[340px] md:h-[340px]" : "w-[170px] h-[170px] md:w-[210px] md:h-[210px]"} transition-all duration-500`}
        >
          <img
            src={cookie.image}
            alt={cookie.name}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-jet/80 via-transparent to-transparent" />
          {isActive && (
            <div className="absolute inset-x-0 bottom-3 text-center">
              <p className="font-display text-gold text-lg">₹{cookie.price}</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.button>
  );
};

