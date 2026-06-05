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

const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? `https://${process.env.NEXT_PUBLIC_APP_URL}`
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "LSC TSA Forge Hub | Career & Mentorship Survey",
    template: "%s | LSC TSA Forge Hub",
  },
  description: "Discover your pathway, build your future. The Forge Hub connects you with industry mentorship, career clarity, and a thriving peer community. Complete our survey in under 3 minutes.",
  keywords: [
    "LSC TSA",
    "Living Seeds Church",
    "The Forge Hub",
    "Forge Hub",
    "Career Mentorship",
    "Church Career Survey",
    "NextGen",
    "Undergraduate Program",
    "Professional Pathway",
    "Entrepreneurship Community"
  ],
  authors: [{ name: "Living Seeds Church TSA" }],
  creator: "LSC TSA Forge Hub Team",
  publisher: "Living Seeds Church",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "LSC TSA Forge Hub",
    title: "LSC TSA Forge Hub | Discover Your Path, Build Your Future",
    description: "Complete our 3-minute career and mentorship survey to find your tailored cohort, match with mentors, and start growing today.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LSC TSA Forge Hub | Discover Your Path, Build Your Future",
    description: "Complete our 3-minute career and mentorship survey to find your tailored cohort, match with mentors, and start growing today.",
  },
};

export const viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
