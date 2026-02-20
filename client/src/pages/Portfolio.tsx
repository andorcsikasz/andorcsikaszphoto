import { heroImage, portfolioConfig } from "@/data/portfolio";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "@phosphor-icons/react";

const ease = [0.25, 0.46, 0.45, 0.94];

function HeroSection() {
  return (
    <section className="relative h-[70vh] min-h-[400px] w-full overflow-hidden">
      <img
        src={heroImage}
        alt=""
        className="h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
        <motion.p
          className="text-white/90 text-sm sm:text-base font-medium tracking-wide max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Photography · Drone · Sandbox
        </motion.p>
      </div>
    </section>
  );
}

function IntroSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-[11px] uppercase tracking-[0.2em] font-medium text-muted-foreground mb-4">
            About
          </p>
          <p className="text-lg text-foreground leading-relaxed">
            Photography, aerial work, and personal projects. Based in Hungary.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function SectionLinks() {
  const links = [
    { href: "/photography", label: "Photography", desc: "Photos" },
    { href: "/drone", label: "Drone", desc: "Videos" },
    { href: "/sandbox", label: "Sandbox", desc: "Projects" },
  ];

  return (
    <section className="py-16 sm:py-20 border-t border-border/30">
      <div className="container">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
          {links.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.05 }}
            >
              <Link
                href={item.href}
                className="group flex items-center gap-4 text-foreground hover:text-muted-foreground transition-colors"
              >
                <span className="text-[13px] uppercase tracking-[0.15em] font-medium">
                  {item.label}
                </span>
                <span className="text-muted-foreground text-[13px]">{item.desc}</span>
                <ArrowRight className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" weight="regular" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactFooter() {
  return (
    <section className="py-16 sm:py-20 border-t border-border/30">
      <div className="container">
        <motion.div
          className="flex flex-wrap items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/contact"
            className="text-[13px] uppercase tracking-[0.15em] font-medium text-foreground hover:text-muted-foreground transition-colors"
          >
            Contact
          </Link>
          <a
            href={`mailto:${portfolioConfig.email}`}
            className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
          >
            {portfolioConfig.email}
          </a>
          {portfolioConfig.instagram && (
            <a
              href={portfolioConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              Instagram
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <HeroSection />
      <IntroSection />
      <SectionLinks />
      <ContactFooter />
    </div>
  );
}
