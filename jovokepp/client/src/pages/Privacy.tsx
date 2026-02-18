import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const privacyTranslations = {
  hu: {
    label: "Adatvédelem",
    title: "Adatvédelmi tájékoztató",
    backToHome: "Főoldal",
    intro: "A JÖVŐKÉPP Egyesület tiszteletben tartja az Ön adatait. Ez a tájékoztató a GDPR (2016/679. rendelet) szerinti adatkezelési gyakorlatunkat mutatja be.",
    controller: "Adatkezelő",
    controllerText: "JÖVŐKÉPP Egyesület, e-mail: info@jovokepp.hu",
    purposes: "Adatkezelés célja",
    purposesText: "Az e-mailben és kapcsolatfelvételi űrlapon megadott adatokat kizárólag a megkeresések megválaszolása, a jelentkezések kezelése és a kommunikáció céljából kezeljük.",
    legalBasis: "Jogi alap",
    legalBasisText: "Az adatkezelés jogalapja az Ön hozzájárulása (GDPR 6. cikk (1) bekezdés a) pont) illetve az elő szerződéses kapcsolat (b) pont).",
    retention: "Megőrzési idő",
    retentionText: "Az adatokat az érintett kérésére vagy max. 2 évig tároljuk, kivéve ha jogi kötelezettség következik.",
    rights: "Érintetti jogok",
    rightsText: "Hozzáférés, helyesbítés, törlés, korlátozás, adathordozhatóság, tiltakozás jogánál írjon info@jovokepp.hu címre. Panasz esetén: NAIH (Nemzeti Adatvédelmi és Információszabadság Hatóság).",
    cookies: "Sütik",
    cookiesText: "A weboldal alapvető működéséhez szükséges sütiket használunk. Részletekért lásd a sütikezelési beállításokat a láblécben.",
    updated: "Utolsó frissítés: 2024",
  },
  en: {
    label: "Privacy",
    title: "Privacy Policy",
    backToHome: "Home",
    intro: "JÖVŐKÉPP Association respects your data. This policy explains our data processing practices under the GDPR (Regulation 2016/679).",
    controller: "Data controller",
    controllerText: "JÖVŐKÉPP Association, email: info@jovokepp.hu",
    purposes: "Purposes of processing",
    purposesText: "We process data provided via email and contact forms solely for responding to enquiries, handling applications and communication.",
    legalBasis: "Legal basis",
    legalBasisText: "Processing is based on your consent (GDPR Art. 6(1)(a)) or pre-contractual measures (Art. 6(1)(b)).",
    retention: "Retention",
    retentionText: "We retain data until you request deletion or for up to 2 years, unless a legal obligation requires longer retention.",
    rights: "Your rights",
    rightsText: "You have the right to access, rectify, erase, restrict, port and object. Contact info@jovokepp.hu. For complaints: your national data protection authority.",
    cookies: "Cookies",
    cookiesText: "We use essential cookies for site functionality. See cookie settings in the footer for details.",
    updated: "Last updated: 2024",
  },
};

export default function Privacy({ lang }: { lang: "hu" | "en" }) {
  const txt = privacyTranslations[lang];

  return (
    <main className="min-h-screen bg-[#fafcfd] relative overflow-hidden">
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

        <div className="max-w-2xl space-y-8 text-slate-600 leading-relaxed">
          <p>{txt.intro}</p>
          <section>
            <h2 className="font-semibold text-slate-900 mb-2">{txt.controller}</h2>
            <p>{txt.controllerText}</p>
          </section>
          <section>
            <h2 className="font-semibold text-slate-900 mb-2">{txt.purposes}</h2>
            <p>{txt.purposesText}</p>
          </section>
          <section>
            <h2 className="font-semibold text-slate-900 mb-2">{txt.legalBasis}</h2>
            <p>{txt.legalBasisText}</p>
          </section>
          <section>
            <h2 className="font-semibold text-slate-900 mb-2">{txt.retention}</h2>
            <p>{txt.retentionText}</p>
          </section>
          <section>
            <h2 className="font-semibold text-slate-900 mb-2">{txt.rights}</h2>
            <p>{txt.rightsText}</p>
          </section>
          <section>
            <h2 className="font-semibold text-slate-900 mb-2">{txt.cookies}</h2>
            <p>{txt.cookiesText}</p>
          </section>
          <p className="text-sm text-slate-500 pt-4">{txt.updated}</p>
        </div>
      </div>
    </main>
  );
}
