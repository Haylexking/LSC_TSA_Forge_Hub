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
  ArrowUpRight,
  Filter,
  Check,
  Copy
} from 'lucide-react';
import Link from 'next/link';
import ForgeLogo from '@/components/ForgeLogo';

// ─── Segment badge config (Refined Non-Neon Palette) ───────────
const segmentStyles: Record<string, { bg: string; text: string; dot: string; border: string }> = {
  'Teen / NextGen': { 
    bg: 'bg-zinc-800/80', 
    text: 'text-zinc-200', 
    dot: 'bg-zinc-300',
    border: 'border-zinc-700/60'
  },
  'Undergraduate': { 
    bg: 'bg-zinc-800/80', 
    text: 'text-zinc-200', 
    dot: 'bg-zinc-300',
    border: 'border-zinc-700/60'
  },
  'Professional': { 
    bg: 'bg-zinc-800/80', 
    text: 'text-zinc-200', 
    dot: 'bg-zinc-300',
    border: 'border-zinc-700/60'
  },
  'Entrepreneur': { 
    bg: 'bg-zinc-800/80', 
    text: 'text-amber-200', 
    dot: 'bg-amber-400',
    border: 'border-amber-500/30'
  },
  'General': { 
    bg: 'bg-zinc-800/80', 
    text: 'text-zinc-300', 
    dot: 'bg-zinc-400',
    border: 'border-zinc-700/50'
  },
};

export default function AdminDashboard({ initialData }: { initialData: any[] }) {
  const [filter, setFilter] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const stats = {
    total: initialData.length,
    teens: initialData.filter(d => d.user_segment === 'Teen / NextGen').length,
    undergrads: initialData.filter(d => d.user_segment === 'Undergraduate').length,
    professionals: initialData.filter(d => d.user_segment === 'Professional').length,
    entrepreneurs: initialData.filter(d => d.user_segment === 'Entrepreneur').length,
  };

  const filteredData = initialData
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
    if (!initialData.length) return;
    const keys = Object.keys(initialData[0]).filter(k => k !== 'id');
    const header = keys.join(',');
    const rows = initialData.map(row => keys.map(k => {
      const val = Array.isArray(row[k]) ? row[k].join('; ') : (row[k] ?? '');
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

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100 relative">
      
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none bg-grid-subtle opacity-25" />

      {/* Top Navbar */}
      <div className="border-b border-white/[0.06] bg-[#09090b]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <ForgeLogo size="sm" subtitle="Operations Console" />
            </Link>
          </div>
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="text-xs text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg border border-transparent hover:border-white/[0.06] transition-all"
            >
              Public Site
            </Link>
            <button
              onClick={exportCSV}
              className="btn-secondary text-xs font-semibold px-3.5 py-1.5 rounded-lg inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 relative z-10">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Respondent Directory</h1>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">Live overview of all submissions, segmented cohorts, and pathway preferences.</p>
          </div>
        </div>

        {/* Analytics Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <StatCard title="Total Submissions" value={stats.total} icon={<Users className="w-4 h-4 text-zinc-300" />} />
          <StatCard title="NextGen & Teens" value={stats.teens} icon={<Rocket className="w-4 h-4 text-zinc-300" />} />
          <StatCard title="Undergraduates" value={stats.undergrads} icon={<GraduationCap className="w-4 h-4 text-zinc-300" />} />
          <StatCard title="Professionals" value={stats.professionals} icon={<Briefcase className="w-4 h-4 text-zinc-300" />} />
          <StatCard title="Entrepreneurs" value={stats.entrepreneurs} icon={<Layers className="w-4 h-4 text-amber-400" />} />
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/[0.08] bg-zinc-900/60 text-zinc-100 placeholder:text-zinc-400 text-xs sm:text-sm outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
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
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isSelected 
                      ? 'bg-white text-zinc-950 font-semibold shadow-sm' 
                      : 'bg-white/[0.02] border border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.05]'
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
            Showing <strong className="text-zinc-200">{filteredData.length}</strong> of {initialData.length} records
          </span>
        </div>

        {/* Data List (Tactile Emil Kowalski Style) */}
        <div className="surface-card rounded-2xl border border-white/[0.08] overflow-hidden">
          {filteredData.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-zinc-800/80 border border-white/[0.06] flex items-center justify-center">
                <Users className="w-5 h-5 text-zinc-400" />
              </div>
              <p className="text-sm font-semibold text-zinc-300">No matching respondents</p>
              <p className="text-xs text-zinc-400 mt-1">Try refining your search terms or filter selection.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {filteredData.map(res => {
                const seg = segmentStyles[res.user_segment] || segmentStyles['General'];
                const isExpanded = expandedId === res.id;
                return (
                  <div key={res.id} className={`transition-colors ${isExpanded ? 'bg-white/[0.02]' : 'hover:bg-white/[0.01]'}`}>
                    
                    {/* Primary Summary Row */}
                    <div 
                      className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
                      onClick={() => setExpandedId(isExpanded ? null : res.id)}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-white/[0.08] flex items-center justify-center text-xs font-bold text-zinc-200 shrink-0 uppercase shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
                          {(res.name || 'A')[0]}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm font-semibold text-white truncate">{res.name || 'Anonymous Respondent'}</h3>
                          <p className="text-xs text-zinc-400 truncate">
                            {res.age_range || 'Age N/A'} · {res.role || 'Role N/A'} · {res.current_focus || 'Focus N/A'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 self-end sm:self-center">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium border ${seg.bg} ${seg.text} ${seg.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${seg.dot}`} />
                          {res.user_segment}
                        </span>
                        
                        <span className="text-[11px] text-zinc-400 hidden md:inline font-mono">
                          {new Date(res.created_at).toLocaleDateString()}
                        </span>
                        
                        <div className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-zinc-400">
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    </div>

                    {/* Expandable Detailed Drawer */}
                    {isExpanded && (
                      <div className="px-4 sm:px-6 pb-6 pt-3 border-t border-white/[0.04] bg-black/20">
                        
                        {/* Quick Contact Chips */}
                        {(res.email || res.phone) && (
                          <div className="flex flex-wrap gap-2 mb-5">
                            {res.email && (
                              <button 
                                onClick={() => copyToClipboard(res.email, `email-${res.id}`)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/80 border border-white/[0.08] text-zinc-200 text-xs font-medium hover:bg-zinc-800 transition-colors"
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
                                onClick={() => copyToClipboard(res.phone, `phone-${res.id}`)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/80 border border-white/[0.08] text-zinc-200 text-xs font-medium hover:bg-zinc-800 transition-colors"
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

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
                          
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
    <div className="surface-card rounded-xl p-4 border border-white/[0.08] flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-medium text-zinc-400 tracking-wide">{title}</span>
        <div className="p-1.5 rounded-md bg-white/[0.04] border border-white/[0.04]">
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold text-white tracking-tight tabular-nums">{value}</div>
    </div>
  );
}

// ─── Detail Section Helper ────────────────────────────────────
function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-2.5">
      <h4 className="font-semibold text-zinc-300 pb-1.5 border-b border-white/[0.04] text-[11px] uppercase tracking-wider">{title}</h4>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

// ─── Detail Row Helper ────────────────────────────────────────
function DetailRow({ label, value }: { label: string; value: any }) {
  if (!value || value === '') return null;
  return (
    <div className="flex justify-between gap-3 text-xs">
      <span className="text-zinc-400 shrink-0">{label}</span>
      <span className="font-medium text-zinc-200 text-right">{value}</span>
    </div>
  );
}
