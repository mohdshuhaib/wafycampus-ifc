import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ifc.wafycampuskalikkavu.edu"),
  title: "IFC Season 2 | International Fiqh Conference - Wafy Campus Kalikkavu",
  description:
    "Official portal of the International Fiqh Conference (IFC) Season 2 organized by the Department of Sharee'ah, Wafy Campus Kalikkavu under CIC. Theme: Islamic Finance Principles: Strength & Opportunities for India's Ethical Growth.",
  keywords: [
    "International Fiqh Conference",
    "IFC Season 2",
    "Wafy Campus Kalikkavu",
    "Department of Shareeah",
    "Usrah",
    "Muamalah",
    "Islamic Finance India",
    "CIC Wafy"
  ],
  openGraph: {
    title: "IFC Season 2 | International Fiqh Conference",
    description:
      "Islamic Finance Principles: Strength & Opportunities for India's Ethical Growth - Wafy Campus Kalikkavu",
    images: ["/poster.jpg"]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f5f5f7] text-[#1d1d1f] selection:bg-[#059669] selection:text-white">
        {children}
      </body>
    </html>
  );
}
