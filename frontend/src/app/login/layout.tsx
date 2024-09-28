import "@/styles.css";

export const metadata = {
  title: "Contability - Login",
  description: "Login page for contability",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
