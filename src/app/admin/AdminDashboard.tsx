'use client';

import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  Briefcase, 
  Rocket, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Mail, 
  Phone, 
  Download, 
  Layers,
  Check,
  Copy,
  Lock,
  LogOut,
  RefreshCw,
  Eye,
  EyeOff,
  ShieldAlert
} from 'lucide-react';
import Link from 'next/link';
import ForgeLogo, { ForgeMark } from '@/components/ForgeLogo';
import { authenticateAdmin, logoutAdmin, fetchSurveyResponses } from './actions';

export interface SurveyResponse {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  age_range?: string;
  is_member?: string;
  current_focus?: string;
  open_to_multiple?: string;
  user_segment: string;
  school_level?: string;
  course_of_study?: string;
  satisfied_course?: string;
  want_to_become?: string;
  industry?: string;
  job_role?: string;
  business_type?: string;
  biggest_challenge?: string;
  course_relationship?: string;
  learning_skill?: string;
  skill_learning?: string;
  linkedin_status?: string;
  cv_status?: string;
  support_needed?: string[];
  want_mentorship?: string;
  mentorship_area?: string[];
  want_community?: string;
  how_heard?: string;
  what_attracted?: string;
  stay_connected?: string;
  created_at: string;
  [key: string]: unknown;
}

// ─── Segment badge config (Light Theme Church Palette) ─────────
const segmentStyles: Record<string, { bg: string; text: string; dot: string; border: string }> = {
  'Teen / NextGen': { 
    bg: 'bg-amber-50', 
    text: 'text-amber-800', 
    dot: 'bg-amber-500',
    border: 'border-amber-200'
  },
  'Undergraduate': { 
    bg: 'bg-blue-50', 
    text: 'text-blue-800', 
    dot: 'bg-blue-500',
    border: 'border-blue-200'
  },
  'Professional': { 
    bg: 'bg-emerald-50', 
    text: 'text-emerald-800', 
    dot: 'bg-emerald-500',
    border: 'border-emerald-200'
  },
  'Entrepreneur': { 
    bg: 'bg-purple-50', 
    text: 'text-purple-800', 
    dot: 'bg-purple-500',
    border: 'border-purple-200'
  },
  'General': { 
    bg: 'bg-zinc-100', 
    text: 'text-zinc-800', 
    dot: 'bg-zinc-500',
    border: 'border-zinc-200'
  },
};

export default function AdminDashboard({ 
  initialData = [],
  initialAuthenticated = false 
}: { 
  initialData: Record<string, unknown>[];
  initialAuthenticated?: boolean;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthenticated);
  const [data, setData] = useState<SurveyResponse[]>(initialData as unknown as SurveyResponse[]);
  const [filter, setFilter] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Auth form state
  const [authMode, setAuthMode] = useState<'passcode' | 'supabase'>('passcode');
  const [passcode, setPasscode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    try {
      let res;
      if (authMode === 'passcode') {
        res = await authenticateAdmin(passcode);
      } else {
        res = await authenticateAdmin(email, password);
      }

      if (res.success) {
        setIsAuthenticated(true);
        // Refresh data
        const dataRes = await fetchSurveyResponses();
        if (dataRes.success && dataRes.data) {
          setData(dataRes.data as unknown as SurveyResponse[]);
        }
      } else {
        setAuthError(res.error || 'Invalid credentials');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
      setAuthError(errorMessage);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setIsAuthenticated(false);
    setData([]);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    const res = await fetchSurveyResponses();
    if (res.success && res.data) {
      setData(res.data as unknown as SurveyResponse[]);
    }
    setRefreshing(false);
  };

  const stats = {
    total: data.length,
    teens: data.filter(d => d.user_segment === 'Teen / NextGen').length,
    undergrads: data.filter(d => d.user_segment === 'Undergraduate').length,
    professionals: data.filter(d => d.user_segment === 'Professional').length,
    entrepreneurs: data.filter(d => d.user_segment === 'Entrepreneur').length,
  };

  const filteredData = data
    .filter(d => filter === 'All' || d.user_segment === filter)
    .filter(d => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        (d.name || '').toLowerCase().includes(q) ||
        (d.email || '').toLowerCase().includes(q) ||
        (d.role || '').toLowerCase().includes(q) ||
        (d.current_focus || '').toLowerCase().includes(q) ||
        (d.school_level || '').toLowerCase().includes(q) ||
        (d.course_of_study || '').toLowerCase().includes(q)
      );
    });

  const copyToClipboard = (text: string, key: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const exportCSV = () => {
    if (!data.length) return;
    const keys = Object.keys(data[0]).filter(k => k !== 'id');
    const header = keys.join(',');
    const rows = data.map(row => keys.map(k => {
      const val = Array.isArray(row[k]) ? (row[k] as string[]).join('; ') : (row[k] ?? '');
      return `"${String(val).replace(/"/g, '""')}"`;
    }).join(','));
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `forge_hub_responses_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ─── Unauthenticated Auth Gate (Light Mode Emil Kowalski) ─────
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#fafafa] text-zinc-900 flex flex-col justify-center items-center px-4 relative selection:bg-amber-100 selection:text-amber-950">
        
        {/* Background Grid */}
        <div className="fixed inset-0 pointer-events-none bg-grid-subtle-light opacity-60" />

        <div className="w-full max-w-sm relative z-10 animate-fade-up">
          
          {/* Brand Mark Lockup */}
          <div className="text-center mb-7">
            <div className="w-12 h-12 mx-auto mb-3">
              <ForgeMark size="lg" />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-zinc-950">Operations Console</h1>
            <p className="text-xs text-zinc-500 mt-1 font-medium">Authorized leadership access only</p>
          </div>

          {/* Login Card */}
          <div className="surface-card rounded-2xl p-6 border border-zinc-200/90 shadow-lg">
            
            {/* Mode Switcher */}
            <div className="flex p-1 rounded-xl bg-zinc-100 border border-zinc-200 mb-5">
              <button
                type="button"
                onClick={() => { setAuthMode('passcode'); setAuthError(null); }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  authMode === 'passcode' 
                    ? 'bg-white text-zinc-950 shadow-xs' 
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                Access Key
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('supabase'); setAuthError(null); }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  authMode === 'supabase' 
                    ? 'bg-white text-zinc-950 shadow-xs' 
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                Supabase Auth
              </button>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {authMode === 'passcode' ? (
                <div>
                  <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-2">
                    Master Passcode
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="Enter admin passcode"
                      autoFocus
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 text-xs outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all pr-10 font-mono shadow-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-2">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@livingseedschurch.org"
                      required
                      autoFocus
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 text-xs outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 text-xs outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all pr-10 shadow-xs"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="btn-primary w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 mt-2"
              >
                {authLoading ? (
                  <>
                    <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Unlock Console</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-zinc-100 text-center">
              <Link href="/" className="text-[11px] text-zinc-500 hover:text-zinc-800 font-medium transition-colors">
                ← Return to Public Website
              </Link>
            </div>

          </div>

        </div>
      </main>
    );
  }

  // ─── Authenticated Console ──────────────────────────────────
  return (
    <main className="min-h-screen bg-[#fafafa] text-zinc-900 relative">
      
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none bg-grid-subtle-light opacity-40" />

      {/* Top Navbar */}
      <div className="border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <ForgeLogo size="sm" subtitle="Operations Console" />
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              title="Refresh Data"
              className="p-2 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 hover:text-zinc-900 shadow-xs transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={exportCSV}
              className="btn-secondary text-xs font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 transition-all text-xs font-semibold flex items-center gap-1.5"
              title="Lock & Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-7 relative z-10">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">Respondent Directory</h1>
            <p className="text-zinc-600 text-xs sm:text-sm mt-0.5">Comprehensive overview of bootcamp registrations and segmented tracks.</p>
          </div>
        </div>

        {/* Analytics Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <StatCard title="Total Registrations" value={stats.total} icon={<Users className="w-4 h-4 text-zinc-700" />} />
          <StatCard title="NextGen & Teens" value={stats.teens} icon={<Rocket className="w-4 h-4 text-amber-600" />} />
          <StatCard title="Undergraduates" value={stats.undergrads} icon={<GraduationCap className="w-4 h-4 text-blue-600" />} />
          <StatCard title="Professionals" value={stats.professionals} icon={<Briefcase className="w-4 h-4 text-emerald-600" />} />
          <StatCard title="Entrepreneurs" value={stats.entrepreneurs} icon={<Layers className="w-4 h-4 text-purple-600" />} />
        </div>

        {/* Search & Segment Tabs */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search respondents by name, email, career stage, or focus..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 text-xs sm:text-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all shadow-xs"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['All', 'Teen / NextGen', 'Undergraduate', 'Professional', 'Entrepreneur', 'General'].map(f => {
              const isSelected = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isSelected 
                      ? 'bg-zinc-900 text-white shadow-xs' 
                      : 'bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count Header */}
        <div className="flex items-center justify-between text-xs text-zinc-500 px-1">
          <span>
            Showing <strong className="text-zinc-900 font-bold">{filteredData.length}</strong> of {data.length} records
          </span>
        </div>

        {/* Data List (Light Tactile Emil Kowalski Style) */}
        <div className="surface-card rounded-2xl border border-zinc-200/90 overflow-hidden shadow-sm">
          {filteredData.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center">
                <Users className="w-5 h-5 text-zinc-500" />
              </div>
              <p className="text-sm font-bold text-zinc-800">No matching respondents found</p>
              <p className="text-xs text-zinc-500 mt-1">Try refining your search terms or filter selection.</p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-100">
              {filteredData.map(res => {
                const seg = segmentStyles[res.user_segment] || segmentStyles['General'];
                const isExpanded = expandedId === res.id;
                return (
                  <div key={res.id} className={`transition-colors ${isExpanded ? 'bg-zinc-50/60' : 'hover:bg-zinc-50/40'}`}>
                    
                    {/* Primary Summary Row */}
                    <div 
                      className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
                      onClick={() => setExpandedId(isExpanded ? null : res.id)}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-xs font-bold text-zinc-800 shrink-0 uppercase shadow-xs">
                          {(res.name || 'A')[0]}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-zinc-950 truncate">{res.name || 'Anonymous Respondent'}</h3>
                          <p className="text-xs text-zinc-500 truncate">
                            {res.age_range || 'Age N/A'} · {res.role || 'Role N/A'} · {res.current_focus || 'Focus N/A'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 self-end sm:self-center">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold border ${seg.bg} ${seg.text} ${seg.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${seg.dot}`} />
                          {res.user_segment}
                        </span>
                        
                        <span className="text-[11px] text-zinc-500 hidden md:inline font-mono">
                          {new Date(res.created_at).toLocaleDateString()}
                        </span>
                        
                        <div className="w-6 h-6 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-500">
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    </div>

                    {/* Expandable Detailed Drawer */}
                    {isExpanded && (
                      <div className="px-4 sm:px-6 pb-6 pt-3 border-t border-zinc-100 bg-white">
                        
                        {/* Quick Contact Chips */}
                        {(res.email || res.phone) && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {res.email && (
                              <button 
                                onClick={() => copyToClipboard(res.email as string, `email-${res.id}`)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-800 text-xs font-medium hover:bg-zinc-100 transition-colors shadow-xs"
                              >
                                <Mail className="w-3 h-3 text-zinc-500" />
                                <span>{res.email}</span>
                                {copiedKey === `email-${res.id}` ? (
                                  <Check className="w-3 h-3 text-emerald-600 ml-1" />
                                ) : (
                                  <Copy className="w-3 h-3 text-zinc-400 ml-1" />
                                )}
                              </button>
                            )}
                            {res.phone && (
                              <button 
                                onClick={() => copyToClipboard(res.phone as string, `phone-${res.id}`)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-800 text-xs font-medium hover:bg-zinc-100 transition-colors shadow-xs"
                              >
                                <Phone className="w-3 h-3 text-zinc-500" />
                                <span>{res.phone}</span>
                                {copiedKey === `phone-${res.id}` ? (
                                  <Check className="w-3 h-3 text-emerald-600 ml-1" />
                                ) : (
                                  <Copy className="w-3 h-3 text-zinc-400 ml-1" />
                                )}
                              </button>
                            )}
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                          
                          {/* Core Identity Details */}
                          <DetailSection title="Core Profile">
                            <DetailRow label="Church Relationship" value={res.is_member} />
                            <DetailRow label="Open to Multi-Track" value={res.open_to_multiple} />
                            <DetailRow label="Wants Mentor" value={res.want_mentorship} />
                            <DetailRow label="Mentorship Area" value={res.mentorship_area?.join(', ')} />
                            <DetailRow label="Peer Community" value={res.want_community} />
                          </DetailSection>

                          {/* Academic / Professional Pathway */}
                          <DetailSection title="Pathway Data">
                            {res.school_level && <DetailRow label="School / Level" value={res.school_level} />}
                            {res.course_of_study && <DetailRow label="Course" value={res.course_of_study} />}
                            {res.satisfied_course && <DetailRow label="Course Satisfaction" value={res.satisfied_course} />}
                            {res.want_to_become && <DetailRow label="Aspirational Role" value={res.want_to_become} />}
                            {res.industry && <DetailRow label="Industry" value={res.industry} />}
                            {res.job_role && <DetailRow label="Current Title" value={res.job_role} />}
                            {res.business_type && <DetailRow label="Business Venture" value={res.business_type} />}
                            {res.biggest_challenge && <DetailRow label="Main Challenge" value={res.biggest_challenge} />}
                            {res.course_relationship && <DetailRow label="Career Alignment" value={res.course_relationship} />}
                          </DetailSection>

                          {/* Growth & Support Requisites */}
                          <DetailSection title="Support & Assets">
                            <DetailRow label="Support Needed" value={res.support_needed?.join(', ')} />
                            <DetailRow label="Exploring Skill" value={res.learning_skill === 'Yes' ? res.skill_learning : res.learning_skill} />
                            {res.linkedin_status && <DetailRow label="LinkedIn" value={res.linkedin_status} />}
                            {res.cv_status && <DetailRow label="CV / Resume" value={res.cv_status} />}
                            {res.how_heard && <DetailRow label="Heard Via" value={res.how_heard} />}
                            {res.what_attracted && <DetailRow label="Attracted By" value={res.what_attracted} />}
                          </DetailSection>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}

// ─── Stat Card Component ──────────────────────────────────────
function StatCard({ 
  title, 
  value, 
  icon 
}: { 
  title: string; 
  value: number; 
  icon: React.ReactNode;
}) {
  return (
    <div className="surface-card rounded-xl p-4 border border-zinc-200/90 flex flex-col justify-between shadow-xs">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[11px] font-bold text-zinc-500 tracking-wide">{title}</span>
        <div className="p-1.5 rounded-md bg-zinc-100 border border-zinc-200/80">
          {icon}
        </div>
      </div>
      <div className="text-2xl font-extrabold text-zinc-950 tracking-tight tabular-nums">{value}</div>
    </div>
  );
}

// ─── Detail Section Helper ────────────────────────────────────
function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-2">
      <h4 className="font-bold text-zinc-800 pb-1 border-b border-zinc-200 text-[11px] uppercase tracking-wider">{title}</h4>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

// ─── Detail Row Helper ────────────────────────────────────────
function DetailRow({ label, value }: { label: string; value: unknown }) {
  if (value === undefined || value === null || value === '') return null;
  return (
    <div className="flex justify-between gap-3 text-xs">
      <span className="text-zinc-500 shrink-0 font-medium">{label}</span>
      <span className="font-bold text-zinc-800 text-right">{String(value)}</span>
    </div>
  );
}
