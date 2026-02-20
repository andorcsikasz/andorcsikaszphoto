import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { photographyItems, type PortfolioItem } from "@/data/portfolio";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";

const ease = [0.25, 0.46, 0.45, 0.94];

function GalleryItem({
  item,
  index,
  onClick,
}: {
  item: PortfolioItem;
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  // Alternate aspect ratios per column for visual rhythm
  const isWide = index % 2 === 0;
  const aspectRatio = isWide ? "3/2" : "4/5";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.7, ease, delay: (index % 3) * 0.07 }}
    >
      <motion.button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative w-full overflow-hidden rounded-xl bg-neutral-100 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
        style={{ aspectRatio }}
      >
        <motion.img
          src={item.src}
          alt={item.alt}
          className="absolute inset-0 h-full w-full object-cover"
          animate={{
            opacity: hovered && item.hoverSrc ? 0 : 1,
            scale: hovered ? 1.03 : 1,
          }}
          transition={{ duration: 0.5, ease }}
          loading="lazy"
        />
        {item.hoverSrc && (
          <motion.img
            src={item.hoverSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1.03 : 1 }}
            transition={{ duration: 0.5, ease }}
            loading="lazy"
          />
        )}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-5"
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
          transition={{ duration: 0.3 }}
        >
          {item.title && (
            <p className="text-sm font-semibold text-white leading-tight">
              {item.title}
            </p>
          )}
          <div className="flex items-center gap-2 mt-1">
            {item.category && (
              <span className="text-[11px] font-medium text-white/70 uppercase tracking-wider">
                {item.category}
              </span>
            )}
            {item.location && (
              <>
                <span className="text-white/40 text-[10px]">·</span>
                <span className="text-[11px] text-white/60">{item.location}</span>
              </>
            )}
          </div>
        </motion.div>
      </motion.button>
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
      if (e.key === "ArrowLeft") setCurrent((i) => (i - 1 + items.length) % items.length);
      else if (e.key === "ArrowRight") setCurrent((i) => (i + 1) % items.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items.length]);

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[95vw] w-full p-0 gap-0 overflow-hidden rounded-2xl border-0 bg-black"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label="Close"
        >
          <X className="h-4 w-4" weight="bold" />
        </button>

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Previous"
            >
              <ArrowLeft className="h-4 w-4" weight="bold" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
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
            transition={{ duration: 0.25 }}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="max-h-[80vh] w-full rounded-lg object-contain"
            />
          </motion.div>
        </AnimatePresence>

        {(item.title || item.alt) && (
          <DialogHeader className="px-6 py-5 border-t border-white/10">
            <DialogTitle className="text-sm font-medium text-white">
              {item.title || item.alt}
            </DialogTitle>
            <div className="flex items-center gap-2 mt-0.5">
              {item.category && (
                <span className="text-[11px] text-white/50 uppercase tracking-wider">
                  {item.category}
                </span>
              )}
              {item.location && (
                <>
                  <span className="text-white/30 text-[10px]">·</span>
                  <span className="text-[11px] text-white/50">{item.location}</span>
                </>
              )}
              {item.year && (
                <>
                  <span className="text-white/30 text-[10px]">·</span>
                  <span className="text-[11px] text-white/40">{item.year}</span>
                </>
              )}
            </div>
            <p className="text-[11px] text-white/30 mt-2">
              {current + 1} / {items.length}
            </p>
          </DialogHeader>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function Photography() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Split into two masonry-style columns
  const col1 = photographyItems.filter((_, i) => i % 2 === 0);
  const col2 = photographyItems.filter((_, i) => i % 2 !== 0);

  const openLightbox = (item: PortfolioItem) => {
    const idx = photographyItems.findIndex((p) => p.id === item.id);
    setLightboxIndex(idx);
  };

  return (
    <div className="min-h-screen pb-32">
      {/* Page header */}
      <div className="container pt-20 sm:pt-24 pb-14 scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Photography
          </h1>
          <p className="mt-3 text-base text-muted-foreground max-w-md leading-relaxed">
            Landscapes, portraits, cities — whatever catches my eye. Shooting across 40+ countries since 2022.
          </p>
        </motion.div>
      </div>

      {/* Masonry grid */}
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-start">
          <div className="flex flex-col gap-4 sm:gap-6">
            {col1.map((item, i) => (
              <GalleryItem
                key={item.id}
                item={item}
                index={i}
                onClick={() => openLightbox(item)}
              />
            ))}
          </div>
          <div className="flex flex-col gap-4 sm:gap-6 sm:mt-16">
            {col2.map((item, i) => (
              <GalleryItem
                key={item.id}
                item={item}
                index={i}
                onClick={() => openLightbox(item)}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={photographyItems}
            activeIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
