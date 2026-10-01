"use client";

import { translator, type Locale } from "./i18n/translations";


import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "/images/img3.png", alt: "Toslo delivery rider at a doorway holding a green Toslo bag and a phone displaying On time delivery" },
  { src: "/images/img1-v3.png", alt: "A customer and a delivery rider sharing a bucket of KFC fried chicken" },
  { src: "/images/img2.png", alt: "Delivery rider holding takeaway bags outside Crusty" },
];

export default function HeroSlider({ locale = "en" }: { locale?: Locale }) {
  const t = translator(locale);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [paused, active]);

  return (
    <div
      dir="ltr"
      role="region"
      aria-roledescription={t("carousel")}
      aria-label={t("Local food and delivery")}
      className="relative mx-auto w-full max-w-lg overflow-hidden rounded-[2rem] bg-[#1A1A1A] shadow-xl shadow-black/10 [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-white"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          const direction = event.key === "ArrowLeft" ? -1 : 1;
          setActive((current) => (current + direction + slides.length) % slides.length);
        }
      }}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            role="group"
            aria-roledescription={t("slide")}
            aria-label={`${index + 1} ${t("of")} ${slides.length}`}
            aria-hidden={active !== index}
            className="relative aspect-[1197/1314] w-full shrink-0"
          >
            <Image
              src={slide.src}
              alt={t(slide.alt)}
              fill
              sizes="(max-width: 560px) calc(100vw - 48px), (max-width: 1023px) 512px, (max-width: 1199px) calc((100vw - 112px) / 2), 512px"
              preload={index === 0}
              loading={index === 0 ? undefined : "eager"}
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-5 pt-12 pb-4 text-white">
        <button
          type="button"
          aria-label={t(paused ? "Resume slideshow" : "Pause slideshow")}
          onClick={() => setPaused((current) => !current)}
          className="flex size-11 items-center justify-center rounded-full bg-black/40 hover:bg-black/60"
        >
          <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
        </button>
        <div className="flex items-center gap-1" aria-label={t("Choose a picture")}>
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`${t("Show picture")} ${index + 1}`}
              aria-current={active === index ? "true" : undefined}
              onClick={() => setActive(index)}
              className="flex size-11 items-center justify-center rounded-full"
            >
              <span className={`h-2 rounded-full transition-all motion-reduce:transition-none ${active === index ? "w-7 bg-white" : "w-2 bg-white/50"}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
