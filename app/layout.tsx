import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "APLD Analytics Pipeline — KMK",
  description:
    "AI-powered analytics pipeline for Anonymized Patient Level Data (APLD) analysis including market sizing, switch analysis, adherence, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-surface font-sans">
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
