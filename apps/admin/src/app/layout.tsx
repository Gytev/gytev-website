import type { Metadata } from "next";

import "./globals.css";
import "@gytev/design-system/tokens.css";

export const metadata: Metadata = {
  title: {
    default: "Gytev Admin",
    template: "%s — Gytev Admin",
  },
  description: "Console d'administration du contenu Gytev.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
