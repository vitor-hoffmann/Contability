"use client";

import "@/app/styles.css";
import Header from "@/components/HeaderComponent";
import { AppWrapper } from "@/context";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const noHeaderRoutes: string[] = [
    "/activate-account",
    "/login",
    "/recoverpassword",
    "/register",
    "/resetpassword",
    "/verifyaccount",
    "/_not-found",
  ];

  const shouldShowHeader: boolean =
    pathname !== null && !noHeaderRoutes.includes(pathname);

  return (
    <html lang="pt-BR">
      <body>
        {shouldShowHeader && <Header />}
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
