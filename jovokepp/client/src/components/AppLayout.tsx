import { cn } from "@/lib/utils";
import { List, X } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Programok", labelEn: "Programs", href: "#offer" },
  { label: "Értékeink", labelEn: "Values", href: "#values" },
  { label: "Projektek", labelEn: "Projects", href: "#projects" },
  { label: "Csatlakozz", labelEn: "Join", href: "#join" },
];

export function AppLayout({
  children,
  lang,
  setLang,
}: {
  children: React.ReactNode;
  lang: "hu" | "en";
  setLang: (l: "hu" | "en") => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Nav */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
          "bg-slate-50/95 backdrop-blur-md",
          scrolled
            ? "py-2.5 border-b border-black/[0.06] shadow-[0_1px_3px_rgba(0,51,153,0.04)]"
            : "py-3 sm:py-4 border-b border-transparent"
        )}
      >
        <div className="container flex items-center justify-between gap-2">
          <motion.a
            href="#"
            className="font-serif text-lg sm:text-xl font-bold text-[#003399] hover:opacity-80 transition-opacity"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            JÖVŐKÉPP
          </motion.a>
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="lg:hidden p-2.5 -mr-2 text-slate-600 hover:text-[#003399] hover:bg-[#003399]/8 rounded-xl transition-all duration-200 active:scale-95"
            aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
          >
            {mobileNavOpen ? (
              <X className="w-5 h-5" weight="bold" />
            ) : (
              <List className="w-5 h-5" weight="bold" />
            )}
          </button>
          {/* Desktop nav + mobile dropdown */}
          <div
            className={cn(
              "flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-6 xl:gap-8",
              "absolute lg:relative top-full left-0 right-0 lg:top-0",
              "bg-white lg:bg-transparent border-b lg:border-b-0 border-black/[0.06] lg:border-0",
              "py-4 px-4 lg:py-0 lg:px-0 shadow-lg lg:shadow-none",
              !mobileNavOpen && "hidden lg:flex"
            )}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
                className="text-sm font-medium text-slate-600 hover:text-[#003399] hover:bg-[#003399]/8 transition-colors py-3 px-3 rounded-lg lg:px-0 lg:py-0 lg:hover:bg-transparent lg:rounded-none"
              >
                {lang === "hu" ? item.label : item.labelEn}
              </a>
            ))}
            <div className="flex gap-1 pt-4 mt-2 lg:pt-0 lg:mt-0 border-t lg:border-t-0 border-black/[0.06] lg:border-0">
              <button
                onClick={() => setLang("hu")}
                className={cn(
                  "text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200",
                  lang === "hu"
                    ? "bg-[#003399]/12 text-[#003399]"
                    : "text-slate-600 hover:bg-[#003399]/8"
                )}
                aria-label="Magyar"
              >
                HU
              </button>
              <button
                onClick={() => setLang("en")}
                className={cn(
                  "text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200",
                  lang === "en"
                    ? "bg-[#003399]/12 text-[#003399]"
                    : "text-slate-600 hover:bg-[#003399]/8"
                )}
                aria-label="English"
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="py-12 text-center text-sm text-slate-600 border-t border-slate-200 bg-slate-100">
        <div className="container">
          <p>
            {lang === "hu" ? "Kérdésed van? Írj nekünk:" : "Questions? Write to"}{" "}
            <a
              href="mailto:info@jovokepp.hu"
              className="text-[#003399] font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003399] focus-visible:ring-offset-2 rounded"
            >
              info@jovokepp.hu
            </a>
          </p>
          <a
            href="https://erasmus-plus.ec.europa.eu/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-slate-500 hover:text-[#003399] transition-colors"
          >
            <span className="font-bold text-[#003399]">EU</span>
            {lang === "hu" ? "Az Európai Unió támogatásával" : "Funded by the European Union"}
            <span className="text-xs">↗</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
