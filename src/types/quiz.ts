export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
}

export interface QuizProgress {
  currentQuestionIndex: number;
  answers: Record<string, string>;
  showResult: boolean;
  selectedAnswer?: string;
}
