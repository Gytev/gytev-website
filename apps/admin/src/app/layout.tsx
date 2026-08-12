import type { Metadata } from "next";
import localFont from "next/font/local";

import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
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
      <body className={`${walsheim.variable} antialiased`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <Topbar />
            <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8 lg:px-10 lg:py-10">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
