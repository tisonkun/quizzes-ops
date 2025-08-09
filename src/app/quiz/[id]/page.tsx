'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getQuizById } from '@/data/quizzes';
import { Quiz, QuizProgress } from '@/types/quiz';

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [progress, setProgress] = useState<QuizProgress>({
    currentQuestionIndex: 0,
    answers: {},
    showResult: false,
  });
  const [showIntroduction, setShowIntroduction] = useState(true);

  useEffect(() => {
    const quizData = getQuizById(params.id as string);
    if (!quizData) {
      router.push('/');
      return;
    }
    setQuiz(quizData);
  }, [params.id, router]);

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[progress.currentQuestionIndex];
  const isLastQuestion = progress.currentQuestionIndex === quiz.questions.length - 1;
  const isFirstQuestion = progress.currentQuestionIndex === 0;

  const handleOptionSelect = (optionId: string) => {
    setProgress(prev => ({
      ...prev,
      selectedAnswer: optionId,
      showResult: true,
    }));
  };

  const handleNextQuestion = () => {
    if (progress.selectedAnswer) {
      const newAnswers = {
        ...progress.answers,
        [currentQuestion.id]: progress.selectedAnswer!,
      };
      
      if (isLastQuestion) {
        // Complete the quiz, show results page
        setProgress(prev => ({
          ...prev,
          answers: newAnswers,
          showResult: false,
          selectedAnswer: undefined,
          currentQuestionIndex: prev.currentQuestionIndex + 1, // This exceeds the range to indicate completion status
        }));
      } else {
        setProgress(prev => ({
          ...prev,
          answers: newAnswers,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
          showResult: false,
          selectedAnswer: undefined,
        }));
      }
    }
  };

  const handlePrevQuestion = () => {
    if (progress.currentQuestionIndex > 0) {
      setProgress(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
        showResult: false,
        selectedAnswer: undefined,
      }));
    }
  };

  const handleStartQuiz = () => {
    setShowIntroduction(false);
  };

  const handleRestartQuiz = () => {
    setProgress({
      currentQuestionIndex: 0,
      answers: {},
      showResult: false,
    });
    setShowIntroduction(true);
  };

  // Check if quiz is completed
  const isCompleted = progress.currentQuestionIndex >= quiz.questions.length;
  
  if (isCompleted) {
    // Calculate number of correct answers
    const correctAnswers = quiz.questions.reduce((count, question) => {
      const userAnswer = progress.answers[question.id];
      const correctOption = question.options.find(opt => opt.isCorrect);
      return count + (userAnswer === correctOption?.id ? 1 : 0);
    }, 0);
    
    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="mb-6">
                  <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Quiz Complete!
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    {quiz.title}
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                      {quiz.questions.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Total</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                      {correctAnswers}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Correct</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                      {score}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Score</div>
                  </div>
                </div>
                
                <div className="flex gap-4 justify-center">
                  <Link
                    href="/"
                    className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Back to Home
                  </Link>
                  <button
                    onClick={handleRestartQuiz}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showIntroduction && quiz.description) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {quiz.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {quiz.description}
                </p>
              </div>
              
              <div className="text-center">
                <div className="mb-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {quiz.questions.length} questions total
                  </p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full w-0 transition-all duration-300"></div>
                  </div>
                </div>
                
                <div className="flex gap-4 justify-center">
                  <Link
                    href="/"
                    className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Back to Home
                  </Link>
                  <button
                    onClick={handleStartQuiz}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Start Quiz
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Navigation */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Link
                href="/"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-2"
              >
                ← Back to Home
              </Link>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {quiz.title}
              </h1>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {progress.currentQuestionIndex + 1} / {quiz.questions.length}
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((progress.currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
              {currentQuestion.question}
            </h2>

            <div className="space-y-4 mb-8">
              {currentQuestion.options.map((option) => {
                const isSelected = progress.selectedAnswer === option.id;
                const showCorrect = progress.showResult && option.isCorrect;
                const showIncorrect = progress.showResult && isSelected && !option.isCorrect;

                return (
                  <button
                    key={option.id}
                    onClick={() => !progress.showResult && handleOptionSelect(option.id)}
                    disabled={progress.showResult}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      showCorrect
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                        : showIncorrect
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300'
                        : isSelected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 bg-white dark:bg-gray-700'
                    } ${progress.showResult ? 'cursor-default' : 'cursor-pointer hover:shadow-md'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                        showCorrect
                          ? 'border-green-500 bg-green-500'
                          : showIncorrect
                          ? 'border-red-500 bg-red-500'
                          : isSelected
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300 dark:border-gray-500'
                      }`}>
                        {(showCorrect || showIncorrect || isSelected) && (
                          <span className="text-white text-xs">
                            {showCorrect ? '✓' : showIncorrect ? '✗' : option.id.toUpperCase()}
                          </span>
                        )}
                        {!showCorrect && !showIncorrect && !isSelected && (
                          <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">
                            {option.id.toUpperCase()}
                          </span>
                        )}
                      </div>
                      <span className={`${
                        showCorrect || showIncorrect || isSelected
                          ? 'font-medium'
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {option.text}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Result Explanation */}
            {progress.showResult && (
              <div className={`p-4 rounded-lg mb-6 ${
                currentQuestion.options.find(o => o.id === progress.selectedAnswer)?.isCorrect
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`font-semibold ${
                    currentQuestion.options.find(o => o.id === progress.selectedAnswer)?.isCorrect
                      ? 'text-green-800 dark:text-green-300'
                      : 'text-red-800 dark:text-red-300'
                  }`}>
                    {
                      currentQuestion.options.find(o => o.id === progress.selectedAnswer)?.isCorrect
                        ? 'Correct!'
                        : 'Incorrect!'
                    }
                  </span>
                </div>
                <p className={`${
                  currentQuestion.options.find(o => o.id === progress.selectedAnswer)?.isCorrect
                    ? 'text-green-700 dark:text-green-300'
                    : 'text-red-700 dark:text-red-300'
                }`}>
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={handlePrevQuestion}
                disabled={isFirstQuestion}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  isFirstQuestion
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Previous
              </button>

              {progress.showResult && (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {isLastQuestion ? 'Complete Quiz' : 'Next'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
