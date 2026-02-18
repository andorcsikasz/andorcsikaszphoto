import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

const t = {
  hu: {
    tagline: "Segítünk a fiataloknak az Erasmus+ projekteken keresztül: ifjúsági cserék, digitális készségek és interkulturális tanulás egész Európában.",
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
  },
  en: {
    tagline: "We empower young people through Erasmus+ projects: youth exchanges, digital skills, and intercultural learning across Europe.",
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
  },
};

const offers = [
  { key: "offer1" as const, icon: "🔄" },
  { key: "offer2" as const, icon: "📚" },
  { key: "offer3" as const, icon: "💡" },
];

const values = [
  { key: "value1" as const, icon: "🌍" },
  { key: "value2" as const, icon: "📚" },
  { key: "value3" as const, icon: "🤝" },
  { key: "value4" as const, icon: "💡" },
];

const projects = [
  { key: "proj1" as const, location: "Budapest (HU)", date: "2025 Q2" },
  { key: "proj2" as const, location: "Brno (CZ)", date: "2025 Q2" },
  { key: "proj3" as const, location: "Bécs (AT)", date: "2025 Q3" },
];

const benefits = ["benefit1", "benefit2", "benefit3", "benefit4"] as const;

export default function Home({ lang }: { lang: "hu" | "en" }) {
  const txt = t[lang];

  return (
    <>
      {/* Hero */}
      <header className="min-h-screen min-h-dvh flex flex-col justify-center items-center text-center px-6 pt-24 pb-16 relative overflow-hidden bg-[#fbf9f6] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_100%_80%_at_50%_-20%,rgba(0,51,153,0.12)_0%,transparent_55%)] before:bg-[radial-gradient(circle_at_80%_90%,rgba(205,127,50,0.06)_0%,transparent_40%)] before:bg-[#fbf9f6] before:pointer-events-none before:opacity-60">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,51,153,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,51,153,0.02)_1px,transparent_1px)] bg-[length:60px_60px] pointer-events-none" />
        <motion.div
          className="container relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-[#003399] mb-2 tracking-tight">
            JÖVŐKÉPP
          </h1>
          <p className="text-base sm:text-lg text-[#536471] tracking-wide mb-8">
            Fiatalok Magyarországért! Egyesület
          </p>
          <p className="text-lg sm:text-xl text-[#0f1419] max-w-[580px] mx-auto mb-10 leading-relaxed">
            {txt.tagline}
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-[0.9375rem] text-[#536471]">
            {[txt.feature1, txt.feature2, txt.feature3].map((f, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="text-[#003399] font-semibold">—</span>
                {f}
              </span>
            ))}
          </div>
          <p className="mt-12 px-6 py-2.5 rounded-full bg-[#003399]/6 border border-[#003399]/20 text-sm font-medium text-[#003399] inline-flex items-center gap-2">
            🇪🇺 {txt.euBadge}
          </p>
          <span className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-[#536471] animate-bounce">
            {txt.scroll}
          </span>
        </motion.div>
      </header>

      {/* Offer */}
      <Section id="offer" className="bg-white">
        <SectionLabel>{txt.offerLabel}</SectionLabel>
        <SectionTitle>{txt.offerTitle}</SectionTitle>
        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((o, i) => (
            <motion.div
              key={o.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-gradient-to-r before:from-[#003399] before:to-[#cd7f32] before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300 before:origin-left">
                <CardHeader>
                  <CardTitle>{txt[o.key + "Title"]}</CardTitle>
                  <CardDescription>{txt[o.key + "Meta"]}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-[0.95rem] text-[#0f1419]/90">
                    {txt[o.key + "Desc"]}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Values */}
      <Section id="values">
        <SectionLabel>{txt.valuesLabel}</SectionLabel>
        <SectionTitle>{txt.valuesTitle}</SectionTitle>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-8 bg-[#fbf9f6] rounded-2xl hover:-translate-y-1 transition-transform"
            >
              <div className="w-12 h-12 mx-auto mb-5 rounded-xl bg-gradient-to-br from-[#003399] to-[#1a4db8] flex items-center justify-center text-xl">
                {v.icon}
              </div>
              <h4 className="font-semibold text-[#0f1419] mb-1">
                {txt[v.key + "Title"]}
              </h4>
              <p className="text-sm text-[#536471]">{txt[v.key + "Desc"]}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" className="bg-white">
        <SectionLabel>{txt.projectsLabel}</SectionLabel>
        <SectionTitle>{txt.projectsTitle}</SectionTitle>
        <div className="flex flex-col gap-3">
          {projects.map((p, i) => (
            <motion.div
              key={p.key}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-wrap items-center gap-4 p-5 bg-[#fbf9f6] rounded-xl border border-black/5 hover:bg-[#003399]/5 hover:border-[#003399]/10 transition-colors"
            >
              <span className="font-semibold text-[#0f1419]">
                {txt[p.key]}
              </span>
              <span className="text-sm text-[#536471]">{p.location}</span>
              <span className="text-xs text-[#003399] font-semibold">
                {p.date}
              </span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section
        id="join"
        className="py-24 text-center text-white relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #003399 0%, #002266 50%, #001a52 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,204,0,0.08)_0%,transparent_50%)] pointer-events-none" />
        <div className="container relative z-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white mb-4">
            {txt.ctaTitle}
          </h2>
          <p className="max-w-[500px] mx-auto mb-10 opacity-90 text-[1.05rem]">
            {txt.ctaDesc}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[560px] mx-auto mb-10">
            {benefits.map((b) => (
              <div
                key={b}
                className="flex items-center p-4 rounded-xl bg-white/10 backdrop-blur border border-white/10 text-left"
              >
                <span className="text-[#ffcc00] font-bold mr-2">✓</span>
                <span className="font-medium">{txt[b]}</span>
              </div>
            ))}
          </div>
          <Button asChild size="lg">
            <a href="mailto:info@jovokepp.hu">{txt.ctaButton}</a>
          </Button>
        </div>
      </section>
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`py-20 ${className}`}
    >
      <div className="container">{children}</div>
    </motion.section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-[#003399] mb-3">
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-[#0f1419] mb-10 tracking-tight">
      {children}
    </h2>
  );
}
