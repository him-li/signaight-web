import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "i18n.config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { SESSION_COOKIE_NAME } from "./auth";
import { PAGE_PATH_HEADER, ROUTES } from "./constants/routes";

const privateRoutes: string[] = i18n.locales.map((it) => `/${it}/:path*`);

const publicRoutes = [ROUTES.LOGIN, "/register"];

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-expect-error locales are readonly
  const locales: string[] = i18n.locales;

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  );
  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  request.headers.set(PAGE_PATH_HEADER, pathname);

  if (pathname === ROUTES.LOGOUT) {
    const response = NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    response.cookies.delete(SESSION_COOKIE_NAME);
    return response;
  }

  const localePrefix = i18n.locales.find(
    (locale) =>
      pathname === "/" + locale || pathname.startsWith("/" + locale + "/"),
  );
  const pathnameWithoutLocale = localePrefix
    ? pathname.slice(localePrefix.length + 1) || "/"
    : pathname;
  const isPublicRoute = publicRoutes.includes(pathnameWithoutLocale);

  if (isPublicRoute) {
    if (localePrefix) {
      return NextResponse.redirect(
        new URL(pathnameWithoutLocale, request.url),
      );
    }
    return NextResponse.next({ request: { headers: request.headers } });
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    if (locale) {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set(PAGE_PATH_HEADER, pathname);
      return NextResponse.redirect(
        new URL(
          `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}` +
            (request.nextUrl.searchParams
              ? `?${request.nextUrl.searchParams}`
              : ""),
          request.url,
        ),
        { headers: requestHeaders },
      );
    }
  }
  if (!request.cookies.get(SESSION_COOKIE_NAME)) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }
  return NextResponse.next({ request: { headers: request.headers } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
