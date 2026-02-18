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
    proj1: "Digitális Fiatal Lab",
    proj2: "Fiatalok a demokráciáért",
    proj3: "Média-műveltség Csere",
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
    proj1: "Digital Youth Lab",
    proj2: "Youth for Democracy",
    proj3: "Media Literacy Exchange",
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

const projects = [
  {
    key: "proj1" as const,
    location: "Budapest (HU)",
    date: "2025 Q2",
    image: "https://images.unsplash.com/photo-1559316576-5e0e1e7a4e8a?w=600&q=80",
  },
  {
    key: "proj2" as const,
    location: "Brno (CZ)",
    date: "2025 Q2",
    image: "https://images.unsplash.com/photo-1563841930606-67e2bce48b78?w=600&q=80",
  },
  {
    key: "proj3" as const,
    location: "Bécs (AT)",
    date: "2025 Q3",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&q=80",
  },
];

const benefits = ["benefit1", "benefit2", "benefit3", "benefit4"] as const;

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
      <header className="min-h-screen min-h-dvh flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-20 sm:pt-24 pb-24 sm:pb-28 relative overflow-hidden">
        {/* Hero background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/85 via-slate-900/70 to-slate-900/90" />
        </div>
        {/* SVG graphics overlay */}
        <AbstractShapes />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(0,51,153,0.2)_0%,transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
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
              className="text-[0.65rem] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#93c5fd] mb-4 sm:mb-6"
            >
              Erasmus+ Youth
            </motion.p>
            <motion.h1
              variants={fadeUp}
              transition={{ ...spring, delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-bold text-white mb-2 sm:mb-3 tracking-tight leading-[1.05] drop-shadow-lg"
            >
              <motion.span
                className="inline-block"
                whileHover={{
                  scale: 1.05,
                  rotate: [0, -3, 3, -2, 0],
                  transition: { duration: 0.5 },
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
              className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a
                href="#offer"
                whileHover={{ scale: 1.08, y: -6 }}
                whileTap={{ scale: 0.95 }}
                transition={bouncy}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#ffcc00] text-slate-900 text-sm font-semibold shadow-[0_4px_14px_rgba(255,204,0,0.3)] hover:shadow-[0_12px_32px_rgba(255,204,0,0.5)] hover:bg-[#ffe066]"
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

      {/* Offer - with decorative graphic */}
      <Section id="offer" className="bg-slate-50 relative">
        <div className="absolute left-0 bottom-0 w-48 h-48 sm:w-64 sm:h-64 opacity-20 pointer-events-none">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="offer-grad" x1="0" y1="0" x2="200" y2="200">
                <stop offset="0%" stopColor="#003399" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="90" fill="url(#offer-grad)" fillOpacity="0.3" />
          </svg>
        </div>
        <SectionLabel>{txt.offerLabel}</SectionLabel>
        <SectionTitle>{txt.offerTitle}</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 relative z-10">
          {offers.map((o, i) => (
            <motion.a
              key={o.key}
              href={`mailto:info@jovokepp.hu?subject=${encodeURIComponent(txt[o.key + "Title"] + " - " + txt.applySubject)}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 100, damping: 14 }}
              whileHover={{
                y: -12,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 18 },
              }}
              className="block cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003399] focus-visible:ring-offset-2 rounded-2xl"
            >
              <Card className="relative overflow-hidden bg-white shadow-[0_4px_24px_rgba(0,51,153,0.06)] hover:shadow-[0_24px_56px_rgba(0,51,153,0.12)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-[#003399] before:to-[#cd7f32] before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300 before:origin-left p-6 sm:p-7 transition-shadow duration-300 group/card h-full">
                <CardHeader>
                  <motion.div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#003399]/15 to-[#003399]/5 flex items-center justify-center mb-4 border border-[#003399]/10"
                    whileHover={{ scale: 1.12, rotate: 12 }}
                    transition={bouncy}
                  >
                    <o.Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#003399] group-hover/card:animate-pulse" weight="duotone" />
                  </motion.div>
                  <CardTitle className="text-lg sm:text-xl text-slate-900">{txt[o.key + "Title"]}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-slate-500">{txt[o.key + "Meta"]}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-[0.95rem] text-slate-700 leading-relaxed">
                    {txt[o.key + "Desc"]}
                  </p>
                </CardContent>
                <p className="mt-4 text-xs font-semibold text-[#003399] group-hover/card:underline">
                  {lang === "hu" ? "Jelentkezés →" : "Apply →"}
                </p>
              </Card>
            </motion.a>
          ))}
        </div>
      </Section>

      {/* Values */}
      <Section id="values" className="bg-white relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80 opacity-40 pointer-events-none">
          <PeopleGraphic />
        </div>
        <SectionLabel>{txt.valuesLabel}</SectionLabel>
        <SectionTitle>{txt.valuesTitle}</SectionTitle>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 relative z-10">
          {values.map((v, i) => (
            <motion.a
              key={v.key}
              href="#join"
              initial={{ opacity: 0, y: 36, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 90, damping: 16 }}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
              className="group block text-center p-6 sm:p-7 bg-white rounded-2xl border border-slate-200 shadow-[0_2px_12px_rgba(0,51,153,0.04)] hover:shadow-[0_16px_40px_rgba(0,51,153,0.1)] hover:border-[#003399]/20 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003399] focus-visible:ring-offset-2"
            >
              <motion.div
                className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#003399] to-[#1a4db8] flex items-center justify-center text-white shadow-[0_8px_20px_rgba(0,51,153,0.2)]"
                whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <v.Icon className="w-6 h-6 sm:w-7 sm:h-7" weight="duotone" />
              </motion.div>
              <h4 className="font-semibold text-sm sm:text-base text-slate-900 mb-2">
                {txt[v.key + "Title"]}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-snug">{txt[v.key + "Desc"]}</p>
            </motion.a>
          ))}
        </div>
      </Section>

      {/* Visual break - collaboration image */}
      <section className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center md:justify-start md:pl-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white text-xl sm:text-2xl md:text-3xl font-serif font-semibold drop-shadow-lg"
          >
            {lang === "hu" ? "Együtt alakítjuk a jövőt" : "Building the future together"}
          </motion.p>
        </div>
      </section>

      {/* Projects */}
      <Section id="projects" className="bg-slate-50">
        <SectionLabel>{txt.projectsLabel}</SectionLabel>
        <SectionTitle>{txt.projectsTitle}</SectionTitle>
        <div className="flex flex-col gap-3 sm:gap-4">
          {projects.map((p, i) => (
            <motion.a
              key={p.key}
              href={`mailto:info@jovokepp.hu?subject=${encodeURIComponent(txt[p.key] + " - " + txt.applySubject)}`}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 80, damping: 18 }}
              whileHover={{ x: 8, transition: { duration: 0.2 } }}
              className="group flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-5 p-5 sm:p-6 bg-white rounded-xl border border-slate-200/80 hover:shadow-[0_8px_24px_rgba(0,51,153,0.08)] hover:border-[#003399]/20 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003399] focus-visible:ring-offset-2"
            >
              <span className="font-semibold text-sm sm:text-base text-slate-900">
                {txt[p.key]}
              </span>
              <span className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#003399]" weight="duotone" />
                {p.location}
              </span>
              <motion.span
                whileHover={{ scale: 1.05 }}
                transition={spring}
                className="inline-flex w-fit px-2.5 py-1 rounded-lg bg-[#003399]/10 text-xs text-[#003399] font-semibold"
              >
                {p.date}
              </motion.span>
            </motion.a>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <motion.section
        id="join"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
        className="py-20 sm:py-24 md:py-32 text-center text-white relative overflow-hidden"
        style={{
          background: "linear-gradient(165deg, #003399 0%, #002d7a 35%, #002266 70%, #001a52 100%)",
        }}
      >
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(255,204,0,0.12)_0%,transparent_60%)] pointer-events-none"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.04)_0%,transparent_40%)] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container relative z-10">
          <motion.h2
            variants={fadeUp}
            transition={spring}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 sm:mb-5 tracking-tight"
          >
            {txt.ctaTitle}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ ...spring, delay: 0.05 }}
            className="max-w-[520px] mx-auto mb-10 sm:mb-12 text-white/90 text-base sm:text-lg md:text-xl font-light leading-relaxed px-2"
          >
            {txt.ctaDesc}
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[580px] mx-auto mb-12 sm:mb-14">
            {benefits.map((b, i) => (
              <motion.a
                key={b}
                href="mailto:info@jovokepp.hu"
                variants={fadeUp}
                transition={{ ...spring, delay: 0.1 + i * 0.05 }}
                whileHover={{ scale: 1.03, x: 4 }}
                className="flex items-center p-4 sm:p-5 rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/10 text-left hover:bg-white/[0.14] hover:border-white/25 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#002266]"
              >
                <motion.div
                  className="w-8 h-8 rounded-lg bg-[#ffcc00]/20 flex items-center justify-center shrink-0 mr-4"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Check className="w-4 h-4 text-[#ffcc00]" weight="bold" />
                </motion.div>
                <span className="font-medium text-sm sm:text-base text-white/95">{txt[b]}</span>
              </motion.a>
            ))}
          </div>
          <motion.div variants={fadeUp} transition={{ ...spring, delay: 0.35 }}>
            <Button asChild size="lg">
              <motion.a
                href="mailto:info@jovokepp.hu"
                onClick={() => setShowConfetti(true)}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#002266]"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
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
      className={`py-12 sm:py-16 md:py-20 lg:py-24 ${className}`}
    >
      <div className="container">{children}</div>
    </motion.section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="block text-[0.65rem] sm:text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-[#003399] mb-2 sm:mb-3"
    >
      {children}
    </motion.span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15, type: "spring", stiffness: 80, damping: 18 }}
      className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-900 mb-8 sm:mb-10 tracking-tight"
    >
      {children}
    </motion.h2>
  );
}
