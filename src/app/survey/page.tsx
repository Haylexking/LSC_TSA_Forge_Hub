import type { Metadata } from 'next';
import SurveyClient from './SurveyClient';

export const metadata: Metadata = {
  title: "Take the Career Survey | LSC TSA Forge Hub",
  description: "Find your path, build your future. Take our 3-minute career & mentorship survey to join your cohort and connect with industry mentors.",
  openGraph: {
    title: "Take the Career Survey | LSC TSA Forge Hub",
    description: "Find your path, build your future. Take our 3-minute career & mentorship survey to join your cohort and connect with industry mentors.",
    url: "/survey",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Take the Career Survey | LSC TSA Forge Hub",
    description: "Find your path, build your future. Take our 3-minute career & mentorship survey to join your cohort and connect with industry mentors.",
  },
};

export default function Page() {
  return <SurveyClient />;
}
