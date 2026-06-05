import Link from 'next/link';
import { ArrowRight, Compass, Users, Lightbulb, Rocket, Zap, Target, BookOpen, ArrowUpRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white selection:bg-indigo-500/30 selection:text-white overflow-hidden">
      
      {/* ===================== NAVBAR ===================== */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5">
        <div className="absolute inset-0 bg-[#09090b]/70 backdrop-blur-xl" />
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">The Forge Hub</span>
          </div>
          <Link 
            href="/survey"
            className="px-5 py-2 text-sm font-semibold rounded-full bg-white text-black hover:bg-white/90 transition-all"
          >
            Take Survey
          </Link>
        </div>
      </nav>

      {/* ===================== HERO ===================== */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        
        {/* Ambient Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-violet-600/15 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
          <div className="absolute top-[40%] right-[30%] w-[300px] h-[300px] bg-fuchsia-500/10 rounded-full blur-[80px] animate-pulse-glow" style={{ animationDelay: '4s' }} />
        </div>

        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '64px 64px'
          }}
        />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-400" />
            </span>
            LSC TSA • Shaping the Next Generation
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up-delay-1 text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight leading-[1.05] mb-8">
            Discover Your Path.{' '}
            <br className="hidden sm:block" />
            <span className="text-gradient">
              Build Your Future.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-up-delay-2 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-14">
            The Forge Hub connects you with mentorship, career clarity, and a thriving community.
            Tell us where you are — we&apos;ll show you where to go.
          </p>

          {/* CTA */}
          <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/survey" 
              className="group relative w-full sm:w-auto px-10 py-4 bg-white text-black rounded-2xl font-bold text-lg transition-all hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-0.5 flex items-center justify-center gap-3"
            >
              Start the Survey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <span className="text-sm text-zinc-500">Takes less than 3 minutes</span>
          </div>

          {/* Stats Row */}
          <div className="animate-fade-up-delay-4 mt-20 flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { number: '4', label: 'Personalized Pathways' },
              { number: '6+', label: 'Skill Tracks' },
              { number: '1:1', label: 'Mentorship Matching' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-white">{stat.number}</div>
                <div className="text-xs md:text-sm text-zinc-500 mt-1 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600 animate-bounce">
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-zinc-600 to-transparent" />
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="relative py-32 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Three steps to your <span className="text-gradient">personalized path</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                icon: <Target className="w-6 h-6" />,
                title: 'Tell Us About You',
                desc: 'Answer a few quick questions about your age, career stage, and what you\'re focused on right now.',
                color: 'from-indigo-500/20 to-indigo-500/0',
                border: 'border-indigo-500/10 hover:border-indigo-500/30',
                iconBg: 'bg-indigo-500/10 text-indigo-400',
              },
              {
                step: '02',
                icon: <Compass className="w-6 h-6" />,
                title: 'Get Matched',
                desc: 'We use your answers to segment you into the right cohort — Teen, Undergraduate, Professional, or Entrepreneur.',
                color: 'from-violet-500/20 to-violet-500/0',
                border: 'border-violet-500/10 hover:border-violet-500/30',
                iconBg: 'bg-violet-500/10 text-violet-400',
              },
              {
                step: '03',
                icon: <Rocket className="w-6 h-6" />,
                title: 'Start Growing',
                desc: 'Access tailored mentorship, skill tracks, community groups, and career support designed for your journey.',
                color: 'from-fuchsia-500/20 to-fuchsia-500/0',
                border: 'border-fuchsia-500/10 hover:border-fuchsia-500/30',
                iconBg: 'bg-fuchsia-500/10 text-fuchsia-400',
              },
            ].map((item) => (
              <div key={item.step} className={`relative group rounded-3xl border ${item.border} bg-zinc-900/50 p-8 transition-all duration-300 hover:-translate-y-1`}>
                {/* Gradient glow on hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl ${item.iconBg} flex items-center justify-center`}>
                      {item.icon}
                    </div>
                    <span className="text-5xl font-black text-white/5 group-hover:text-white/10 transition-colors">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WHAT WE OFFER ===================== */}
      <section className="relative py-32 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left — Text */}
            <div>
              <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">What We Offer</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                Everything you need to <span className="text-gradient">level up</span>
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-10 text-lg">
                Whether you&apos;re a secondary school student dreaming big, an undergraduate building skills, 
                or a professional ready to lead — Forge meets you exactly where you are.
              </p>
              <Link 
                href="/survey" 
                className="group inline-flex items-center gap-2 text-indigo-400 font-semibold hover:text-indigo-300 transition-colors"
              >
                Find your pathway <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            {/* Right — Feature Cards (stacked) */}
            <div className="space-y-4">
              {[
                {
                  icon: <Compass className="w-5 h-5" />,
                  title: 'Career Clarity',
                  desc: 'Discover your strengths, map your direction, and eliminate the confusion about what comes next.',
                  accent: 'text-sky-400 bg-sky-500/10',
                },
                {
                  icon: <Lightbulb className="w-5 h-5" />,
                  title: 'Skill Acquisition',
                  desc: 'Join structured tracks in tech, design, leadership, business, and more — all curated for real impact.',
                  accent: 'text-amber-400 bg-amber-500/10',
                },
                {
                  icon: <Users className="w-5 h-5" />,
                  title: 'Mentorship & Community',
                  desc: 'Get matched with experienced mentors and join circles of peers in your specific field.',
                  accent: 'text-emerald-400 bg-emerald-500/10',
                },
                {
                  icon: <BookOpen className="w-5 h-5" />,
                  title: 'Personal Branding',
                  desc: 'LinkedIn optimization, CV building, portfolio reviews, and interview preparation support.',
                  accent: 'text-rose-400 bg-rose-500/10',
                },
              ].map((feat) => (
                <div key={feat.title} className="group flex items-start gap-5 p-5 rounded-2xl border border-white/5 bg-zinc-900/40 hover:bg-zinc-900/70 hover:border-white/10 transition-all duration-300">
                  <div className={`w-10 h-10 rounded-xl ${feat.accent} flex items-center justify-center shrink-0 mt-0.5`}>
                    {feat.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">{feat.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CTA SECTION ===================== */}
      <section className="relative py-32 border-t border-white/5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px]" />
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Ready to find your <span className="text-gradient">pathway</span>?
          </h2>
          <p className="text-zinc-400 text-lg mb-12 max-w-xl mx-auto">
            It only takes a few minutes. Your answers help us build the perfect Forge experience for you.
          </p>
          <Link 
            href="/survey" 
            className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl font-bold text-lg transition-all hover:shadow-2xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 animate-gradient"
          >
            Start the Survey Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="py-10 border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-bold text-zinc-400">The Forge Hub</span>
          </div>
          <p className="text-sm text-zinc-600">© {new Date().getFullYear()} Living Seeds Church — TSA Forge Hub</p>
        </div>
      </footer>
    </main>
  );
}
