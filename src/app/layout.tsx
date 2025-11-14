import type { Metadata } from "next";
import "../styles/theme.css";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { NavbarProvider } from "@/contexts/NavbarContext";
import ClientLayout from "@/components/ClientLayout";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Artificial Super intelligenceence SaaS",
  description:
    "Advancing human potential through AI-driven SaaS solutions. Pioneering the next era of Super intelligenceence with cutting-edge technology that transforms how we work and think.",
  keywords: [
    "Artificial Super intelligenceence",
    "AI SaaS",
    "Super intelligenceence",
    "AI Solutions",
    "Cognitive Computing",
    "Neural Networks",
    "Advanced Analytics",
    "AI Automation",
  ],
  authors: [{ name: "Artificial Super intelligenceence Team" }],
  openGraph: {
    title: "Artificial Super intelligenceence SaaS",
    description:
      "Advancing human potential through AI-driven SaaS solutions. Pioneering the next era of Super intelligenceence.",
    type: "website",
    locale: "en_US",
    siteName: "Artificial Super intelligenceence SaaS",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artificial Super intelligenceence SaaS",
    description:
      "Advancing human potential through AI-driven SaaS solutions. Pioneering the next era of Super intelligenceence.",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "var(--matrix-color)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="amber">
      <body className={`${dmSans.variable} ${dmSans.className} antialiased`} suppressHydrationWarning={true}>
        <ThemeProvider>
          <NavbarProvider>
            <ClientLayout>{children}</ClientLayout>
            <Analytics />
          </NavbarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
