'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Compass, 
  Users, 
  Lightbulb, 
  Rocket, 
  Target, 
  BookOpen, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  ChevronRight,
  GraduationCap,
  Briefcase,
  Layers,
  Clock
} from 'lucide-react';
import ForgeLogo, { ForgeMark } from '@/components/ForgeLogo';

export default function Home() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const cohorts = [
    {
      id: 'teens',
      title: 'NextGen & Teens',
      tag: 'Ages 13–19',
      desc: 'Secondary school students discovering strengths, career options, and early digital & creative skills.',
      highlights: ['Career path exploration', 'Foundational digital skills', 'Peer community circles'],
      icon: <Rocket className="w-4 h-4 text-zinc-300" />,
    },
    {
      id: 'undergrad',
      title: 'Undergraduates',
      tag: 'Higher Ed',
      desc: 'University & polytechnic students seeking course clarity, industry skills, internships, and portfolio building.',
      highlights: ['Academic & career alignment', 'In-demand skill tracks', 'Internship readiness'],
      icon: <GraduationCap className="w-4 h-4 text-zinc-300" />,
    },
    {
      id: 'professional',
      title: 'Professionals & NYSC',
      tag: 'Early to Mid Career',
      desc: 'Graduates and working professionals looking to accelerate promotion, pivot industries, or master leadership.',
      highlights: ['1:1 Executive mentorship', 'LinkedIn & CV review', 'Industry networking'],
      icon: <Briefcase className="w-4 h-4 text-zinc-300" />,
    },
    {
      id: 'entrepreneur',
      title: 'Founders & Builders',
      tag: 'Business & Freelance',
      desc: 'Entrepreneurs, creators, and freelancers building products, acquiring clients, and scaling sustainable ventures.',
      highlights: ['Venture scaling mentorship', 'Business model clinic', 'Founder mastermind'],
      icon: <Layers className="w-4 h-4 text-zinc-300" />,
    },
  ];

  const faqs = [
    {
      q: 'Who is Forge Hub designed for?',
      a: 'The Forge Hub is tailored for everyone from secondary school students to experienced professionals and entrepreneurs connected with Living Seeds Church and our broader community.',
    },
    {
      q: 'How long does the survey take?',
      a: 'The survey takes less than 3 minutes to complete. It uses smart branching so you only answer questions relevant to your stage.',
    },
    {
      q: 'What happens after I complete the survey?',
      a: 'Our team categorizes your responses and matches you to a dedicated cohort, mentor, and skill roadmap. You will receive personalized next steps within 48 hours.',
    },
    {
      q: 'Is there any fee to join or participate?',
      a: 'No. The Forge Hub is an empowering ministry and development initiative designed to equip and raise purposeful leaders.',
    },
  ];

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-zinc-700 selection:text-white relative">
      
      {/* Subtle non-neon background lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-zinc-800/20 blur-[140px] rounded-full" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-zinc-800/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-grid-subtle opacity-40" />
      </div>

      {/* ===================== NAVBAR ===================== */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#09090b]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
            <ForgeLogo size="sm" subtitle="LSC TSA Community" />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="text-xs font-medium text-zinc-400 hover:text-zinc-200 px-3 py-1.5 rounded-lg border border-transparent hover:border-white/[0.06] transition-all hidden sm:inline-block"
            >
              Admin
            </Link>
            <Link 
              href="/survey"
              className="btn-primary text-xs font-semibold px-4 py-2 rounded-xl inline-flex items-center gap-1.5"
            >
              <span>Take Survey</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-800" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ===================== HERO SECTION ===================== */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-4 sm:px-6 max-w-5xl mx-auto text-center z-10">
        
        {/* Subtle Live Badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-zinc-300 text-xs font-medium mb-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
          </span>
          <span className="text-zinc-400">LSC TSA</span>
          <span className="text-zinc-600">·</span>
          <span>Career & Mentorship Pathways</span>
        </div>

        {/* Hero Title */}
        <h1 className="animate-fade-up-delay-1 text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6 max-w-4xl mx-auto">
          Discover Your Path.{' '}
          <br className="hidden sm:inline" />
          <span className="text-gradient-silver">Build Your Future.</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="animate-fade-up-delay-2 text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          The Forge Hub connects you with tailored mentorship, career clarity, and a purposeful peer community. Tell us where you are — we’ll map your pathway.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <Link 
            href="/survey" 
            className="btn-primary w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 group"
          >
            <span>Start 3-Min Survey</span>
            <ArrowRight className="w-4 h-4 text-zinc-800 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 px-3 py-2">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span>Under 3 minutes · Free & Confidential</span>
          </div>
        </div>

        {/* ===================== INTERACTIVE COHORT SELECTOR ===================== */}
        <div className="animate-fade-up-delay-4 text-left surface-card rounded-2xl p-4 sm:p-6 border border-white/[0.08] max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-white/[0.06]">
            <div>
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Tailored Cohorts</p>
              <h3 className="text-base font-semibold text-white">Find where you fit in the Forge ecosystem</h3>
            </div>
            <span className="text-xs text-zinc-400">Click a track to inspect</span>
          </div>

          {/* Pill Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            {cohorts.map((cohort, index) => {
              const isSelected = activeTab === index;
              return (
                <button
                  key={cohort.id}
                  onClick={() => setActiveTab(index)}
                  className={`p-3 rounded-xl text-left transition-all duration-150 flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-white/[0.08] border-white/[0.2] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] text-white'
                      : 'bg-white/[0.02] border-white/[0.04] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-1 rounded-lg bg-zinc-800/80 border border-white/[0.06]">
                      {cohort.icon}
                    </div>
                    <span className="text-[10px] uppercase font-semibold text-zinc-400">{cohort.tag}</span>
                  </div>
                  <span className="text-xs font-semibold">{cohort.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Cohort Detail Card */}
          <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{cohorts[activeTab].title}</span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-white/[0.06] text-zinc-300 font-medium">
                  {cohorts[activeTab].tag}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
                {cohorts[activeTab].desc}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {cohorts[activeTab].highlights.map((h, i) => (
                  <span key={i} className="inline-flex items-center gap-1 text-[11px] text-zinc-300 bg-zinc-800/60 border border-white/[0.06] px-2.5 py-1 rounded-md">
                    <CheckCircle2 className="w-3 h-3 text-amber-400" />
                    {h}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href="/survey"
              className="btn-secondary text-xs font-semibold px-4 py-2.5 rounded-lg shrink-0 inline-flex items-center gap-1.5 self-stretch md:self-auto justify-center"
            >
              <span>Join this Track</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Minimal Metrics Row */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto border-t border-white/[0.06] pt-10">
          {[
            { label: 'Tailored Tracks', val: '4 Specialized Cohorts' },
            { label: 'Mentorship', val: '1:1 & Group Match' },
            { label: 'Response Time', val: '< 48h Pathways' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-1">{item.label}</div>
              <div className="text-sm sm:text-base font-semibold text-white">{item.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="relative py-20 border-t border-white/[0.06] z-10 bg-zinc-950/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">The Process</p>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Three steps to your personalized growth plan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                step: '01',
                title: 'Share Your Story',
                desc: 'Answer intuitive questions about your current role, field, core aspirations, and growth needs.',
                icon: <Target className="w-5 h-5 text-zinc-200" />,
              },
              {
                step: '02',
                title: 'Cohort & Mentor Match',
                desc: 'Our leadership maps you to the right track — Teens, Undergraduates, Professionals, or Founders.',
                icon: <Compass className="w-5 h-5 text-zinc-200" />,
              },
              {
                step: '03',
                title: 'Accelerate & Build',
                desc: 'Access curated tracks, resume reviews, 1:1 sessions, and a thriving peer community of builders.',
                icon: <Sparkles className="w-5 h-5 text-amber-400" />,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="surface-card-interactive rounded-2xl p-6 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-white/[0.08] flex items-center justify-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
                      {item.icon}
                    </div>
                    <span className="text-xs font-mono font-bold text-zinc-400 border border-white/[0.06] px-2 py-0.5 rounded-md">
                      STEP {item.step}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WHAT WE OFFER ===================== */}
      <section className="relative py-20 border-t border-white/[0.06] z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">What We Offer</p>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                Everything you need to step into mastery
              </h2>
            </div>
            <Link
              href="/survey"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
            >
              <span>Explore all offerings in survey</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Career & Course Clarity',
                desc: 'Unpack your strengths, eliminate confusion about course alignments or career pivots, and chart a concrete roadmap.',
                icon: <Compass className="w-5 h-5 text-zinc-200" />,
                tag: 'Direction',
              },
              {
                title: 'High-Impact Skill Tracks',
                desc: 'Curated bootcamps and learning modules in tech, digital design, leadership, business management, and communication.',
                icon: <Lightbulb className="w-5 h-5 text-zinc-200" />,
                tag: 'Skills',
              },
              {
                title: 'Dedicated Mentorship Circles',
                desc: 'Connect with seasoned industry veterans and peers who provide accountability, guidance, and spiritual grounding.',
                icon: <Users className="w-5 h-5 text-zinc-200" />,
                tag: 'Community',
              },
              {
                title: 'Brand, CV & Interview Prep',
                desc: 'Optimize your LinkedIn profile, refine your CV/portfolio, and master technical and behavioral interview techniques.',
                icon: <BookOpen className="w-5 h-5 text-zinc-200" />,
                tag: 'Positioning',
              },
            ].map((feat) => (
              <div
                key={feat.title}
                className="surface-card rounded-2xl p-6 border border-white/[0.07] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800/70 border border-white/[0.08] flex items-center justify-center">
                      {feat.icon}
                    </div>
                    <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/[0.04]">
                      {feat.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FAQ SECTION ===================== */}
      <section className="relative py-20 border-t border-white/[0.06] z-10 bg-zinc-950/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Common Questions</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="surface-card rounded-xl p-5 border border-white/[0.06]"
              >
                <h4 className="text-sm sm:text-base font-semibold text-white mb-2">{faq.q}</h4>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA BANNER ===================== */}
      <section className="relative py-24 border-t border-white/[0.06] z-10 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="w-12 h-12 mx-auto mb-6">
            <ForgeMark size="lg" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Ready to forge your path?
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-md mx-auto mb-8 leading-relaxed">
            Join hundreds of youths, undergraduates, and professionals building their future with clarity and purpose.
          </p>
          <Link
            href="/survey"
            className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm group"
          >
            <span>Start Survey Now</span>
            <ArrowRight className="w-4 h-4 text-zinc-800 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="py-8 border-t border-white/[0.06] text-xs text-zinc-400 z-10 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ForgeLogo size="sm" showText={false} />
            <span className="font-semibold text-zinc-300">The Forge Hub</span>
            <span className="text-zinc-600">·</span>
            <span>Living Seeds Church TSA</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/survey" className="hover:text-zinc-300 transition-colors">Survey</Link>
            <Link href="/admin" className="hover:text-zinc-300 transition-colors">Admin</Link>
            <span>© {new Date().getFullYear()} All Rights Reserved</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
