import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  heroImages,
  aboutImage,
  portfolioItems,
  type PortfolioItem,
} from "@/data/portfolio";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "wouter";

const HERO_CROSSFADE_MS = 7000;
const ease = [0.25, 0.46, 0.45, 0.94];

function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActiveIndex((i) => (i + 1) % heroImages.length),
      HERO_CROSSFADE_MS
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {heroImages.map((src, i) => (
        <motion.div
          key={src}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: i === activeIndex ? 1 : 0 }}
          transition={{ duration: 2.2, ease }}
        >
          <img
            src={src}
            alt=""
            className="h-full w-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-black/25" />
        </motion.div>
      ))}
      <div className="relative z-10 flex h-full flex-col items-end justify-end px-8 pb-12 sm:px-12 sm:pb-16">
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="#work"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-medium text-neutral-900 transition-opacity hover:opacity-90"
          >
            Work
          </a>
          <Link href="/contact">
            <span className="inline-flex items-center justify-center rounded-full border border-white/70 px-8 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-opacity hover:opacity-90">
              Contact
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-32 scroll-mt-20">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease }}
            className="relative overflow-hidden rounded-2xl"
          >
            <img
              src={aboutImage}
              alt="Behind the lens"
              className="w-full aspect-[4/5] object-cover"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              About
            </h2>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
              I picked up a camera in 2022 and haven't really put it down since.
              What started as curiosity turned into something I now carry everywhere —
              through 40 countries and counting.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              I shoot landscapes, people, cities, whatever catches my eye. Got a drone
              at some point because I wanted to see things from above. Most of what I do
              is just trying to hold on to a moment before it's gone — no posing, no
              staging, just what's there.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Based in Hungary, usually somewhere else.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PortfolioFullWidthItem({
  item,
  onClick,
  index,
}: {
  item: PortfolioItem;
  onClick: () => void;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, ease, delay: index * 0.05 }}
    >
      <motion.button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative w-full overflow-hidden rounded-2xl bg-neutral-100 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
        style={{ aspectRatio: item.type === "video" ? "16/9" : "3/2" }}
      >
        <div className="absolute inset-0">
          {item.type === "video" ? (
            <motion.div
              className="h-full w-full"
              animate={{ scale: hovered ? 1.03 : 1 }}
              transition={{ duration: 0.6, ease }}
            >
              <video
                src={item.src}
                poster={item.poster}
                muted
                playsInline
                loop
                preload="metadata"
                className="h-full w-full object-cover"
              />
            </motion.div>
          ) : (
            <>
              <motion.img
                src={item.src}
                alt={item.alt}
                className="absolute inset-0 h-full w-full object-cover"
                animate={{
                  opacity: hovered && item.hoverSrc ? 0 : 1,
                  scale: hovered ? 1.02 : 1,
                }}
                transition={{ duration: 0.5, ease }}
              />
              {item.hoverSrc && (
                <motion.img
                  src={item.hoverSrc}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={false}
                  animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1.02 : 1 }}
                  transition={{ duration: 0.5, ease }}
                />
              )}
            </>
          )}
        </div>
        {(item.title || item.category) && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/50 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-sm font-semibold text-white">{item.title}</p>
            {item.category && (
              <p className="text-xs font-medium text-white/80 mt-1">{item.category}</p>
            )}
          </motion.div>
        )}
      </motion.button>
    </motion.div>
  );
}

function PortfolioSection({
  onOpenLightbox,
}: {
  onOpenLightbox: (item: PortfolioItem) => void;
}) {
  return (
    <section id="work" className="py-20 sm:py-32 scroll-mt-20">
      <div className="container mb-16">
        <motion.h2
          className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Work
        </motion.h2>
      </div>
      <div className="container max-w-5xl space-y-8 sm:space-y-12">
        {portfolioItems.map((item, index) => (
          <PortfolioFullWidthItem
            key={item.id}
            item={item}
            index={index}
            onClick={() => onOpenLightbox(item)}
          />
        ))}
      </div>
    </section>
  );
}

function Lightbox({
  item,
  onClose,
}: {
  item: PortfolioItem;
  onClose: () => void;
}) {
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[95vw] w-full p-0 gap-0 overflow-hidden rounded-2xl border-0 bg-black"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 text-xl"
          aria-label="Close"
        >
          ×
        </button>
        <div className="flex items-center justify-center min-h-[70vh] max-h-[95vh] p-6 pt-16">
          {item.type === "video" ? (
            <video
              src={item.src}
              poster={item.poster}
              controls
              autoPlay
              className="max-h-[90vh] w-full rounded-lg object-contain"
            />
          ) : (
            <motion.img
              src={item.src}
              alt={item.alt}
              className="max-h-[90vh] w-full rounded-lg object-contain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </div>
        {(item.title || item.alt) && (
          <DialogHeader className="px-6 py-6">
            <DialogTitle className="text-base font-medium text-white">
              {item.title || item.alt}
            </DialogTitle>
            {item.category && (
              <p className="text-sm text-white/60 mt-1">{item.category}</p>
            )}
          </DialogHeader>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function Portfolio() {
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <HeroSection />
      <AboutSection />
      <PortfolioSection onOpenLightbox={setLightboxItem} />

      <AnimatePresence>
        {lightboxItem && (
          <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
