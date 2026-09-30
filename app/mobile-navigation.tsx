"use client";

import { useRef } from "react";

export default function MobileNavigation({ home = false }: { home?: boolean }) {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const links = [
    ["Services", "/services"],
    ...[["How it works", "how-it-works"], ["Pricing", "pricing"], ["Zones", "zones"], ["Reviews", "reviews"], ["Contact", "contact"]].map(([label, id]) => [label, `${home ? "" : "/"}#${id}`]),
  ];

  return (
    <details
      ref={menuRef}
      className="group lg:hidden"
      onKeyDown={event => {
        if (event.key === "Escape" && menuRef.current) {
          menuRef.current.open = false;
          menuRef.current.querySelector("summary")?.focus();
        }
      }}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget) && menuRef.current) menuRef.current.open = false;
      }}
    >
      <summary aria-label="Navigation menu" className="flex size-11 cursor-pointer list-none items-center justify-center rounded-lg hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-[#00875A] [&::-webkit-details-marker]:hidden">
        <span aria-hidden="true" className="flex flex-col gap-1.5"><span className="h-0.5 w-5 bg-current" /><span className="h-0.5 w-5 bg-current" /><span className="h-0.5 w-5 bg-current" /></span>
      </summary>
      <div className="absolute inset-x-0 top-full max-h-[calc(100dvh-81px)] overflow-y-auto border-b border-gray-200 bg-[#FAFAF8] px-6 py-3 shadow-lg shadow-black/5">
        {links.map(([label, href]) => (
          <a key={label} href={href} onClick={() => { if (menuRef.current) menuRef.current.open = false; }} className="flex min-h-12 items-center rounded-lg px-3 text-sm font-medium text-[#111111] hover:bg-[#ECFDF5] focus-visible:outline-2 focus-visible:outline-[#00875A]">{label}</a>
        ))}
      </div>
    </details>
  );
}
