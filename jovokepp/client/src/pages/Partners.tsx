import { CaretLeft, CaretRight, Users } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const partners = [
  { id: "1", name: "Youth for Europe CZ", country: "CZ" },
  { id: "2", name: "Democracy Lab Slovakia", country: "SK" },
  { id: "3", name: "Media Literacy Austria", country: "AT" },
  { id: "4", name: "Eco Youth Network", country: "DE" },
];

const partnersTranslations = {
  hu: {
    label: "Partnerek",
    title: "Együttműködő partnereink",
    backToHome: "Főoldal",
    prev: "Előző partner",
    next: "Következő partner",
    becomePartnerTitle: "Legyél partnerünk",
    becomePartnerText: "Erasmus+ projektekben tapasztalt szervezetként keresünk partnereket ifjúsági cserékhez, képzésekhez és KA2 projektekhez. Ha szervezetként vagy csoportként együttműködnél velünk, vedd fel a kapcsolatot.",
    contactForPartnership: "Kapcsolat a partnerséghez",
    partnerEmail: "info@jovokepp.hu",
  },
  en: {
    label: "Partners",
    title: "Partner organisations we work with",
    backToHome: "Home",
    prev: "Previous partner",
    next: "Next partner",
    becomePartnerTitle: "Become a Partner",
    becomePartnerText: "As an organisation experienced in Erasmus+ projects, we are looking for partners for youth exchanges, training courses and KA2 projects. If you would like to collaborate with us, get in touch.",
    contactForPartnership: "Contact for partnership",
    partnerEmail: "info@jovokepp.hu",
  },
};

export default function Partners({ lang }: { lang: "hu" | "en" }) {
  const txt = partnersTranslations[lang];
  const [activeIndex, setActiveIndex] = useState(0);

  const goPrev = () => setActiveIndex((i) => (i === 0 ? partners.length - 1 : i - 1));
  const goNext = () => setActiveIndex((i) => (i === partners.length - 1 ? 0 : i + 1));

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
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-12 tracking-tight leading-[1.15]"
        >
          {txt.title}
        </motion.h1>

        <div className="max-w-2xl">
          <div className="relative overflow-hidden rounded-2xl min-h-[160px] sm:min-h-[180px]">
            <AnimatePresence mode="wait" initial={false}>
              {partners.map(
                (p, i) =>
                  i === activeIndex && (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="absolute inset-0 flex items-center gap-4 sm:gap-6 px-6 py-6 sm:py-8 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)]"
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#00A3C9]/10 flex items-center justify-center shrink-0">
                        <Users className="w-7 h-7 sm:w-8 sm:h-8 text-[#00A3C9]" weight="duotone" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg sm:text-xl text-slate-900">{p.name}</p>
                        <p className="text-sm sm:text-base text-slate-500 mt-0.5">{p.country}</p>
                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6">
            <button
              type="button"
              onClick={goPrev}
              aria-label={txt.prev}
              className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-sm text-slate-600 hover:text-[#00A3C9] hover:border-[#00A3C9]/30 hover:bg-[#00A3C9]/5 transition-all duration-200"
            >
              <CaretLeft className="w-5 h-5" weight="bold" />
            </button>
            <div className="flex gap-2">
              {partners.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-label={`${txt.label} ${i + 1}`}
                  aria-current={i === activeIndex}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-200",
                    i === activeIndex ? "bg-[#00A3C9] scale-125" : "bg-slate-300 hover:bg-slate-400"
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={goNext}
              aria-label={txt.next}
              className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-sm text-slate-600 hover:text-[#00A3C9] hover:border-[#00A3C9]/30 hover:bg-[#00A3C9]/5 transition-all duration-200"
            >
              <CaretRight className="w-5 h-5" weight="bold" />
            </button>
          </div>
        </div>

        {/* Become a Partner */}
        <section className="mt-16 pt-16 border-t border-slate-200/80 max-w-2xl">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mb-4 tracking-tight">
            {txt.becomePartnerTitle}
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">{txt.becomePartnerText}</p>
          <a
            href={`mailto:${txt.partnerEmail}?subject=${encodeURIComponent(lang === "hu" ? "Partneri együttműködés" : "Partnership enquiry")}`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#00A3C9] text-white font-semibold hover:bg-[#0095b8] transition-colors"
          >
            {txt.contactForPartnership} →
          </a>
        </section>
      </div>
    </main>
  );
}
