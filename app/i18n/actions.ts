"use server";

import { cookies, headers } from "next/headers";
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
  const destination = formData.get("destination") === "/services" ? "/services" : "/";
  // Support submitting the language form before JavaScript loads, too.
  if (!(await headers()).has("next-action")) {
    cookieStore.set("toslo-language-redirect", destination, {
      maxAge: 60,
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
  }
  redirect(destination);
}
