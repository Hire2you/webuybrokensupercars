"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToTarget() {
  const hash = window.location.hash;
  if (!hash) {
    window.scrollTo(0, 0);
    return;
  }

  const target = document.getElementById(hash.slice(1));
  if (target) {
    target.scrollIntoView({ block: "start" });
  }
}

export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    scrollToTarget();
  }, [pathname]);

  return null;
}
