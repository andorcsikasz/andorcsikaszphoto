import { portfolioConfig } from "@/data/portfolio";
import { motion } from "framer-motion";
import {
  EnvelopeSimple,
  InstagramLogo,
  LinkedinLogo,
  TwitterLogo,
} from "@phosphor-icons/react";
import { Link } from "wouter";

const contactLinks = [
  { href: `mailto:${portfolioConfig.email}`, icon: EnvelopeSimple, label: portfolioConfig.email },
  ...(portfolioConfig.instagram ? [{ href: portfolioConfig.instagram, icon: InstagramLogo, label: "@andorcsikasz" }] : []),
  ...(portfolioConfig.twitter ? [{ href: portfolioConfig.twitter, icon: TwitterLogo, label: "Twitter" }] : []),
  ...(portfolioConfig.linkedin ? [{ href: portfolioConfig.linkedin, icon: LinkedinLogo, label: "LinkedIn" }] : []),
];

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-24">
      <motion.section
        className="text-center max-w-xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-portfolio text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight">
          Let's work together
        </h1>
        <p className="mt-6 text-muted-foreground text-lg">
          For commissions, collaborations, or just to say hello.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
          {contactLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border hover:border-foreground/30 transition-colors">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium">{label}</span>
            </a>
          ))}
        </div>

        <Link href="/">
          <motion.button
            type="button"
            className="mt-16 text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to portfolio
          </motion.button>
        </Link>
      </motion.section>
    </div>
  );
}
