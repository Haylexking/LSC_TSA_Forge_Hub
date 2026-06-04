'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
// import { submitSurvey } from './actions';

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

function OptionButton({
  label,
  isSelected,
  onClick,
  type = 'radio',
}: {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  type?: 'radio' | 'checkbox';
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full p-4 mb-3 rounded-xl border-2 text-left transition-all duration-200 flex items-center justify-between group
        ${isSelected
          ? 'border-blue-600 bg-blue-50/50'
          : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
        }`}
    >
      <span className="font-medium text-slate-700">{label}</span>
      <div className={`w-5 h-5 flex items-center justify-center transition-colors border-2
        ${type === 'radio' ? 'rounded-full' : 'rounded'}
        ${isSelected ? 'border-blue-600' : 'border-slate-300'}
        ${isSelected && type === 'checkbox' ? 'bg-blue-600' : ''}
      `}>
        {isSelected && type === 'radio' && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
        {isSelected && type === 'checkbox' && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    </button>
  );
}

export default function SurveyPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [submitting, setSubmitting] = useState(false);

  // ─── Q1-Q5: Entry / Routing ─────────────────────────────
  const [ageRange, setAgeRange] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isMember, setIsMember] = useState<string | null>(null);
  const [currentFocus, setCurrentFocus] = useState<string | null>(null);
  const [openToMultiple, setOpenToMultiple] = useState<string | null>(null);

  // ─── Conditional: Under 16 ──────────────────────────────
  const [schoolLevel, setSchoolLevel] = useState<string | null>(null);
  const [favoriteSubjects, setFavoriteSubjects] = useState<string[]>([]);
  const [enjoyDoing, setEnjoyDoing] = useState<string[]>([]);
  const [wantToBecome, setWantToBecome] = useState<string | null>(null);
  const [curiousSkill, setCuriousSkill] = useState<string | null>(null);
  const [joinNextgen, setJoinNextgen] = useState<string | null>(null);

  // ─── Conditional: 16-20 / Student / Professional ─────────
  const [courseOfStudy, setCourseOfStudy] = useState<string>('');
  const [knowDirection, setKnowDirection] = useState<string | null>(null);
  const [wantSkill, setWantSkill] = useState<string | null>(null);
  const [wantCareerDirection, setWantCareerDirection] = useState<string | null>(null);
  const [wantMentorship, setWantMentorship] = useState<string | null>(null);
  
  // ─── Conditional: Professional / Grad / Employed ─────────
  const [workStatus, setWorkStatus] = useState<string | null>(null);
  const [careerDirection, setCareerDirection] = useState<string | null>(null);
  const [skillGaps, setSkillGaps] = useState<string[]>([]);
  const [linkedinStatus, setLinkedinStatus] = useState<string | null>(null);
  const [cvStatus, setCvStatus] = useState<string | null>(null);
  const [portfolioStatus, setPortfolioStatus] = useState<string | null>(null);
  
  // ─── Conditional: Career Path Logic ──────────────────────
  const [courseRelationship, setCourseRelationship] = useState<string | null>(null);
  const [learningSkill, setLearningSkill] = useState<string | null>(null);
  const [skillLearning, setSkillLearning] = useState<string>('');
  const [wantToLearnSkill, setWantToLearnSkill] = useState<string | null>(null);

  // ─── Conditional: Tools & Support ────────────────────────
  const [supportNeeded, setSupportNeeded] = useState<string[]>([]);

  // ─── Conditional: Field-specific & Mentorship ────────────
  const [fieldSpecificSupport, setFieldSpecificSupport] = useState<string | null>(null);
  const [mentorshipArea, setMentorshipArea] = useState<string[]>([]);
  const [mentorshipPreference, setMentorshipPreference] = useState<string | null>(null);
  const [wantCommunity, setWantCommunity] = useState<string | null>(null);
  const [communityType, setCommunityType] = useState<string | null>(null);

  // ─── Outsider Logic ──────────────────────────────────────
  const [howHeard, setHowHeard] = useState<string>('');
  const [whatAttracted, setWhatAttracted] = useState<string>('');
  const [stayConnected, setStayConnected] = useState<string | null>(null);

  // ─── Constants ───────────────────────────────────────────
  const ages = ['Under 16', '16–20', '21–25', '26–30', '31+'];
  const roles = ['Secondary school student', 'Undergraduate', 'Graduate / NYSC', 'Employed professional', 'Entrepreneur / business owner', 'Freelancer', 'HOD / church worker', 'Other'];
  const yesNo = ['Yes', 'No'];
  const focuses = ['Education', 'Career growth', 'Skill acquisition', 'Entrepreneurship', 'Leadership', 'Still figuring things out'];
  const openToMultiples = ['Yes', 'No', 'Maybe later'];

  // Logic flags
  const isUnder16 = ageRange === 'Under 16';
  const isTeen = ageRange === '16–20';
  const isAdult = !isUnder16 && !isTeen && ageRange !== null;
  const isOutsider = isMember === 'No';

  const isSecSchool = role === 'Secondary school student';
  const isUndergrad = role === 'Undergraduate';
  const isGrad = role === 'Graduate / NYSC';
  const isEmployed = role === 'Employed professional';
  const isEntrepreneur = role === 'Entrepreneur / business owner';
  const isFreelancer = role === 'Freelancer';
  const isWorker = role === 'HOD / church worker';

  // ─── Handlers ─────────────────────────────────────────────
  const toggleSelection = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setter(prev => prev.includes(value) ? prev.filter(i => i !== value) : [...prev, value]);
  };

  const handleNext = () => {
    // Basic validation per step can go here
    if (step === 1 && (!ageRange || !role || !isMember || !currentFocus || !openToMultiple)) return;

    // Routing Logic based on Step
    if (step === 1) {
      if (isUnder16) setStep(2); // Teen path
      else if (isTeen || isSecSchool) setStep(3); // 16-20 Student path
      else setStep(4); // Adult path
    } else if (step === 2 || step === 3 || step === 4) {
      setStep(5); // Education/Career logic
    } else if (step === 5) {
      setStep(6); // Skill logic
    } else if (step === 6) {
      setStep(7); // Support Needs & Tools
    } else if (step === 7) {
      setStep(8); // Mentorship / Community
    } else if (step === 8) {
      if (isOutsider) setStep(9);
      else submitData();
    } else if (step === 9) {
      submitData();
    }
  };

  const handleBack = () => {
    if (step === 1) router.push('/');
    if (step === 2 || step === 3 || step === 4) setStep(1);
    if (step === 5) {
      if (isUnder16) setStep(2);
      else if (isTeen || isSecSchool) setStep(3);
      else setStep(4);
    }
    if (step === 6) setStep(5);
    if (step === 7) setStep(6);
    if (step === 8) setStep(7);
    if (step === 9) setStep(8);
  };

  const submitData = async () => {
    setSubmitting(true);
    // TODO: Connect to server action
    setSubmitting(false);
    router.push('/survey/thank-you');
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-16 pb-20">
      <div className="max-w-2xl mx-auto px-4">
        
        {/* Form Card */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100">
          
          {/* STEP 1: Routing */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold mb-6">Let&apos;s get to know you</h2>
              
              <div className="space-y-6">
                <div>
                  <p className="font-bold mb-3">Age Range</p>
                  {ages.map(a => <OptionButton key={a} label={a} isSelected={ageRange === a} onClick={() => setAgeRange(a)} />)}
                </div>

                <div>
                  <p className="font-bold mb-3">What best describes you?</p>
                  {roles.map(r => <OptionButton key={r} label={r} isSelected={role === r} onClick={() => setRole(r)} />)}
                </div>

                <div>
                  <p className="font-bold mb-3">Are you a member of Living Seeds Church?</p>
                  {yesNo.map(y => <OptionButton key={y} label={y} isSelected={isMember === y} onClick={() => setIsMember(y)} />)}
                </div>

                <div>
                  <p className="font-bold mb-3">What is your current focus right now?</p>
                  {focuses.map(f => <OptionButton key={f} label={f} isSelected={currentFocus === f} onClick={() => setCurrentFocus(f)} />)}
                </div>

                <div>
                  <p className="font-bold mb-3">Are you open to growing in more than one area?</p>
                  {openToMultiples.map(o => <OptionButton key={o} label={o} isSelected={openToMultiple === o} onClick={() => setOpenToMultiple(o)} />)}
                </div>
              </div>
            </div>
          )}

          {/* Further steps will go here based on conditions... */}
          {step > 1 && (
            <div className="text-center py-20 text-slate-500">
              [Survey logic continuation under construction]
            </div>
          )}

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-slate-50 flex items-center justify-between gap-4">
            <button onClick={handleBack} className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-800">
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
            <button onClick={handleNext} disabled={submitting} className="px-10 py-4 font-bold rounded-2xl bg-black text-white hover:bg-slate-900 transition-all shadow-lg flex items-center justify-center gap-2">
              {submitting ? 'Submitting...' : 'Continue'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}
