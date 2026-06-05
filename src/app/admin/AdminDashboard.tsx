'use client';

import { useState } from 'react';
import { Users, GraduationCap, Briefcase, Rocket, ChevronDown, ChevronUp } from 'lucide-react';

export default function AdminDashboard({ initialData }: { initialData: any[] }) {
  const [filter, setFilter] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const stats = {
    total: initialData.length,
    teens: initialData.filter(d => d.user_segment === 'Teen / NextGen').length,
    undergrads: initialData.filter(d => d.user_segment === 'Undergraduate').length,
    professionals: initialData.filter(d => d.user_segment === 'Professional').length,
    entrepreneurs: initialData.filter(d => d.user_segment === 'Entrepreneur').length,
  };

  const filteredData = filter === 'All' ? initialData : initialData.filter(d => d.user_segment === filter);

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8 text-slate-800">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Forge Hub Admin</h1>
          <p className="text-slate-500 mt-2">Comprehensive overview of all survey respondents and their unique pathways.</p>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard title="Total Responses" value={stats.total} icon={<Users className="w-5 h-5" />} color="bg-black text-white" />
          <StatCard title="Teens / NextGen" value={stats.teens} icon={<Rocket className="w-5 h-5" />} color="bg-blue-100 text-blue-700" />
          <StatCard title="Undergraduates" value={stats.undergrads} icon={<GraduationCap className="w-5 h-5" />} color="bg-indigo-100 text-indigo-700" />
          <StatCard title="Professionals" value={stats.professionals} icon={<Briefcase className="w-5 h-5" />} color="bg-emerald-100 text-emerald-700" />
          <StatCard title="Entrepreneurs" value={stats.entrepreneurs} icon={<Rocket className="w-5 h-5" />} color="bg-amber-100 text-amber-700" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {['All', 'Teen / NextGen', 'Undergraduate', 'Professional', 'Entrepreneur', 'General'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === f ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Data List */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          {filteredData.length === 0 ? (
            <div className="p-10 text-center text-slate-500">No responses found for this segment.</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredData.map(res => (
                <div key={res.id} className="transition-colors hover:bg-slate-50/50">
                  {/* Row Summary */}
                  <div 
                    className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                    onClick={() => setExpandedId(expandedId === res.id ? null : res.id)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-lg">{res.name || 'Anonymous User'}</h3>
                        <span className="px-2.5 py-0.5 bg-slate-100 rounded-full text-xs font-bold text-slate-600 uppercase tracking-wider">
                          {res.user_segment}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500">
                        {res.age_range} • {res.role} • Focus: {res.current_focus}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span className="hidden sm:inline-block">{new Date(res.created_at).toLocaleDateString()}</span>
                      {expandedId === res.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>

                  {/* Expanded Detail View */}
                  {expandedId === res.id && (
                    <div className="px-4 sm:px-6 pb-6 pt-2 bg-slate-50 border-t border-slate-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 text-sm">
                        
                        {/* Core Details */}
                        <div className="space-y-3">
                          <h4 className="font-bold text-slate-900 border-b pb-2">Core Profile</h4>
                          <DetailRow label="Member" value={res.is_member} />
                          <DetailRow label="Open to Multiple Areas" value={res.open_to_multiple} />
                          <DetailRow label="Mentorship Wanted" value={res.want_mentorship} />
                          <DetailRow label="Mentorship Areas" value={res.mentorship_area?.join(', ')} />
                          <DetailRow label="Wants Community" value={res.want_community} />
                        </div>

                        {/* Pathway Specific Details */}
                        <div className="space-y-3">
                          <h4 className="font-bold text-slate-900 border-b pb-2">Pathway Details</h4>
                          {res.school_level && <DetailRow label="School/Level" value={res.school_level} />}
                          {res.course_of_study && <DetailRow label="Course" value={res.course_of_study} />}
                          {res.industry && <DetailRow label="Industry" value={res.industry} />}
                          {res.job_role && <DetailRow label="Role" value={res.job_role} />}
                          {res.business_type && <DetailRow label="Business Type" value={res.business_type} />}
                          {res.course_relationship && <DetailRow label="Course Relation" value={res.course_relationship} />}
                        </div>

                        {/* Support & Tools */}
                        <div className="space-y-3">
                          <h4 className="font-bold text-slate-900 border-b pb-2">Support & Assets</h4>
                          <DetailRow label="Support Needed" value={res.support_needed?.join(', ')} />
                          <DetailRow label="Learning Skill" value={res.learning_skill === 'Yes' ? res.skill_learning : 'No'} />
                          {res.linkedin_status && <DetailRow label="LinkedIn" value={res.linkedin_status} />}
                          {res.cv_status && <DetailRow label="CV" value={res.cv_status} />}
                        </div>

                        {/* Contact Info (if provided) */}
                        {(res.email || res.phone || res.how_heard) && (
                          <div className="space-y-3 md:col-span-2 lg:col-span-3 border-t pt-4">
                            <h4 className="font-bold text-slate-900">Contact & Outreach</h4>
                            <div className="flex flex-wrap gap-6">
                              {res.email && <DetailRow label="Email" value={res.email} />}
                              {res.phone && <DetailRow label="Phone" value={res.phone} />}
                              {res.how_heard && <DetailRow label="Heard Via" value={res.how_heard} />}
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function StatCard({ title, value, icon, color }: { title: string; value: number; icon: React.ReactNode; color: string }) {
  return (
    <div className={`p-6 rounded-3xl ${color} shadow-sm border border-transparent flex flex-col justify-between h-32`}>
      <div className="flex items-center justify-between">
        <span className="font-medium opacity-90 text-sm">{title}</span>
        <div className="opacity-70">{icon}</div>
      </div>
      <div className="text-4xl font-bold">{value}</div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: any }) {
  if (!value || value === '') return null;
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4">
      <span className="text-slate-500 min-w-[120px]">{label}:</span>
      <span className="font-medium text-slate-900 text-right">{value}</span>
    </div>
  );
}
