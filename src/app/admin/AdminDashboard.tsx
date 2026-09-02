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

// ─── Segment badge config (Matte Dark Palette) ─────────────────
const segmentStyles: Record<string, { bg: string; text: string; dot: string; border: string }> = {
  'Teen / NextGen': { 
    bg: 'bg-zinc-800/90', 
    text: 'text-zinc-200', 
    dot: 'bg-zinc-300',
    border: 'border-white/[0.08]'
  },
  'Undergraduate': { 
    bg: 'bg-zinc-800/90', 
    text: 'text-zinc-200', 
    dot: 'bg-zinc-300',
    border: 'border-white/[0.08]'
  },
  'Professional': { 
    bg: 'bg-zinc-800/90', 
    text: 'text-zinc-200', 
    dot: 'bg-zinc-300',
    border: 'border-white/[0.08]'
  },
  'Entrepreneur': { 
    bg: 'bg-zinc-800/90', 
    text: 'text-zinc-200', 
    dot: 'bg-zinc-300',
    border: 'border-white/[0.08]'
  },
  'General': { 
    bg: 'bg-zinc-800/90', 
    text: 'text-zinc-300', 
    dot: 'bg-zinc-400',
    border: 'border-white/[0.08]'
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

  // ─── Unauthenticated Auth Gate (Elevated Bento Style) ────────
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#090a0c] text-zinc-100 flex flex-col justify-center items-center px-4 relative selection:bg-zinc-700 selection:text-white">
        
        {/* Background Grid */}
        <div className="fixed inset-0 pointer-events-none bg-grid-dark opacity-35" />

        <div className="w-full max-w-sm relative z-10 animate-fade-up">
          
          {/* Brand Mark Lockup */}
          <div className="text-center mb-7">
            <div className="w-12 h-12 mx-auto mb-3">
              <ForgeMark size="lg" />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-white">Operations Console</h1>
            <p className="text-xs text-zinc-400 mt-1">Authorized leadership access only</p>
          </div>

          {/* Login Card */}
          <div className="bento-card rounded-2xl p-6 border border-white/[0.08] shadow-xl">
            
            {/* Mode Switcher */}
            <div className="flex p-1 rounded-xl bg-zinc-900 border border-white/[0.06] mb-5">
              <button
                type="button"
                onClick={() => { setAuthMode('passcode'); setAuthError(null); }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  authMode === 'passcode' 
                    ? 'bg-zinc-800 text-white shadow-xs' 
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Access Key
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('supabase'); setAuthError(null); }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  authMode === 'supabase' 
                    ? 'bg-zinc-800 text-white shadow-xs' 
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Supabase Auth
              </button>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {authMode === 'passcode' ? (
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.08] bg-zinc-900 text-zinc-100 placeholder:text-zinc-400 text-xs outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all pr-10 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@livingseedschurch.org"
                      required
                      autoFocus
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.08] bg-zinc-900 text-zinc-100 placeholder:text-zinc-400 text-xs outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.08] bg-zinc-900 text-zinc-100 placeholder:text-zinc-400 text-xs outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
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

            <div className="mt-5 pt-4 border-t border-white/[0.06] text-center">
              <Link href="/" className="text-[11px] text-zinc-400 hover:text-zinc-300 font-medium transition-colors">
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
    <main className="min-h-screen bg-[#090a0c] text-zinc-100 relative">
      
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none bg-grid-dark opacity-35" />

      {/* Top Navbar */}
      <div className="border-b border-white/[0.08] bg-[#090a0c]/85 backdrop-blur-xl sticky top-0 z-40">
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
              className="p-2 rounded-lg border border-white/[0.08] bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all shadow-xs"
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
              className="p-2 rounded-lg border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all text-xs font-semibold flex items-center gap-1.5"
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
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Respondent Directory</h1>
            <p className="text-zinc-400 text-xs sm:text-sm mt-0.5">Live overview of cohort registrations and candidate preferences.</p>
          </div>
        </div>

        {/* Analytics Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <StatCard title="Total Registrations" value={stats.total} icon={<Users className="w-4 h-4 text-zinc-300" />} />
          <StatCard title="NextGen & Teens" value={stats.teens} icon={<Rocket className="w-4 h-4 text-zinc-300" />} />
          <StatCard title="Undergraduates" value={stats.undergrads} icon={<GraduationCap className="w-4 h-4 text-zinc-300" />} />
          <StatCard title="Professionals" value={stats.professionals} icon={<Briefcase className="w-4 h-4 text-zinc-300" />} />
          <StatCard title="Entrepreneurs" value={stats.entrepreneurs} icon={<Layers className="w-4 h-4 text-zinc-300" />} />
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/[0.08] bg-zinc-900 text-zinc-100 placeholder:text-zinc-400 text-xs sm:text-sm outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all shadow-xs"
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
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isSelected 
                      ? 'bg-white text-zinc-950 shadow-xs' 
                      : 'bg-zinc-900 border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count Header */}
        <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
          <span>
            Showing <strong className="text-white font-bold">{filteredData.length}</strong> of {data.length} records
          </span>
        </div>

        {/* Data List (Elevated Bento Style) */}
        <div className="bento-card rounded-2xl border border-white/[0.08] overflow-hidden shadow-sm">
          {filteredData.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-zinc-900 border border-white/[0.08] flex items-center justify-center">
                <Users className="w-5 h-5 text-zinc-500" />
              </div>
              <p className="text-sm font-bold text-zinc-300">No matching respondents found</p>
              <p className="text-xs text-zinc-400 mt-1">Try refining your search terms or filter selection.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {filteredData.map(res => {
                const seg = segmentStyles[res.user_segment] || segmentStyles['General'];
                const isExpanded = expandedId === res.id;
                return (
                  <div key={res.id} className={`transition-colors ${isExpanded ? 'bg-zinc-900/60' : 'hover:bg-zinc-900/40'}`}>
                    
                    {/* Primary Summary Row */}
                    <div 
                      className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
                      onClick={() => setExpandedId(isExpanded ? null : res.id)}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-white/[0.08] flex items-center justify-center text-xs font-bold text-zinc-200 shrink-0 uppercase shadow-xs">
                          {(res.name || 'A')[0]}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-white truncate">{res.name || 'Anonymous Respondent'}</h3>
                          <p className="text-xs text-zinc-400 truncate">
                            {res.age_range || 'Age N/A'} · {res.role || 'Role N/A'} · {res.current_focus || 'Focus N/A'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 self-end sm:self-center">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${seg.bg} ${seg.text} ${seg.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${seg.dot}`} />
                          {res.user_segment}
                        </span>
                        
                        <span className="text-[11px] text-zinc-400 hidden md:inline font-mono">
                          {new Date(res.created_at).toLocaleDateString()}
                        </span>
                        
                        <div className="w-6 h-6 rounded-md bg-zinc-800 border border-white/[0.06] flex items-center justify-center text-zinc-400">
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    </div>

                    {/* Expandable Detailed Drawer */}
                    {isExpanded && (
                      <div className="px-4 sm:px-6 pb-6 pt-3 border-t border-white/[0.04] bg-black/30">
                        
                        {/* Quick Contact Chips */}
                        {(res.email || res.phone) && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {res.email && (
                              <button 
                                onClick={() => copyToClipboard(res.email as string, `email-${res.id}`)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 border border-white/[0.08] text-zinc-200 text-xs font-medium hover:bg-zinc-700 transition-colors shadow-xs"
                              >
                                <Mail className="w-3 h-3 text-zinc-400" />
                                <span>{res.email}</span>
                                {copiedKey === `email-${res.id}` ? (
                                  <Check className="w-3 h-3 text-emerald-400 ml-1" />
                                ) : (
                                  <Copy className="w-3 h-3 text-zinc-400 ml-1" />
                                )}
                              </button>
                            )}
                            {res.phone && (
                              <button 
                                onClick={() => copyToClipboard(res.phone as string, `phone-${res.id}`)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 border border-white/[0.08] text-zinc-200 text-xs font-medium hover:bg-zinc-700 transition-colors shadow-xs"
                              >
                                <Phone className="w-3 h-3 text-zinc-400" />
                                <span>{res.phone}</span>
                                {copiedKey === `phone-${res.id}` ? (
                                  <Check className="w-3 h-3 text-emerald-400 ml-1" />
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
    <div className="bento-card rounded-xl p-4 border border-white/[0.08] flex flex-col justify-between shadow-xs">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[11px] font-semibold text-zinc-400 tracking-wide">{title}</span>
        <div className="p-1.5 rounded-md bg-zinc-800 border border-white/[0.06]">
          {icon}
        </div>
      </div>
      <div className="text-2xl font-extrabold text-white tracking-tight tabular-nums">{value}</div>
    </div>
  );
}

// ─── Detail Section Helper ────────────────────────────────────
function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/[0.06] space-y-2">
      <h4 className="font-bold text-zinc-300 pb-1 border-b border-white/[0.06] text-[11px] uppercase tracking-wider">{title}</h4>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

// ─── Detail Row Helper ────────────────────────────────────────
function DetailRow({ label, value }: { label: string; value: unknown }) {
  if (value === undefined || value === null || value === '') return null;
  return (
    <div className="flex justify-between gap-3 text-xs">
      <span className="text-zinc-400 shrink-0 font-medium">{label}</span>
      <span className="font-semibold text-zinc-200 text-right">{String(value)}</span>
    </div>
  );
}
