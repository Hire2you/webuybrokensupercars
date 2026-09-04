"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToHashTarget() {
  const hash = window.location.hash;
  if (!hash) return false;

  const target = document.getElementById(hash.slice(1));
  if (!target) return false;

  target.scrollIntoView({ block: "start" });
  return true;
}

function resetScrollPosition() {
  const active = document.activeElement;
  if (active instanceof HTMLElement && active !== document.body) {
    active.blur();
  }

  const { style } = document.documentElement;
  const previousBehavior = style.scrollBehavior;
  style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  style.scrollBehavior = previousBehavior;
}

function restoreScrollPosition() {
  if (scrollToHashTarget()) return;
  resetScrollPosition();
}

export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    restoreScrollPosition();

    const frame = requestAnimationFrame(() => {
      restoreScrollPosition();
    });

    function onPageShow() {
      restoreScrollPosition();
    }

    window.addEventListener("pageshow", onPageShow);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [pathname]);

  return null;
}
