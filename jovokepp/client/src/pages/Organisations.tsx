import { MagnifyingGlass, MapPin } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";

type OrgType = "youth" | "training" | "digital";

const organisations: {
  id: string;
  name: string;
  country: string;
  countryNameHu: string;
  countryNameEn: string;
  type: OrgType;
}[] = [
  { id: "1", name: "JÖVŐKÉPP Egyesület", country: "HU", countryNameHu: "Magyarország", countryNameEn: "Hungary", type: "youth" },
  { id: "2", name: "Youth for Europe CZ", country: "CZ", countryNameHu: "Csehország", countryNameEn: "Czech Republic", type: "youth" },
  { id: "3", name: "Democracy Lab Slovakia", country: "SK", countryNameHu: "Szlovákia", countryNameEn: "Slovakia", type: "training" },
  { id: "4", name: "Media Literacy Austria", country: "AT", countryNameHu: "Ausztria", countryNameEn: "Austria", type: "digital" },
  { id: "5", name: "Eco Youth Network", country: "DE", countryNameHu: "Németország", countryNameEn: "Germany", type: "youth" },
  { id: "6", name: "Digital Futures Poland", country: "PL", countryNameHu: "Lengyelország", countryNameEn: "Poland", type: "digital" },
  { id: "7", name: "Inclusion Hub Romania", country: "RO", countryNameHu: "Románia", countryNameEn: "Romania", type: "training" },
  { id: "8", name: "Intercultural Bridge", country: "SI", countryNameHu: "Szlovénia", countryNameEn: "Slovenia", type: "youth" },
  { id: "9", name: "Non-Formal Education Center", country: "HR", countryNameHu: "Horvátország", countryNameEn: "Croatia", type: "training" },
  { id: "10", name: "Youth Digital Lab", country: "EE", countryNameHu: "Észtország", countryNameEn: "Estonia", type: "digital" },
];

const orgTypes: OrgType[] = ["youth", "training", "digital"];

const organisationsTranslations = {
  hu: {
    label: "Szervezetek",
    title: "Elérhető szervezetek",
    backToHome: "Főoldal",
    searchPlaceholder: "Keresés név alapján…",
    filterByType: "Típus szerint",
    filterByCountry: "Ország szerint",
    allTypes: "Összes típus",
    allCountries: "Összes ország",
    noResults: "Nincs találat",
    resultsCount: (n: number) => (n === 1 ? "1 szervezet" : `${n} szervezet`),
    clearFilters: "Szűrők törlése",
    orgTypeYouth: "Ifjúsági csere",
    orgTypeTraining: "Képzés",
    orgTypeDigital: "Digitális projekt",
  },
  en: {
    label: "Organisations",
    title: "Available organisations",
    backToHome: "Home",
    searchPlaceholder: "Search by name…",
    filterByType: "Filter by type",
    filterByCountry: "Filter by country",
    allTypes: "All types",
    allCountries: "All countries",
    noResults: "No results found",
    resultsCount: (n: number) => (n === 1 ? "1 organisation" : `${n} organisations`),
    clearFilters: "Clear filters",
    orgTypeYouth: "Youth exchange",
    orgTypeTraining: "Training",
    orgTypeDigital: "Digital project",
  },
};

const orgTypeKeys: Record<OrgType, keyof typeof organisationsTranslations.hu> = {
  youth: "orgTypeYouth",
  training: "orgTypeTraining",
  digital: "orgTypeDigital",
};

function Organisations({ lang }: { lang: "hu" | "en" }) {
  const txt = organisationsTranslations[lang];
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<OrgType | "">("");
  const [countryFilter, setCountryFilter] = useState<string>("");

  const countryName = (o: (typeof organisations)[0]) =>
    lang === "hu" ? o.countryNameHu : o.countryNameEn;
  const typeLabel = (type: OrgType) => txt[orgTypeKeys[type]];

  const countries = useMemo(() => {
    const map = new Map<string, string>();
    organisations.forEach((o) => {
      map.set(o.country, countryName(o));
    });
    return Array.from(map.entries()).sort((a, b) => a[1].localeCompare(b[1]));
  }, [lang]);

  const filtered = useMemo(() => {
    return organisations.filter((o) => {
      const q = query.toLowerCase().trim();
      const matchQuery = !q || o.name.toLowerCase().includes(q) || countryName(o).toLowerCase().includes(q) || typeLabel(o.type).toLowerCase().includes(q);
      const matchType = !typeFilter || o.type === typeFilter;
      const matchCountry = !countryFilter || o.country === countryFilter;
      return matchQuery && matchType && matchCountry;
    });
  }, [query, typeFilter, countryFilter, lang]);

  const hasActiveFilters = typeFilter !== "" || countryFilter !== "" || query !== "";

  const clearFilters = () => {
    setQuery("");
    setTypeFilter("");
    setCountryFilter("");
  };

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
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-10 tracking-tight leading-[1.15]"
        >
          {txt.title}
        </motion.h1>

        {/* Structured filters */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
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
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200/80 bg-white text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00A3C9]/30 focus:border-[#00A3C9]/50 transition-colors"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <label htmlFor="org-type-filter" className="text-sm font-medium text-slate-500 sm:sr-only">
                  {txt.filterByType}
                </label>
                <select
                  id="org-type-filter"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter((e.target.value || "") as OrgType | "")}
                  className="px-4 py-3.5 rounded-xl border border-slate-200/80 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A3C9]/30 focus:border-[#00A3C9]/50 transition-colors min-w-[180px]"
                >
                  <option value="">{txt.allTypes}</option>
                  {orgTypes.map((t) => (
                    <option key={t} value={t}>
                      {typeLabel(t)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <label htmlFor="org-country-filter" className="text-sm font-medium text-slate-500 sm:sr-only">
                  {txt.filterByCountry}
                </label>
                <select
                  id="org-country-filter"
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                  className="px-4 py-3.5 rounded-xl border border-slate-200/80 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A3C9]/30 focus:border-[#00A3C9]/50 transition-colors min-w-[180px]"
                >
                  <option value="">{txt.allCountries}</option>
                  {countries.map(([code, name]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="px-4 py-3.5 rounded-xl border border-slate-200/80 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-colors text-sm font-medium whitespace-nowrap"
                >
                  {txt.clearFilters}
                </button>
              )}
            </div>
          </div>
          <p className="text-sm text-slate-500">{txt.resultsCount(filtered.length)}</p>
        </div>

        {/* Results list */}
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-slate-500 rounded-2xl bg-slate-50/60">
            {txt.noResults}
          </p>
        ) : (
          <ul className="space-y-3">
            {filtered.map((org, i) => (
              <motion.li
                key={org.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
              >
                <a
                  href="#join"
                  className={cn(
                    "flex flex-wrap items-center gap-3 sm:gap-5 p-4 sm:p-5 rounded-2xl border border-slate-200/80",
                    "bg-slate-50/40 hover:bg-white hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:border-slate-300/80",
                    "transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3C9] focus-visible:ring-offset-2"
                  )}
                >
                  <span className="font-semibold text-slate-900 text-base sm:text-lg">{org.name}</span>
                  <span className="flex items-center gap-1.5 text-sm text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-[#00A3C9] shrink-0" weight="duotone" />
                    {countryName(org)}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#00A3C9]/10 text-[#00A3C9]">
                    {typeLabel(org.type)}
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export default Organisations;
