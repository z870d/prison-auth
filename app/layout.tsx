import "./globals.css";
import AuthSession from "@/app/components/AuthSession";
import type { ReactNode } from "react";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AuthSession>{children}</AuthSession>
      </body>
    </html>
  );
}
