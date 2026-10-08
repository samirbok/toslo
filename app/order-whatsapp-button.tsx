"use client";

import { useState } from "react";
import { createWhatsAppUrl } from "./contact-links";
import type { Locale } from "./i18n/translations";

type Props = {
  locale: Locale;
  className: string;
  label: string;
};

export default function OrderWhatsAppButton({ locale, className, label }: Props) {
  const [isLocating, setIsLocating] = useState(false);

  function openWhatsApp(location?: GeolocationPosition) {
    const locationMessage = location
      ? ` My current location: https://maps.google.com/?q=${location.coords.latitude},${location.coords.longitude}`
      : "";
    window.location.assign(createWhatsAppUrl(`I'd like to request a delivery.${locationMessage}`, locale));
  }

  function handleClick() {
    if (!navigator.geolocation) {
      openWhatsApp();
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      position => openWhatsApp(position),
      () => openWhatsApp(),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 },
    );
  }

  return (
    <button type="button" onClick={handleClick} disabled={isLocating} className={className}>
      {isLocating ? "Locating…" : label}
    </button>
  );
}
