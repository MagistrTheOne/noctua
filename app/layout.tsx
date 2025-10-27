import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/auth-provider";
import { JSONLD } from "@/components/seo/json-ld";
import { Analytics } from "@/components/analytics/analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nocturide IDE - AI-Powered Web Development Environment",
  description: "Create stunning apps and websites with AI assistance. Modern web-based IDE with code generation, real-time collaboration, and instant deployment. Start building for free.",
  keywords: ["AI IDE", "code generator", "web development", "AI assistant", "Monaco editor", "Next.js", "TypeScript", "React", "AI coding", "web-based IDE"],
  authors: [{ name: "MagistrTheOne" }],
  creator: "MagistrTheOne",
  publisher: "MagistrTheOne",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: 'https://nocturide.dev',
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://nocturide.dev",
    title: "Nocturide IDE - AI-Powered Web Development Environment",
    description: "Create stunning apps and websites with AI assistance. Modern web-based IDE with code generation, real-time collaboration, and instant deployment.",
    siteName: "Nocturide IDE",
    images: [
      {
        url: "https://nocturide.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nocturide IDE - AI-Powered Web Development Environment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@NocturideIDE",
    creator: "@MagistrTheOne",
    title: "Nocturide IDE - AI-Powered Web Development Environment",
    description: "Create stunning apps and websites with AI assistance. Modern web-based IDE with code generation, real-time collaboration, and instant deployment.",
    images: ["https://nocturide.dev/twitter-image.jpg"],
  },
  category: "Technology",
  classification: "Software Development Tools",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#18181b",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark">
      <head>
        <JSONLD />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Analytics />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}