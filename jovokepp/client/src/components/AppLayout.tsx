import { cn } from "@/lib/utils";
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

  return (
    <div className="min-h-screen bg-[#fbf9f6] flex flex-col">
      {/* Nav */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          "bg-[#fbf9f6]/85 backdrop-blur-xl border-b border-black/5",
          scrolled ? "py-2" : "py-4"
        )}
      >
        <div className="container flex items-center justify-between">
          <a
            href="#"
            className="font-serif text-xl font-bold text-[#003399] hover:opacity-80 transition-opacity"
          >
            JÖVŐKÉPP
          </a>
          <div className="flex items-center gap-6 md:gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[#536471] hover:text-[#003399] transition-colors"
              >
                {lang === "hu" ? item.label : item.labelEn}
              </a>
            ))}
            <div className="flex gap-1">
              <button
                onClick={() => setLang("hu")}
                className={cn(
                  "text-xs font-semibold px-2 py-1 rounded-md transition-colors",
                  lang === "hu"
                    ? "bg-[#003399]/10 text-[#003399]"
                    : "text-[#536471] hover:bg-[#003399]/5"
                )}
                aria-label="Magyar"
              >
                HU
              </button>
              <button
                onClick={() => setLang("en")}
                className={cn(
                  "text-xs font-semibold px-2 py-1 rounded-md transition-colors",
                  lang === "en"
                    ? "bg-[#003399]/10 text-[#003399]"
                    : "text-[#536471] hover:bg-[#003399]/5"
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
      <footer className="py-10 text-center text-sm text-[#536471] border-t border-black/5 bg-[#fbf9f6]">
        <div className="container">
          <p>
            {lang === "hu" ? "Kérdésed van? Írj nekünk:" : "Questions? Write to"}{" "}
            <a
              href="mailto:info@jovokepp.hu"
              className="text-[#003399] font-medium hover:opacity-80"
            >
              info@jovokepp.hu
            </a>
          </p>
          <p className="mt-2">🇪🇺 {lang === "hu" ? "Az Európai Unió támogatásával" : "Funded by the European Union"}</p>
        </div>
      </footer>
    </div>
  );
}
