import { cookies } from "next/headers";
import { isLocale } from "./translations";

export async function getLocale() {
  const value = (await cookies()).get("toslo-language")?.value;
  return isLocale(value) ? value : null;
}
