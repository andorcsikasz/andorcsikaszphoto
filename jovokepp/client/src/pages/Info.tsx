import { CaretDown } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const GOOGLE_FLIGHTS_URL = "https://www.google.com/flights";

const infoTranslations = {
  hu: {
    infoLabel: "Információk",
    infoTitle: "Gyakran ismételt kérdések",
    backToHome: "Főoldal",
    info1Q: "Mik ezek a projektek?",
    info1A: "Az Erasmus+ ifjúsági projektek rövid (5–21 napos) programok, ahol különböző országok fiataljai együtt tanulnak nem formális módszerekkel: workshopok, viták, szerepjátékok, outdoor tevékenységek. A képzések ifjúsági munkásoknak 2–60 naposak. Mindegyik program EU támogatással működik: az utazás, szállás és programköltségek nagy része fedezett.",
    info2Q: "Hogyan jelentkezhetek?",
    info2A: "Írj nekünk e-mailben: info@jovokepp.hu. Add meg, hogy milyen típusú programra kívánsz jelentkezni (ifjúsági csere, képzés). Küldünk részleteket, jelentkezési feltételeket és a kitöltendő űrlapot. A jelentkezés általában ingyenes.",
    info3Q: "Jegykeresés – Google Flights",
    info3A: "A résztvevőknek saját maguknak kell repülőjegyet vásárolniuk; az Erasmus+ utazási támogatás utólag téríti a költségeket. Jegykereséshez használjuk a Google Flights-ot:",
    info3Link: "Repülőjegyek keresése a Google Flights-on",
    info4Q: "Mi a visszatérítés (reimbursement)?",
    info4A: "A visszatérítés azt jelenti, hogy a program végén az Erasmus+ támogatás utólag kifizeti az utazási költségeidet (repülő, vonat, busz) egy előre meghatározott maximális összegig. A távolságtól függően különböző összegek érvényesek. Általában 2–4 héten belül történik a visszafizetés a program után.",
    info5Q: "Hogyan indíthatsz saját projektet?",
    info5A: "Ha szervezetként vagy csoportként saját Erasmus+ projektet szeretnél indítani, vedd fel velünk a kapcsolatot. Segítünk a pályázatírásban, partnerkutatásban és a projekt menedzsmentben. Előfeltétel: legális szervezet (egyesület, alapítvány, szociális vállalkozás) és minimum egy tapasztalt projektkoordinátor.",
  },
  en: {
    infoLabel: "Information",
    infoTitle: "Frequently asked questions",
    backToHome: "Home",
    info1Q: "What are these projects?",
    info1A: "Erasmus+ youth projects are short programmes (5–21 days for youth exchanges, 2–60 days for training) where young people from different countries learn together through non-formal methods: workshops, debates, role-plays, outdoor activities. All programmes are EU-funded: most travel, accommodation and program costs are covered.",
    info2Q: "How do I apply?",
    info2A: "Email us at info@jovokepp.hu. Tell us which type of programme you're interested in (youth exchange, training). We'll send you details, eligibility criteria and the application form. Participation is usually free.",
    info3Q: "Find flights – Google Flights",
    info3A: "Participants must buy their own travel tickets; Erasmus+ travel support reimburses costs after the programme. Use Google Flights to search for the best prices:",
    info3Link: "Search flights on Google Flights",
    info4Q: "What is reimbursement?",
    info4A: "Reimbursement means that after the programme, Erasmus+ funding pays back your travel costs (flight, train, bus) up to a pre-defined maximum amount based on distance. Payout usually happens 2–4 weeks after the programme ends.",
    info5Q: "How to start your own project?",
    info5A: "If you want to run your own Erasmus+ project as an organisation or group, get in touch with us. We help with grant writing, partner search and project management. Requirements: a legal entity (association, foundation, social enterprise) and at least one experienced project coordinator.",
  },
};

const infoItems = ["info1", "info2", "info3", "info4", "info5"] as const;

function InfoItem({
  itemKey,
  txt,
  lang,
  i,
}: {
  itemKey: (typeof infoItems)[number];
  txt: (typeof infoTranslations)["hu"];
  lang: "hu" | "en";
  i: number;
}) {
  const [open, setOpen] = useState(false);
  const qKey = itemKey + "Q";
  const aKey = itemKey + "A";
  const linkKey = itemKey + "Link";
  const hasLink = itemKey === "info3";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.04 }}
      className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_-8px_rgba(0,163,201,0.08)] hover:border-slate-300/80 transition-all duration-200"
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`faq-answer-${itemKey}`}
        id={`faq-question-${itemKey}`}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left font-semibold text-base sm:text-lg text-slate-900 hover:bg-slate-50/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3C9] focus-visible:ring-inset"
      >
        <span>{txt[qKey as keyof typeof txt]}</span>
        <CaretDown
          className={cn("w-5 h-5 shrink-0 text-[#00A3C9] transition-transform duration-200", open && "rotate-180")}
          weight="bold"
        />
      </button>
      <motion.div
        id={`faq-answer-${itemKey}`}
        role="region"
        aria-labelledby={`faq-question-${itemKey}`}
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.22 }}
        className="overflow-hidden"
      >
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 text-slate-700 text-[15px] sm:text-base leading-[1.65]">
          <p>{txt[aKey as keyof typeof txt]}</p>
          {hasLink && (
            <a
              href={GOOGLE_FLIGHTS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 font-semibold text-[#00A3C9] hover:text-[#0095b8] transition-colors"
            >
              {txt[linkKey as keyof typeof txt]}
              <span className="text-xs">↗</span>
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Info({ lang }: { lang: "hu" | "en" }) {
  const txt = infoTranslations[lang];

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: infoItems.map((k) => ({
        "@type": "Question",
        name: txt[`${k}Q` as keyof typeof txt],
        acceptedAnswer: {
          "@type": "Answer",
          text: txt[`${k}A` as keyof typeof txt],
        },
      })),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    script.id = "faq-schema";
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById("faq-schema");
      if (el) el.remove();
    };
  }, [lang, txt]);

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
          {txt.infoLabel}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-10 tracking-tight leading-[1.15]"
        >
          {txt.infoTitle}
        </motion.h1>
        <div className="max-w-2xl space-y-2">
          {infoItems.map((key, i) => (
            <InfoItem key={key} itemKey={key} txt={txt} lang={lang} i={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
