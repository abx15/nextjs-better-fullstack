import type { Metadata } from "next";
import { Inter, Noto_Sans_Devanagari } from "next/font/google";
import "../index.css";
import Providers from "@/components/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-hindi",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SarkariSaathi — सरकारी योजनाएं अब आसान",
  description:
    "Find government schemes made for YOU — in 2 minutes, for free. AI-powered scheme finder for Indian citizens. सरकारी योजनाओं को खोजें, समझें और आवेदन करें।",
  keywords: [
    "sarkari yojana",
    "government schemes",
    "PM KISAN",
    "Ayushman Bharat",
    "सरकारी योजना",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoDevanagari.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
