'use server';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export async function submitSurvey(data: Record<string, unknown>) {
  try {
    const { error } = await supabase
      .from('forge_survey_responses')
      .insert([data]);

    if (error) {
      console.error('Error inserting survey response:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Submission failed';
    console.error('Submission failed:', err);
    return { success: false, error: errorMessage };
  }
}
