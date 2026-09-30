"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isLocale } from "./translations";

export async function chooseLanguage(formData: FormData) {
  const locale = formData.get("language");
  if (!isLocale(locale)) return;
  (await cookies()).set("toslo-language", locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  redirect(formData.get("destination") === "/services" ? "/services" : "/");
}
