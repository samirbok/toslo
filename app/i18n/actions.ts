"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isLocale } from "./translations";

export async function chooseLanguage(formData: FormData) {
  const locale = formData.get("language");
  if (!isLocale(locale)) return;
  const cookieStore = await cookies();
  cookieStore.delete("toslo-language");
  // No maxAge or expires: keep the choice only for this browser session.
  cookieStore.set("toslo-session-language", locale, {
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  redirect(formData.get("destination") === "/services" ? "/services" : "/");
}
