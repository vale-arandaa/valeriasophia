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
    default: "VLOUXE | AI Workforce for Modern Businesses",
    template: "%s | VLOUXE",
  },
  description:
    "VLOUXE builds AI agents that work as a digital workforce, handling sales, marketing, support, and operations for growing businesses across the US and Latin America.",
  keywords: [
    "AI workforce",
    "AI agents for business",
    "AI automation",
    "business AI agents",
    "AI operations",
    "VLOUXE",
  ],
  authors: [{ name: "VLOUXE" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "VLOUXE | AI Workforce for Modern Businesses",
    description:
      "VLOUXE gives businesses intelligent AI agents that handle real work, automate operations, and work together as a digital workforce.",
    siteName: "VLOUXE",
  },
  twitter: {
    card: "summary_large_image",
    title: "VLOUXE | AI Workforce for Modern Businesses",
    description:
      "VLOUXE gives businesses intelligent AI agents that handle real work, automate operations, and work together as a digital workforce.",
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
