import type { Metadata } from "next";
import { Noto_Sans_Bengali, Noto_Serif_Bengali, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import "./globals.css";
const bengaliSans = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-bengali-sans",
  display: "swap",
});
const bengaliSerif = Noto_Serif_Bengali({
  subsets: ["bengali"],
  variable: "--font-bengali-serif",
  display: "swap",
});
const english = Inter({
  subsets: ["latin"],
  variable: "--font-english",
  display: "swap",
});
export const metadata: Metadata = {
  title: "Law Helper",
  description: "Bangladesh legal assistance platform",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body
        className={`${bengaliSans.variable} ${bengaliSerif.variable} ${english.variable} antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
