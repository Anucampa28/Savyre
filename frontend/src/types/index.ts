// Shared types for the assessment portal

export interface Question {
  id: number;
  title: string;
  description: string;
  buggy_snippet: string;
  what_wrong: string;
  fix_outline: string;
  difficulty_level: string;
  category: string;
  estimated_duration: number;
  programming_language?: string;
  tags?: string[];
}

export interface AssessmentQuestion {
  id: number;
  question_id: number;
  order: number;
  points: number;
  custom_duration?: number;
  question: Question;
}

export interface Assessment {
  id: number;
  title: string;
  description: string;
  creator_id: number;
  shareable_link: string;
  programming_language: string;
  difficulty_level: string;
  total_duration: number;
  max_score: number;
  is_template: boolean;
  created_at: string;
  updated_at?: string;
  questions: AssessmentQuestion[];
}

export interface AssessmentForm {
  title: string;
  description: string;
  programming_language: string;
  difficulty_level: string;
  is_template: boolean;
}

export interface AssessmentAttempt {
  id: number;
  assessment_id: number;
  candidate_email: string;
  candidate_name?: string;
  started_at: string;
  completed_at?: string;
  total_score?: number;
  max_score: number;
  status: string;
}
