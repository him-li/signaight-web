import { type ReactNode } from "react";
import dynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";
import { redirect } from "next/navigation";
import { UserInfo, getSession } from "@/auth";
import { i18n, type Locale } from "i18n.config";
import { getDictionary } from "@/utils/dictionary";
import { ROUTES } from "@/constants/routes";
import { SocketProvider } from "@/contexts/socketContext/SocketContext";
import { ROLES } from "@/constants/roles";
import { SIGNAIGHT_LAYOUT_KEY } from "@/constants/layouts";
const Socket = dynamic(() => import("@/components/atoms/SocketIo"));
const PermissionsProvider = dynamic(
  () => import("@/contexts/permissionsContext/PermissionsContext"),
);
const LayoutProvider = dynamic(
  () => import("@/contexts/layoutContext/LayoutContext"),
);
const Preloaders = dynamic(() => import("@/components/atoms/Preloaders"));
const Providers = dynamic(() => import("@/components/atoms/Providers"));

import "styles/globals.css";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: Locale };
}) {
  const { lang } = await params;
  let userinfo: UserInfo | null = null;
  const dictionary = await getDictionary(lang);
  const session = await getSession();
  const token = session.token;
  userinfo = session.userinfo;

  if (!token && !userinfo) {
    redirect(ROUTES.LOGIN);
  }
  let isAllow = false;
  try {
    const parsedToken = userinfo;

    if (parsedToken?.permissions?.includes(ROLES.SIGNAIGHT_ADMIN)) {
      isAllow = true;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {}

  const layoutType = SIGNAIGHT_LAYOUT_KEY;
  return (
    <html
      lang={lang}
      dir={lang === "he" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body>
        <LayoutProvider layoutName={layoutType}>
          <PermissionsProvider allWatchlistAllow={isAllow}>
            <Preloaders token={token ?? ""} />
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableColorScheme
              enableSystem
            >
              <Providers
                lang={lang}
                dictionary={dictionary}
                token={token ?? ""}
                userinfo={userinfo}
              >
                <SocketProvider>
                  <Socket />
                  {children}
                </SocketProvider>
              </Providers>
            </ThemeProvider>
          </PermissionsProvider>
        </LayoutProvider>
      </body>
    </html>
  );
}
