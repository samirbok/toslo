"use client";

import { useSyncExternalStore } from "react";
import { translator, type Locale } from "./i18n/translations";

const themeEvent = "toslo-theme-change";

function subscribe(callback: () => void) {
  const syncStoredTheme = (event: StorageEvent) => {
    if (event.key !== "toslo-theme") return;
    document.documentElement.dataset.theme = event.newValue === "dark" ? "dark" : "light";
    callback();
  };
  window.addEventListener(themeEvent, callback);
  window.addEventListener("storage", syncStoredTheme);
  return () => {
    window.removeEventListener(themeEvent, callback);
    window.removeEventListener("storage", syncStoredTheme);
  };
}

export default function ThemeToggle({ locale = "en" }: { locale?: Locale }) {
  const t = translator(locale);
  const dark = useSyncExternalStore(subscribe, () => document.documentElement.dataset.theme === "dark", () => false);
  const label = t(dark ? "Switch to light mode" : "Switch to dark mode");

  function toggleTheme() {
    const theme = dark ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("toslo-theme", theme); } catch { /* Still works when storage is blocked. */ }
    window.dispatchEvent(new Event(themeEvent));
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={dark}
      title={label}
      className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-2xl border border-[#00875A]/10 bg-white text-[#007D53] shadow-sm transition-colors duration-200 hover:bg-[#ECFDF5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E5A83B] motion-reduce:transition-none dark:border-white/10 dark:bg-[#1B2822] dark:text-[#E5A83B] dark:hover:bg-[#25382E]"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-5">
        {dark ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2 M12 20v2 M2 12h2 M20 12h2 M4.9 4.9l1.4 1.4 M17.7 17.7l1.4 1.4 M4.9 19.1l1.4-1.4 M17.7 6.3l1.4-1.4" /></> : <path d="M20.8 13A9 9 0 0 1 11 3.2 9 9 0 1 0 20.8 13Z" />}
      </svg>
    </button>
  );
}
