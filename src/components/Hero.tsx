import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { WordsPullUp } from "./WordsPullUp";
import { Crumbs } from "./Crumbs";

export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });
  const tx = useTransform(sx, (v) => v * 20);
  const ty = useTransform(sy, (v) => v * 20);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mx, my]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    const onTouch = () => tryPlay();
    document.addEventListener("touchstart", onTouch, { once: true, passive: true });
    document.addEventListener("click", onTouch, { once: true });
    return () => {
      document.removeEventListener("touchstart", onTouch);
      document.removeEventListener("click", onTouch);
    };
  }, []);

  return (
    <section className="relative min-h-screen p-3 md:p-6">
      <div className="relative h-[calc(100vh-1.5rem)] md:h-[calc(100vh-3rem)] rounded-3xl overflow-hidden">
        {/* Background video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          poster="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=1920"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* Overlays */}
        <div className="absolute inset-0 bg-jet/40" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-fade-top)" }} />
        <div className="absolute inset-0" style={{ background: "var(--gradient-fade-bottom)" }} />
        <div className="absolute inset-0 noise opacity-[0.15] mix-blend-overlay" />
        <Crumbs count={20} />

        {/* Top tagline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute top-28 left-1/2 -translate-x-1/2 text-center"
        >
          <p className="text-xs tracking-[0.4em] text-cream/60 uppercase">Est. 2099 · Crumble Atelier</p>
        </motion.div>

        {/* Hero text bottom */}
        <div className="absolute inset-x-0 bottom-0 px-6 md:px-12 pb-10 md:pb-16">
          <div className="grid md:grid-cols-12 gap-8 items-end">
            <motion.div style={{ x: tx, y: ty }} className="md:col-span-8 relative">
              <p className="font-display text-gold text-2xl md:text-3xl mb-2">crumble 99 presents —</p>
              <h1
                className="text-3d font-black leading-[0.85] tracking-tighter"
                style={{ fontSize: "clamp(4rem, 14vw, 14rem)" }}
              >
                <WordsPullUp text="Crave" />
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="md:col-span-4 space-y-6"
            >
              <p className="text-cream/85 text-base md:text-lg leading-relaxed max-w-sm">
                Freshly baked. Perfectly crafted. Every bite melts into a moment of pure indulgence.
              </p>
              <button className="group inline-flex items-center gap-3 bg-cream text-primary-foreground rounded-full pl-6 pr-2 py-2 font-medium hover:gap-5 hover:shadow-[0_0_40px_hsl(var(--gold)/0.6)] transition-all duration-500 hover:scale-105">
                <span>Order Fresh Cookies</span>
                <span className="w-10 h-10 rounded-full bg-primary-foreground text-cream flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
