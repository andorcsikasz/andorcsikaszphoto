import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowsClockwise,
  ArrowDown,
  BookOpen,
  Check,
  Globe,
  Handshake,
  Lightbulb,
  MapPin,
} from "@phosphor-icons/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { AbstractShapes, HeroWave, PeopleGraphic } from "@/components/Graphics";
import { ConfettiBurst } from "@/components/Confetti";
import { RotatingText } from "@/components/RotatingText";

const t = {
  hu: {
    tagline: "Segítünk a fiataloknak az Erasmus+ projekteken keresztül: ifjúsági cserék, digitális készségek és interkulturális tanulás egész Európában.",
    rotateWords: ["ifjúsági cserékkel", "digitális készségekkel", "interkulturális tanulással"],
    taglinePrefix: "Segítünk a fiataloknak az Erasmus+ projekteken keresztül: ",
    taglineSuffix: " egész Európában.",
    feature1: "Nemzetközi ifjúsági mobilitás utazási támogatással",
    feature2: "Digitális műveltség és innovációs workshopok",
    feature3: "Képzések ifjúsági munkásoknak és pedagógusoknak",
    euBadge: "Az Európai Unió társfinanszírozása",
    scroll: "Görgess lefelé",
    offerLabel: "Mit kínálunk",
    offerTitle: "Tekintsd meg",
    offer1Title: "Ifjúsági Csere",
    offer1Meta: "13–30 év · 6–12 nap",
    offer1Desc: "Nemzetközi találkozók, ahol európai fiatalok nem formális módon fedeznek fel közös témákat és interkulturális együttműködést élnek át.",
    offer2Title: "Képzés",
    offer2Meta: "18+ év · 4–10 nap",
    offer2Desc: "Programok ifjúsági munkásoknak, önkénteseknek és pedagógusoknak digitális eszközök és facilitációs módszerek elsajátításához.",
    offer3Title: "Digitalizáció és Innováció",
    offer3Meta: "Különböző formátumok",
    offer3Desc: "Projektek digitális műveltségre, médiaoktatásra, online együttműködésre és technológia társadalmi hatásának használatára.",
    valuesLabel: "Értékeink",
    valuesTitle: "Ami hajt minket",
    value1Title: "Inklúzió",
    value1Desc: "Minden fiatalnak egyenlő esélyeket biztosítunk.",
    value2Title: "Nem formális tanulás",
    value2Desc: "Tanulás cselekvéssel, az órán túl.",
    value3Title: "Interkulturális párbeszéd",
    value3Desc: "Hidak építése a kultúrák és közösségek között.",
    value4Title: "Digitális megerősítés",
    value4Desc: "A jövő készségeivel felszereljük a fiatalokat.",
    projectsLabel: "Projektek",
    projectsTitle: "Csatlakozz projekteinkhez",
    currentProjects: "Aktuális projektek",
    archiveProjects: "Archívum",
    proj1: "Digitális Fiatal Lab",
    proj2: "Fiatalok a demokráciáért",
    proj3: "Média-műveltség Csere",
    proj4: "Ifjúsági Öko-túra",
    proj5: "Demokrácia Lab",
    ctaTitle: "Csatlakozz!",
    ctaDesc: "Vegyél részt Erasmus+ projekteken, jelentkezz képzésekre, vagy önkéntesként dolgozz velünk. Írj nekünk több információért.",
    benefit1: "Ifjúsági cserék és képzések",
    benefit2: "Tapasztalat EU-projektekkel",
    benefit3: "Digitális és soft skill fejlesztés",
    benefit4: "Kapcsolatok fiatalokkal egész Európában",
    ctaButton: "Kapcsolatfelvétel",
    applySubject: "Jelentkezés",
  },
  en: {
    tagline: "We empower young people through Erasmus+ projects: youth exchanges, digital skills, and intercultural learning across Europe.",
    rotateWords: ["youth exchanges", "digital skills", "intercultural learning"],
    taglinePrefix: "We empower young people through ",
    taglineSuffix: " across Europe.",
    feature1: "International youth mobility with travel support",
    feature2: "Digital literacy and innovation workshops",
    feature3: "Training courses for youth workers and educators",
    euBadge: "Co-funded by the European Union",
    scroll: "Scroll down",
    offerLabel: "What We Offer",
    offerTitle: "Take a look",
    offer1Title: "Youth Exchange",
    offer1Meta: "Ages 13–30 · 6–12 days",
    offer1Desc: "International gatherings where young Europeans explore topics together through non-formal education and experience intercultural cooperation first-hand.",
    offer2Title: "Training Course",
    offer2Meta: "Ages 18+ · 4–10 days",
    offer2Desc: "Programmes for youth workers, volunteers, and educators to deepen their skills in youth work, digital tools, and facilitation methods.",
    offer3Title: "Digitalisation & Innovation",
    offer3Meta: "Various formats",
    offer3Desc: "Projects focused on digital literacy, media skills, online collaboration, and using technology for social impact and employability.",
    valuesLabel: "Our Values",
    valuesTitle: "What drives us",
    value1Title: "Inclusion",
    value1Desc: "Every young person deserves equal access to opportunity.",
    value2Title: "Non-formal Learning",
    value2Desc: "Learning by doing, beyond the classroom.",
    value3Title: "Intercultural Dialogue",
    value3Desc: "Building bridges between cultures and communities.",
    value4Title: "Digital Empowerment",
    value4Desc: "Equipping youth with skills for the future.",
    projectsLabel: "Projects",
    projectsTitle: "Join our projects",
    currentProjects: "Current projects",
    archiveProjects: "Archive",
    proj1: "Digital Youth Lab",
    proj2: "Youth for Democracy",
    proj3: "Media Literacy Exchange",
    proj4: "Youth Eco-Adventure",
    proj5: "Democracy Lab",
    ctaTitle: "Join Us",
    ctaDesc: "Participate in Erasmus+ projects, apply for training courses, or volunteer with us. Get in touch to learn more.",
    benefit1: "Youth exchanges and training courses",
    benefit2: "Experience with EU-funded projects",
    benefit3: "Digital and soft skills development",
    benefit4: "Connect with youth across Europe",
    ctaButton: "Get in touch",
    applySubject: "Application",
  },
};

const offers = [
  { key: "offer1" as const, Icon: ArrowsClockwise },
  { key: "offer2" as const, Icon: BookOpen },
  { key: "offer3" as const, Icon: Lightbulb },
] as const;

const values = [
  { key: "value1" as const, Icon: Globe },
  { key: "value2" as const, Icon: BookOpen },
  { key: "value3" as const, Icon: Handshake },
  { key: "value4" as const, Icon: Lightbulb },
];

const currentProjects = [
  {
    key: "proj1" as const,
    location: "Budapest (HU)",
    date: "2025 Q2",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&q=80",
    imageAlt: "Budapest",
  },
  {
    key: "proj2" as const,
    location: "Brno (CZ)",
    date: "2025 Q2",
    image: "https://images.unsplash.com/photo-1548184628-7e6d2c47d61a?w=600&q=80",
    imageAlt: "Brno",
  },
  {
    key: "proj3" as const,
    location: "Bécs (AT)",
    date: "2025 Q3",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&q=80",
    imageAlt: "Vienna",
  },
];

const archiveProjects = [
  {
    key: "proj4" as const,
    location: "Tatabánya (HU)",
    date: "2024 Q4",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d1530?w=600&q=80",
    imageAlt: "Tatabánya",
  },
  {
    key: "proj5" as const,
    location: "Pozsony (SK)",
    date: "2024 Q3",
    image: "https://images.unsplash.com/photo-1548013146-7243f659aa12?w=600&q=80",
    imageAlt: "Bratislava",
  },
];

const benefits = ["benefit1", "benefit2", "benefit3", "benefit4"] as const;

type ProjectItem = (typeof currentProjects)[number] | (typeof archiveProjects)[number];

function ProjectCard({
  p,
  txt,
  i,
  spring,
  isArchive = false,
}: {
  p: ProjectItem;
  txt: (typeof t)["hu"];
  i: number;
  spring: { type: "spring"; stiffness: number; damping: number };
  isArchive?: boolean;
}) {
  return (
    <motion.a
      href={`mailto:info@jovokepp.hu?subject=${encodeURIComponent(txt[p.key] + " - " + txt.applySubject)}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: i * 0.08, type: "spring", stiffness: 80, damping: 18 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`group flex flex-col sm:flex-row overflow-hidden rounded-2xl border bg-white transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003399] focus-visible:ring-offset-2 ${
        isArchive
          ? "border-slate-200/70 shadow-sm hover:shadow-[0_12px_36px_rgba(0,51,153,0.06)] hover:border-slate-300"
          : "border-slate-200/80 shadow-[0_4px_20px_rgba(0,51,153,0.06)] hover:shadow-[0_20px_48px_rgba(0,51,153,0.12)] hover:border-[#003399]/25"
      }`}
    >
      <div className="relative w-full sm:w-48 lg:w-56 h-36 sm:h-auto sm:min-h-[140px] shrink-0">
        <img
          src={p.image}
          alt={p.imageAlt}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent sm:from-transparent sm:bg-none" />
      </div>
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-5 p-5 sm:p-6">
        <span
          className={`font-semibold text-sm sm:text-base ${isArchive ? "text-slate-600" : "text-slate-900"}`}
        >
          {txt[p.key]}
        </span>
        <span className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500">
          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#003399] shrink-0" weight="duotone" />
          {p.location}
        </span>
        <motion.span
          whileHover={{ scale: 1.05 }}
          transition={spring}
          className={`inline-flex w-fit px-2.5 py-1 rounded-lg text-xs font-semibold ${
            isArchive
              ? "bg-slate-200/80 text-slate-600"
              : "bg-[#003399]/10 text-[#003399]"
          }`}
        >
          {p.date}
        </motion.span>
      </div>
    </motion.a>
  );
}

const fadeUp = { initial: { opacity: 0, y: 32 }, animate: { opacity: 1, y: 0 } };
const stagger = { transition: { staggerChildren: 0.08, delayChildren: 0.1 } };
const spring = { type: "spring", stiffness: 120, damping: 12 };
const bouncy = { type: "spring", stiffness: 400, damping: 10 };

export default function Home({ lang }: { lang: "hu" | "en" }) {
  const txt = t[lang];
  const [showConfetti, setShowConfetti] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 80]);

  return (
    <>
      {showConfetti && (
        <ConfettiBurst onComplete={() => setShowConfetti(false)} />
      )}
      {/* Scroll progress bar - gradient & playful */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 origin-left z-[60] rounded-r-full"
        style={{
          scaleX: scrollYProgress,
          background: "linear-gradient(90deg, #003399, #ffcc00)",
        }}
      />

      {/* Hero */}
      <header className="min-h-screen min-h-dvh flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-20 sm:pt-24 pb-24 sm:pb-28 relative overflow-hidden grain">
        {/* Hero background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/75 to-slate-900/95" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_0%,rgba(255,204,0,0.06)_0%,transparent_50%)]" />
        </div>
        <AbstractShapes />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(0,51,153,0.25)_0%,transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <HeroWave />

        <motion.div
          className="container relative z-10"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <motion.div
            initial="initial"
            animate="animate"
            variants={{
              initial: {},
              animate: stagger,
            }}
            className="relative"
          >
            <motion.p
              variants={fadeUp}
              transition={spring}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[0.65rem] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#bae6fd] mb-6 sm:mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffcc00] animate-pulse" />
              Erasmus+ Youth
            </motion.p>
            <motion.h1
              variants={fadeUp}
              transition={{ ...spring, delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-extrabold mb-2 sm:mb-3 tracking-tight leading-[1.05]"
            >
              <motion.span
                className="inline-block text-gradient drop-shadow-[0_2px_20px_rgba(0,0,0,0.3)]"
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.3 },
                }}
              >
                JÖVŐKÉPP
              </motion.span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              transition={{ ...spring, delay: 0.15 }}
              className="text-sm sm:text-base md:text-lg text-slate-300 font-medium tracking-wide mb-6 sm:mb-8"
            >
              Fiatalok Magyarországért! Egyesület
            </motion.p>
            <motion.p
              variants={fadeUp}
              transition={{ ...spring, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-slate-100 max-w-[620px] mx-auto mb-10 sm:mb-12 leading-relaxed font-light"
            >
              {txt.taglinePrefix}{" "}
              <RotatingText
                words={txt.rotateWords}
                interval={3200}
                className="font-medium text-white"
              />{" "}
              {txt.taglineSuffix}
            </motion.p>
            <motion.div
              variants={fadeUp}
              transition={{ ...spring, delay: 0.25 }}
              className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-sm sm:text-[0.9375rem] text-slate-200"
            >
              {[txt.feature1, txt.feature2, txt.feature3].map((f, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.03, y: -2 }}
                  transition={spring}
                  className="flex items-center justify-center sm:justify-start gap-2.5 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg cursor-default"
                >
                <motion.span
                  className="w-2 h-2 rounded-full bg-[#ffcc00] shrink-0"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                />
                  {f}
                </motion.span>
              ))}
            </motion.div>
            <motion.div
              variants={fadeUp}
              transition={{ ...spring, delay: 0.35 }}
              className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-5"
            >
              <motion.a
                href="#offer"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={bouncy}
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#ffcc00] text-slate-900 text-sm font-bold shadow-[0_8px_32px_rgba(255,204,0,0.4)] hover:shadow-[0_16px_48px_rgba(255,204,0,0.5)] hover:bg-[#ffe066] border-2 border-[#ffcc00]/50"
              >
                {txt.scroll}
                <motion.span
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowDown className="w-4 h-4" weight="bold" />
                </motion.span>
              </motion.a>
              <motion.a
                href="https://erasmus-plus.ec.europa.eu/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                transition={spring}
                className="px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-xs sm:text-sm font-medium text-white shadow-lg hover:bg-white/25 transition-colors"
              >
                <span className="font-bold">EU</span> {txt.euBadge}
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </header>

      {/* Offer */}
      <Section id="offer" className="bg-[#f5f3ef] relative grain overflow-hidden">
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-gradient-to-br from-[#003399]/8 to-[#ffcc00]/5 blur-3xl" />
        <div className="absolute -left-24 bottom-1/4 w-72 h-72 rounded-full bg-[#ffcc00]/5 blur-2xl" />
        <SectionLabel>{txt.offerLabel}</SectionLabel>
        <SectionTitle>{txt.offerTitle}</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
          {offers.map((o, i) => (
            <motion.a
              key={o.key}
              href={`mailto:info@jovokepp.hu?subject=${encodeURIComponent(txt[o.key + "Title"] + " - " + txt.applySubject)}`}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 90, damping: 16 }}
              whileHover={{
                y: -8,
                transition: { type: "spring", stiffness: 280, damping: 20 },
              }}
              className="group block cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003399] focus-visible:ring-offset-4 rounded-2xl"
            >
              <Card className="relative overflow-hidden bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,51,153,0.06)] hover:shadow-[0_24px_64px_rgba(0,51,153,0.12)] border border-slate-200/60 hover:border-[#003399]/20 p-6 sm:p-8 transition-all duration-300 h-full">
                <span className="absolute top-5 right-5 sm:top-6 sm:right-6 font-serif text-5xl sm:text-6xl font-extrabold text-[#003399]/6 group-hover:text-[#003399]/12 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <CardHeader className="p-0 pb-4">
                  <motion.div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#003399] to-[#1a4db8] flex items-center justify-center mb-5 shadow-[0_8px_24px_rgba(0,51,153,0.2)]"
                    whileHover={{ scale: 1.08, rotate: -6 }}
                    transition={bouncy}
                  >
                    <o.Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="duotone" />
                  </motion.div>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-slate-900 pr-12">
                    {txt[o.key + "Title"]}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                    {txt[o.key + "Meta"]}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {txt[o.key + "Desc"]}
                  </p>
                </CardContent>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-[#003399] font-semibold text-sm group-hover:gap-3 transition-all">
                  {lang === "hu" ? "Jelentkezés" : "Apply"}
                  <ArrowDown className="w-4 h-4 rotate-[-90deg]" weight="bold" />
                </div>
              </Card>
            </motion.a>
          ))}
        </div>
      </Section>

      {/* Values */}
      <Section id="values" className="bg-white relative overflow-hidden grain">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 opacity-30 pointer-events-none">
          <PeopleGraphic />
        </div>
        <SectionLabel>{txt.valuesLabel}</SectionLabel>
        <SectionTitle>{txt.valuesTitle}</SectionTitle>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 relative z-10">
          {values.map((v, i) => (
            <motion.a
              key={v.key}
              href="#join"
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 100, damping: 18 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group block text-center p-6 sm:p-8 bg-slate-50/80 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-[0_20px_48px_rgba(0,51,153,0.08)] hover:border-[#003399]/25 hover:bg-white transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003399] focus-visible:ring-offset-2"
            >
              <motion.div
                className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#003399] to-[#1a4db8] flex items-center justify-center text-white shadow-[0_10px_28px_rgba(0,51,153,0.25)]"
                whileHover={{ scale: 1.1 }}
                transition={bouncy}
              >
                <v.Icon className="w-7 h-7 sm:w-8 sm:h-8" weight="duotone" />
              </motion.div>
              <h4 className="font-bold text-base sm:text-lg text-slate-900 mb-2">
                {txt[v.key + "Title"]}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{txt[v.key + "Desc"]}</p>
            </motion.a>
          ))}
        </div>
      </Section>

      {/* Visual break - collaboration */}
      <section className="relative h-52 sm:h-72 md:h-96 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-slate-900/20" />
        <div className="absolute inset-0 flex items-center justify-center md:justify-start md:pl-24">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
            className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold drop-shadow-xl max-w-2xl"
          >
            {lang === "hu" ? "Együtt alakítjuk a jövőt" : "Building the future together"}
          </motion.p>
        </div>
      </section>

      {/* Projects */}
      <Section id="projects" className="bg-[#f5f3ef] grain">
        <SectionLabel>{txt.projectsLabel}</SectionLabel>
        <SectionTitle>{txt.projectsTitle}</SectionTitle>

        {/* Current projects */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-xs font-bold tracking-wider uppercase text-[#003399] mb-5 sm:mb-6 flex items-center gap-2">
            <span className="w-8 h-0.5 bg-[#003399]/40" />
            {txt.currentProjects}
          </h3>
          <div className="flex flex-col gap-4 sm:gap-5">
            {currentProjects.map((p, i) => (
              <ProjectCard key={p.key} p={p} txt={txt} i={i} spring={spring} />
            ))}
          </div>
        </div>

        {/* Archive */}
        <div>
          <h3 className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-5 sm:mb-6 flex items-center gap-2">
            <span className="w-8 h-0.5 bg-slate-300" />
            {txt.archiveProjects}
          </h3>
          <div className="flex flex-col gap-4 sm:gap-5">
            {archiveProjects.map((p, i) => (
              <ProjectCard
                key={p.key}
                p={p}
                txt={txt}
                i={currentProjects.length + i}
                spring={spring}
                isArchive
              />
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <motion.section
        id="join"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ animate: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
        className="py-24 sm:py-28 md:py-36 text-center text-white relative overflow-hidden"
        style={{
          background: "linear-gradient(155deg, #003399 0%, #002d7a 30%, #002266 65%, #001a52 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_100%,rgba(255,204,0,0.15)_0%,transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.06)_0%,transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_80%,rgba(255,204,0,0.08)_0%,transparent_40%)]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="container relative z-10">
          <motion.h2
            variants={fadeUp}
            transition={spring}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 sm:mb-6 tracking-tight"
          >
            {txt.ctaTitle}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ ...spring, delay: 0.05 }}
            className="max-w-[540px] mx-auto mb-12 sm:mb-14 text-white/90 text-base sm:text-lg md:text-xl leading-relaxed px-2"
          >
            {txt.ctaDesc}
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[600px] mx-auto mb-14 sm:mb-16">
            {benefits.map((b, i) => (
              <motion.a
                key={b}
                href="mailto:info@jovokepp.hu"
                variants={fadeUp}
                transition={{ ...spring, delay: 0.1 + i * 0.05 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="flex items-center gap-4 p-5 sm:p-6 rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/15 text-left hover:bg-white/[0.12] hover:border-white/30 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#002266]"
              >
                <motion.div
                  className="w-10 h-10 rounded-xl bg-[#ffcc00]/25 flex items-center justify-center shrink-0"
                  whileHover={{ scale: 1.1 }}
                  transition={bouncy}
                >
                  <Check className="w-5 h-5 text-[#ffcc00]" weight="bold" />
                </motion.div>
                <span className="font-medium text-sm sm:text-base text-white/95">{txt[b]}</span>
              </motion.a>
            ))}
          </div>
          <motion.div variants={fadeUp} transition={{ ...spring, delay: 0.4 }}>
            <Button asChild size="lg" className="text-base sm:text-lg px-10 py-6 h-auto font-bold rounded-full">
              <motion.a
                href="mailto:info@jovokepp.hu"
                onClick={() => setShowConfetti(true)}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#002266] bg-[#ffcc00] text-slate-900 hover:bg-[#ffe066] shadow-[0_8px_32px_rgba(255,204,0,0.35)] hover:shadow-[0_12px_40px_rgba(255,204,0,0.45)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={bouncy}
              >
                {txt.ctaButton}
              </motion.a>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}

function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 60, damping: 20 }}
      className={`py-16 sm:py-20 md:py-24 lg:py-28 ${className}`}
    >
      <div className="container">{children}</div>
    </motion.section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.08 }}
      className="block text-[0.65rem] sm:text-[0.7rem] font-bold tracking-[0.22em] uppercase text-[#003399] mb-3 sm:mb-4"
    >
      {children}
    </motion.span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.12, type: "spring", stiffness: 90, damping: 18 }}
      className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-10 sm:mb-12 tracking-tight leading-[1.15]"
    >
      {children}
    </motion.h2>
  );
}
