import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  photographyItems,
  photographyIntro,
  photographyServices,
  portfolioConfig,
} from "@/data/portfolio";
import type { PortfolioItem } from "@/data/portfolio";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const spring = { type: "spring" as const, stiffness: 300, damping: 30 };
const springSoft = { type: "spring" as const, stiffness: 260, damping: 28 };

const btnClass =
  "absolute z-20 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

function GalleryItem({
  item,
  index,
  onClick,
}: {
  item: PortfolioItem;
  index: number;
  onClick: () => void;
}) {
  const reduced = useReducedMotion();
  const isWide = index % 2 === 0;
  const aspectRatio = isWide ? "3/2" : "4/5";

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
        <img
          src={item.src}
          alt={item.alt}
          className="h-full w-full object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.03]"
          loading="lazy"
        />
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
              aria-label="Previous image"
            >
              <ArrowLeft className="h-4 w-4" weight="bold" />
            </button>
            <button
              type="button"
              onClick={next}
              className={`right-4 top-1/2 -translate-y-1/2 ${btnClass}`}
              aria-label="Next image"
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

function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    duration: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Photography inquiry");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n` +
        `Preferred date: ${form.date}\nPreferred time: ${form.time}\nDuration: ${form.duration}\n\n` +
        (form.message ? `Message:\n${form.message}` : "")
    );
    window.location.href = `mailto:${portfolioConfig.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-2xl border border-border bg-card p-8 sm:p-10 text-center"
      >
        <p className="text-lg font-medium text-foreground">Request sent.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Your default email client will open. Send the message to confirm your booking request.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="booking-name">Name</Label>
          <Input
            id="booking-name"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Your name"
            className="h-10"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="booking-email">Email</Label>
          <Input
            id="booking-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="you@example.com"
            className="h-10"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="booking-phone">Phone</Label>
        <Input
          id="booking-phone"
          type="tel"
          required
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          placeholder="+36 00 000 0000"
          className="h-10"
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="booking-date">Date</Label>
          <Input
            id="booking-date"
            type="date"
            required
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            className="h-10"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="booking-time">Time</Label>
          <Input
            id="booking-time"
            type="time"
            required
            value={form.time}
            onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
            className="h-10"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="booking-duration">Duration</Label>
          <select
            id="booking-duration"
            value={form.duration}
            onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Select duration</option>
            <option value="1 hour">1 hour</option>
            <option value="2 hours">2 hours</option>
            <option value="3 hours">3 hours</option>
            <option value="Half day">Half day</option>
            <option value="Full day">Full day</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="booking-message">Message (optional)</Label>
        <Textarea
          id="booking-message"
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          placeholder="Tell me about your project, location, or any questions..."
          rows={4}
          className="resize-none"
        />
      </div>
      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Request booking
      </Button>
    </form>
  );
}

export default function Photography() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const reduced = useReducedMotion();

  const col1 = photographyItems.filter((_, i) => i % 2 === 0);
  const col2 = photographyItems.filter((_, i) => i % 2 !== 0);
  const featured = photographyItems.slice(0, 2);

  const openLightbox = (item: PortfolioItem) => {
    const idx = photographyItems.findIndex((p) => p.id === item.id);
    setLightboxIndex(idx);
  };

  return (
    <div className="min-h-screen pb-24 sm:pb-32">
      {/* Hero: 2 pics + intro text */}
      <section className="container pt-16 sm:pt-20 pb-16 sm:pb-24 scroll-mt-20">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16 items-start">
          <motion.div
            className="lg:col-span-3 grid grid-cols-2 gap-4"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : spring}
          >
            {featured.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => openLightbox(item)}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl aspect-[4/5] bg-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </motion.div>
          <motion.div
            className="lg:col-span-2"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : { ...spring, delay: 0.1 }}
          >
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground leading-[1.15]">
              {photographyIntro.headline}
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {photographyIntro.paragraph1}
            </p>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {photographyIntro.paragraph2}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="container py-16 sm:py-20 border-t border-border/50">
        <motion.p
          className="text-[11px] uppercase tracking-[0.2em] font-medium text-muted-foreground mb-10"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Gallery
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-start">
          <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
            {col1.map((item, i) => (
              <GalleryItem
                key={item.id}
                item={item}
                index={i}
                onClick={() => openLightbox(item)}
              />
            ))}
          </div>
          <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 sm:mt-12 lg:mt-20">
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
      </section>

      {/* Services */}
      <section className="container py-16 sm:py-24 border-t border-border/50">
        <motion.h2
          className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-4"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Services
        </motion.h2>
        <motion.p
          className="text-muted-foreground max-w-xl mb-12"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Wedding, event, or travel — I approach each project with the same intention: capture what matters.
        </motion.p>
        <div className="grid gap-6 sm:grid-cols-3">
          {photographyServices.map((svc, i) => (
            <motion.div
              key={svc.id}
              className="rounded-xl sm:rounded-2xl border border-border bg-card p-6 sm:p-8"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={reduced ? { duration: 0 } : { ...springSoft, delay: i * 0.05 }}
            >
              <h3 className="font-display text-lg font-semibold text-foreground">
                {svc.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {svc.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Booking CTA */}
      <section className="container py-16 sm:py-24 border-t border-border/50">
        <div className="max-w-2xl">
          <motion.h2
            className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-4"
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Book a session
          </motion.h2>
          <motion.p
            className="text-muted-foreground mb-10"
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Tell me about your project and I’ll get back to you within 24 hours.
          </motion.p>
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <BookingForm />
          </motion.div>
        </div>
      </section>

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
