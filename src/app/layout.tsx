import type { Metadata, Viewport } from "next";
import "./globals.css";

const getBaseUrl = (): URL => {
  const urlString = process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL || 'http://localhost:3000';
  const cleanUrl = urlString.startsWith('http://') || urlString.startsWith('https://') 
    ? urlString 
    : `https://${urlString}`;
  try {
    return new URL(cleanUrl);
  } catch {
    return new URL('http://localhost:3000');
  }
};

export const metadata: Metadata = {
  metadataBase: getBaseUrl(),
  title: {
    default: "LSC TSA Forge Hub | Career & Leadership Bootcamp",
    template: "%s | LSC TSA Forge Hub",
  },
  description: "Discover your pathway, build your future. Living Seeds Church TSA Forge Hub connects youths, students, and professionals with industry mentorship and purpose-driven career roadmaps.",
  keywords: [
    "LSC TSA",
    "Living Seeds Church",
    "The Forge Hub",
    "Forge Bootcamp",
    "Church Career Bootcamp",
    "Mentorship Program",
    "NextGen Youth",
    "Undergraduate Track",
    "Professional Excellence",
    "Kingdom Entrepreneurship"
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
    description: "Complete our 3-minute career & mentorship survey to join your tailored bootcamp cohort, match with mentors, and start growing.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LSC TSA Forge Hub | Discover Your Path, Build Your Future",
    description: "Complete our 3-minute career & mentorship survey to join your tailored bootcamp cohort, match with mentors, and start growing.",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
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
      className="h-full antialiased bg-[#fafafa] text-zinc-900"
    >
      <body className="min-h-full flex flex-col bg-[#fafafa] text-zinc-900 selection:bg-amber-100 selection:text-amber-950">{children}</body>
    </html>
  );
}
