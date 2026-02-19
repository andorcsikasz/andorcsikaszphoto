import { useThemeStore } from "@/store";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "@phosphor-icons/react";
import { Link, useLocation } from "wouter";
import { portfolioConfig } from "@/data/portfolio";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { List } from "@phosphor-icons/react";

const navItems = [
  { label: "Work", path: "/" },
  { label: "Contact", path: "/contact" },
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
        const isActive = location === item.path;
        return (
          <Link
            key={item.path}
            href={item.path}
            onClick={onClick}
            className={`font-medium transition-colors ${
              mobile
                ? "px-4 py-3 min-h-[48px] text-lg"
                : "px-3 py-2 text-sm"
            } ${
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme, switchable } = useThemeStore();
  if (!switchable) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="text-muted-foreground hover:text-foreground"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" weight="regular" />
      ) : (
        <Sun className="h-5 w-5" weight="regular" />
      )}
    </Button>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden h-10 w-10">
          <List className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] p-0">
        <div className="flex flex-col h-full pt-16">
          <nav className="flex flex-col gap-1 p-4">
            <NavLinks onClick={() => setOpen(false)} mobile />
          </nav>
          <div className="mt-auto p-4 border-t flex flex-col gap-2">
            {portfolioConfig.instagram && (
              <a
                href={portfolioConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Instagram
              </a>
            )}
            <a
              href={`mailto:${portfolioConfig.email}`}
              className="text-sm text-muted-foreground hover:text-foreground"
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
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container flex h-14 sm:h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="font-portfolio text-xl sm:text-2xl font-medium tracking-tight">
              Csíkász
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <NavLinks />
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <MobileNav />
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border/40 py-8">
        <div className="container flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-portfolio text-lg text-muted-foreground">
            {portfolioConfig.name}
          </span>
          <div className="flex items-center gap-6">
            <a
              href={portfolioConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href={`mailto:${portfolioConfig.email}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {portfolioConfig.email}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
