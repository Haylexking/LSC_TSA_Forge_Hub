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
    default: "LSC TSA Forge Hub | Career & Mentorship Pathways",
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

export const viewport: Viewport = {
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
      className="h-full antialiased dark"
    >
      <body className="min-h-full flex flex-col bg-[#09090b] text-zinc-100">{children}</body>
    </html>
  );
}
