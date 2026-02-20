import { portfolioConfig } from "@/data/portfolio";
import { motion } from "framer-motion";
import { EnvelopeSimple, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";
import { Link } from "wouter";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { funnel } from "@/lib/funnel";

const spring = { type: "spring" as const, stiffness: 300, damping: 30 };

const contactLinks = [
  {
    href: `mailto:${portfolioConfig.email}`,
    icon: EnvelopeSimple,
    label: portfolioConfig.email,
  },
  ...(portfolioConfig.instagram
    ? [{ href: portfolioConfig.instagram, icon: InstagramLogo, label: "Instagram" }]
    : []),
  ...(portfolioConfig.linkedin
    ? [{ href: portfolioConfig.linkedin, icon: LinkedinLogo, label: "LinkedIn" }]
    : []),
];

export default function Contact() {
  const reduced = useReducedMotion();

  return (
    <div className="min-h-screen flex flex-col justify-center py-24 sm:py-32">
      <motion.section
        className="container text-left max-w-2xl"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? { duration: 0 } : spring}
      >
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground/60 font-medium mb-4">
          Get in touch
        </p>
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter text-foreground leading-none">
          Let's work<br />together
        </h1>

        <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md">
          Whether it's a wedding, an event, or something else entirely — reach out and let's make it happen.
        </p>

        <div className="mt-12 sm:mt-14 flex flex-col gap-2">
          {contactLinks.map(({ href, icon: Icon, label }, i) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="group flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors duration-200 py-3 border-b border-border/30 hover:border-border/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
              initial={reduced ? false : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={reduced ? { duration: 0 } : { ...spring, delay: 0.1 + i * 0.06 }}
            >
              {Icon && (
                <Icon
                  className="h-5 w-5 text-foreground/30 group-hover:text-primary/70 transition-colors shrink-0"
                  weight="regular"
                />
              )}
              <span className="text-base sm:text-lg font-medium flex-1">{label}</span>
              <span className="text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors text-sm">↗</span>
            </motion.a>
          ))}
        </div>

        <Link
          href="/"
          className="mt-12 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/50 hover:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          aria-label="Back to home"
        >
          ← Back
        </Link>
      </motion.section>
    </div>
  );
}
