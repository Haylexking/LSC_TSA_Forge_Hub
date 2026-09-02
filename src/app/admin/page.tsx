import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import AdminDashboard from './AdminDashboard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Operations Console | LSC TSA Forge Hub",
  description: "Internal dashboard for LSC TSA Forge Hub responses.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  let isAuthenticated = false;
  let initialData: Record<string, unknown>[] = [];

  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('forge_admin_session');
    isAuthenticated = !!sessionCookie?.value;

    if (isAuthenticated) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { data: responses } = await supabase
          .from('forge_survey_responses')
          .select('*')
          .order('created_at', { ascending: false });
        initialData = (responses as Record<string, unknown>[]) || [];
      }
    }
  } catch (err) {
    console.error('Error in AdminPage:', err);
  }

  return (
    <AdminDashboard 
      initialData={initialData} 
      initialAuthenticated={isAuthenticated} 
    />
  );
}
