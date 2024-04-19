import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const i18nConfig = {
  locales: ["en", "es"],
  defaultLocale: "en",
};

function getPreferredLocale(request: NextRequest): string {
  const acceptLanguageHeader = request.headers.get("accept-language");

  const preferredLocales =
    acceptLanguageHeader?.split(",").map((lang) => {
      return lang.split(";")[0].trim();
    }) || [];

  const matchedLocale = preferredLocales.find((locale) =>
    i18nConfig.locales.includes(locale)
  );

  return matchedLocale || i18nConfig.defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const pathnameHasValidLocale = i18nConfig.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasValidLocale) {
    return NextResponse.next();
  }

  const preferredLocale = getPreferredLocale(request);
  const newPathname = `/${preferredLocale}${pathname}`;
  return NextResponse.redirect(new URL(newPathname, request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
