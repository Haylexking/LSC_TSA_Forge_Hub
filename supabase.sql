-- SQL script to create the forge_survey_responses table
CREATE TABLE forge_survey_responses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  age_range text,
  role text,
  is_member text,
  current_focus text,
  open_to_multiple text,
  
  -- Student / Under 16 / Academic specific
  school_level text,
  favorite_subjects text[],
  enjoy_doing text[],
  want_to_become text,
  curious_skill text,
  join_nextgen text,
  course_of_study text,
  know_direction text,
  want_skill text,
  want_career_direction text,
  want_mentorship text,
  course_relationship text,
  satisfied_course text,
  skill_outside_course text,
  want_professional_profile text,
  
  -- Professional / Graduate specific
  work_status text,
  career_direction text,
  skill_gaps text[],
  linkedin_status text,
  cv_status text,
  portfolio_status text,
  industry text,
  job_role text,
  years_experience text,
  remain_in_field text,
  grow_leadership text,
  
  -- Entrepreneur / Freelancer specific
  business_type text,
  years_in_business text,
  biggest_challenge text,
  want_business_support text,
  freelance_skill text,
  freelance_years text,
  
  -- Worker / HOD specific
  department text,
  years_of_service text,
  
  -- Skills and Support
  learning_skill text,
  skill_learning text,
  want_to_learn_skill text,
  support_needed text[],
  
  -- Mentorship & Community
  field_specific_support text,
  mentorship_area text[],
  mentorship_preference text,
  want_community text,
  community_type text,
  
  -- Outsiders
  how_heard text,
  what_attracted text,
  stay_connected text,
  
  -- Contact (optional)
  email text,
  phone text,
  name text,
  
  -- Categorized Segment (e.g. "Teen", "Undergrad", "Professional", "Entrepreneur")
  user_segment text
);

-- Enable RLS and setup policies
ALTER TABLE forge_survey_responses ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Allow anonymous inserts" ON forge_survey_responses
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated users (admins) can view
CREATE POLICY "Allow authenticated read access" ON forge_survey_responses
  FOR SELECT
  USING (auth.role() = 'authenticated');
