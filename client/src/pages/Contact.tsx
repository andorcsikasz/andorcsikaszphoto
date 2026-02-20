import { portfolioConfig } from "@/data/portfolio";
import { motion } from "framer-motion";
import { EnvelopeSimple, InstagramLogo } from "@phosphor-icons/react";
import { Link } from "wouter";

const ease = [0.22, 1, 0.36, 1];

const contactLinks = [
  {
    href: `mailto:${portfolioConfig.email}`,
    icon: EnvelopeSimple,
    label: portfolioConfig.email,
  },
  ...(portfolioConfig.instagram
    ? [{ href: portfolioConfig.instagram, icon: InstagramLogo, label: "Instagram" }]
    : []),
];

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col justify-center py-32">
      <motion.section
        className="container text-left max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
      >
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
          Contact
        </h1>

        <div className="mt-10 flex flex-col gap-5">
          {contactLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="group flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              {Icon && (
                <Icon className="h-5 w-5 text-foreground/40" weight="regular" />
              )}
              <span className="text-[15px] font-medium">{label}</span>
            </a>
          ))}
        </div>

        <Link
          href="/"
          className="mt-14 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
        >
          Back
        </Link>
      </motion.section>
    </div>
  );
}
