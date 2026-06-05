'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck, Zap, Compass, Sparkles, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { submitSurvey } from './actions';

// ─── Option Button ───────────────────────────────────────────
function OptionButton({ label, isSelected, onClick, type = 'radio' }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full p-4 md:p-5 mb-2.5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between group
        ${isSelected 
          ? 'border-indigo-500/50 bg-indigo-500/10 shadow-sm shadow-indigo-500/5' 
          : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]'}`}
    >
      <span className={`font-medium text-[15px] ${isSelected ? 'text-indigo-300' : 'text-zinc-300'}`}>{label}</span>
      <div className={`w-5 h-5 flex items-center justify-center transition-all duration-200 border
        ${type === 'radio' ? 'rounded-full' : 'rounded-md'}
        ${isSelected ? 'border-indigo-500 bg-indigo-500' : 'border-zinc-600 group-hover:border-zinc-500'}`}>
        {isSelected && type === 'radio' && <div className="w-2 h-2 rounded-full bg-white" />}
        {isSelected && type === 'checkbox' && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    </button>
  );
}

// ─── Text Input ──────────────────────────────────────────────
function TextInput({ placeholder, value, onChange, type = "text" }: any) {
  return (
    <input 
      type={type}
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-4 md:p-5 rounded-2xl border border-white/[0.06] bg-white/[0.03] focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all text-zinc-200 placeholder:text-zinc-600 mb-3"
    />
  );
}

// ─── Step Header ─────────────────────────────────────────────
function StepHeader({ stepNum, totalSteps, title, subtitle }: { stepNum: number; totalSteps: number; title: string; subtitle: string }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Step {stepNum} of {totalSteps}</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">{title}</h2>
      <p className="text-zinc-500 text-lg">{subtitle}</p>
    </div>
  );
}

// ─── Question Label ──────────────────────────────────────────
function QuestionLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-bold text-zinc-200 mb-4 text-[17px]">{children}</p>;
}

export default function SurveyClient() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [matchedSegment, setMatchedSegment] = useState('');

  // Form State
  const [ageRange, setAgeRange] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [churchStatus, setChurchStatus] = useState<string | null>(null);
  const [currentFocus, setCurrentFocus] = useState<string | null>(null);
  const [openToMultiple, setOpenToMultiple] = useState<string | null>(null);

  const [formData, setFormData] = useState<any>({});
  
  const updateForm = (key: string, value: any) => setFormData((prev: any) => ({ ...prev, [key]: value }));
  const toggleArray = (key: string, value: string) => {
    setFormData((prev: any) => {
      const arr = prev[key] || [];
      if (arr.includes(value)) return { ...prev, [key]: arr.filter((x: string) => x !== value) };
      return { ...prev, [key]: [...arr, value] };
    });
  };

  // Logic flags
  const isUnder16 = ageRange === 'Under 16';
  const isTeen = ageRange === '16–20';
  const isAdult = !isUnder16 && !isTeen && ageRange !== null;

  const isSecSchool = role === 'Secondary school student';
  const isUndergrad = role === 'Undergraduate';
  const isGrad = role === 'Graduate / NYSC';
  const isEmployed = role === 'Employed professional';
  const isEntrepreneur = role === 'Entrepreneur / business owner' || role === 'Freelancer';
  const isOutsider = churchStatus === 'Visitor / Non-Member';

  // Total dynamic steps calculation
  let totalSteps = 5;
  if (isOutsider) totalSteps = 6;
  if (isUnder16) totalSteps = 2;

  const progressPct = Math.round(((step - 1) / totalSteps) * 100) || 10;

  const canProceed = () => {
    if (step === 1) return ageRange && role && churchStatus && currentFocus && openToMultiple;
    return true;
  };

  const handleNext = async () => {
    if (!canProceed()) return;

    if (step === 1) setStep(2);
    else if (step === 2) {
      if (isUnder16) await submitData();
      else setStep(3);
    }
    else if (step === 3) setStep(4);
    else if (step === 4) setStep(5);
    else if (step === 5) {
      if (isOutsider) setStep(6);
      else await submitData();
    }
    else if (step === 6) await submitData();
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else router.push('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submitData = async () => {
    setSubmitting(true);
    let segment = 'General';
    if (isUnder16 || isSecSchool) segment = 'Teen / NextGen';
    else if (isUndergrad) segment = 'Undergraduate';
    else if (isGrad || isEmployed) segment = 'Professional';
    else if (isEntrepreneur) segment = 'Entrepreneur';
    
    const finalData = {
      ...formData, age_range: ageRange, role, is_member: churchStatus, current_focus: currentFocus, open_to_multiple: openToMultiple, user_segment: segment
    };
    
    const res = await submitSurvey(finalData);
    setSubmitting(false);
    if (res.success) {
      setMatchedSegment(segment);
      setSubmitted(true);
    } else {
      alert('Error: ' + res.error);
    }
  };

  const segmentInfo: Record<string, { emoji: string; color: string; desc: string }> = {
    'Teen / NextGen': { emoji: '🚀', color: 'from-sky-500 to-blue-600', desc: 'You\'ll get access to NextGen mentorship, skill discovery, and youth-focused community groups.' },
    'Undergraduate': { emoji: '🎓', color: 'from-indigo-500 to-violet-600', desc: 'You\'ll be matched with academic mentors, career clarity resources, and skill-building tracks.' },
    'Professional': { emoji: '💼', color: 'from-emerald-500 to-teal-600', desc: 'You\'ll get leadership development, LinkedIn optimization, and industry-specific mentorship.' },
    'Entrepreneur': { emoji: '⚡', color: 'from-amber-500 to-orange-600', desc: 'You\'ll join our founder community with business mentors, scaling strategies, and peer support.' },
    'General': { emoji: '🌟', color: 'from-fuchsia-500 to-pink-600', desc: 'We\'ll review your profile and connect you with the best resources for your unique journey.' },
  };

  // ─── Thank You Screen ─────────────────────────────────────
  if (submitted) {
    const seg = segmentInfo[matchedSegment] || segmentInfo['General'];
    return (
      <main className="min-h-screen bg-[#09090b] text-white overflow-hidden relative">
        
        {/* ─── Confetti ─── */}
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 60 }).map((_, i) => {
            const colors = ['#6366f1', '#8b5cf6', '#a78bfa', '#34d399', '#f59e0b', '#f472b6', '#38bdf8', '#fb923c', '#c084fc'];
            const color = colors[i % colors.length];
            const left = Math.random() * 100;
            const delay = Math.random() * 3;
            const duration = 2.5 + Math.random() * 2;
            const size = 6 + Math.random() * 8;
            const rotation = Math.random() * 360;
            return (
              <div
                key={i}
                className="absolute top-0 confetti-piece"
                style={{
                  left: `${left}%`,
                  width: `${size}px`,
                  height: `${size * 0.4}px`,
                  backgroundColor: color,
                  borderRadius: '2px',
                  transform: `rotate(${rotation}deg)`,
                  animation: `confetti-fall ${duration}s ease-in ${delay}s forwards`,
                  opacity: 0,
                }}
              />
            );
          })}
        </div>

        {/* Ambient glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[150px] animate-pulse-glow" />
          <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] bg-violet-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-2xl mx-auto px-4 md:px-6 pt-28 pb-20 relative z-10">
          
          {/* Success Icon */}
          <div className="text-center mb-10 animate-fade-up">
            <div className="w-24 h-24 mx-auto mb-8 rounded-[1.75rem] bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-2xl shadow-emerald-500/25">
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">Thank You!</h1>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-md mx-auto">
              Your survey has been submitted successfully.
            </p>
          </div>

          {/* Pathway Reveal Card */}
          <div className="animate-fade-up-delay-1 rounded-3xl border border-white/[0.06] bg-zinc-900/60 p-8 mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">You&apos;ve been matched to</p>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-4xl">{seg.emoji}</span>
              <h2 className="text-3xl md:text-4xl font-extrabold">
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${seg.color}`}>{matchedSegment}</span>
              </h2>
            </div>
            <p className="text-zinc-400 leading-relaxed max-w-md mx-auto">{seg.desc}</p>
          </div>

          {/* What Happens Next */}
          <div className="animate-fade-up-delay-2 rounded-3xl border border-white/[0.06] bg-zinc-900/60 p-8 mb-8">
            <h3 className="font-bold text-xl text-white mb-8 text-center">What happens next?</h3>
            <div className="space-y-0">
              {[
                { num: '1', title: 'We review your profile', desc: 'Our team will analyze your responses and match you with the right resources.', color: 'bg-indigo-500' },
                { num: '2', title: 'You get matched', desc: 'We\'ll connect you with a mentor, community group, and skill track tailored to you.', color: 'bg-violet-500' },
                { num: '3', title: 'Your journey begins', desc: 'Expect to hear from us within 48 hours with your personalized Forge pathway.', color: 'bg-emerald-500' },
              ].map((item, i) => (
                <div key={item.num} className="flex gap-5">
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div className={`w-9 h-9 rounded-full ${item.color} flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg`}>
                      {item.num}
                    </div>
                    {i < 2 && <div className="w-px h-full bg-zinc-800 my-1" />}
                  </div>
                  <div className={`pb-8 ${i === 2 ? 'pb-0' : ''}`}>
                    <h4 className="font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-2xl font-bold text-center hover:bg-white/90 transition-all"
            >
              Back to Home
            </Link>
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: 'The Forge Hub Survey', text: 'Take the Forge Hub survey to find your personalized career pathway!', url: window.location.origin + '/survey' });
                } else {
                  navigator.clipboard.writeText(window.location.origin + '/survey');
                  alert('Survey link copied to clipboard!');
                }
              }}
              className="w-full sm:w-auto px-8 py-4 border border-white/10 bg-white/5 text-white rounded-2xl font-bold text-center hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              Share with a Friend
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
            </button>
          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#09090b] text-white selection:bg-indigo-500/30 overflow-hidden">
      
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[5%] w-[300px] h-[300px] bg-violet-500/8 rounded-full blur-[100px]" />
      </div>

      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-white/5">
        <div className="absolute inset-0 bg-[#09090b]/80 backdrop-blur-xl" />
        <div className="max-w-3xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between relative z-10">
          <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-bold">The Forge Hub</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-zinc-600">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-[11px] font-medium uppercase tracking-wider hidden sm:inline">Secure</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 md:px-6 pt-24 pb-20 relative z-10">
        
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Your Progress</span>
            <span className="text-xs font-bold text-indigo-400 tabular-nums">{progressPct}%</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700 ease-out rounded-full" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
        
        {/* Form Card */}
        <div className="rounded-3xl p-6 md:p-10 border border-white/[0.06] bg-zinc-900/50 backdrop-blur-sm">
          
          {/* ─── STEP 1: Core Identity ─── */}
          {step === 1 && (
            <div className="animate-fade-up">
              <StepHeader stepNum={1} totalSteps={totalSteps} title="Let's get to know you" subtitle="Help us tailor the perfect Forge pathway for you." />
              
              <div className="space-y-10">
                <div>
                  <QuestionLabel>Age Range</QuestionLabel>
                  {['Under 16', '16–20', '21–25', '26–30', '31+'].map(a => <OptionButton key={a} label={a} isSelected={ageRange === a} onClick={() => setAgeRange(a)} />)}
                </div>

                <div>
                  <QuestionLabel>What best describes your current career stage?</QuestionLabel>
                  {['Secondary school student', 'Undergraduate', 'Graduate / NYSC', 'Employed professional', 'Entrepreneur / business owner', 'Freelancer', 'Other'].map(r => <OptionButton key={r} label={r} isSelected={role === r} onClick={() => setRole(r)} />)}
                </div>

                <div>
                  <QuestionLabel>What is your relationship with Living Seeds Church?</QuestionLabel>
                  {['Member', 'Worker', 'HOD', 'Visitor / Non-Member'].map(y => <OptionButton key={y} label={y} isSelected={churchStatus === y} onClick={() => setChurchStatus(y)} />)}
                </div>

                <div>
                  <QuestionLabel>What is your current focus right now?</QuestionLabel>
                  {['Education', 'Career growth', 'Skill acquisition', 'Entrepreneurship', 'Leadership', 'Still figuring things out'].map(f => <OptionButton key={f} label={f} isSelected={currentFocus === f} onClick={() => setCurrentFocus(f)} />)}
                </div>

                <div>
                  <QuestionLabel>Are you open to growing in more than one area?</QuestionLabel>
                  {['Yes', 'No', 'Maybe later'].map(o => <OptionButton key={o} label={o} isSelected={openToMultiple === o} onClick={() => setOpenToMultiple(o)} />)}
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 2: Background ─── */}
          {step === 2 && (
            <div className="animate-fade-up">
              <StepHeader stepNum={2} totalSteps={totalSteps} title="Your Background" subtitle="Tell us a bit more about your current stage." />
              <div className="space-y-8">
                {(isUnder16 || isSecSchool) && (
                  <>
                    <div>
                       <QuestionLabel>Current School Level</QuestionLabel>
                       <TextInput placeholder="e.g. SS2, JSS3" value={formData.school_level} onChange={(e:any) => updateForm('school_level', e.target.value)} />
                    </div>
                    <div>
                       <QuestionLabel>What subjects do you like?</QuestionLabel>
                       <TextInput placeholder="e.g. Mathematics, Biology" value={formData.favorite_subjects?.[0]} onChange={(e:any) => updateForm('favorite_subjects', [e.target.value])} />
                    </div>
                    <div>
                       <QuestionLabel>What do you want to become?</QuestionLabel>
                       <TextInput placeholder="e.g. Engineer, Doctor" value={formData.want_to_become} onChange={(e:any) => updateForm('want_to_become', e.target.value)} />
                    </div>
                  </>
                )}
                {isUndergrad && (
                  <>
                    <div>
                      <QuestionLabel>University / Institution</QuestionLabel>
                      <TextInput placeholder="Where do you study?" value={formData.school_level} onChange={(e:any) => updateForm('school_level', e.target.value)} />
                    </div>
                    <div>
                      <QuestionLabel>Course of Study</QuestionLabel>
                      <TextInput placeholder="What are you studying?" value={formData.course_of_study} onChange={(e:any) => updateForm('course_of_study', e.target.value)} />
                    </div>
                    <div>
                      <QuestionLabel>Are you satisfied with your course?</QuestionLabel>
                      {['Yes', 'No', 'Not sure'].map(o => <OptionButton key={o} label={o} isSelected={formData.satisfied_course === o} onClick={() => updateForm('satisfied_course', o)} />)}
                    </div>
                  </>
                )}
                {(isGrad || isEmployed) && (
                  <>
                    <div>
                      <QuestionLabel>{isEmployed ? "Industry you work in" : "Course studied"}</QuestionLabel>
                      <TextInput placeholder="e.g. Tech, Healthcare" value={formData.industry} onChange={(e:any) => updateForm('industry', e.target.value)} />
                    </div>
                    <div>
                      <QuestionLabel>Current Role</QuestionLabel>
                      <TextInput placeholder="e.g. Software Engineer" value={formData.job_role} onChange={(e:any) => updateForm('job_role', e.target.value)} />
                    </div>
                  </>
                )}
                {isEntrepreneur && (
                  <>
                    <div>
                      <QuestionLabel>What is your business type?</QuestionLabel>
                      <TextInput placeholder="e.g. E-commerce, Agency" value={formData.business_type} onChange={(e:any) => updateForm('business_type', e.target.value)} />
                    </div>
                    <div>
                      <QuestionLabel>Biggest business challenge?</QuestionLabel>
                      <TextInput placeholder="e.g. Scaling, Marketing" value={formData.biggest_challenge} onChange={(e:any) => updateForm('biggest_challenge', e.target.value)} />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ─── STEP 3: Career & Skills ─── */}
          {step === 3 && (
            <div className="animate-fade-up">
              <StepHeader stepNum={3} totalSteps={totalSteps} title="Career & Skills" subtitle="How do you envision your professional growth?" />
              <div className="space-y-8">
                {(isAdult || isTeen) && !isUnder16 && (
                  <>
                    <div>
                      <QuestionLabel>Which best describes your relationship with your course/field?</QuestionLabel>
                      {['I want to stay fully in my field', 'I want to combine it with another skill', 'I want to transition into another field', 'I\u2019m still trying to figure things out'].map(o => <OptionButton key={o} label={o} isSelected={formData.course_relationship === o} onClick={() => updateForm('course_relationship', o)} />)}
                    </div>
                    
                    <div className="pt-6 border-t border-white/5">
                      <QuestionLabel>Are you currently learning any skill outside your course/career?</QuestionLabel>
                      {['Yes', 'No'].map(o => <OptionButton key={o} label={o} isSelected={formData.learning_skill === o} onClick={() => updateForm('learning_skill', o)} />)}
                    </div>
                    
                    {formData.learning_skill === 'Yes' && (
                      <div className="bg-indigo-500/5 p-6 rounded-2xl border border-indigo-500/10 animate-fade-up">
                        <div className="flex items-center gap-2 mb-4">
                          <Sparkles className="w-4 h-4 text-indigo-400" />
                          <span className="text-sm font-semibold text-indigo-400">Tell us more</span>
                        </div>
                        <QuestionLabel>Which skill(s)?</QuestionLabel>
                        <TextInput placeholder="e.g. UI/UX Design, Data Analysis" value={formData.skill_learning} onChange={(e:any) => updateForm('skill_learning', e.target.value)} />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* ─── STEP 4: Support Needs ─── */}
          {step === 4 && (
            <div className="animate-fade-up">
              <StepHeader stepNum={4} totalSteps={totalSteps} title="Support Needs" subtitle="Let us know exactly where we can help." />

              {/* Info Banner */}
              <div className="rounded-2xl p-5 mb-10 border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-violet-500/5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0">
                    <Compass className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Targeted Support</h4>
                    <p className="text-zinc-400 leading-relaxed text-sm">
                      We use this data to group you into specialized cohorts, ensuring you get the exact resources, mentors, and challenges you need.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {isAdult && (
                  <>
                    <div>
                      <QuestionLabel>Do you have an optimized LinkedIn profile?</QuestionLabel>
                      {['Yes, it is good', 'No, I need help with it'].map(o => <OptionButton key={o} label={o} isSelected={formData.linkedin_status === o} onClick={() => updateForm('linkedin_status', o)} />)}
                    </div>
                    <div>
                      <QuestionLabel>Do you have a CV/Resume?</QuestionLabel>
                      {['Yes, but needs review', 'Yes, it is fine', 'No, I need to create one'].map(o => <OptionButton key={o} label={o} isSelected={formData.cv_status === o} onClick={() => updateForm('cv_status', o)} />)}
                    </div>
                  </>
                )}
                <div className="pt-4">
                  <QuestionLabel>What kind of support do you need most right now? (Select any)</QuestionLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
                    {['Career clarity', 'Mentorship', 'Skill acquisition', 'Personal branding', 'LinkedIn optimization', 'CV/resume support', 'Interview preparation', 'Leadership development', 'Academic support', 'Entrepreneurship'].map(o => (
                      <OptionButton key={o} label={o} type="checkbox" isSelected={(formData.support_needed || []).includes(o)} onClick={() => toggleArray('support_needed', o)} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 5: Mentorship & Contact ─── */}
          {step === 5 && (
            <div className="animate-fade-up">
              <StepHeader stepNum={5} totalSteps={totalSteps} title="Mentorship & Connection" subtitle="Forge Hub is built on strong communities." />
              <div className="space-y-8">
                <div>
                  <QuestionLabel>Would you like a mentor?</QuestionLabel>
                  {['Yes', 'No'].map(o => <OptionButton key={o} label={o} isSelected={formData.want_mentorship === o} onClick={() => updateForm('want_mentorship', o)} />)}
                </div>
                {formData.want_mentorship === 'Yes' && (
                  <div className="bg-indigo-500/5 p-6 rounded-2xl border border-indigo-500/10 animate-fade-up">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      <span className="text-sm font-semibold text-indigo-400">Mentorship Focus</span>
                    </div>
                    <QuestionLabel>What area do you want mentorship in?</QuestionLabel>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
                      {['Career', 'Academics', 'Leadership', 'Business', 'Skills', 'Ministry', 'Transitioning fields'].map(o => <OptionButton key={o} label={o} type="checkbox" isSelected={(formData.mentorship_area || []).includes(o)} onClick={() => toggleArray('mentorship_area', o)} />)}
                    </div>
                  </div>
                )}
                <div>
                  <QuestionLabel>Would you like to be part of a community of people in your field?</QuestionLabel>
                  {['Yes', 'No'].map(o => <OptionButton key={o} label={o} isSelected={formData.want_community === o} onClick={() => updateForm('want_community', o)} />)}
                </div>

                <div className="pt-8 border-t border-white/5">
                   <div className="flex items-center gap-3 mb-6">
                     <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                       <Send className="w-4 h-4 text-emerald-400" />
                     </div>
                     <div>
                       <h3 className="font-bold text-white text-lg">Your details</h3>
                       <p className="text-zinc-500 text-sm">So we can reach you with your personalized pathway.</p>
                     </div>
                   </div>
                   <TextInput placeholder="Full Name" value={formData.name} onChange={(e:any) => updateForm('name', e.target.value)} />
                   <TextInput type="email" placeholder="Email Address" value={formData.email} onChange={(e:any) => updateForm('email', e.target.value)} />
                   <TextInput type="tel" placeholder="Phone / WhatsApp Number" value={formData.phone} onChange={(e:any) => updateForm('phone', e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 6: Outsider Connect ─── */}
          {step === 6 && (
            <div className="animate-fade-up">
              <StepHeader stepNum={6} totalSteps={totalSteps} title="Stay Connected" subtitle="We love having new people in our ecosystem." />
              <div className="space-y-8">
                <div>
                  <QuestionLabel>How did you hear about Forge?</QuestionLabel>
                  <TextInput placeholder="e.g. Friend, Social Media" value={formData.how_heard} onChange={(e:any) => updateForm('how_heard', e.target.value)} />
                </div>
                <div>
                  <QuestionLabel>What attracted you?</QuestionLabel>
                  <TextInput placeholder="e.g. Mentorship programs" value={formData.what_attracted} onChange={(e:any) => updateForm('what_attracted', e.target.value)} />
                </div>
                <div className="pt-4 border-t border-white/5">
                  <QuestionLabel>Are you open to church/community updates?</QuestionLabel>
                  {['Yes', 'No'].map(o => <OptionButton key={o} label={o} isSelected={formData.stay_connected === o} onClick={() => updateForm('stay_connected', o)} />)}
                </div>
              </div>
            </div>
          )}

          {/* ─── Navigation Controls ─── */}
          <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between gap-4">
            <button onClick={handleBack} className="flex items-center gap-2 text-zinc-500 font-semibold hover:text-zinc-300 px-4 py-2 transition-colors">
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
            <button 
              onClick={handleNext} 
              disabled={submitting || !canProceed()} 
              className={`px-8 md:px-10 py-4 font-bold rounded-2xl transition-all flex items-center justify-center gap-2
                ${submitting || !canProceed() 
                  ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-0.5 animate-gradient'
                }
              `}
            >
              {submitting ? (
                <>
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  Submitting...
                </>
              ) : (step === totalSteps || (isUnder16 && step === 2)) ? (
                <>Submit Survey <Send className="w-4 h-4" /></>
              ) : (
                <>Continue <ChevronRight className="w-5 h-5" /></>
              )}
            </button>
          </div>

        </div>

        {/* Bottom Trust Badges */}
        <div className="mt-10 text-center flex items-center justify-center gap-8">
          <div className="flex items-center gap-1.5 text-zinc-600">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[11px] font-medium uppercase tracking-wider">Encrypted</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-600">
            <Compass className="w-4 h-4" />
            <span className="text-[11px] font-medium uppercase tracking-wider">Personalized Path</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-600">
            <Sparkles className="w-4 h-4" />
            <span className="text-[11px] font-medium uppercase tracking-wider">3 min</span>
          </div>
        </div>

      </div>
    </main>
  );
}
