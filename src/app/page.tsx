import Link from "next/link";
import { quizzes } from '@/data/quizzes';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Quiz System
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Choose a category to start your quiz
            <br />
            (These questions are just for demonstration purposes and can be modified or expanded.)
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
          {quizzes.map((quiz) => (
            <Link
              key={quiz.id}
              href={`/quiz/${quiz.id}`}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200 dark:border-gray-700 group-hover:border-blue-300 dark:group-hover:border-blue-600">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {quiz.title}
                </h2>
                {quiz.description && (
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {quiz.description}
                  </p>
                )}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{quiz.questions.length} questions</span>
                  <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Start Quiz →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
