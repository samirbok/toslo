import { cookies } from "next/headers";
import { isLocale } from "./translations";

export async function getLocale() {
  // Ignore the former year-long cookie, including for returning visitors.
  const value = (await cookies()).get("toslo-session-language")?.value;
  return isLocale(value) ? value : null;
}
