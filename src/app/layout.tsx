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
    default: "LSC TSA Forge Hub | Career & Leadership Foundry",
    template: "%s | LSC TSA Forge Hub",
  },
  description: "Discover your pathway, build your future. The Forge Hub connects youths, undergraduates, and professionals with 1:1 mentorship and practical skill tracks. Complete our 3-minute assessment.",
  keywords: [
    "LSC TSA",
    "Living Seeds Church",
    "The Forge Hub",
    "Forge Bootcamp",
    "Career Mentorship",
    "NextGen Youth",
    "Undergraduate Program",
    "Professional Excellence",
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
    description: "Complete our 3-minute career & mentorship survey to join your tailored cohort, match with mentors, and start growing.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LSC TSA Forge Hub | Discover Your Path, Build Your Future",
    description: "Complete our 3-minute career & mentorship survey to join your tailored cohort, match with mentors, and start growing.",
  },
};

export const viewport: Viewport = {
  themeColor: "#090a0c",
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
      className="h-full antialiased dark"
    >
      <body className="min-h-full flex flex-col bg-[#090a0c] text-zinc-100 selection:bg-zinc-700 selection:text-white">{children}</body>
    </html>
  );
}
