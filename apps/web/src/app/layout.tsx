import type { Metadata } from "next";
import "./globals.css";
import "@gytev/design-system/tokens.css";

export const metadata: Metadata = {
  title: {
    default: "Gytev",
    template: "%s — Gytev",
  },
  description:
    "Gytev builds intelligent systems that observe, understand, predict and act on the real world.",
  metadataBase: new URL("https://gytev.com"),
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
