import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Copy, List, X } from "@phosphor-icons/react";
import { CookieNotice } from "@/components/CookieNotice";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const EMAIL = "info@jovokepp.hu";

function CopyEmailButton({ email, lang }: { email: string; lang: "hu" | "en" }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const input = document.createElement("input");
        input.value = email;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silently fail; user can still select/copy manually
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 text-[#00A3C9] font-bold hover:text-[#0095b8] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3C9] focus-visible:ring-offset-2 rounded transition-colors"
      title={lang === "hu" ? "Másolás" : "Copy"}
    >
      {email}
      <Copy className="w-4 h-4 shrink-0 opacity-70" weight="bold" />
      {copied && (
        <span className="text-sm text-green-600 font-medium">
          {lang === "hu" ? "✓ Másolva" : "✓ Copied"}
        </span>
      )}
    </button>
  );
}

const navItems = [
  { label: "Programok", labelEn: "Programs", href: "/#offer" },
  { label: "Projektek", labelEn: "Projects", href: "/projects" },
  { label: "Rólunk", labelEn: "About", href: "/about" },
  { label: "Partnerek", labelEn: "Partners", href: "/partners" },
  { label: "Kapcsolat", labelEn: "Contact", href: "/contact" },
  { label: "GYIK", labelEn: "FAQ", href: "/info" },
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

  useEffect(() => {
    document.documentElement.lang = lang === "hu" ? "hu" : "en";
  }, [lang]);

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [mobileNavOpen]);

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileNavOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafcfd] flex flex-col">
      {/* Nav */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
          "bg-white/90 backdrop-blur-xl border-b border-slate-200/60",
          scrolled ? "py-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]" : "py-4 sm:py-5"
        )}
      >
        <div className="container flex items-center justify-between gap-2">
          <Link
            to="/"
            className="font-display text-lg sm:text-xl font-bold text-slate-900 hover:text-[#00A3C9] transition-colors tracking-tight"
          >
            JÖVŐKÉPP
          </Link>
          {/* Mobile: language selector + menu button */}
          <div className="flex items-center gap-1 lg:hidden">
            <div className="flex gap-1 mr-1">
              <button
                onClick={() => setLang("hu")}
                className={cn(
                  "text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-200",
                  lang === "hu"
                    ? "bg-[#00A3C9]/12 text-[#00A3C9]"
                    : "text-slate-600 hover:bg-slate-100"
                )}
                aria-label="Magyar"
              >
                HU
              </button>
              <button
                onClick={() => setLang("en")}
                className={cn(
                  "text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-200",
                  lang === "en"
                    ? "bg-[#00A3C9]/12 text-[#00A3C9]"
                    : "text-slate-600 hover:bg-slate-100"
                )}
                aria-label="English"
              >
                EN
              </button>
            </div>
            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="p-2.5 -mr-2 text-slate-600 hover:text-[#00A3C9] hover:bg-slate-100 rounded-xl transition-all duration-200 active:scale-95"
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
            >
              {mobileNavOpen ? (
                <X className="w-5 h-5" weight="bold" />
              ) : (
                <List className="w-5 h-5" weight="bold" />
              )}
            </button>
          </div>
          {/* Desktop nav */}
          <div className="hidden lg:flex flex-row items-center gap-7 xl:gap-9">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-[15px] font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {lang === "hu" ? item.label : item.labelEn}
              </Link>
            ))}
            <div className="flex gap-1">
              <button
                onClick={() => setLang("hu")}
                className={cn(
                  "text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-200",
                  lang === "hu"
                    ? "bg-[#00A3C9]/12 text-[#00A3C9]"
                    : "text-slate-600 hover:bg-slate-100"
                )}
                aria-label="Magyar"
              >
                HU
              </button>
              <button
                onClick={() => setLang("en")}
                className={cn(
                  "text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-200",
                  lang === "en"
                    ? "bg-[#00A3C9]/12 text-[#00A3C9]"
                    : "text-slate-600 hover:bg-slate-100"
                )}
                aria-label="English"
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile menu with animation */}
          <AnimatePresence>
            {mobileNavOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="fixed inset-0 top-0 pt-16 lg:hidden bg-black/20 backdrop-blur-sm z-40"
                  onClick={() => setMobileNavOpen(false)}
                  aria-hidden
                />
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="fixed left-0 right-0 top-16 z-50 lg:hidden bg-white border-b border-slate-200/80 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.1)] overflow-hidden"
                >
                  <div className="py-3 px-4">
                    {navItems.map((item, i) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.03 + i * 0.025, duration: 0.2, ease: "easeOut" }}
                      >
                        <Link
                          to={item.href}
                          onClick={() => setMobileNavOpen(false)}
                          className="block text-[15px] font-medium text-slate-600 hover:text-slate-900 py-3 px-3 rounded-xl hover:bg-slate-100 transition-colors"
                        >
                          {lang === "hu" ? item.label : item.labelEn}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>

      {/* Footer */}
      <footer className="py-14 sm:py-16 text-center text-[15px] text-slate-600 border-t border-slate-200/60 bg-slate-50/80">
        <div className="container space-y-6">
          <p className="text-slate-800 flex flex-wrap items-center justify-center gap-2 font-medium">
            {lang === "hu" ? "Kérdésed van? Írj nekünk:" : "Questions? Write to"}{" "}
            <CopyEmailButton email={EMAIL} lang={lang} />
          </p>

          {/* Erasmus+ visibility: EU emblem + disclaimer */}
          <div className="flex flex-col items-center gap-3">
            <a
              href="https://erasmus-plus.ec.europa.eu/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <img src="/eu-flag.svg" alt="" className="w-12 h-8 object-contain" aria-hidden />
              <span className="font-semibold">
                {lang === "hu" ? "Az Európai Unió társfinanszírozásával" : "Co-funded by the European Union"}
              </span>
              <span className="text-xs opacity-70">↗</span>
            </a>
            <p className="text-xs text-slate-500 max-w-xl">
              {lang === "hu"
                ? "Az Európai Unió és az EACEA nem tartozik felelősséggel ezért a honlap tartalma miatt."
                : "The European Union and EACEA are not responsible for the content of this website."}
            </p>
            <p className="text-xs text-slate-500">
              {lang === "hu" ? "OID:" : "OID:"} <span className="font-mono">—</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link to="/organisations" className="text-slate-600 hover:text-[#00A3C9] transition-colors">
              {lang === "hu" ? "Szervezetek" : "Organisations"}
            </Link>
            <Link to="/privacy" className="text-slate-600 hover:text-[#00A3C9] transition-colors">
              {lang === "hu" ? "Adatvédelem" : "Privacy"}
            </Link>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">
              JÖVŐKÉPP Egyesület · {lang === "hu" ? "Alapítva 2024" : "Founded 2024"}
            </span>
          </div>
        </div>
      </footer>

      <CookieNotice lang={lang} />
    </div>
  );
}
