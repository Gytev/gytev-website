import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@gytev/design-system/tokens.css";

const walsheim = localFont({
  src: [
    {
      path: "../fonts/GT-Walsheim-Ultra-Light-Trial.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/GT-Walsheim-Light-Trial.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/GT-Walsheim-Regular-Trial.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/GT-Walsheim-Medium-Trial.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/GT-Walsheim-Bold-Trial.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/GT-Walsheim-Ultra-Bold-Trial.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/GT-Walsheim-Black-Trial.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-walsheim",
  display: "swap",
});

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
      <body className={`${walsheim.variable} antialiased`}>{children}</body>
    </html>
  );
}
