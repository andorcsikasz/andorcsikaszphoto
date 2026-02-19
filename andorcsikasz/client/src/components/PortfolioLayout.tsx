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
            className={`text-[15px] font-normal transition-colors duration-200 ${
              mobile ? "px-4 py-4 min-h-[52px] text-base" : "px-4 py-2"
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
      className="text-muted-foreground hover:text-foreground rounded-none h-9 w-9"
    >
      {theme === "light" ? (
        <Moon className="h-[18px] w-[18px]" weight="regular" />
      ) : (
        <Sun className="h-[18px] w-[18px]" weight="regular" />
      )}
    </Button>
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
                className="text-[15px] text-muted-foreground hover:text-foreground transition-colors"
              >
                Instagram
              </a>
            )}
            <a
              href={`mailto:${portfolioConfig.email}`}
              className="text-[15px] text-muted-foreground hover:text-foreground transition-colors"
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
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-[15px] font-medium tracking-tight text-foreground">
              Csíkász
            </span>
          </Link>

          <nav className="hidden md:flex items-center">
            <NavLinks />
          </nav>

          <div className="flex items-center gap-0">
            <ThemeToggle />
            <MobileNav />
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="py-12 border-t border-border/50">
        <div className="container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <span className="text-[15px] font-medium text-muted-foreground">
            {portfolioConfig.name}
          </span>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <a
              href={portfolioConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href={`mailto:${portfolioConfig.email}`}
              className="text-[15px] text-muted-foreground hover:text-foreground transition-colors"
            >
              {portfolioConfig.email}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
