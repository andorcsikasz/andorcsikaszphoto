import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { portfolioConfig } from "@/data/portfolio";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { List } from "@phosphor-icons/react";

const navItems = [
  { label: "About me", href: "/#about" },
  { label: "Work", href: "/#work" },
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
        const isActive = item.href === "/contact" && location === "/contact";
        return (
          <a
            key={item.href}
            href={item.href}
            onClick={onClick}
            className={`text-[13px] uppercase tracking-[0.1em] font-light transition-colors duration-200 ${
              mobile ? "px-4 py-4 min-h-[52px] text-sm tracking-[0.1em]" : "px-5 py-2"
            } ${
              isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.label}
          </a>
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
        <Button variant="ghost" size="icon" className="md:hidden h-10 w-10 rounded-none">
          <List className="h-5 w-5" weight="regular" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] p-0 rounded-none border-l">
        <div className="flex flex-col h-full pt-20">
          <nav className="flex flex-col p-6">
            <NavLinks onClick={() => setOpen(false)} mobile />
          </nav>
          <div className="mt-auto p-6 pt-8 border-t border-border/50 flex flex-col gap-4">
            {portfolioConfig.instagram && (
              <a
                href={portfolioConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              >
                Instagram
              </a>
            )}
            <a
              href={`mailto:${portfolioConfig.email}`}
              className="text-[13px] tracking-wide text-muted-foreground hover:text-foreground transition-colors"
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
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full bg-background/60 backdrop-blur-2xl">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[13px] uppercase tracking-[0.15em] font-medium text-foreground">
              {portfolioConfig.name}
            </span>
            <span className="text-[13px] uppercase tracking-[0.15em] font-light text-muted-foreground">
              photography
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <NavLinks />
          </nav>

          <MobileNav />
        </div>
      </header>

      <main className="flex-1 overflow-x-hidden">{children}</main>

      <footer className="py-12 border-t border-border/30">
        <div className="container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <span className="text-[13px] uppercase tracking-[0.15em] font-medium text-muted-foreground">
            {portfolioConfig.name}
          </span>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <a
              href={portfolioConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href={`mailto:${portfolioConfig.email}`}
              className="text-[13px] tracking-wide text-muted-foreground hover:text-foreground transition-colors"
            >
              {portfolioConfig.email}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
