import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Keep Server Actions and client-side navigation in the selected language.
  if (request.method !== "GET" || request.headers.get("rsc") === "1") {
    return NextResponse.next();
  }

  // A native form submission needs one document redirect after choosing a language.
  const justSelected = request.cookies.get("toslo-language-redirect")?.value === request.nextUrl.pathname;
  if (!justSelected) {
    request.cookies.delete("toslo-session-language");
    request.cookies.delete("toslo-language");
  }

  const response = NextResponse.next({ request: { headers: request.headers } });
  response.cookies.delete("toslo-language-redirect");
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = {
  matcher: ["/", "/services"],
};
