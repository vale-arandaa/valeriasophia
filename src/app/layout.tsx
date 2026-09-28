import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import ChatWidget from "@/components/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://vlouxe.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI Agents for Business: Your 24/7 AI Workforce | VLOUXE",
    template: "%s | VLOUXE",
  },
  description:
    "8 AI agents that answer leads, follow up, support customers and post content for your business 24/7. Your AI workforce, live in days.",
  keywords: [
    "AI agents for business",
    "AI workforce",
    "AI sales agent",
    "AI customer support agent",
    "AI marketing agent",
    "business automation with AI",
    "agentes de IA para empresas",
    "agentes de inteligencia artificial para negocios",
    "VLOUXE",
  ],
  authors: [{ name: "VLOUXE" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "AI Agents for Business: Your 24/7 AI Workforce | VLOUXE",
    description:
      "8 AI agents that answer leads, follow up, support customers and post content for your business 24/7. Your AI workforce, live in days.",
    siteName: "VLOUXE",
    locale: "en_US",
    alternateLocale: ["es_419"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agents for Business: Your 24/7 AI Workforce | VLOUXE",
    description:
      "8 AI agents that answer leads, follow up, support customers and post content for your business 24/7. Your AI workforce, live in days.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background font-sans text-foreground">
        <div className="noise-overlay" aria-hidden="true" />
        <LanguageProvider>
          {children}
          <ChatWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
