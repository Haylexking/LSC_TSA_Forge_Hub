'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Users, 
  Lightbulb, 
  Rocket, 
  Target, 
  BookOpen, 
  CheckCircle2, 
  ChevronRight,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Briefcase,
  Layers,
  Clock,
  Code2,
  Palette,
  TrendingUp,
  Shield
} from 'lucide-react';
import ForgeLogo, { ForgeMark } from '@/components/ForgeLogo';

export default function Home() {
  const [activeCohort, setActiveCohort] = useState<number>(0);
  const [activeSkillTrack, setActiveSkillTrack] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const cohorts = [
    {
      id: 'teens',
      title: 'NextGen & Teens',
      tag: 'Ages 13–19',
      stage: 'Secondary School',
      desc: 'Secondary school youths discovering God-given gifts, exploring foundational digital and creative skills, and receiving academic guidance.',
      highlights: ['Career path exploration', 'Digital literacy & creative foundations', 'Peer fellowship & youth circles'],
      icon: <Rocket className="w-4 h-4 text-zinc-200" />,
      actionText: 'Explore Teen Track',
    },
    {
      id: 'undergrad',
      title: 'Undergraduates',
      tag: 'Higher Ed',
      stage: 'University & Poly',
      desc: 'Students aligning academic courses with real-world industry demands, mastering high-income skills, and preparing for internship opportunities.',
      highlights: ['Course & career synergy', 'Technical & product skill bootcamps', 'Internship & CV preparation'],
      icon: <GraduationCap className="w-4 h-4 text-zinc-200" />,
      actionText: 'Explore Undergrad Track',
    },
    {
      id: 'professional',
      title: 'Professionals & NYSC',
      tag: 'Early to Mid Career',
      stage: 'Workplace & NYSC',
      desc: 'Graduates and working professionals pursuing career advancement, industry pivots, executive mentorship, and ethical leadership.',
      highlights: ['1:1 Executive mentorship', 'LinkedIn profile & CV overhaul', 'Kingdom marketplace leadership'],
      icon: <Briefcase className="w-4 h-4 text-zinc-200" />,
      actionText: 'Explore Professional Track',
    },
    {
      id: 'entrepreneur',
      title: 'Founders & Builders',
      tag: 'Business & Freelance',
      stage: 'Ventures & Agencies',
      desc: 'Entrepreneurs, creators, and freelancers building viable products, acquiring high-value clients, and scaling sustainable enterprises.',
      highlights: ['Business model validation', 'Growth & client acquisition', 'Founder mastermind circles'],
      icon: <Layers className="w-4 h-4 text-zinc-200" />,
      actionText: 'Explore Founder Track',
    },
  ];

  const skillTracks = [
    {
      id: 'software',
      name: 'Software & AI',
      icon: <Code2 className="w-4 h-4 text-zinc-300" />,
      skills: ['Full-stack Web Development', 'AI Prompt Engineering & Automation', 'API Design & Cloud Architecture', 'Database Management'],
      desc: 'Build scalable software products, automate workflows with AI, and master modern development frameworks.',
    },
    {
      id: 'design',
      name: 'Product Design & Brand',
      icon: <Palette className="w-4 h-4 text-zinc-300" />,
      skills: ['Figma UI/UX Systems', 'Brand Identity & Visual Storytelling', 'User Research & Prototyping', 'Design Operations'],
      desc: 'Design intuitive digital products, establish consistent design systems, and craft compelling visual narratives.',
    },
    {
      id: 'business',
      name: 'Business Strategy & Growth',
      icon: <TrendingUp className="w-4 h-4 text-zinc-300" />,
      skills: ['Go-To-Market Execution', 'Digital Marketing & Content Strategy', 'Sales Pipeline Engineering', 'Financial Modeling'],
      desc: 'Scale commercial and social ventures, acquire customers systematically, and build sustainable revenue models.',
    },
    {
      id: 'leadership',
      name: 'Marketplace Leadership',
      icon: <Shield className="w-4 h-4 text-zinc-300" />,
      skills: ['Executive Communication', 'Team & Project Management', 'Ethical Governance & Faith', 'Public Speaking'],
      desc: 'Lead teams with excellence, integrity, and vision while serving as an ambassador of Christ in your industry.',
    },
  ];

  const roadmapSteps = [
    {
      step: '01',
      title: '3-Minute Assessment',
      desc: 'Share your background, current role, core strengths, and specific areas where you need acceleration.',
      tag: 'Step 1',
    },
    {
      step: '02',
      title: 'Cohort & Mentor Match',
      desc: 'Our leadership maps you to the right peer group and pairs you with an experienced industry mentor.',
      tag: 'Step 2',
    },
    {
      step: '03',
      title: 'Accelerated Sprint',
      desc: 'Participate in skill tracks, resume clinics, live masterclasses, and bi-weekly mentorship check-ins.',
      tag: 'Step 3',
    },
    {
      step: '04',
      title: 'Marketplace Showcase',
      desc: 'Present real-world projects, optimize your professional presence, and unlock career opportunities.',
      tag: 'Step 4',
    },
  ];

  const faqs = [
    {
      q: 'What is the LSC TSA Forge Hub?',
      a: 'The Forge Hub is a dedicated career development and mentorship ecosystem by Living Seeds Church (TSA), created to equip youths, undergraduates, and professionals with marketplace clarity, industry mentorship, and practical skill tracks.',
    },
    {
      q: 'How does the cohort matching work?',
      a: 'After you complete the 3-minute assessment, our team reviews your current stage (Secondary School, Higher Ed, Career, or Entrepreneurship) and pairs you with the optimal track and a relevant industry mentor.',
    },
    {
      q: 'Are non-members welcome to join?',
      a: 'Yes! We warmly welcome guests, friends, and community members who wish to develop their skills and grow within a purposeful network.',
    },
    {
      q: 'Is there any fee required?',
      a: 'No. The Forge Hub is a free empowerment initiative designed to equip individuals for excellence and kingdom impact.',
    },
  ];

  return (
    <main className="min-h-screen bg-[#090a0c] text-zinc-100 selection:bg-zinc-700 selection:text-white relative">
      
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none bg-grid-dark opacity-35" />

      {/* ===================== NAVBAR ===================== */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-[#090a0c]/85 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
            <ForgeLogo size="sm" subtitle="Living Seeds Church TSA" />
          </Link>

          <div className="flex items-center gap-3">
            <Link 
              href="/survey"
              className="btn-primary text-xs font-semibold px-4 py-2 rounded-xl inline-flex items-center gap-1.5"
            >
              <span>Take Assessment</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-900" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ===================== HERO SECTION ===================== */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 max-w-5xl mx-auto text-center z-10">
        
        {/* Live Intake Badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] text-zinc-300 text-xs font-medium mb-6 shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-zinc-400">LSC TSA</span>
          <span className="text-zinc-600">·</span>
          <span>2026 Cohort Registration Open</span>
        </div>

        {/* Hero Title */}
        <h1 className="animate-fade-up-delay-1 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 max-w-4xl mx-auto">
          Forge Your Path.{' '}
          <br className="hidden sm:inline" />
          <span className="text-gradient-silver">Lead The Future.</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="animate-fade-up-delay-2 text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          The Forge Hub connects you with tailored industry mentorship, high-impact skill tracks, and a purposeful Christian community to excel in your academics, career, and business.
        </p>

        {/* CTA Actions */}
        <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <Link 
            href="/survey" 
            className="btn-primary w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 group"
          >
            <span>Start 3-Minute Assessment</span>
            <ArrowRight className="w-4 h-4 text-zinc-900 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>
          
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 px-3 py-2">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span>Free & Confidential · Personalized Match</span>
          </div>
        </div>

        {/* Minimal Metrics Strip */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto border-t border-white/[0.08] pt-8">
          {[
            { label: 'Cohort Tracks', val: '4 Specialized Pathways' },
            { label: 'Mentorship', val: '1:1 Executive Matching' },
            { label: 'Response Time', val: '< 48h Direct Onboarding' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">{item.label}</div>
              <div className="text-xs sm:text-sm font-bold text-zinc-200">{item.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== BENTO GRID SHOWCASE ===================== */}
      <section className="relative py-16 border-t border-white/[0.08] z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">Ecosystem Architecture</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                The Forge Advantage
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
              A structured framework combining clarity assessment, hands-on skill development, and ongoing Christian mentorship.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Bento Card 1 (Large - 2 Col Span): Interactive Cohort Explorer */}
            <div className="md:col-span-2 bento-card rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-zinc-800 border border-white/[0.08]">
                      <Target className="w-4 h-4 text-zinc-300" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Cohort Tracks</span>
                  </div>
                  <span className="text-xs text-zinc-400">Click to inspect</span>
                </div>

                {/* Cohort Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
                  {cohorts.map((cohort, index) => {
                    const isSelected = activeCohort === index;
                    return (
                      <button
                        key={cohort.id}
                        onClick={() => setActiveCohort(index)}
                        className={`p-3 rounded-xl text-left transition-all duration-150 border ${
                          isSelected
                            ? 'bg-zinc-800/90 border-white/[0.25] text-white shadow-xs'
                            : 'bg-zinc-900/60 border-white/[0.05] text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="p-1 rounded-md bg-zinc-900 border border-white/[0.06]">
                            {cohort.icon}
                          </div>
                          <span className="text-[10px] font-mono text-zinc-400 font-semibold">{cohort.tag}</span>
                        </div>
                        <span className="text-xs font-bold block truncate">{cohort.title}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Cohort Detail */}
                <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/[0.06] mb-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-white">{cohorts[activeCohort].title}</h3>
                    <span className="text-[11px] font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-md border border-white/[0.06]">
                      {cohorts[activeCohort].stage}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-3">
                    {cohorts[activeCohort].desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cohorts[activeCohort].highlights.map((h, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 text-[11px] text-zinc-300 bg-zinc-800/90 border border-white/[0.06] px-2.5 py-1 rounded-md">
                        <CheckCircle2 className="w-3 h-3 text-zinc-400" />
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs text-zinc-400">Ready to join this track?</span>
                <Link
                  href="/survey"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-200 hover:text-white transition-colors"
                >
                  <span>{cohorts[activeCohort].actionText}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Bento Card 2 (1 Col Span): 1:1 Mentorship Matching */}
            <div className="bento-card rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-zinc-800 border border-white/[0.08]">
                      <Users className="w-4 h-4 text-zinc-300" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Mentorship</span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">1:1 Pairing</span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">Dedicated Industry Guides</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
                  Match with seasoned Christian leaders in technology, finance, medicine, engineering, and creative industries.
                </p>

                {/* Mentor Category Badges */}
                <div className="space-y-2">
                  {[
                    { role: 'Senior Tech & AI Leaders', count: 'Active' },
                    { role: 'Business & Finance Executives', count: 'Active' },
                    { role: 'Creative Directors & Designers', count: 'Active' },
                  ].map((m, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/80 border border-white/[0.05] text-xs">
                      <span className="text-zinc-300 font-medium">{m.role}</span>
                      <span className="text-[10px] text-zinc-400 font-mono bg-zinc-800 px-1.5 py-0.5 rounded">{m.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.06]">
                <Link href="/survey" className="text-xs text-zinc-400 hover:text-white transition-colors flex items-center justify-between">
                  <span>Get paired with a mentor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Bento Card 3 (1 Col Span): Marketplace Positioning */}
            <div className="bento-card rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-zinc-800 border border-white/[0.08]">
                      <BookOpen className="w-4 h-4 text-zinc-300" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Positioning</span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">Career Assets</span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">Resume & LinkedIn Overhaul</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
                  Transform your professional brand with comprehensive CV reviews, portfolio critiques, and technical mock interviews.
                </p>

                <div className="space-y-1.5 text-xs text-zinc-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span>Global standard CV restructuring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span>LinkedIn SEO & headline tuning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span>Mock behavioral & tech interviews</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.06]">
                <Link href="/survey" className="text-xs text-zinc-400 hover:text-white transition-colors flex items-center justify-between">
                  <span>Request portfolio review</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Bento Card 4 (2 Col Span, Interactive): Interactive Skill Tracks */}
            <div className="md:col-span-2 bento-card rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-zinc-800 border border-white/[0.08]">
                      <Lightbulb className="w-4 h-4 text-zinc-300" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Curriculum Tracks</span>
                  </div>
                  <span className="text-xs text-zinc-400">Filter modules</span>
                </div>

                {/* Skill Track Filter Pills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {skillTracks.map((track, idx) => {
                    const isSelected = activeSkillTrack === idx;
                    return (
                      <button
                        key={track.id}
                        onClick={() => setActiveSkillTrack(idx)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                          isSelected
                            ? 'bg-white text-zinc-950 border-white shadow-xs'
                            : 'bg-zinc-900 border-white/[0.06] text-zinc-400 hover:text-white hover:bg-zinc-800'
                        }`}
                      >
                        {track.icon}
                        <span>{track.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Skill Track Details */}
                <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/[0.06]">
                  <h4 className="text-xs font-bold text-white mb-1">{skillTracks[activeSkillTrack].name}</h4>
                  <p className="text-xs text-zinc-400 mb-3">{skillTracks[activeSkillTrack].desc}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {skillTracks[activeSkillTrack].skills.map((s, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-zinc-800/70 border border-white/[0.04] text-xs text-zinc-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs text-zinc-400">Want to enroll in this track?</span>
                <Link href="/survey" className="text-xs font-semibold text-zinc-200 hover:text-white transition-colors flex items-center gap-1">
                  <span>Start with Assessment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ===================== INTERACTIVE 4-STAGE ROADMAP ===================== */}
      <section className="relative py-16 border-t border-white/[0.08] z-10 bg-zinc-950/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">Progression Timeline</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              From Assessment to Marketplace Impact
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {roadmapSteps.map((step) => (
              <div
                key={step.step}
                className="bento-card-interactive rounded-2xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-zinc-400 bg-zinc-900 border border-white/[0.08] px-2 py-0.5 rounded-md">
                      {step.tag}
                    </span>
                    <span className="text-2xl font-black text-white/10 font-mono">{step.step}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5">{step.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== INTERACTIVE FAQ ACCORDION ===================== */}
      <section className="relative py-16 border-t border-white/[0.08] z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">Clarifications</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-2.5">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="bento-card rounded-xl overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 text-sm font-bold text-white hover:text-zinc-200 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/[0.04]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== FINAL BENTO CTA BANNER ===================== */}
      <section className="relative py-20 border-t border-white/[0.08] z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bento-card rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden">
            <div className="w-12 h-12 mx-auto mb-5">
              <ForgeMark size="lg" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
              Ready to discover your pathway?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mb-7 leading-relaxed">
              Complete the 3-minute assessment to find your tailored cohort, match with industry mentors, and begin growing.
            </p>
            <Link
              href="/survey"
              className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-xs group"
            >
              <span>Start Free Assessment</span>
              <ArrowRight className="w-4 h-4 text-zinc-900 transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="py-8 border-t border-white/[0.08] bg-[#090a0c] text-xs text-zinc-400 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ForgeLogo size="sm" showText={false} />
            <span className="font-bold text-zinc-300">The Forge Hub</span>
            <span className="text-zinc-600">·</span>
            <span>Living Seeds Church TSA</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <Link href="/survey" className="hover:text-zinc-200 transition-colors">Assessment</Link>
            <Link href="/admin" className="hover:text-zinc-200 transition-colors">Admin</Link>
            <span>© {new Date().getFullYear()} Living Seeds Church</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
