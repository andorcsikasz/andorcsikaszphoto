import { MagnifyingGlass, MapPin } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

const projectsTranslations = {
  hu: {
    label: "Projektek",
    title: "Projekteink",
    backToHome: "Főoldal",
    current: "Aktuális projektek",
    archive: "Archívum",
    searchPlaceholder: "Keresés projekt vagy város alapján…",
    proj1: "Digitális Fiatal Lab",
    proj2: "Fiatalok a demokráciáért",
    proj3: "Média-műveltség Csere",
    proj4: "Ifjúsági Öko-túra",
    proj5: "Demokrácia Lab",
  },
  en: {
    label: "Projects",
    title: "Our Projects",
    backToHome: "Home",
    current: "Current projects",
    archive: "Archive",
    searchPlaceholder: "Search by project or city…",
    proj1: "Digital Youth Lab",
    proj2: "Youth for Democracy",
    proj3: "Media Literacy Exchange",
    proj4: "Youth Eco-Adventure",
    proj5: "Democracy Lab",
  },
};

const currentProjects = [
  { key: "proj1", location: "Budapest (HU)", date: "2025 Q2", image: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=600&q=80", imageAlt: "Budapest" },
  { key: "proj2", location: "Brno (CZ)", date: "2025 Q2", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=80", imageAlt: "Brno" },
  { key: "proj3", location: "Bécs (AT)", date: "2025 Q3", image: "https://images.unsplash.com/photo-1627564927144-6e4ceb2c1a15?w=600&q=80", imageAlt: "Vienna" },
];

const archiveProjects = [
  { key: "proj4", location: "Tatabánya (HU)", date: "2024 Q4", image: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=600&q=80", imageAlt: "Tatabánya" },
  { key: "proj5", location: "Pozsony (SK)", date: "2024 Q3", image: "https://images.unsplash.com/photo-1548013146-7243f659aa12?w=600&q=80", imageAlt: "Bratislava" },
];

export default function Projects({ lang }: { lang: "hu" | "en" }) {
  const txt = projectsTranslations[lang];
  const [tab, setTab] = useState<"current" | "archive">("current");
  const [query, setQuery] = useState("");
  const baseProjects = tab === "current" ? currentProjects : archiveProjects;
  const projects = baseProjects.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    const searchStr = `${txt[p.key as keyof typeof txt]} ${p.location} ${p.imageAlt}`.toLowerCase();
    return searchStr.includes(q);
  });

  return (
    <main className="min-h-screen bg-[#fafcfd] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#00A3C9]/6 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="container relative z-10 py-20 sm:py-28 md:py-32">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[15px] font-medium text-[#00A3C9] hover:text-[#0095b8] mb-10 transition-colors rounded-lg hover:bg-[#00A3C9]/8 px-3 py-2 -ml-3"
        >
          ← {txt.backToHome}
        </Link>
        <motion.span
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          className="block text-xs font-semibold tracking-[0.2em] uppercase text-[#00A3C9] mb-3"
        >
          {txt.label}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tight leading-[1.15]"
        >
          {txt.title}
        </motion.h1>

        {/* Full-width search bar */}
        <div className="w-full mb-6">
          <div className="relative w-full">
            <MagnifyingGlass
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
              weight="duotone"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={txt.searchPlaceholder}
              aria-label={txt.searchPlaceholder}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200/80 bg-white text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00A3C9]/30 focus:border-[#00A3C9]/50 transition-colors"
            />
          </div>
        </div>

        <div
          role="tablist"
          aria-label={lang === "hu" ? "Projekt kategóriák" : "Project categories"}
          className="flex gap-1 p-1 rounded-full bg-slate-200/60 w-fit mb-10"
        >
          <button
            type="button"
            role="tab"
            aria-selected={tab === "current"}
            onClick={() => setTab("current")}
            className={cn(
              "px-5 py-2.5 text-[15px] font-medium rounded-full transition-all",
              tab === "current" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
            )}
          >
            {txt.current}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "archive"}
            onClick={() => setTab("archive")}
            className={cn(
              "px-5 py-2.5 text-[15px] font-medium rounded-full transition-all",
              tab === "archive" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
            )}
          >
            {txt.archive}
          </button>
        </div>

        <div className="flex flex-col gap-4 sm:gap-5">
          {projects.length === 0 ? (
            <p className="py-12 text-center text-slate-500">
              {lang === "hu" ? "Nincs találat" : "No results found"}
            </p>
          ) : (
          projects.map((p, i) => (
            <motion.a
              key={p.key}
              href="#join"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={cn(
                "flex flex-col sm:flex-row overflow-hidden bg-white border rounded-2xl transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3C9] focus-visible:ring-offset-2",
                tab === "archive"
                  ? "border-slate-200/80 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.06)]"
                  : "border-slate-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_-12px_rgba(0,163,201,0.1)]"
              )}
            >
              <div className="relative w-full sm:w-44 lg:w-52 h-32 sm:min-h-[120px] shrink-0">
                <img src={p.image} alt={p.imageAlt} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-4 p-4 sm:p-5">
                <span className={cn("font-semibold", tab === "archive" ? "text-slate-600" : "text-slate-900")}>
                  {txt[p.key as keyof typeof txt]}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-[#00A3C9]" weight="duotone" />
                  {p.location}
                </span>
                <span className={cn("inline-flex w-fit px-2.5 py-1 rounded-lg text-xs font-semibold", tab === "archive" ? "bg-slate-200/80 text-slate-600" : "bg-[#00A3C9]/12 text-[#00A3C9]")}>
                  {p.date}
                </span>
              </div>
            </motion.a>
          )))
          }
        </div>
      </div>
    </main>
  );
}
