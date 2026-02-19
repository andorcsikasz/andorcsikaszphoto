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

function FullWidthMedia({
  item,
  onClick,
  index,
}: {
  item: PortfolioItem;
  onClick: () => void;
  index: number;
}) {
  const isEven = index % 2 === 0;
  const slideX = isEven ? -80 : 80;

  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-12% 0px -12% 0px", amount: 0.15 }}
      variants={{
        initial: { opacity: 0, y: 100, x: slideX },
        animate: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: {
            duration: 0.95,
            ease: [0.22, 1, 0.36, 1],
            delay: index % 2 === 0 ? 0 : 0.1,
          },
        },
      }}
      className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-3 sm:py-5"
    >
      <motion.button
        type="button"
        onClick={onClick}
        className="group relative w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-inset"
      >
        {/* Full-width media - 16:9 or 3:4 for photos */}
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: item.type === "video" ? "16/9" : "3/2" }}
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
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <FilmStrip className="h-14 w-14 text-white/90 drop-shadow-lg" weight="regular" />
              </div>
            </>
          ) : (
            <>
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/[0.04]" />
            </>
          )}
        </div>
        {(item.title || item.category) && (
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 bg-gradient-to-t from-foreground/40 via-foreground/10 to-transparent opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            <p className="text-base sm:text-lg font-medium text-white drop-shadow-md">{item.title}</p>
            {item.category && (
              <p className="text-sm text-white/90 mt-1">{item.category}</p>
            )}
          </div>
        )}
      </motion.button>
    </motion.section>
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
      <DialogContent showCloseButton={false} className="max-w-[95vw] w-full p-0 gap-0 overflow-hidden rounded-none border-0 bg-black">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 z-10 flex h-12 w-12 items-center justify-center text-white/80 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="h-6 w-6" weight="regular" />
        </button>
        <div className="flex items-center justify-center min-h-[70vh] max-h-[95vh] p-4 pt-16">
          {item.type === "video" ? (
            <video
              src={item.src}
              poster={item.poster}
              controls
              autoPlay
              className="max-h-[90vh] w-full object-contain"
            />
          ) : (
            <img
              src={item.src}
              alt={item.alt}
              className="max-h-[90vh] w-full object-contain"
            />
          )}
        </div>
        {(item.title || item.alt) && (
          <DialogHeader className="px-6 py-6 border-t border-white/10">
            <DialogTitle className="text-lg font-normal text-white">
              {item.title || item.alt}
            </DialogTitle>
            {item.category && (
              <p className="text-sm text-white/70 mt-1">{item.category}</p>
            )}
          </DialogHeader>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function Portfolio() {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Full-width gallery with scroll animations */}
      <section className="w-full">
        <div className="w-full">
          {portfolioItems.map((item, index) => (
            <FullWidthMedia
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
          className="flex items-center justify-center gap-2.5 py-20 text-muted-foreground hover:text-foreground transition-colors duration-200"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <InstagramLogo className="h-4 w-4" weight="regular" />
          <span className="text-[13px] font-normal">@andorcsikasz</span>
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
