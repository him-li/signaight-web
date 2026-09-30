import { ThemeProvider } from "next-themes";
import NotFound from "@/components/atoms/Icons/NotFound";
import "styles/globals.css";

export default function NotFoundPage() {
  return (
    <html suppressHydrationWarning>
      <head></head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableColorScheme
          enableSystem
        >
          <NotFound />
        </ThemeProvider>
      </body>
    </html>
  );
}
export const metadata = {
  title: "Not Found",
  description: "The requested resource could not be found.",
};
