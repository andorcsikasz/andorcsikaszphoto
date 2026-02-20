import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { droneItems, type PortfolioItem } from "@/data/portfolio";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const spring = { type: "spring" as const, stiffness: 300, damping: 30 };
const springSoft = { type: "spring" as const, stiffness: 260, damping: 28 };

const btnClass =
  "absolute z-20 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

function DroneItem({
  item,
  index,
  onClick,
}: {
  item: PortfolioItem;
  index: number;
  onClick: () => void;
}) {
  const reduced = useReducedMotion();
  const aspectRatio = item.type === "video" ? "16/9" : index % 3 === 1 ? "4/3" : "16/9";

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={
        reduced ? { duration: 0 } : { ...springSoft, delay: (index % 3) * 0.04 }
      }
    >
      <button
        type="button"
        onClick={onClick}
        className="group relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-muted/50 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        style={{ aspectRatio }}
      >
        {item.type === "video" ? (
          <>
            <video
              src={item.src}
              poster={item.poster}
              muted
              playsInline
              loop
              preload="metadata"
              className="h-full w-full object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-70 group-hover:opacity-0 transition-opacity duration-300">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
                <div className="ml-1 h-0 w-0 border-y-[7px] border-l-[12px] border-y-transparent border-l-white" />
              </div>
            </div>
          </>
        ) : (
          <img
            src={item.src}
            alt={item.alt}
            className="h-full w-full object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.03]"
            loading="lazy"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 transition-all duration-300 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
          {item.title && (
            <p className="text-sm font-semibold text-white leading-tight">
              {item.title}
            </p>
          )}
          <div className="flex items-center gap-2 mt-1">
            {item.category && (
              <span className="text-xs font-medium text-white/70 uppercase tracking-wider">
                {item.category}
              </span>
            )}
            {item.location && (
              <>
                <span className="text-white/40 text-xs">·</span>
                <span className="text-xs text-white/60">{item.location}</span>
              </>
            )}
          </div>
        </div>
      </button>
    </motion.div>
  );
}

function Lightbox({
  items,
  activeIndex,
  onClose,
}: {
  items: PortfolioItem[];
  activeIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(activeIndex);
  const item = items[current];

  const prev = () => setCurrent((i) => (i - 1 + items.length) % items.length);
  const next = () => setCurrent((i) => (i + 1) % items.length);

  useEffect(() => {
    setCurrent(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items.length, onClose]);

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[95vw] w-full p-0 gap-0 overflow-hidden rounded-2xl border-0 bg-black"
      >
        <button
          type="button"
          onClick={onClose}
          className={`top-5 right-5 ${btnClass}`}
          aria-label="Close"
        >
          <X className="h-4 w-4" weight="bold" />
        </button>

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className={`left-4 top-1/2 -translate-y-1/2 ${btnClass}`}
              aria-label="Previous"
            >
              <ArrowLeft className="h-4 w-4" weight="bold" />
            </button>
            <button
              type="button"
              onClick={next}
              className={`right-4 top-1/2 -translate-y-1/2 ${btnClass}`}
              aria-label="Next"
            >
              <ArrowRight className="h-4 w-4" weight="bold" />
            </button>
          </>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="flex items-center justify-center min-h-[70vh] max-h-[90vh] px-4 sm:px-16 py-6 sm:py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {item.type === "video" ? (
              <video
                src={item.src}
                poster={item.poster}
                controls
                autoPlay
                className="max-h-[80vh] w-full rounded-lg object-contain"
              />
            ) : (
              <img
                src={item.src}
                alt={item.alt}
                className="max-h-[80vh] w-full rounded-lg object-contain"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {(item.title || item.alt) && (
          <DialogHeader className="px-6 py-5 border-t border-white/10">
            <DialogTitle className="text-sm font-medium text-white">
              {item.title || item.alt}
            </DialogTitle>
            <div className="flex items-center gap-2 mt-0.5">
              {item.category && (
                <span className="text-xs text-white/50 uppercase tracking-wider">
                  {item.category}
                </span>
              )}
              {item.location && (
                <>
                  <span className="text-white/30 text-xs">·</span>
                  <span className="text-xs text-white/50">{item.location}</span>
                </>
              )}
              {item.year && (
                <>
                  <span className="text-white/30 text-xs">·</span>
                  <span className="text-xs text-white/40">{item.year}</span>
                </>
              )}
            </div>
            <p className="text-xs text-white/30 mt-2">
              {current + 1} / {items.length}
            </p>
          </DialogHeader>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function Drone() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const reduced = useReducedMotion();

  const openLightbox = (item: PortfolioItem) => {
    const idx = droneItems.findIndex((d) => d.id === item.id);
    setLightboxIndex(idx);
  };

  return (
    <div className="min-h-screen pb-24 sm:pb-32">
      <div className="container pt-16 sm:pt-20 pb-12 sm:pb-16 scroll-mt-20">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? { duration: 0 } : spring}
        >
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Drone
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed">
            This page is under construction. Drones are charging, pilots are caffeinating.
          </p>
        </motion.div>
      </div>

      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {droneItems.map((item, i) => (
            <DroneItem
              key={item.id}
              item={item}
              index={i}
              onClick={() => openLightbox(item)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={droneItems}
            activeIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
