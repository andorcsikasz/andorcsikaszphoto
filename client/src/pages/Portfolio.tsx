import {
  heroImages,
  aboutImage,
  portfolioConfig,
  photographyItems,
  droneItems,
} from "@/data/portfolio";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "@phosphor-icons/react";

const HERO_CROSSFADE_MS = 7000;
const ease = [0.25, 0.46, 0.45, 0.94];

// ─── Hero ────────────────────────────────────────────────────────────────────

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
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      ))}

      {/* Name + tagline top-left (below sticky header) */}
      <motion.div
        className="absolute top-16 left-0 z-10 p-8 sm:p-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <p className="text-[11px] uppercase tracking-[0.25em] font-medium text-white/80">
          Csíkász Andor
        </p>
        <p className="text-[11px] uppercase tracking-[0.2em] font-light text-white/50 mt-1">
          Photography · Drone · Sandbox
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.div
          className="h-8 w-px bg-white/40"
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Hero dot indicators */}
      <div className="absolute bottom-8 right-8 z-10 flex gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              width: i === activeIndex ? "24px" : "6px",
              backgroundColor: i === activeIndex ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
            }}
            aria-label={`Image ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section className="py-24 sm:py-36">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease }}
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
            transition={{ duration: 0.7, ease, delay: 0.1 }}
          >
            <p className="text-[11px] uppercase tracking-[0.2em] font-medium text-muted-foreground mb-6">
              About
            </p>
            <p className="text-lg sm:text-xl text-foreground leading-relaxed">
              I picked up a camera in 2022 and haven't really put it down since.
              What started as curiosity turned into something I now carry everywhere —
              through 40 countries and counting.
            </p>
            <p className="mt-5 text-base text-muted-foreground leading-relaxed">
              I shoot landscapes, people, cities, whatever catches my eye. Got a drone
              at some point because I wanted to see things from above. Most of what I do
              is just trying to hold on to a moment before it's gone.
            </p>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Based in Hungary, usually somewhere else.
            </p>

            <Link href="/photography">
              <motion.button
                type="button"
                className="mt-10 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.15em] text-foreground hover:text-muted-foreground transition-colors duration-200"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                View Work <ArrowRight className="h-3.5 w-3.5" weight="bold" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Section preview card ─────────────────────────────────────────────────────

function SectionCard({
  href,
  label,
  description,
  images,
  index,
}: {
  href: string;
  label: string;
  description: string;
  images: string[];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.7, ease, delay: index * 0.1 }}
    >
      <Link href={href}>
        <motion.div
          className="group block cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Image preview */}
          <div className="relative overflow-hidden rounded-2xl aspect-[3/2] bg-neutral-100">
            <motion.img
              src={images[0]}
              alt={label}
              className="absolute inset-0 h-full w-full object-cover"
              animate={{
                opacity: hovered && images[1] ? 0 : 1,
                scale: hovered ? 1.04 : 1,
              }}
              transition={{ duration: 0.6, ease }}
              loading="lazy"
            />
            {images[1] && (
              <motion.img
                src={images[1]}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                initial={false}
                animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1.04 : 1 }}
                transition={{ duration: 0.6, ease }}
                loading="lazy"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* Label */}
          <div className="mt-5 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-foreground">{label}</h2>
              <p className="mt-1 text-[13px] text-muted-foreground">{description}</p>
            </div>
            <motion.span
              className="text-muted-foreground group-hover:text-foreground transition-colors"
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="h-4 w-4" weight="regular" />
            </motion.span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

// ─── Work preview ─────────────────────────────────────────────────────────────

function WorkSection() {
  const sections = [
    {
      href: "/photography",
      label: "Photography",
      description: "Landscapes, portraits, cities — 40+ countries",
      images: [
        photographyItems[0].src,
        photographyItems[1].src,
      ],
    },
    {
      href: "/drone",
      label: "Drone",
      description: "Aerial photography and video",
      images: [
        droneItems[0].src,
        droneItems[1].src,
      ],
    },
    {
      href: "/sandbox",
      label: "Sandbox",
      description: "Experiments and personal projects",
      images: [
        photographyItems[4].src,
        photographyItems[5].src,
      ],
    },
  ];

  return (
    <section className="py-24 sm:py-32 border-t border-border/30">
      <div className="container">
        <motion.p
          className="text-[11px] uppercase tracking-[0.2em] font-medium text-muted-foreground mb-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Work
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {sections.map((section, i) => (
            <SectionCard key={section.href} {...section} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact CTA ──────────────────────────────────────────────────────────────

function ContactCTA() {
  return (
    <section className="py-24 sm:py-32 border-t border-border/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="max-w-lg"
        >
          <p className="text-[11px] uppercase tracking-[0.2em] font-medium text-muted-foreground mb-6">
            Contact
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground leading-tight">
            Have a project in mind?
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Whether it's a commercial shoot, a collaboration, or just a conversation about photography — get in touch.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href={`mailto:${portfolioConfig.email}`}
              className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              {portfolioConfig.email}
            </a>
            {portfolioConfig.instagram && (
              <a
                href={portfolioConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-border px-8 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Instagram
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <ContactCTA />
    </div>
  );
}
