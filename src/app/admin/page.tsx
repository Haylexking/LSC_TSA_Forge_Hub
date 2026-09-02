import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import AdminDashboard from './AdminDashboard';

export const revalidate = 0; // Disable caching for the admin page

export const metadata: Metadata = {
  title: "Operations Console | LSC TSA Forge Hub",
  description: "Internal dashboard for LSC TSA Forge Hub responses.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('forge_admin_session');
  const isAuthenticated = !!sessionCookie?.value;

  let initialData: Record<string, unknown>[] = [];

  if (isAuthenticated) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: responses } = await supabase
      .from('forge_survey_responses')
      .select('*')
      .order('created_at', { ascending: false });

    initialData = (responses as Record<string, unknown>[]) || [];
  }

  return (
    <AdminDashboard 
      initialData={initialData} 
      initialAuthenticated={isAuthenticated} 
    />
  );
}
