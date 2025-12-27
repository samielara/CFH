import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RestoreBodyScroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }, [pathname]);

  return null;
}
