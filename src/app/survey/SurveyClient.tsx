'use client';

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Send, 
  Check, 
  Share2, 
  ArrowRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { submitSurvey } from './actions';
import ForgeLogo from '@/components/ForgeLogo';

// ─── Option Button (Elevated Bento Tactile Style) ─────────────
function OptionButton({ 
  label, 
  isSelected, 
  onClick, 
  type = 'radio',
  description
}: { 
  label: string; 
  isSelected: boolean; 
  onClick: () => void; 
  type?: 'radio' | 'checkbox';
  description?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full p-4 mb-2 rounded-xl border text-left transition-all duration-150 flex items-center justify-between group active:scale-[0.99] ${
        isSelected 
          ? 'border-white/[0.28] bg-zinc-800 text-white shadow-xs' 
          : 'border-white/[0.07] bg-zinc-900/60 hover:border-white/[0.14] hover:bg-zinc-900 text-zinc-300'
      }`}
    >
      <div className="flex flex-col pr-3">
        <span className={`text-sm md:text-[15px] font-semibold leading-snug ${isSelected ? 'text-white' : 'text-zinc-200'}`}>
          {label}
        </span>
        {description && (
          <span className="text-xs text-zinc-400 mt-0.5">{description}</span>
        )}
      </div>

      <div 
        className={`w-5 h-5 flex items-center justify-center shrink-0 transition-all duration-150 border ${
          type === 'radio' ? 'rounded-full' : 'rounded-md'
        } ${
          isSelected 
            ? 'border-white bg-white text-zinc-950' 
            : 'border-zinc-700 bg-zinc-900 group-hover:border-zinc-500'
        }`}
      >
        {isSelected && (
          <Check className="w-3.5 h-3.5 text-zinc-950 stroke-[3]" />
        )}
      </div>
    </button>
  );
}

// ─── Text Input (Elevated Bento Surface) ───────────────────────
function TextInput({ 
  placeholder, 
  value, 
  onChange, 
  type = "text",
  label 
}: { 
  placeholder: string; 
  value?: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  type?: string;
  label?: string;
}) {
  return (
    <div className="mb-4">
      {label && <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">{label}</label>}
      <input 
        type={type}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-zinc-900/80 focus:border-white/30 focus:ring-1 focus:ring-white/20 outline-none transition-all text-sm text-zinc-100 placeholder:text-zinc-400 font-medium"
      />
    </div>
  );
}

// ─── Step Header ─────────────────────────────────────────────
function StepHeader({ 
  stepNum, 
  totalSteps, 
  title, 
  subtitle 
}: { 
  stepNum: number; 
  totalSteps: number; 
  title: string; 
  subtitle: string;
}) {
  return (
    <div className="mb-7">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-zinc-400">
          Step {stepNum} of {totalSteps}
        </span>
      </div>
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-1.5">{title}</h2>
      <p className="text-zinc-400 text-sm md:text-base leading-relaxed">{subtitle}</p>
    </div>
  );
}

// ─── Question Label ──────────────────────────────────────────
function QuestionLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-semibold text-zinc-200 mb-2.5 text-sm md:text-[15px]">{children}</p>;
}

interface SurveyFormData {
  school_level?: string;
  favorite_subjects?: string[];
  want_to_become?: string;
  course_of_study?: string;
  satisfied_course?: string;
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
  name?: string;
  email?: string;
  phone?: string;
  how_heard?: string;
  what_attracted?: string;
  stay_connected?: string;
  [key: string]: unknown;
}

export default function SurveyClient() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [matchedSegment, setMatchedSegment] = useState('');
  const [copied, setCopied] = useState(false);

  // Form State
  const [ageRange, setAgeRange] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [churchStatus, setChurchStatus] = useState<string | null>(null);
  const [currentFocus, setCurrentFocus] = useState<string | null>(null);
  const [openToMultiple, setOpenToMultiple] = useState<string | null>(null);

  const [formData, setFormData] = useState<SurveyFormData>({});
  
  const updateForm = (key: keyof SurveyFormData, value: unknown) => setFormData((prev) => ({ ...prev, [key]: value }));
  const toggleArray = (key: keyof SurveyFormData, value: string) => {
    setFormData((prev) => {
      const arr = (prev[key] as string[]) || [];
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

  const progressPct = Math.min(100, Math.round(((step - 1) / totalSteps) * 100) || 12);

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
      ...formData, 
      age_range: ageRange, 
      role, 
      is_member: churchStatus, 
      current_focus: currentFocus, 
      open_to_multiple: openToMultiple, 
      user_segment: segment
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

  const segmentInfo: Record<string, { badge: string; desc: string }> = {
    'Teen / NextGen': { 
      badge: 'NextGen & Youth Pathway',
      desc: 'You have been matched to NextGen mentorship, career discovery tracks, and youth leadership circles.' 
    },
    'Undergraduate': { 
      badge: 'Higher Education Track',
      desc: 'You have been matched to academic mentors, career roadmaps, and industry-grade skill bootcamps.' 
    },
    'Professional': { 
      badge: 'Professional Mastery Track',
      desc: 'You have been matched to executive mentors, CV & LinkedIn clinics, and industry networks.' 
    },
    'Entrepreneur': { 
      badge: 'Founders & Builders Track',
      desc: 'You have been matched to business advisory mentors, scaling masterminds, and creator circles.' 
    },
    'General': { 
      badge: 'General Growth Pathway',
      desc: 'We will review your profile and connect you with tailored opportunities within the Forge ecosystem.' 
    },
  };

  const handleShare = () => {
    if (typeof window === 'undefined') return;
    const url = window.location.origin + '/survey';
    if (navigator.share) {
      navigator.share({
        title: 'LSC TSA Forge Hub Assessment',
        text: 'Take the 3-minute Forge Hub assessment to find your tailored career & mentorship pathway!',
        url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ─── Outcome / Thank You Screen ────────────────────────────
  if (submitted) {
    const seg = segmentInfo[matchedSegment] || segmentInfo['General'];
    return (
      <main className="min-h-screen bg-[#090a0c] text-white relative">
        <div className="fixed inset-0 pointer-events-none bg-grid-dark opacity-35" />

        {/* Top Bar */}
        <div className="border-b border-white/[0.08] bg-[#090a0c]/85 backdrop-blur-xl">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <Link href="/">
              <ForgeLogo size="sm" showText={true} />
            </Link>
            <span className="text-xs text-zinc-400 font-mono">Assessment Complete</span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-14 pb-20 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-8 animate-fade-up">
            <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-zinc-900 border border-white/[0.12] flex items-center justify-center shadow-xs">
              <Check className="w-6 h-6 text-white stroke-[2.5]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
              Assessment Completed
            </h1>
            <p className="text-zinc-400 text-sm md:text-base max-w-md mx-auto leading-relaxed">
              Your responses have been recorded. Here is your preliminary cohort placement.
            </p>
          </div>

          {/* Matched Cohort Card */}
          <div className="bento-card rounded-2xl p-6 mb-5 border border-white/[0.08] animate-fade-up-delay-1">
            <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/[0.06]">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-400">Matched Cohort</span>
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-zinc-800 text-zinc-200 font-semibold border border-white/[0.06]">
                {seg.badge}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white mb-1.5">{matchedSegment}</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">{seg.desc}</p>
          </div>

          {/* Next Steps Timeline */}
          <div className="bento-card rounded-2xl p-6 mb-7 border border-white/[0.08] animate-fade-up-delay-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-5">Next Steps</h3>
            <div className="space-y-4">
              {[
                { num: '1', title: 'Profile Analysis', desc: 'Our leadership team evaluates your skill focus and career goals.' },
                { num: '2', title: 'Mentor & Cohort Assignment', desc: 'You will be grouped into your track with dedicated mentors and peers.' },
                { num: '3', title: 'Onboarding & Track Access', desc: 'You will receive personalized resources and onboarding details within 48 hours.' },
              ].map((item) => (
                <div key={item.num} className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-white/[0.08] flex items-center justify-center text-xs font-bold text-white shrink-0">
                    {item.num}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-0.5">{item.title}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up-delay-3">
            <Link
              href="/"
              className="btn-primary w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-xs text-center flex items-center justify-center gap-2"
            >
              <span>Back to Home</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-900" />
            </Link>
            
            <button
              onClick={handleShare}
              className="btn-secondary w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Assessment</span>
                </>
              )}
            </button>
          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#090a0c] text-zinc-100 relative">
      
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none bg-grid-dark opacity-35" />

      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-[#090a0c]/85 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <ForgeLogo size="sm" showText={true} />
          </Link>
          
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
            <span>Confidential Assessment</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-22 pb-20 relative z-10">
        
        {/* Progress Tracker */}
        <div className="mb-7">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono font-semibold text-zinc-400 uppercase tracking-widest">Progress</span>
            <span className="text-xs font-mono font-bold text-zinc-300">{progressPct}%</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300 ease-out rounded-full" 
              style={{ width: `${progressPct}%` }} 
            />
          </div>
        </div>
        
        {/* Main Survey Card */}
        <div className="bento-card rounded-2xl p-6 sm:p-8 border border-white/[0.08]">
          
          {/* ─── STEP 1: Core Identity ─── */}
          {step === 1 && (
            <div className="animate-fade-up">
              <StepHeader 
                stepNum={1} 
                totalSteps={totalSteps} 
                title="Let's get to know you" 
                subtitle="Help us understand your background to match you with the right cohort." 
              />
              
              <div className="space-y-7">
                <div>
                  <QuestionLabel>What is your age range?</QuestionLabel>
                  {['Under 16', '16–20', '21–25', '26–30', '31+'].map(a => (
                    <OptionButton 
                      key={a} 
                      label={a} 
                      isSelected={ageRange === a} 
                      onClick={() => setAgeRange(a)} 
                    />
                  ))}
                </div>

                <div>
                  <QuestionLabel>What best describes your current career stage?</QuestionLabel>
                  {[
                    'Secondary school student', 
                    'Undergraduate', 
                    'Graduate / NYSC', 
                    'Employed professional', 
                    'Entrepreneur / business owner', 
                    'Freelancer', 
                    'Other'
                  ].map(r => (
                    <OptionButton 
                      key={r} 
                      label={r} 
                      isSelected={role === r} 
                      onClick={() => setRole(r)} 
                    />
                  ))}
                </div>

                <div>
                  <QuestionLabel>What is your relationship with Living Seeds Church?</QuestionLabel>
                  {['Member', 'Worker', 'HOD', 'Visitor / Non-Member'].map(y => (
                    <OptionButton 
                      key={y} 
                      label={y} 
                      isSelected={churchStatus === y} 
                      onClick={() => setChurchStatus(y)} 
                    />
                  ))}
                </div>

                <div>
                  <QuestionLabel>What is your primary focus right now?</QuestionLabel>
                  {['Education', 'Career growth', 'Skill acquisition', 'Entrepreneurship', 'Leadership', 'Still figuring things out'].map(f => (
                    <OptionButton 
                      key={f} 
                      label={f} 
                      isSelected={currentFocus === f} 
                      onClick={() => setCurrentFocus(f)} 
                    />
                  ))}
                </div>

                <div>
                  <QuestionLabel>Are you open to growing in more than one area?</QuestionLabel>
                  {['Yes', 'No', 'Maybe later'].map(o => (
                    <OptionButton 
                      key={o} 
                      label={o} 
                      isSelected={openToMultiple === o} 
                      onClick={() => setOpenToMultiple(o)} 
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 2: Background ─── */}
          {step === 2 && (
            <div className="animate-fade-up">
              <StepHeader 
                stepNum={2} 
                totalSteps={totalSteps} 
                title="Your Background" 
                subtitle="Provide details regarding your current academic or professional context." 
              />
              <div className="space-y-5">
                {(isUnder16 || isSecSchool) && (
                  <>
                    <TextInput 
                      label="Current School Level" 
                      placeholder="e.g. SS2, JSS3, High School" 
                      value={formData.school_level} 
                      onChange={(e) => updateForm('school_level', e.target.value)} 
                    />
                    <TextInput 
                      label="Favorite Subjects or Interests" 
                      placeholder="e.g. Mathematics, Creative Arts, Biology" 
                      value={formData.favorite_subjects?.[0]} 
                      onChange={(e) => updateForm('favorite_subjects', [e.target.value])} 
                    />
                    <TextInput 
                      label="Aspirational Career / Dream Role" 
                      placeholder="e.g. Software Engineer, Medical Doctor, Architect" 
                      value={formData.want_to_become} 
                      onChange={(e) => updateForm('want_to_become', e.target.value)} 
                    />
                  </>
                )}
                {isUndergrad && (
                  <>
                    <TextInput 
                      label="University / Institution" 
                      placeholder="e.g. University of Lagos, Covenant University" 
                      value={formData.school_level} 
                      onChange={(e) => updateForm('school_level', e.target.value)} 
                    />
                    <TextInput 
                      label="Course of Study" 
                      placeholder="e.g. Computer Science, Accounting, Law" 
                      value={formData.course_of_study} 
                      onChange={(e) => updateForm('course_of_study', e.target.value)} 
                    />
                    <div>
                      <QuestionLabel>Are you satisfied with your current course?</QuestionLabel>
                      {['Yes', 'No', 'Not sure'].map(o => (
                        <OptionButton 
                          key={o} 
                          label={o} 
                          isSelected={formData.satisfied_course === o} 
                          onClick={() => updateForm('satisfied_course', o)} 
                        />
                      ))}
                    </div>
                  </>
                )}
                {(isGrad || isEmployed) && (
                  <>
                    <TextInput 
                      label={isEmployed ? "Industry you work in" : "Discipline studied"} 
                      placeholder="e.g. Financial Services, Tech, Healthcare" 
                      value={formData.industry} 
                      onChange={(e) => updateForm('industry', e.target.value)} 
                    />
                    <TextInput 
                      label="Current Job Title / Role" 
                      placeholder="e.g. Product Manager, Analyst, Associate" 
                      value={formData.job_role} 
                      onChange={(e) => updateForm('job_role', e.target.value)} 
                    />
                  </>
                )}
                {isEntrepreneur && (
                  <>
                    <TextInput 
                      label="What is your business type / sector?" 
                      placeholder="e.g. Digital Agency, Fashion Brand, SaaS" 
                      value={formData.business_type} 
                      onChange={(e) => updateForm('business_type', e.target.value)} 
                    />
                    <TextInput 
                      label="What is your biggest current business challenge?" 
                      placeholder="e.g. Client acquisition, Hiring, Marketing" 
                      value={formData.biggest_challenge} 
                      onChange={(e) => updateForm('biggest_challenge', e.target.value)} 
                    />
                  </>
                )}
              </div>
            </div>
          )}

          {/* ─── STEP 3: Career & Skills ─── */}
          {step === 3 && (
            <div className="animate-fade-up">
              <StepHeader 
                stepNum={3} 
                totalSteps={totalSteps} 
                title="Career Direction & Skills" 
                subtitle="Tell us how you envision your professional trajectory and learning." 
              />
              <div className="space-y-5">
                {(isAdult || isTeen) && !isUnder16 && (
                  <>
                    <div>
                      <QuestionLabel>Which best describes your alignment with your primary field?</QuestionLabel>
                      {[
                        'I want to stay fully in my field', 
                        'I want to combine it with another skill', 
                        'I want to transition into another field', 
                        'I am still figuring things out'
                      ].map(o => (
                        <OptionButton 
                          key={o} 
                          label={o} 
                          isSelected={formData.course_relationship === o} 
                          onClick={() => updateForm('course_relationship', o)} 
                        />
                      ))}
                    </div>
                    
                    <div className="pt-3 border-t border-white/[0.06]">
                      <QuestionLabel>Are you currently learning any skill outside your primary field?</QuestionLabel>
                      {['Yes', 'No'].map(o => (
                        <OptionButton 
                          key={o} 
                          label={o} 
                          isSelected={formData.learning_skill === o} 
                          onClick={() => updateForm('learning_skill', o)} 
                        />
                      ))}
                    </div>
                    
                    {formData.learning_skill === 'Yes' && (
                      <div className="p-4 rounded-xl bg-zinc-900 border border-white/[0.08] animate-fade-up">
                        <TextInput 
                          label="Which skill(s) are you currently exploring?" 
                          placeholder="e.g. Product Design, Data Analytics, Web Development" 
                          value={formData.skill_learning} 
                          onChange={(e) => updateForm('skill_learning', e.target.value)} 
                        />
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
              <StepHeader 
                stepNum={4} 
                totalSteps={totalSteps} 
                title="Support Requisites" 
                subtitle="Select the areas where the Forge Hub can accelerate your advancement." 
              />

              <div className="space-y-5">
                {isAdult && (
                  <>
                    <div>
                      <QuestionLabel>Do you have an active and optimized LinkedIn profile?</QuestionLabel>
                      {['Yes, it is updated', 'No, I need help optimizing it'].map(o => (
                        <OptionButton 
                          key={o} 
                          label={o} 
                          isSelected={formData.linkedin_status === o} 
                          onClick={() => updateForm('linkedin_status', o)} 
                        />
                      ))}
                    </div>
                    <div>
                      <QuestionLabel>Do you have a current CV/Resume?</QuestionLabel>
                      {['Yes, but needs professional review', 'Yes, it is ready', 'No, I need to create one'].map(o => (
                        <OptionButton 
                          key={o} 
                          label={o} 
                          isSelected={formData.cv_status === o} 
                          onClick={() => updateForm('cv_status', o)} 
                        />
                      ))}
                    </div>
                  </>
                )}
                <div className="pt-2">
                  <QuestionLabel>What kind of support do you need most? (Select all that apply)</QuestionLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2">
                    {[
                      'Career clarity', 
                      '1:1 Mentorship', 
                      'Skill acquisition', 
                      'Personal branding', 
                      'LinkedIn optimization', 
                      'CV & portfolio review', 
                      'Interview preparation', 
                      'Leadership development', 
                      'Academic support', 
                      'Business & Entrepreneurship'
                    ].map(o => (
                      <OptionButton 
                        key={o} 
                        label={o} 
                        type="checkbox" 
                        isSelected={(formData.support_needed || []).includes(o)} 
                        onClick={() => toggleArray('support_needed', o)} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 5: Mentorship & Contact Details ─── */}
          {step === 5 && (
            <div className="animate-fade-up">
              <StepHeader 
                stepNum={5} 
                totalSteps={totalSteps} 
                title="Mentorship & Contact Details" 
                subtitle="Provide your contact information so we can reach you with your cohort placement." 
              />
              <div className="space-y-5">
                <div>
                  <QuestionLabel>Would you like to be paired with a mentor?</QuestionLabel>
                  {['Yes', 'No'].map(o => (
                    <OptionButton 
                      key={o} 
                      label={o} 
                      isSelected={formData.want_mentorship === o} 
                      onClick={() => updateForm('want_mentorship', o)} 
                    />
                  ))}
                </div>

                {formData.want_mentorship === 'Yes' && (
                  <div className="p-4 rounded-xl bg-zinc-900 border border-white/[0.08] animate-fade-up">
                    <QuestionLabel>Select areas of mentorship interest</QuestionLabel>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2">
                      {['Career Progression', 'Academics', 'Leadership', 'Business Strategy', 'Technical Skills', 'Transitioning Fields'].map(o => (
                        <OptionButton 
                          key={o} 
                          label={o} 
                          type="checkbox" 
                          isSelected={(formData.mentorship_area || []).includes(o)} 
                          onClick={() => toggleArray('mentorship_area', o)} 
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <QuestionLabel>Would you like to join a peer community in your field?</QuestionLabel>
                  {['Yes', 'No'].map(o => (
                    <OptionButton 
                      key={o} 
                      label={o} 
                      isSelected={formData.want_community === o} 
                      onClick={() => updateForm('want_community', o)} 
                    />
                  ))}
                </div>

                <div className="pt-5 border-t border-white/[0.06]">
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Your Contact Details</p>
                  <TextInput 
                    label="Full Name" 
                    placeholder="e.g. John Doe" 
                    value={formData.name} 
                    onChange={(e) => updateForm('name', e.target.value)} 
                  />
                  <TextInput 
                    label="Email Address" 
                    type="email" 
                    placeholder="e.g. john@example.com" 
                    value={formData.email} 
                    onChange={(e) => updateForm('email', e.target.value)} 
                  />
                  <TextInput 
                    label="Phone / WhatsApp Number" 
                    type="tel" 
                    placeholder="e.g. +234 801 234 5678" 
                    value={formData.phone} 
                    onChange={(e) => updateForm('phone', e.target.value)} 
                  />
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 6: Outsider Connect ─── */}
          {step === 6 && (
            <div className="animate-fade-up">
              <StepHeader 
                stepNum={6} 
                totalSteps={totalSteps} 
                title="Stay Connected" 
                subtitle="We are delighted to welcome visitors into our Forge community." 
              />
              <div className="space-y-5">
                <TextInput 
                  label="How did you hear about Forge Hub?" 
                  placeholder="e.g. Friend, Social Media, Church Event" 
                  value={formData.how_heard} 
                  onChange={(e) => updateForm('how_heard', e.target.value)} 
                />
                <TextInput 
                  label="What attracted you most to this initiative?" 
                  placeholder="e.g. Mentorship, Skill tracks, Community" 
                  value={formData.what_attracted} 
                  onChange={(e) => updateForm('what_attracted', e.target.value)} 
                />
                <div>
                  <QuestionLabel>Would you like to receive updates on upcoming church & community events?</QuestionLabel>
                  {['Yes', 'No'].map(o => (
                    <OptionButton 
                      key={o} 
                      label={o} 
                      isSelected={formData.stay_connected === o} 
                      onClick={() => updateForm('stay_connected', o)} 
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── Navigation Controls ─── */}
          <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between gap-3">
            <button 
              type="button"
              onClick={handleBack} 
              className="btn-secondary px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            
            <button 
              type="button"
              onClick={handleNext} 
              disabled={submitting || !canProceed()} 
              className={`px-6 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                submitting || !canProceed() 
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/[0.04]' 
                  : 'btn-primary'
              }`}
            >
              {submitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  <span>Submitting...</span>
                </>
              ) : (step === totalSteps || (isUnder16 && step === 2)) ? (
                <>
                  <span>Submit Assessment</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </main>
  );
}
