'use server';

import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const AUTH_COOKIE_NAME = 'forge_admin_session';

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL and Anon Key must be configured in environment variables.');
  }

  return createClient(supabaseUrl, supabaseKey);
}

// Verify password or session token
export async function authenticateAdmin(passwordOrEmail: string, password?: string) {
  try {
    const cookieStore = await cookies();
    const adminPassword = process.env.ADMIN_PASSWORD || 'forgeadmin2026';

    // 1. Check if direct Master Passcode was supplied
    if (!password) {
      if (passwordOrEmail === adminPassword) {
        cookieStore.set(AUTH_COOKIE_NAME, 'authenticated_master', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/',
        });
        return { success: true };
      }
      return { success: false, error: 'Invalid master passcode' };
    }

    // 2. Otherwise authenticate via Supabase Auth
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: passwordOrEmail,
      password: password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (data.session) {
      cookieStore.set(AUTH_COOKIE_NAME, data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
      return { success: true, user: { email: data.user.email } };
    }

    return { success: false, error: 'Could not establish session' };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
    return { success: false, error: errorMessage };
  }
}

// Check if currently authenticated
export async function checkAdminSession() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(AUTH_COOKIE_NAME);
    return { isAuthenticated: !!sessionCookie?.value };
  } catch {
    return { isAuthenticated: false };
  }
}

// Log out
export async function logoutAdmin() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE_NAME);
    return { success: true };
  } catch {
    return { success: false };
  }
}

// Fetch responses securely
export async function fetchSurveyResponses() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(AUTH_COOKIE_NAME);

    if (!sessionCookie?.value) {
      return { success: false, error: 'Unauthorized. Please sign in.' };
    }

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('forge_survey_responses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: (data as Record<string, unknown>[]) || [] };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to fetch responses';
    return { success: false, error: errorMessage };
  }
}
