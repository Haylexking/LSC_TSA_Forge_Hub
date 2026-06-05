'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Compass, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { submitSurvey } from './actions';

// Option Button Component
function OptionButton({ label, isSelected, onClick, type = 'radio' }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full p-5 mb-3 rounded-2xl border-2 text-left transition-all duration-200 flex items-center justify-between group
        ${isSelected 
          ? 'border-blue-600 bg-blue-50/50 shadow-sm' 
          : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'}`}
    >
      <span className={`font-medium ${isSelected ? 'text-blue-900' : 'text-slate-700'}`}>{label}</span>
      <div className={`w-5 h-5 flex items-center justify-center transition-all duration-200 border-2
        ${type === 'radio' ? 'rounded-full' : 'rounded'}
        ${isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300 group-hover:border-slate-400'}`}>
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

// Reusable Input
function TextInput({ placeholder, value, onChange, type = "text" }: any) {
  return (
    <input 
      type={type}
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-5 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-800 bg-slate-50/50 mb-3"
    />
  );
}

export default function SurveyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

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

  const progressPct = Math.round(((step - 1) / totalSteps) * 100) || 15;

  const canProceed = () => {
    if (step === 1) return ageRange && role && churchStatus && currentFocus && openToMultiple;
    return true; // Simplified validation for following steps
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
    if(res.success) router.push('/'); // Or redirect to a thank you page
    else alert('Error: ' + res.error);
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-16 pb-20 text-slate-800">
      <div className="max-w-2xl mx-auto px-4">
        
        {/* Progress Bar */}
        <div className="mb-10 animate-in fade-in">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Your Progress</span>
            <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full uppercase tracking-widest">
              {progressPct}% Complete
            </span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 transition-all duration-700 ease-out" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
        
        {/* Form Card */}
        <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-xl shadow-slate-200/40 border border-slate-100">
          
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight mb-2">Let&apos;s get to know you</h2>
                <p className="text-slate-500">Help us tailor the perfect Forge Hub pathway for you.</p>
              </div>
              
              <div className="space-y-8">
                <div>
                  <p className="font-bold text-slate-900 mb-4 text-lg">Age Range</p>
                  {['Under 16', '16–20', '21–25', '26–30', '31+'].map(a => <OptionButton key={a} label={a} isSelected={ageRange === a} onClick={() => setAgeRange(a)} />)}
                </div>

                <div>
                  <p className="font-bold text-slate-900 mb-4 text-lg">What best describes your current career stage?</p>
                  {['Secondary school student', 'Undergraduate', 'Graduate / NYSC', 'Employed professional', 'Entrepreneur / business owner', 'Freelancer', 'Other'].map(r => <OptionButton key={r} label={r} isSelected={role === r} onClick={() => setRole(r)} />)}
                </div>

                <div>
                  <p className="font-bold text-slate-900 mb-4 text-lg">What is your relationship with Living Seeds Church?</p>
                  {['Member', 'Worker', 'HOD', 'Visitor / Non-Member'].map(y => <OptionButton key={y} label={y} isSelected={churchStatus === y} onClick={() => setChurchStatus(y)} />)}
                </div>

                <div>
                  <p className="font-bold text-slate-900 mb-4 text-lg">What is your current focus right now?</p>
                  {['Education', 'Career growth', 'Skill acquisition', 'Entrepreneurship', 'Leadership', 'Still figuring things out'].map(f => <OptionButton key={f} label={f} isSelected={currentFocus === f} onClick={() => setCurrentFocus(f)} />)}
                </div>

                <div>
                  <p className="font-bold text-slate-900 mb-4 text-lg">Are you open to growing in more than one area?</p>
                  {['Yes', 'No', 'Maybe later'].map(o => <OptionButton key={o} label={o} isSelected={openToMultiple === o} onClick={() => setOpenToMultiple(o)} />)}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight mb-2">Your Background</h2>
                <p className="text-slate-500">Tell us a bit about your current stage.</p>
              </div>
              <div className="space-y-8">
                {(isUnder16 || isSecSchool) && (
                  <>
                    <div>
                       <p className="font-bold mb-3 text-slate-900">Current School Level</p>
                       <TextInput placeholder="e.g. SS2, JSS3" value={formData.school_level} onChange={(e:any) => updateForm('school_level', e.target.value)} />
                    </div>
                    <div>
                       <p className="font-bold mb-3 text-slate-900">What subjects do you like?</p>
                       <TextInput placeholder="e.g. Mathematics, Biology" value={formData.favorite_subjects?.[0]} onChange={(e:any) => updateForm('favorite_subjects', [e.target.value])} />
                    </div>
                    <div>
                       <p className="font-bold mb-3 text-slate-900">What do you want to become?</p>
                       <TextInput placeholder="e.g. Engineer, Doctor" value={formData.want_to_become} onChange={(e:any) => updateForm('want_to_become', e.target.value)} />
                    </div>
                  </>
                )}
                {isUndergrad && (
                  <>
                    <div>
                      <p className="font-bold mb-3 text-slate-900">University / Institution</p>
                      <TextInput placeholder="Where do you study?" value={formData.school_level} onChange={(e:any) => updateForm('school_level', e.target.value)} />
                    </div>
                    <div>
                      <p className="font-bold mb-3 text-slate-900">Course of Study</p>
                      <TextInput placeholder="What are you studying?" value={formData.course_of_study} onChange={(e:any) => updateForm('course_of_study', e.target.value)} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 mb-4 text-lg">Are you satisfied with your course?</p>
                      {['Yes', 'No', 'Not sure'].map(o => <OptionButton key={o} label={o} isSelected={formData.satisfied_course === o} onClick={() => updateForm('satisfied_course', o)} />)}
                    </div>
                  </>
                )}
                {(isGrad || isEmployed) && (
                  <>
                    <div>
                      <p className="font-bold mb-3 text-slate-900">{isEmployed ? "Industry you work in" : "Course studied"}</p>
                      <TextInput placeholder="e.g. Tech, Healthcare" value={formData.industry} onChange={(e:any) => updateForm('industry', e.target.value)} />
                    </div>
                    <div>
                      <p className="font-bold mb-3 text-slate-900">Current Role</p>
                      <TextInput placeholder="e.g. Software Engineer" value={formData.job_role} onChange={(e:any) => updateForm('job_role', e.target.value)} />
                    </div>
                  </>
                )}
                {isEntrepreneur && (
                  <>
                    <div>
                      <p className="font-bold mb-3 text-slate-900">What is your business type?</p>
                      <TextInput placeholder="e.g. E-commerce, Agency" value={formData.business_type} onChange={(e:any) => updateForm('business_type', e.target.value)} />
                    </div>
                    <div>
                      <p className="font-bold mb-3 text-slate-900">Biggest business challenge?</p>
                      <TextInput placeholder="e.g. Scaling, Marketing" value={formData.biggest_challenge} onChange={(e:any) => updateForm('biggest_challenge', e.target.value)} />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight mb-2">Career & Skills</h2>
                <p className="text-slate-500">How do you envision your professional growth?</p>
              </div>
              <div className="space-y-8">
                {(isAdult || isTeen) && !isUnder16 && (
                  <>
                    <div>
                      <p className="font-bold text-slate-900 mb-4 text-lg">Which best describes your relationship with your course/field?</p>
                      {['I want to stay fully in my field', 'I want to combine it with another skill', 'I want to transition into another field', 'I’m still trying to figure things out'].map(o => <OptionButton key={o} label={o} isSelected={formData.course_relationship === o} onClick={() => updateForm('course_relationship', o)} />)}
                    </div>
                    
                    <div className="pt-6 border-t border-slate-100">
                      <p className="font-bold text-slate-900 mb-4 text-lg">Are you currently learning any skill outside your course/career?</p>
                      {['Yes', 'No'].map(o => <OptionButton key={o} label={o} isSelected={formData.learning_skill === o} onClick={() => updateForm('learning_skill', o)} />)}
                    </div>
                    
                    {formData.learning_skill === 'Yes' && (
                      <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 animate-in fade-in">
                        <p className="font-bold mb-3 text-slate-900">Which skill(s)?</p>
                        <TextInput placeholder="e.g. UI/UX Design, Data Analysis" value={formData.skill_learning} onChange={(e:any) => updateForm('skill_learning', e.target.value)} />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight mb-2">Support Needs</h2>
                <p className="text-slate-500">Let us know exactly where we can help.</p>
              </div>

              {/* Informational Banner */}
              <div className="bg-slate-900 rounded-2xl p-6 mb-8 text-white shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 p-2 rounded-xl">
                    <Compass className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Targeted Support</h4>
                    <p className="text-slate-300 leading-relaxed text-sm">
                      We use this data to group you into specialized cohorts, ensuring you get the exact resources, mentors, and challenges you need.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {isAdult && (
                  <>
                    <div>
                      <p className="font-bold text-slate-900 mb-4 text-lg">Do you have an optimized LinkedIn profile?</p>
                      {['Yes, it is good', 'No, I need help with it'].map(o => <OptionButton key={o} label={o} isSelected={formData.linkedin_status === o} onClick={() => updateForm('linkedin_status', o)} />)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 mb-4 text-lg">Do you have a CV/Resume?</p>
                      {['Yes, but needs review', 'Yes, it is fine', 'No, I need to create one'].map(o => <OptionButton key={o} label={o} isSelected={formData.cv_status === o} onClick={() => updateForm('cv_status', o)} />)}
                    </div>
                  </>
                )}
                <div className="pt-4">
                  <p className="font-bold text-slate-900 mb-4 text-lg">What kind of support do you need most right now? (Select any)</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                    {['Career clarity', 'Mentorship', 'Skill acquisition', 'Personal branding', 'LinkedIn optimization', 'CV/resume support', 'Interview preparation', 'Leadership development', 'Academic support', 'Entrepreneurship'].map(o => (
                      <OptionButton key={o} label={o} type="checkbox" isSelected={(formData.support_needed || []).includes(o)} onClick={() => toggleArray('support_needed', o)} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight mb-2">Mentorship & Connection</h2>
                <p className="text-slate-500">Forge Hub is built on strong communities.</p>
              </div>
              <div className="space-y-8">
                <div>
                  <p className="font-bold text-slate-900 mb-4 text-lg">Would you like a mentor?</p>
                  {['Yes', 'No'].map(o => <OptionButton key={o} label={o} isSelected={formData.want_mentorship === o} onClick={() => updateForm('want_mentorship', o)} />)}
                </div>
                {formData.want_mentorship === 'Yes' && (
                  <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 animate-in fade-in">
                    <p className="font-bold text-slate-900 mb-4">What area do you want mentorship in?</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                      {['Career', 'Academics', 'Leadership', 'Business', 'Skills', 'Ministry', 'Transitioning fields'].map(o => <OptionButton key={o} label={o} type="checkbox" isSelected={(formData.mentorship_area || []).includes(o)} onClick={() => toggleArray('mentorship_area', o)} />)}
                    </div>
                  </div>
                )}
                <div>
                  <p className="font-bold text-slate-900 mb-4 text-lg">Would you like to be part of a community of people in your field?</p>
                  {['Yes', 'No'].map(o => <OptionButton key={o} label={o} isSelected={formData.want_community === o} onClick={() => updateForm('want_community', o)} />)}
                </div>

                <div className="pt-8 border-t border-slate-100">
                   <h3 className="font-bold text-xl mb-4">Your details</h3>
                   <p className="text-slate-500 text-sm mb-6">Leave your details so we can align you with your requested pathways.</p>
                   <TextInput placeholder="Full Name" value={formData.name} onChange={(e:any) => updateForm('name', e.target.value)} />
                   <TextInput type="email" placeholder="Email Address" value={formData.email} onChange={(e:any) => updateForm('email', e.target.value)} />
                   <TextInput type="tel" placeholder="Phone / WhatsApp Number" value={formData.phone} onChange={(e:any) => updateForm('phone', e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight mb-2">Stay Connected</h2>
                <p className="text-slate-500">We love having new people in our ecosystem.</p>
              </div>
              <div className="space-y-8">
                <div>
                  <p className="font-bold mb-3 text-slate-900">How did you hear about Forge?</p>
                  <TextInput placeholder="e.g. Friend, Social Media" value={formData.how_heard} onChange={(e:any) => updateForm('how_heard', e.target.value)} />
                </div>
                <div>
                  <p className="font-bold mb-3 text-slate-900">What attracted you?</p>
                  <TextInput placeholder="e.g. Mentorship programs" value={formData.what_attracted} onChange={(e:any) => updateForm('what_attracted', e.target.value)} />
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <p className="font-bold text-slate-900 mb-4 text-lg">Are you open to church/community updates?</p>
                  {['Yes', 'No'].map(o => <OptionButton key={o} label={o} isSelected={formData.stay_connected === o} onClick={() => updateForm('stay_connected', o)} />)}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between gap-4">
            <button onClick={handleBack} className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-800 px-4 py-2 transition-colors">
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
            <button 
              onClick={handleNext} 
              disabled={submitting || !canProceed()} 
              className={`px-10 py-4 font-bold rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2
                ${submitting || !canProceed() ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/30'}
              `}
            >
              {submitting ? 'Submitting...' : (step === totalSteps || (isUnder16 && step === 2) ? 'Submit Survey' : 'Continue')}
              {(!submitting && step !== totalSteps && !(isUnder16 && step === 2)) && <ChevronRight className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Security Badges */}
        <div className="mt-8 text-center flex items-center justify-center gap-6">
          <div className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Secure Data</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Compass className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Personalized Path</span>
          </div>
        </div>

      </div>
    </main>
  );
}
