import { portfolioConfig } from "@/data/portfolio";
import { motion } from "framer-motion";
import { EnvelopeSimple, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";
import { Link } from "wouter";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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
        className="container text-left max-w-xl"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? { duration: 0 } : spring}
      >
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
          Contact
        </h1>

        <div className="mt-10 sm:mt-12 flex flex-col gap-6">
          {contactLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="group flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors duration-200 py-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {Icon && (
                <Icon
                  className="h-5 w-5 text-foreground/40 group-hover:text-foreground/70 transition-colors shrink-0"
                  weight="regular"
                />
              )}
              <span className="text-base sm:text-lg font-medium">{label}</span>
            </a>
          ))}
        </div>

        <Link
          href="/"
          className="mt-14 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          aria-label="Back to home"
        >
          Back
        </Link>
      </motion.section>
    </div>
  );
}
