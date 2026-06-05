'use client';

import { useState } from 'react';
import { Users, GraduationCap, Briefcase, Rocket, ChevronDown, ChevronUp, Zap, Search, Mail, Phone, MapPin, Download } from 'lucide-react';

// ─── Segment badge config ────────────────────────────────────
const segmentStyles: Record<string, { bg: string; text: string; dot: string }> = {
  'Teen / NextGen': { bg: 'bg-sky-500/10', text: 'text-sky-400', dot: 'bg-sky-400' },
  'Undergraduate': { bg: 'bg-indigo-500/10', text: 'text-indigo-400', dot: 'bg-indigo-400' },
  'Professional': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  'Entrepreneur': { bg: 'bg-amber-500/10', text: 'text-amber-400', dot: 'bg-amber-400' },
  'General': { bg: 'bg-zinc-500/10', text: 'text-zinc-400', dot: 'bg-zinc-400' },
};

export default function AdminDashboard({ initialData }: { initialData: any[] }) {
  const [filter, setFilter] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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
        (d.current_focus || '').toLowerCase().includes(q)
      );
    });

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
    a.download = `forge_survey_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      
      {/* Top Bar */}
      <div className="border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg">Forge Hub</span>
            <span className="text-xs font-medium text-zinc-600 border border-zinc-800 rounded-full px-2.5 py-0.5 uppercase tracking-wider">Admin</span>
          </div>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white px-4 py-2 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] transition-all"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Survey Responses</h1>
          <p className="text-zinc-500 mt-2">Comprehensive overview of all respondents and their unique pathways.</p>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          <StatCard title="Total" value={stats.total} icon={<Users className="w-5 h-5" />} gradient="from-white/10 to-white/5" textColor="text-white" />
          <StatCard title="Teens" value={stats.teens} icon={<Rocket className="w-5 h-5" />} gradient="from-sky-500/15 to-sky-500/5" textColor="text-sky-400" />
          <StatCard title="Undergrads" value={stats.undergrads} icon={<GraduationCap className="w-5 h-5" />} gradient="from-indigo-500/15 to-indigo-500/5" textColor="text-indigo-400" />
          <StatCard title="Professionals" value={stats.professionals} icon={<Briefcase className="w-5 h-5" />} gradient="from-emerald-500/15 to-emerald-500/5" textColor="text-emerald-400" />
          <StatCard title="Entrepreneurs" value={stats.entrepreneurs} icon={<Rocket className="w-5 h-5" />} gradient="from-amber-500/15 to-amber-500/5" textColor="text-amber-400" />
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
            <input
              type="text"
              placeholder="Search by name, email, role..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/10 transition-all text-sm"
            />
          </div>
          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {['All', 'Teen / NextGen', 'Undergraduate', 'Professional', 'Entrepreneur', 'General'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  filter === f 
                    ? 'bg-white text-black' 
                    : 'border border-white/[0.06] bg-white/[0.02] text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            Showing <span className="text-zinc-300 font-semibold">{filteredData.length}</span> of {initialData.length} responses
          </p>
        </div>

        {/* Data List */}
        <div className="rounded-2xl border border-white/[0.06] overflow-hidden">
          {filteredData.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-zinc-800 flex items-center justify-center">
                <Users className="w-7 h-7 text-zinc-600" />
              </div>
              <p className="text-zinc-500 font-medium">No responses found</p>
              <p className="text-zinc-600 text-sm mt-1">Try adjusting your search or filter.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {filteredData.map(res => {
                const seg = segmentStyles[res.user_segment] || segmentStyles['General'];
                const isExpanded = expandedId === res.id;
                return (
                  <div key={res.id} className={`transition-colors ${isExpanded ? 'bg-white/[0.02]' : 'hover:bg-white/[0.015]'}`}>
                    {/* Row Summary */}
                    <div 
                      className="p-4 md:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
                      onClick={() => setExpandedId(isExpanded ? null : res.id)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1.5">
                          {/* Avatar */}
                          <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-zinc-400 shrink-0 uppercase">
                            {(res.name || 'A')[0]}
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-bold text-white truncate">{res.name || 'Anonymous'}</h3>
                            <p className="text-xs text-zinc-500 truncate">
                              {res.age_range} · {res.role} · {res.current_focus}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {/* Segment Badge */}
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${seg.bg} ${seg.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${seg.dot}`} />
                          {res.user_segment}
                        </span>
                        <span className="text-xs text-zinc-600 hidden md:inline tabular-nums">{new Date(res.created_at).toLocaleDateString()}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-zinc-600" /> : <ChevronDown className="w-4 h-4 text-zinc-600" />}
                      </div>
                    </div>

                    {/* Expanded Detail View */}
                    {isExpanded && (
                      <div className="px-4 md:px-6 pb-6 pt-2 border-t border-white/[0.04]">
                        
                        {/* Contact Quick Bar */}
                        {(res.email || res.phone) && (
                          <div className="flex flex-wrap gap-3 mb-6">
                            {res.email && (
                              <a href={`mailto:${res.email}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/10 text-indigo-400 text-sm font-medium hover:bg-indigo-500/20 transition-colors">
                                <Mail className="w-3.5 h-3.5" /> {res.email}
                              </a>
                            )}
                            {res.phone && (
                              <a href={`tel:${res.phone}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-colors">
                                <Phone className="w-3.5 h-3.5" /> {res.phone}
                              </a>
                            )}
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                          
                          {/* Core Profile */}
                          <DetailSection title="Core Profile">
                            <DetailRow label="Church Status" value={res.is_member} />
                            <DetailRow label="Open to Multiple" value={res.open_to_multiple} />
                            <DetailRow label="Mentorship" value={res.want_mentorship} />
                            <DetailRow label="Mentorship Areas" value={res.mentorship_area?.join(', ')} />
                            <DetailRow label="Community" value={res.want_community} />
                          </DetailSection>

                          {/* Pathway Details */}
                          <DetailSection title="Pathway Details">
                            {res.school_level && <DetailRow label="School/Level" value={res.school_level} />}
                            {res.course_of_study && <DetailRow label="Course" value={res.course_of_study} />}
                            {res.satisfied_course && <DetailRow label="Satisfied" value={res.satisfied_course} />}
                            {res.industry && <DetailRow label="Industry" value={res.industry} />}
                            {res.job_role && <DetailRow label="Job Role" value={res.job_role} />}
                            {res.business_type && <DetailRow label="Business" value={res.business_type} />}
                            {res.biggest_challenge && <DetailRow label="Challenge" value={res.biggest_challenge} />}
                            {res.course_relationship && <DetailRow label="Field Stance" value={res.course_relationship} />}
                          </DetailSection>

                          {/* Support & Tools */}
                          <DetailSection title="Support & Assets">
                            <DetailRow label="Support Needed" value={res.support_needed?.join(', ')} />
                            <DetailRow label="Learning Skill" value={res.learning_skill === 'Yes' ? res.skill_learning : res.learning_skill} />
                            {res.linkedin_status && <DetailRow label="LinkedIn" value={res.linkedin_status} />}
                            {res.cv_status && <DetailRow label="CV" value={res.cv_status} />}
                            {res.how_heard && <DetailRow label="Heard Via" value={res.how_heard} />}
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

// ─── Components ──────────────────────────────────────────────

function StatCard({ title, value, icon, gradient, textColor }: { title: string; value: number; icon: React.ReactNode; gradient: string; textColor: string }) {
  return (
    <div className={`p-5 md:p-6 rounded-2xl bg-gradient-to-br ${gradient} border border-white/[0.06] flex flex-col justify-between h-28 md:h-32`}>
      <div className="flex items-center justify-between">
        <span className="text-zinc-400 font-medium text-sm">{title}</span>
        <div className={`${textColor} opacity-60`}>{icon}</div>
      </div>
      <div className={`text-3xl md:text-4xl font-extrabold ${textColor} tabular-nums`}>{value}</div>
    </div>
  );
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h4 className="font-bold text-zinc-300 border-b border-white/[0.06] pb-2 text-xs uppercase tracking-wider">{title}</h4>
      {children}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: any }) {
  if (!value || value === '') return null;
  return (
    <div className="flex justify-between gap-4">
      <span className="text-zinc-500 min-w-[100px] shrink-0">{label}</span>
      <span className="font-medium text-zinc-300 text-right">{value}</span>
    </div>
  );
}
