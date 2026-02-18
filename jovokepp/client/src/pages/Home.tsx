import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  ArrowRight,
  ArrowsClockwise,
  BookOpen,
  Lightbulb,
  MapPin,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

const t = {
  hu: {
    heroCtaPrimary: "Jelentkezz most",
    heroCtaSecondary: "Fedezd fel",
    aboutHeading: "Mi a JÖVŐKÉPP?",
    aboutIntro: "A JÖVŐKÉPP egy fiatal, dinamikus magyar ifjúsági egyesület. Küldetésünk: minden fiatal számára elérhetővé tenni a nemzetközi tapasztalatokat, képzéseket és hálózati lehetőségeket Erasmus+ projekteken keresztül.",
    missionShort: "Erasmus+ KA1 ifjúsági cserék és képzések | 13–30 év (fiatalok), 18+ (ifjúsági munkások)",
    offerLabel: "Mit kínálunk",
    offerTitle: "Fedezd fel a lehetőségeidet",
    offer1Title: "Ifjúsági Csere",
    offer1Meta: "13–30 év · 5–21 nap",
    offer1Desc: "Az Erasmus+ ifjúsági cserék rövid programok, ahol különböző országokból érkező fiatalok nem formális módon tanulnak: workshopok, viták, szerepjátékok és egyéb tevékenységek. A résztvevők tanulmányait Youthpass oklevél ismeri el. Az EU támogatás fedezi az utazási és szállás költségeket.",
    offer2Title: "Ifjúsági munkások képzése",
    offer2Meta: "18+ év · 2–60 nap",
    offer2Desc: "Szakmai fejlesztő programok ifjúsági munkásoknak, pedagógusoknak és önkénteseknek: szemináriumok, képzések, networking események, tanulmányutak és job shadowing. Az Erasmus+ támogatja az utazást, szállást és tananyagokat. Témák: digitális készségek, inklúzió, fenntarthatóság.",
    offer3Title: "Digitalizáció és Innováció",
    offer3Meta: "Erasmus+ prioritás 2024–2025",
    offer3Desc: "A digitális átállás az Erasmus+ 2024–2025 évi horizontális prioritása. Projektek digitális műveltségre, médiaoktatásra, online együttműködésre és a technológia társadalmi hatásának hasznosítására. Cél: a digitális szakadék áthidalása és a digitális képességek erősítése.",
    projectsLabel: "Projektek",
    projectsTitle: "Csatlakozz projekteinkhez",
    currentProjects: "Aktuális projektek",
    archiveProjects: "Archívum",
    proj1: "Digitális Fiatal Lab",
    proj2: "Fiatalok a demokráciáért",
    proj3: "Média-műveltség Csere",
    proj4: "Ifjúsági Öko-túra",
    proj5: "Demokrácia Lab",
    ctaTitle: "Csatlakozz a közösségünkhöz",
    ctaDesc: "Európában tanulj, növekedj és kapcsolódj más fiatalokkal. A jelentkezés ingyenes — írj nekünk, és segítünk a következő lépésben.",
  },
  en: {
    heroCtaPrimary: "Apply now",
    heroCtaSecondary: "Discover",
    aboutHeading: "About JÖVŐKÉPP",
    aboutIntro: "JÖVŐKÉPP is a youth-led Hungarian NGO. Our mission: to make international experiences, training and network opportunities accessible to every young person through Erasmus+ projects.",
    missionShort: "Erasmus+ KA1 youth exchanges & training | Ages 13–30 (youth), 18+ (youth workers)",
    offerLabel: "What We Offer",
    offerTitle: "Discover your path",
    offer1Title: "Youth Exchange",
    offer1Meta: "Ages 13–30 · 5–21 days",
    offer1Desc: "Erasmus+ youth exchanges are short programmes where young people from different countries learn together through non-formal methods: workshops, debates, role-plays and outdoor activities. Participants receive a Youthpass certificate. EU grants cover travel and accommodation costs.",
    offer2Title: "Youth Worker Training",
    offer2Meta: "Ages 18+ · 2–60 days",
    offer2Desc: "Professional development for youth workers, educators and volunteers: seminars, training courses, networking events, study visits and job shadowing. Erasmus+ funds travel, accommodation and materials. Topics include digital skills, inclusion, sustainability and mental wellbeing.",
    offer3Title: "Digitalisation & Innovation",
    offer3Meta: "Erasmus+ priority 2024–2025",
    offer3Desc: "Digital transformation is a horizontal priority of Erasmus+ 2024–2025. Projects on digital literacy, media education, online cooperation and technology for social impact. Aims to bridge the digital divide and strengthen digital competencies across Europe.",
    projectsLabel: "Projects",
    projectsTitle: "Join our projects",
    currentProjects: "Current projects",
    archiveProjects: "Archive",
    proj1: "Digital Youth Lab",
    proj2: "Youth for Democracy",
    proj3: "Media Literacy Exchange",
    proj4: "Youth Eco-Adventure",
    proj5: "Democracy Lab",
    ctaTitle: "Join our community",
    ctaDesc: "Learn, grow, and connect with young people across Europe. Application is free — get in touch and we'll help you take the next step.",
  },
};

const offers = [
  { key: "offer1" as const, Icon: ArrowsClockwise },
  { key: "offer2" as const, Icon: BookOpen },
  { key: "offer3" as const, Icon: Lightbulb },
] as const;

const currentProjects = [
  {
    key: "proj1" as const,
    location: "Budapest (HU)",
    date: "2025 Q2",
    image: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=600&q=80",
    imageAlt: "Budapest",
  },
  {
    key: "proj2" as const,
    location: "Brno (CZ)",
    date: "2025 Q2",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=80",
    imageAlt: "Brno",
  },
  {
    key: "proj3" as const,
    location: "Bécs (AT)",
    date: "2025 Q3",
    image: "https://images.unsplash.com/photo-1627564927144-6e4ceb2c1a15?w=600&q=80",
    imageAlt: "Vienna",
  },
];

const archiveProjects = [
  {
    key: "proj4" as const,
    location: "Tatabánya (HU)",
    date: "2024 Q4",
    image: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=600&q=80",
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
      href="#join"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: i * 0.06, type: "spring", stiffness: 100, damping: 18 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`group flex flex-col sm:flex-row overflow-hidden bg-white border rounded-2xl transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3C9] focus-visible:ring-offset-2 ${
        isArchive
          ? "border-slate-200/80 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)]"
          : "border-slate-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_-12px_rgba(0,163,201,0.1)] hover:border-slate-300/80"
      }`}
    >
      <div className="relative w-full sm:w-44 lg:w-52 h-32 sm:h-auto sm:min-h-[130px] shrink-0">
        <img
          src={p.image}
          alt={p.imageAlt}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-400"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 to-transparent sm:from-transparent sm:bg-none" />
      </div>
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-4 p-4 sm:p-5">
        <span
          className={`font-semibold text-[15px] sm:text-base tracking-tight ${isArchive ? "text-slate-600" : "text-slate-900"}`}
        >
          {txt[p.key]}
        </span>
        <span className="flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin className="w-3.5 h-3.5 text-[#00A3C9] shrink-0" weight="duotone" />
          {p.location}
        </span>
        <span
          className={`inline-flex w-fit px-2.5 py-1 rounded-lg text-xs font-semibold ${
            isArchive
              ? "bg-slate-200/80 text-slate-600"
              : "bg-[#00A3C9]/12 text-[#00A3C9]"
          }`}
        >
          {p.date}
        </span>
      </div>
    </motion.a>
  );
}

const fadeUp = { initial: { opacity: 0, y: 32 }, animate: { opacity: 1, y: 0 } };
const stagger = { transition: { staggerChildren: 0.08, delayChildren: 0.1 } };
const spring = { type: "spring", stiffness: 120, damping: 12 };

export default function Home({ lang }: { lang: "hu" | "en" }) {
  const txt = t[lang];
  const [projectCategory, setProjectCategory] = useState<"current" | "archive">("current");
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 80]);

  return (
    <>
      {/* Hero - full-bleed cinematic opening */}
      <header className="min-h-screen min-h-dvh flex flex-col justify-end md:justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80"
            alt={lang === "hu" ? "Fiatalok együttműködnek Erasmus+ ifjúsági projekten" : "Young people collaborating on Erasmus+ youth project"}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.5) 70%, rgba(15,23,42,0.92) 100%)",
            }}
          />
        </div>

        <motion.div
          className="container relative z-10 pb-20 md:pb-24 pt-28 sm:pt-32 md:pt-0 px-6 sm:px-8"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <motion.div
            initial="initial"
            animate="animate"
            variants={{ initial: {}, animate: stagger }}
            className="max-w-3xl"
          >
            <motion.div
              variants={fadeUp}
              transition={{ ...spring, delay: 0.05 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#join"
                className="group/btn inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-semibold bg-[#00A3C9] text-white shadow-[0_4px_20px_-4px_rgba(0,163,201,0.6)] hover:bg-[#0095b8] hover:shadow-[0_8px_28px_-4px_rgba(0,163,201,0.65)] hover:-translate-y-0.5 transition-all duration-200"
              >
                {txt.heroCtaPrimary}
                <ArrowRight className="w-5 h-5 shrink-0 group-hover/btn:translate-x-0.5 transition-transform" weight="bold" />
              </a>
              <a
                href="#offer"
                className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-semibold bg-white/15 text-white border border-white/30 backdrop-blur-sm hover:bg-white/25 hover:border-white/50 transition-all duration-200"
              >
                {txt.heroCtaSecondary}
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

      </header>

      {/* About / Mission - SEO-rich */}
      <section aria-labelledby="about-heading" className="py-12 sm:py-16 bg-gradient-to-b from-amber-50/40 to-white">
        <div className="container">
          <h2 id="about-heading" className="font-display text-xl sm:text-2xl font-bold text-slate-900 mb-4 tracking-tight">
            {txt.aboutHeading}
          </h2>
          <p className="max-w-2xl text-lg sm:text-xl text-slate-600 leading-relaxed mb-2">
            {txt.aboutIntro}
          </p>
          <p className="text-sm text-slate-500">{txt.missionShort}</p>
        </div>
      </section>

      {/* Offer */}
      <Section id="offer" className="bg-slate-50/80">
        <SectionLabel>{txt.offerLabel}</SectionLabel>
        <SectionTitle>{txt.offerTitle}</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 relative z-10">
          {offers.map((o, i) => (
            <motion.a
              key={o.key}
              href="#join"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -4 }}
              className="group block cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3C9] focus-visible:ring-offset-2 rounded-2xl"
            >
              <Card className="relative overflow-hidden bg-white p-8 sm:p-9 transition-all duration-200 h-full border border-slate-200/80 rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_-12px_rgba(0,163,201,0.1)] hover:border-slate-300/80">
                <CardHeader className="p-0 pb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#00A3C9]/10 flex items-center justify-center mb-5 group-hover:bg-[#00A3C9]/15 transition-colors duration-200">
                    <o.Icon className="w-5 h-5 text-[#00A3C9]" weight="duotone" />
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {txt[o.key + "Title"]}
                  </h3>
                  <CardDescription className="text-sm text-slate-500 font-medium mt-1">
                    {txt[o.key + "Meta"]}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-[15px] sm:text-base text-slate-600 leading-[1.65]">
                    {txt[o.key + "Desc"]}
                  </p>
                </CardContent>
                <span className="mt-6 inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl px-5 py-2.5 text-[15px] font-semibold bg-[#00A3C9] text-white hover:bg-[#0095b8] group-hover:shadow-[0_4px_16px_-4px_rgba(0,163,201,0.4)] transition-all duration-200">
                  {lang === "hu" ? "Jelentkezés" : "Apply"}
                  <ArrowRight className="w-4 h-4 opacity-80" weight="bold" />
                </span>
              </Card>
            </motion.a>
          ))}
        </div>
      </Section>

      {/* Projects – teaser linking to /projects */}
      <Section id="projects" className="bg-slate-50/60">
        <SectionLabel>{txt.projectsLabel}</SectionLabel>
        <SectionTitle>{txt.projectsTitle}</SectionTitle>

        <div className="relative">
          {/* Category selector - overlaps the project cards */}
          <div
            role="tablist"
            aria-label={lang === "hu" ? "Projekt kategóriák" : "Project categories"}
            className="relative z-10 flex gap-1 p-1 rounded-full bg-slate-200/60 w-fit -mb-8 sm:-mb-10"
          >
            <button
              type="button"
              role="tab"
              aria-selected={projectCategory === "current"}
              aria-controls="projects-current"
              onClick={() => setProjectCategory("current")}
              className={cn(
                "px-5 py-2.5 text-[15px] font-medium rounded-full transition-all duration-200",
                projectCategory === "current"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              {txt.currentProjects}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={projectCategory === "archive"}
              aria-controls="projects-archive"
              onClick={() => setProjectCategory("archive")}
              className={cn(
                "px-5 py-2.5 text-[15px] font-medium rounded-full transition-all duration-200",
                projectCategory === "archive"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              {txt.archiveProjects}
            </button>
          </div>

          {/* Project list - only one category visible */}
          <div
            id={projectCategory === "current" ? "projects-current" : "projects-archive"}
            role="tabpanel"
            className="flex flex-col gap-4 sm:gap-5 pt-2"
          >
          {projectCategory === "current" &&
            currentProjects.map((p, i) => (
              <ProjectCard key={p.key} p={p} txt={txt} i={i} spring={spring} />
            ))}
          {projectCategory === "archive" &&
            archiveProjects.map((p, i) => (
              <ProjectCard
                key={p.key}
                p={p}
                txt={txt}
                i={i}
                spring={spring}
                isArchive
              />
            ))}
          </div>
        </div>
        <p className="mt-8 text-slate-600">
          <Link to="/projects" className="text-[#00A3C9] font-medium hover:underline">
            {lang === "hu" ? "Összes projekt megtekintése →" : "View all projects →"}
          </Link>
        </p>
      </Section>

      {/* CTA */}
      <motion.section
        id="join"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ animate: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
        className="py-24 sm:py-32 md:py-36 text-center text-white relative overflow-hidden gradient-cta"
      >
        <div className="container relative z-10">
          <motion.h2
            variants={fadeUp}
            transition={spring}
            className="font-display text-4xl sm:text-5xl md:text-[3.25rem] font-bold text-white mb-4 sm:mb-5 tracking-tight leading-[1.1]"
          >
            {txt.ctaTitle}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ ...spring, delay: 0.05 }}
            className="max-w-[500px] mx-auto mb-10 text-white/90 text-base sm:text-lg leading-[1.6]"
          >
            {txt.ctaDesc}
          </motion.p>
          <motion.div variants={fadeUp} transition={{ ...spring, delay: 0.12 }} className="flex flex-wrap justify-center gap-4">
            <Link
              to="/info"
              className="inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-[15px] font-semibold bg-white/10 text-white border border-white/25 hover:bg-white/15 hover:border-white/40 transition-all duration-200"
            >
              {lang === "hu" ? "GYIK" : "FAQ"}
            </Link>
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
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`py-20 sm:py-24 md:py-28 lg:py-32 ${className}`}
    >
      <div className="container">{children}</div>
    </motion.section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      initial={{ opacity: 0, x: -6 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.06 }}
      className="font-section-label block text-xs tracking-[0.2em] uppercase text-[#00A3C9] mb-3 sm:mb-4"
    >
      {children}
    </motion.span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-8 sm:mb-10 tracking-tight leading-[1.12]"
    >
      {children}
    </motion.h2>
  );
}
