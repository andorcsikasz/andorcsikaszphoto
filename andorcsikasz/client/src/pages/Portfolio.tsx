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
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white drop-shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Csíkász Andor
        </motion.h1>
        <motion.div
          className="mt-8 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a
            href="#work"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-neutral-900 transition-opacity hover:opacity-90"
          >
            Work
          </a>
          <Link href="/contact">
            <span className="inline-flex items-center justify-center rounded-full border border-white/70 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-opacity hover:opacity-90">
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
              Started photography in 2022. Traveled 40 countries. I use a drone for a
              different perspective. I like catching moments as they happen.
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
          From the Road
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

function ServicesSection() {
  return (
    <section className="py-20 sm:py-32 bg-neutral-50/50">
      <div className="container">
        <motion.h2
          className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Services
        </motion.h2>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              className="rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container">
        <motion.h2
          className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          How I Work
        </motion.h2>
        <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease }}
            >
              <span className="text-xs font-semibold text-muted-foreground">
                {step.step}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TESTIMONIAL_INTERVAL_MS = 6000;

function TestimonialSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      TESTIMONIAL_INTERVAL_MS
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-20 sm:py-32 bg-neutral-50/50">
      <div className="container max-w-2xl text-center">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="text-xl sm:text-2xl font-medium text-foreground leading-relaxed"
          >
            "{testimonials[index].quote}"
          </motion.blockquote>
        </AnimatePresence>
        <div className="mt-10 flex justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className="h-2 w-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: "currentColor",
                opacity: i === index ? 1 : 0.35,
              }}
              aria-label={`View testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="py-24 sm:py-36">
      <div className="container text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
          Let's connect.
        </h2>
        <Link href="/contact">
          <motion.button
            type="button"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-foreground px-12 py-4 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get in Touch
          </motion.button>
        </Link>
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

      <StandaloneTextSection text={standaloneTexts[0]} />

      <AboutSection />

      <StandaloneTextSection text={standaloneTexts[1]} />

      <ServicesSection />

      <PortfolioSection onOpenLightbox={setLightboxItem} />

      <StandaloneTextSection text={standaloneTexts[2]} />

      <ProcessSection />
      <TestimonialSection />
      <FinalCTASection />

      <AnimatePresence>
        {lightboxItem && (
          <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
