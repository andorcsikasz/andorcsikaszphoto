import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { portfolioConfig, portfolioItems, type PortfolioItem } from "@/data/portfolio";
import { motion, AnimatePresence } from "framer-motion";
import { FilmStrip, InstagramLogo, X } from "@phosphor-icons/react";
import { useState } from "react";
import { useLocation } from "wouter";

function MediaThumbnail({
  item,
  onClick,
  index,
}: {
  item: PortfolioItem;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="group relative w-full overflow-hidden bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <AspectRatio ratio={4 / 5}>
        {item.type === "video" ? (
          <div className="absolute inset-0">
            <video
              src={item.src}
              poster={item.poster}
              muted
              playsInline
              loop
              preload="metadata"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
              <FilmStrip className="h-12 w-12 text-white drop-shadow-lg" />
            </div>
          </div>
        ) : (
          <>
            <img
              src={item.src}
              alt={item.alt}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
          </>
        )}
      </AspectRatio>
      {(item.title || item.category) && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <p className="text-sm font-medium text-white">{item.title}</p>
          {item.category && (
            <p className="text-xs text-white/80">{item.category}</p>
          )}
        </div>
      )}
    </motion.button>
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
      <DialogContent showCloseButton={false} className="max-w-5xl w-[95vw] p-0 gap-0 overflow-hidden border-0 bg-black">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="flex items-center justify-center min-h-[60vh] max-h-[90vh] p-4 pt-14">
          {item.type === "video" ? (
            <video
              src={item.src}
              poster={item.poster}
              controls
              autoPlay
              className="max-h-[85vh] w-auto rounded"
            />
          ) : (
            <img
              src={item.src}
              alt={item.alt}
              className="max-h-[85vh] w-auto max-w-full object-contain rounded"
            />
          )}
        </div>
        {(item.title || item.alt) && (
          <DialogHeader className="p-4 pt-0 border-t border-white/10">
            <DialogTitle className="text-white text-lg font-normal">
              {item.title || item.alt}
            </DialogTitle>
            {item.category && (
              <p className="text-sm text-white/70">{item.category}</p>
            )}
          </DialogHeader>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function Portfolio() {
  const [, setLocation] = useLocation();
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 sm:py-24 lg:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-portfolio text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight">
            {portfolioConfig.name}
          </h1>
          <p className="mt-4 text-muted-foreground text-lg sm:text-xl max-w-md mx-auto">
            {portfolioConfig.tagline}
          </p>
          <motion.button
            type="button"
            onClick={() => setLocation("/contact")}
            className="mt-8 text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            Get in touch
          </motion.button>
        </motion.div>
      </section>

      {/* Gallery */}
      <section className="container pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {portfolioItems.map((item, index) => (
            <MediaThumbnail
              key={item.id}
              item={item}
              index={index}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
        <motion.a
          href={portfolioConfig.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-16 flex items-center justify-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <InstagramLogo className="h-5 w-5" />
          <span className="text-sm font-medium">See more on Instagram · @andorcsikasz</span>
        </motion.a>
      </section>

      <AnimatePresence>
        {selectedItem && (
          <Lightbox
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
