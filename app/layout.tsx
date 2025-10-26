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
  title: "Nocturide IDE - Modern Web-Based Development Environment",
  description: "Build, code, and deploy your projects with AI assistance in a beautiful, modern web-based IDE",
  keywords: ["IDE", "code editor", "web development", "AI assistant", "Monaco editor"],
  authors: [{ name: "MagistrTheOne" }],
  creator: "MagistrTheOne",
  publisher: "MagistrTheOne",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nocturide.dev",
    title: "Nocturide IDE - Modern Web-Based Development Environment",
    description: "Build, code, and deploy your projects with AI assistance in a beautiful, modern web-based IDE",
    siteName: "Nocturide IDE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nocturide IDE - Modern Web-Based Development Environment",
    description: "Build, code, and deploy your projects with AI assistance in a beautiful, modern web-based IDE",
    creator: "@MagistrTheOne",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#18181b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
