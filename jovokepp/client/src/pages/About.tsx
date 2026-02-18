import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const aboutTranslations = {
  hu: {
    label: "Rólunk",
    title: "A JÖVŐKÉPP Egyesület",
    backToHome: "Főoldal",
    missionTitle: "Küldetésünk",
    missionText: "A JÖVŐKÉPP egy fiatal, dinamikus magyar ifjúsági egyesület, amely Erasmus+ projekteken keresztül építi a fiatalok közösségét. Célunk, hogy minden fiatal hozzáférhessen a nemzetközi tapasztalatokhoz, képzésekhez és hálózati lehetőségekhez.",
    whatWeDoTitle: "Mit csinálunk",
    whatWeDoText: "Ifjúsági cseréket, ifjúsági munkások képzéseit és digitális projekteket szervezünk az Erasmus+ program keretében. Minden tevékenységünk nem formális módszereken alapul.",
    forWhomTitle: "Kinek szól",
    forWhomText: "Fiataloknak 13–30 éves korig (ifjúsági cserék), valamint ifjúsági munkásoknak, pedagógusoknak és önkénteseknek 18 éves kortól (képzések).",
    focusTitle: "Erasmus+ fókusz",
    focusText: "KA1 (Youth Exchange, Youth worker mobility), KA2 (digitális projektek), Ifjúsági szektor.",
    teamTitle: "Csapatunk",
    teamText: "A JÖVŐKÉPP-et fiatal szakemberek és önkéntesek vezetik, akik tapasztalattal rendelkeznek az Erasmus+ projektekben.",
    legalTitle: "Jogi adatok",
    legalText: "JÖVŐKÉPP Egyesület | Alapítás: 2024 | Tevékenységi kör: ifjúsági munka, nem formális oktatás.",
    impactTitle: "Hatásunk",
    impactProjects: "projekt",
    impactCountries: "ország",
  },
  en: {
    label: "About Us",
    title: "JÖVŐKÉPP Association",
    backToHome: "Home",
    missionTitle: "Our Mission",
    missionText: "JÖVŐKÉPP is a youth-led Hungarian NGO building a thriving community through Erasmus+ projects. We connect young people across Europe with international opportunities, training and networks.",
    whatWeDoTitle: "What We Do",
    whatWeDoText: "We organise youth exchanges, youth worker training courses and digital projects within the Erasmus+ programme. All our activities are based on non-formal methods.",
    forWhomTitle: "Who We Serve",
    forWhomText: "Young people aged 13–30 (youth exchanges), and youth workers, educators and volunteers aged 18+ (training courses).",
    focusTitle: "Erasmus+ Focus",
    focusText: "KA1 (Youth Exchange, Youth worker mobility), KA2 (digital projects), Youth sector.",
    teamTitle: "Our Team",
    teamText: "JÖVŐKÉPP is led by young professionals and volunteers with experience in Erasmus+ projects.",
    legalTitle: "Legal Information",
    legalText: "JÖVŐKÉPP Association | Founded: 2024 | Scope: youth work, non-formal education.",
    impactTitle: "Our impact",
    impactProjects: "projects",
    impactCountries: "countries",
  },
};

export default function About({ lang }: { lang: "hu" | "en" }) {
  const txt = aboutTranslations[lang];

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

        <div className="flex gap-8 sm:gap-12 mb-14">
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-[#00A3C9]">10+</p>
            <p className="text-sm text-slate-500">{txt.impactProjects}</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-[#00A3C9]">8+</p>
            <p className="text-sm text-slate-500">{txt.impactCountries}</p>
          </div>
        </div>

        <div className="max-w-2xl space-y-10">
          <section>
            <h2 className="font-semibold text-lg text-slate-900 mb-2">{txt.missionTitle}</h2>
            <p className="text-slate-600 leading-relaxed">{txt.missionText}</p>
          </section>
          <section>
            <h2 className="font-semibold text-lg text-slate-900 mb-2">{txt.whatWeDoTitle}</h2>
            <p className="text-slate-600 leading-relaxed">{txt.whatWeDoText}</p>
          </section>
          <section>
            <h2 className="font-semibold text-lg text-slate-900 mb-2">{txt.forWhomTitle}</h2>
            <p className="text-slate-600 leading-relaxed">{txt.forWhomText}</p>
          </section>
          <section>
            <h2 className="font-semibold text-lg text-slate-900 mb-2">{txt.focusTitle}</h2>
            <p className="text-slate-600 leading-relaxed">{txt.focusText}</p>
          </section>
          <section>
            <h2 className="font-semibold text-lg text-slate-900 mb-2">{txt.teamTitle}</h2>
            <p className="text-slate-600 leading-relaxed">{txt.teamText}</p>
          </section>
          <section className="pt-6 border-t border-slate-200/80">
            <h2 className="font-semibold text-lg text-slate-900 mb-2">{txt.legalTitle}</h2>
            <p className="text-slate-600 text-sm leading-relaxed">{txt.legalText}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
