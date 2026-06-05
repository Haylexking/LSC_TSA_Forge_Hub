import { createClient } from '@supabase/supabase-js';
import AdminDashboard from './AdminDashboard';

export const revalidate = 0; // Disable caching for the admin page

export default async function AdminPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: responses, error } = await supabase
    .from('forge_survey_responses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="p-10 text-red-600">Error loading data: {error.message}</div>;
  }

  return <AdminDashboard initialData={responses || []} />;
}
