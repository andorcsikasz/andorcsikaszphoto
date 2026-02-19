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

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col justify-center py-32">
      <motion.section
        className="container text-left max-w-xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px 0px" }}
        variants={container}
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-[2.5rem] font-light tracking-tight text-foreground leading-[1.25]"
          variants={item}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Let's work together
        </motion.h1>
        <motion.p
          className="mt-6 text-[15px] text-muted-foreground font-normal leading-relaxed"
          variants={item}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          For commissions, collaborations, or just to say hello.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col gap-6"
          variants={container}
        >
          {contactLinks.map(({ href, icon: Icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="group flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors duration-200"
              variants={item}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="flex h-8 w-8 items-center justify-center text-foreground/40 group-hover:text-foreground transition-colors">
                <Icon className="h-[18px] w-[18px]" weight="regular" />
              </span>
              <span className="text-[15px] font-normal">{label}</span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div variants={item} transition={{ duration: 0.6 }}>
          <Link href="/">
            <button
              type="button"
              className="mt-16 text-[13px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              ← Back
            </button>
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
}
