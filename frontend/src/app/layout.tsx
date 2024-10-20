"use client";

import "@/app/styles.css";
import Header from "@/components/HeaderComponent";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const noHeaderRoutes: string[] = ["/dashboard"];

  const shouldShowHeader: boolean =
    pathname === null || noHeaderRoutes.includes(pathname);

  return (
    <html lang="pt-BR">
      <body className="overflow-hidden">
        {shouldShowHeader && <Header />}
        {children}
      </body>
    </html>
  );
}
