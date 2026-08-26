export type QuizSelectType = 'single' | 'multiple';

export interface QuizOption {
  id: string;
  text: string;
  correct: boolean;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice';
  prompt: string;
  select: QuizSelectType;
  options: QuizOption[];
  explanation: string;
  lesson_anchor: string;
  source_ids: string[];
}

export interface ModuleData {
  id: string;
  slug: string;
  title: string;
  description: string;
  estimated_minutes: number;
  prerequisites: string[];
  source_ids: string[];
  content: string;
  quizzes: QuizQuestion[];
}

export interface CourseData {
  title: string;
  language: string;
  completion_policy: {
    required_score: number;
    grading: string;
  };
  modules: ModuleData[];
}

export type ModuleStatus = 'locked' | 'available' | 'completed';
