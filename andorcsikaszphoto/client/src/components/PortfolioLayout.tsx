import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { portfolioConfig } from "@/data/portfolio";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { List } from "@phosphor-icons/react";
import { Suspense } from "react";
import Silk from "@/components/Silk";
import { motion } from "framer-motion";

const navItems = [
  { label: "Photography", href: "/photography" },
  { label: "Drone", href: "/drone" },
  { label: "Sandbox", href: "/sandbox" },
  { label: "Contact", href: "/contact" },
];

function NavLinks({
  onClick,
  mobile = false,
}: {
  onClick?: () => void;
  mobile?: boolean;
}) {
  const [location] = useLocation();

  return (
    <>
      {navItems.map((item) => {
        const isActive = location === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClick}
            className={`
              relative font-headline font-bold text-base sm:text-lg uppercase tracking-tighter
              transition-colors duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm
              ${mobile ? "px-4 py-4 min-h-[52px] flex items-center" : "px-4 py-2.5"}
              ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}
            `}
          >
            {item.label}
            {isActive && !mobile && (
              <motion.span
                layoutId="nav-underline"
                className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-foreground rounded-full"
                aria-hidden
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
          </Link>
        );
      })}
    </>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-10 w-10 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <List className="h-5 w-5" weight="regular" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] p-0 rounded-none border-l">
        <div className="flex flex-col h-full pt-20">
          <nav className="flex flex-col p-6" aria-label="Main">
            <NavLinks onClick={() => setOpen(false)} mobile />
          </nav>
          <div className="mt-auto p-6 pt-8 border-t border-border/50 flex flex-col gap-4">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
            className="text-base tracking-wide text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm py-1"
          >
            Contact
          </Link>
            {portfolioConfig.instagram && (
              <a
                href={portfolioConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base tracking-wide text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm py-1"
                aria-label="Instagram"
              >
                Instagram
              </a>
            )}
            {portfolioConfig.linkedin && (
              <a
                href={portfolioConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base tracking-wide text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm py-1"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
            )}
            <a
              href={`mailto:${portfolioConfig.email}`}
              className="text-base tracking-wide text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm py-1"
            >
              {portfolioConfig.email}
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [location] = useLocation();
  const isLanding = location === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`relative min-h-screen flex flex-col overflow-x-hidden ${
        isLanding ? "h-screen overflow-hidden" : ""
      }`}
    >
      <Suspense fallback={null}>
        <Silk
          speed={5}
          scale={1}
          color="#5B3BFF"
          noiseIntensity={1.5}
          rotation={0}
          opacity={1}
          className="pointer-events-none"
        />
      </Suspense>
      <div className="relative z-10 flex min-h-screen flex-1 flex-col bg-black/35 backdrop-blur-[2px]">
      <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-white/[0.12] bg-black/75 backdrop-blur-2xl shadow-lg shadow-black/20"
          : "border-white/[0.07] bg-black/40 backdrop-blur-xl"
      }`}>
        <div className="container flex h-16 sm:h-20 items-center justify-between">
          <Link
            href="/"
            className="font-headline font-extrabold text-xl sm:text-2xl uppercase tracking-tighter text-foreground hover:text-foreground/70 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            {portfolioConfig.name}
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Main">
            <NavLinks />
          </nav>

          <MobileNav />
        </div>
      </header>

      <main className={`flex-1 overflow-x-hidden ${isLanding ? "overflow-hidden" : "overflow-y-auto"}`}>{children}</main>

      {!isLanding && (
      <footer className="py-10 sm:py-12 border-t border-border/30">
        <div className="container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-sm uppercase tracking-[0.15em] font-bold text-foreground/80">
              {portfolioConfig.name}
            </span>
            <span className="text-xs text-muted-foreground/60 tracking-wide">
              © {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <Link
              href="/contact"
              className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            >
              Contact
            </Link>
            {portfolioConfig.instagram && (
              <a
                href={portfolioConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                aria-label="Instagram"
              >
                Instagram
              </a>
            )}
            {portfolioConfig.linkedin && (
              <a
                href={portfolioConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
            )}
            <a
              href={`mailto:${portfolioConfig.email}`}
              className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            >
              {portfolioConfig.email}
            </a>
          </div>
        </div>
      </footer>
      )}
      </div>
    </div>
  );
}
