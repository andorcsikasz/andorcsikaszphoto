import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scrolls to the hash target when navigating (e.g. /info → /#offer) */
export function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    }
  }, [pathname, hash]);

  return null;
}
