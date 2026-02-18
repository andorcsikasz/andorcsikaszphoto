import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const STORAGE_KEY = "jovokepp-cookies-accepted";

export function CookieNotice({ lang }: { lang: "hu" | "en" }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(STORAGE_KEY);
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-notice-title"
      className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-5 bg-white border-t border-slate-200/80 shadow-[0_-4px_20px_-8px_rgba(0,0,0,0.12)]"
    >
      <div className="container flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p id="cookie-notice-title" className="text-sm text-slate-600">
          {lang === "hu" ? (
            <>
              A weboldal alapvető működéséhez szükséges sütiket használunk.{" "}
              <Link to="/privacy" className="text-[#00A3C9] font-medium hover:underline">
                Adatvédelmi tájékoztató
              </Link>
            </>
          ) : (
            <>
              We use essential cookies for site functionality.{" "}
              <Link to="/privacy" className="text-[#00A3C9] font-medium hover:underline">
                Privacy policy
              </Link>
            </>
          )}
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 px-5 py-2.5 rounded-xl bg-[#00A3C9] text-white font-semibold hover:bg-[#0095b8] transition-colors text-sm"
        >
          {lang === "hu" ? "Rendben" : "OK"}
        </button>
      </div>
    </div>
  );
}
