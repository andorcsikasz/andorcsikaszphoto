import { Copy, Envelope } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const EMAIL = "info@jovokepp.hu";
// Placeholder – replace with real contact person
const CONTACT_PERSON = "JÖVŐKÉPP Csapat";

const contactTranslations = {
  hu: {
    label: "Kapcsolat",
    title: "Kapcsolat",
    backToHome: "Főoldal",
    intro: "Kérdésed van, szeretnél jelentkezni, vagy partnert keresel? Írj nekünk.",
    contactPerson: "Kapcsolattartó",
    emailLabel: "E-mail",
    copyBtn: "Másolás",
    copied: "Másolva",
    applySubject: "Jelentkezés / Participation",
    partnerSubject: "Partneri együttműködés / Partnership",
  },
  en: {
    label: "Contact",
    title: "Contact",
    backToHome: "Home",
    intro: "Have a question, want to apply, or looking for a partner? Get in touch.",
    contactPerson: "Contact person",
    emailLabel: "Email",
    copyBtn: "Copy",
    copied: "Copied",
    applySubject: "Application / Participation",
    partnerSubject: "Partnership enquiry",
  },
};

function CopyEmailButton({ email, lang, txt }: { email: string; lang: "hu" | "en"; txt: (typeof contactTranslations)["hu"] }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const input = document.createElement("input");
        input.value = email;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silently fail
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 hover:border-[#00A3C9]/40 text-slate-900 font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3C9] focus-visible:ring-offset-2"
    >
      <Envelope className="w-5 h-5 text-[#00A3C9]" weight="duotone" />
      {email}
      <Copy className="w-4 h-4 text-slate-400" weight="bold" />
      {copied && <span className="text-sm text-green-600 font-medium">{txt.copied}</span>}
    </button>
  );
}

export default function Contact({ lang }: { lang: "hu" | "en" }) {
  const txt = contactTranslations[lang];

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

        <div className="max-w-xl space-y-8">
          <p className="text-slate-600 text-lg leading-relaxed">{txt.intro}</p>

          <div className="space-y-4 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)]">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">{txt.contactPerson}</p>
            <p className="font-semibold text-slate-900">{CONTACT_PERSON}</p>
            <div>
              <p className="text-sm font-semibold text-slate-500 mb-1">{txt.emailLabel}</p>
              <CopyEmailButton email={EMAIL} lang={lang} txt={txt} />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/60">
            <p className="text-sm text-slate-600 mb-2">
              {lang === "hu" ? "Jelentkezéshez:" : "To apply:"}{" "}
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(txt.applySubject)}`}
                className="text-[#00A3C9] font-medium hover:underline"
              >
                {EMAIL}
              </a>
            </p>
            <p className="text-sm text-slate-600">
              {lang === "hu" ? "Partnerséghez:" : "For partnership:"}{" "}
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(txt.partnerSubject)}`}
                className="text-[#00A3C9] font-medium hover:underline"
              >
                {EMAIL}
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
