import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-start relative bg-default-50/80 h-screen">
      {children}
    </div>
  );
}
