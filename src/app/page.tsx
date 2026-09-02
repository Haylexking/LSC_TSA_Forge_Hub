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
  ChevronRight,
  GraduationCap,
  Briefcase,
  Layers,
  Clock,
  HeartHandshake
} from 'lucide-react';
import ForgeLogo, { ForgeMark } from '@/components/ForgeLogo';

export default function Home() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const cohorts = [
    {
      id: 'teens',
      title: 'NextGen & Teens',
      tag: 'Ages 13–19',
      desc: 'Secondary school youths discovering God-given gifts, career directions, foundational digital skills, and peer accountability.',
      highlights: ['Talent & career discovery', 'Early digital & creative tracks', 'Youth mentorship circles'],
      icon: <Rocket className="w-4 h-4 text-amber-600" />,
      accentBg: 'bg-amber-50',
      badgeColor: 'text-amber-800 bg-amber-100/80 border-amber-200',
    },
    {
      id: 'undergrad',
      title: 'Undergraduates',
      tag: 'Higher Ed',
      desc: 'University and polytechnic students seeking course alignment, industry-relevant tech & business skills, and internship readiness.',
      highlights: ['Academic & career synergy', 'In-demand skill bootcamps', 'Internship & CV preparation'],
      icon: <GraduationCap className="w-4 h-4 text-blue-600" />,
      accentBg: 'bg-blue-50',
      badgeColor: 'text-blue-800 bg-blue-100/80 border-blue-200',
    },
    {
      id: 'professional',
      title: 'Professionals & NYSC',
      tag: 'Early to Mid Career',
      desc: 'Graduates, corps members, and working professionals pursuing promotion, career pivots, ethical workplace leadership, and executive coaching.',
      highlights: ['1:1 Executive mentorship', 'LinkedIn & portfolio optimization', 'Kingdom leadership in the marketplace'],
      icon: <Briefcase className="w-4 h-4 text-emerald-600" />,
      accentBg: 'bg-emerald-50',
      badgeColor: 'text-emerald-800 bg-emerald-100/80 border-emerald-200',
    },
    {
      id: 'entrepreneur',
      title: 'Founders & Builders',
      tag: 'Business & Freelance',
      desc: 'Entrepreneurs, freelancers, and creative builders launching sustainable products, acquiring clients, and scaling kingdom-centered enterprises.',
      highlights: ['Venture scaling clinics', 'Business strategy mentorship', 'Founder mastermind circles'],
      icon: <Layers className="w-4 h-4 text-purple-600" />,
      accentBg: 'bg-purple-50',
      badgeColor: 'text-purple-800 bg-purple-100/80 border-purple-200',
    },
  ];

  const pillars = [
    {
      step: '01',
      title: 'Calling & Clarity',
      desc: 'Identify your unique strengths, passion, and spiritual alignment through our quick assessment.',
      icon: <Target className="w-5 h-5 text-amber-600" />,
    },
    {
      step: '02',
      title: 'Dedicated Mentorship',
      desc: 'Get matched with seasoned Christian professionals and mentors who walk with you in your field.',
      icon: <Compass className="w-5 h-5 text-blue-600" />,
    },
    {
      step: '03',
      title: 'Marketplace Impact',
      desc: 'Master in-demand skills, build tangible portfolios, and excel as an ambassador of Christ in your industry.',
      icon: <Sparkles className="w-5 h-5 text-emerald-600" />,
    },
  ];

  const faqs = [
    {
      q: 'What is the LSC TSA Forge Hub?',
      a: 'The Forge Hub is a dedicated career development and mentorship initiative by Living Seeds Church (TSA) designed to equip youths, students, and professionals for marketplace excellence and kingdom purpose.',
    },
    {
      q: 'How long does the survey take?',
      a: 'The assessment takes under 3 minutes. Your answers directly determine your cohort placement, mentor matching, and tailored skill tracks.',
    },
    {
      q: 'Is this open to non-church members?',
      a: 'Yes! We warmly welcome friends, guests, and community members who want to grow professionally and personally.',
    },
    {
      q: 'What happens after submitting my survey?',
      a: 'Our leadership team reviews your profile and matches you with a mentor and track within 48 hours with personalized onboarding details.',
    },
  ];

  return (
    <main className="min-h-screen bg-[#fafafa] text-zinc-900 selection:bg-amber-100 selection:text-amber-950 relative">
      
      {/* Background warm ambient light */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-amber-500/[0.04] via-orange-500/[0.02] to-transparent blur-[120px]" />
        <div className="absolute inset-0 bg-grid-subtle-light opacity-60" />
      </div>

      {/* ===================== NAVBAR ===================== */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-95 transition-opacity">
            <ForgeLogo size="sm" subtitle="Living Seeds Church TSA" />
          </Link>

          <div className="flex items-center gap-3">
            <Link 
              href="/survey"
              className="btn-primary text-xs font-semibold px-4 py-2 rounded-xl inline-flex items-center gap-1.5"
            >
              <span>Join Bootcamp</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-300" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ===================== HERO SECTION ===================== */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 max-w-5xl mx-auto text-center z-10">
        
        {/* Church Bootcamp Badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-200/80 bg-amber-50/80 text-amber-900 text-xs font-medium mb-6 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <span className="font-semibold text-amber-800">LSC TSA</span>
          <span className="text-amber-300">·</span>
          <span>Career & Leadership Foundry</span>
        </div>

        {/* Hero Headline */}
        <h1 className="animate-fade-up-delay-1 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-950 leading-[1.1] mb-5 max-w-4xl mx-auto">
          Discover Your Calling.{' '}
          <br className="hidden sm:inline" />
          <span className="text-gradient-amber">Build Your Future.</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-up-delay-2 text-base sm:text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed mb-8">
          The Forge Hub connects you with industry mentorship, high-impact skill tracks, and a thriving Christian community to excel in your academics, career, and business.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
          <Link 
            href="/survey" 
            className="btn-primary w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 group"
          >
            <span>Start 3-Minute Assessment</span>
            <ArrowRight className="w-4 h-4 text-zinc-300 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 px-3 py-2">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span>Free & Confidential · Tailored Matching</span>
          </div>
        </div>

        {/* ===================== INTERACTIVE COHORT EXPLORER ===================== */}
        <div className="animate-fade-up-delay-4 text-left surface-card rounded-2xl p-5 sm:p-7 border border-zinc-200/90 shadow-md max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-zinc-100">
            <div>
              <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Tailored Bootcamp Pathways</p>
              <h3 className="text-base font-bold text-zinc-900">Choose your stage to preview your growth track</h3>
            </div>
            <span className="text-xs text-zinc-400">Click a cohort to explore</span>
          </div>

          {/* Cohort Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
            {cohorts.map((cohort, index) => {
              const isSelected = activeTab === index;
              return (
                <button
                  key={cohort.id}
                  onClick={() => setActiveTab(index)}
                  className={`p-3 rounded-xl text-left transition-all duration-150 flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-white border-zinc-900 shadow-[0_2px_8px_rgba(0,0,0,0.08)] text-zinc-950 ring-1 ring-zinc-900'
                      : 'bg-zinc-50/80 border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-1.5 rounded-lg ${cohort.accentBg} border border-zinc-200/60`}>
                      {cohort.icon}
                    </div>
                    <span className="text-[10px] uppercase font-bold text-zinc-500">{cohort.tag}</span>
                  </div>
                  <span className="text-xs font-bold">{cohort.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Cohort Information Card */}
          <div className="p-5 rounded-xl bg-zinc-50/80 border border-zinc-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-zinc-950">{cohorts[activeTab].title}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-md font-semibold border ${cohorts[activeTab].badgeColor}`}>
                  {cohorts[activeTab].tag}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 max-w-xl leading-relaxed">
                {cohorts[activeTab].desc}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {cohorts[activeTab].highlights.map((h, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-700 bg-white border border-zinc-200 px-2.5 py-1 rounded-md shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    {h}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href="/survey"
              className="btn-secondary text-xs font-semibold px-4 py-2.5 rounded-xl shrink-0 inline-flex items-center gap-1.5 self-stretch md:self-auto justify-center"
            >
              <span>Join this Track</span>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
            </Link>
          </div>
        </div>

        {/* Minimal Metrics Row */}
        <div className="mt-14 grid grid-cols-3 gap-4 max-w-2xl mx-auto border-t border-zinc-200/80 pt-8">
          {[
            { label: 'Tailored Tracks', val: '4 Specialized Cohorts' },
            { label: 'Mentorship Model', val: '1:1 & Circle Matching' },
            { label: 'Response Window', val: '< 48h Personalized Pathway' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">{item.label}</div>
              <div className="text-xs sm:text-sm font-bold text-zinc-900">{item.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== HOW IT WORKS / PILLARS ===================== */}
      <section className="relative py-16 border-t border-zinc-200/80 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-1">The Forge Experience</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
              Three pillars to your marketplace advancement
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pillars.map((item) => (
              <div
                key={item.step}
                className="surface-card-interactive rounded-2xl p-6 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-xs font-mono font-bold text-zinc-400 bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded-md">
                      PILLAR {item.step}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-zinc-950 mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WHAT WE OFFER ===================== */}
      <section className="relative py-16 border-t border-zinc-200/80 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-3">
            <div>
              <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-1">Bootcamp Tracks & Growth</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
                Comprehensive development for every career stage
              </h2>
            </div>
            <Link
              href="/survey"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-900 transition-colors"
            >
              <span>Take assessment to get matched</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Career & Course Clarity',
                desc: 'Unpack your strengths, eliminate confusion regarding course alignments or career shifts, and map out a practical action plan.',
                icon: <Compass className="w-5 h-5 text-amber-600" />,
                tag: 'Clarity',
              },
              {
                title: 'High-Impact Skill Bootcamps',
                desc: 'Curated training in tech, software engineering, digital product design, data analytics, project management, and public speaking.',
                icon: <Lightbulb className="w-5 h-5 text-blue-600" />,
                tag: 'Skills',
              },
              {
                title: 'Christian Industry Mentorship',
                desc: 'Connect with experienced executives, engineers, and founders who offer spiritual grounding, professional guidance, and accountability.',
                icon: <Users className="w-5 h-5 text-emerald-600" />,
                tag: 'Mentorship',
              },
              {
                title: 'Personal Branding & Interview Mastery',
                desc: 'LinkedIn optimization, CV reviews, portfolio critiques, and technical mock interviews to help you stand out to global employers.',
                icon: <BookOpen className="w-5 h-5 text-purple-600" />,
                tag: 'Positioning',
              },
            ].map((feat) => (
              <div
                key={feat.title}
                className="surface-card rounded-2xl p-5 sm:p-6 border border-zinc-200/90 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-center">
                      {feat.icon}
                    </div>
                    <span className="text-[11px] font-bold text-zinc-600 bg-zinc-100 px-2.5 py-0.5 rounded-md border border-zinc-200">
                      {feat.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-zinc-950 mb-1.5">{feat.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SCRIPTURE / VISION QUOTE ===================== */}
      <section className="relative py-14 border-t border-zinc-200/80 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="w-9 h-9 mx-auto mb-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
            <HeartHandshake className="w-4 h-4 text-amber-700" />
          </div>
          <blockquote className="text-base sm:text-lg font-medium text-zinc-800 italic leading-relaxed mb-3">
            &ldquo;For I know the plans I have for you,&rdquo; declares the Lord, &ldquo;plans to prosper you and not to harm you, plans to give you hope and a future.&rdquo;
          </blockquote>
          <cite className="text-xs font-bold text-amber-800 uppercase tracking-wider not-italic">
            Jeremiah 29:11 · LSC TSA Vision
          </cite>
        </div>
      </section>

      {/* ===================== FAQ SECTION ===================== */}
      <section className="relative py-16 border-t border-zinc-200/80 bg-[#fafafa]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-1">Got Questions?</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="surface-card rounded-xl p-5 border border-zinc-200/80 shadow-xs"
              >
                <h4 className="text-sm sm:text-base font-bold text-zinc-900 mb-1.5">{faq.q}</h4>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FINAL CALL TO ACTION ===================== */}
      <section className="relative py-20 border-t border-zinc-200/80 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="w-12 h-12 mx-auto mb-5">
            <ForgeMark size="lg" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 mb-3">
            Ready to unlock your God-given potential?
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 max-w-md mx-auto mb-7 leading-relaxed">
            Take the 3-minute assessment to discover your pathway and connect with mentors who will guide your journey.
          </p>
          <Link
            href="/survey"
            className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm group"
          >
            <span>Start Free Assessment</span>
            <ArrowRight className="w-4 h-4 text-zinc-300 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="py-8 border-t border-zinc-200/80 bg-[#fafafa] text-xs text-zinc-500 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ForgeLogo size="sm" showText={false} />
            <span className="font-bold text-zinc-800">The Forge Hub</span>
            <span className="text-zinc-300">·</span>
            <span>Living Seeds Church TSA</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-500">
            <Link href="/survey" className="hover:text-zinc-900 transition-colors">Survey</Link>
            <Link href="/admin" className="hover:text-zinc-900 transition-colors">Admin</Link>
            <span>© {new Date().getFullYear()} Living Seeds Church</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
