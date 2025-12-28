import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // If there's a hash, try to scroll to the element.
    if (hash) {
      const id = hash.replace("#", "");

      // Wait for the route content to render.
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "auto", block: "start" });
        } else {
          // Fallback if element isn't found
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        }
      });

      return;
    }

    // Normal navigation (or refresh) -> go to top
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search, hash]);

  return null;
}
