import { Quiz } from '@/types/quiz';

export const quizzes: Quiz[] = [
  {
    id: 'asf-incubator-pmc',
    title: 'ASF Incubator PMC Onboarding',
    description: 'This test will help you understand the basic knowledge and responsibilities of Apache Software Foundation Incubator Project Management Committee (PMC).',
    questions: [
      {
        id: 'q1',
        question: 'What is the main purpose of the Apache Software Foundation Incubator?',
        options: [
          {
            id: 'a',
            text: 'Providing free code hosting services',
            isCorrect: false
          },
          {
            id: 'b',
            text: 'Helping open source projects learn the Apache Way and become top-level projects',
            isCorrect: true
          },
          {
            id: 'c',
            text: 'Providing employment opportunities for developers',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'Selling open source software licenses',
            isCorrect: false
          }
        ],
        explanation: 'The main purpose of the Apache Incubator is to help projects learn the "Apache Way", including community governance, collaborative development, and open source best practices, ultimately becoming Apache top-level projects.'
      },
      {
        id: 'q2',
        question: 'What are the main responsibilities of PMC members?',
        options: [
          {
            id: 'a',
            text: 'Writing all the code',
            isCorrect: false
          },
          {
            id: 'b',
            text: 'Guiding project development, managing releases, nurturing community',
            isCorrect: true
          },
          {
            id: 'c',
            text: 'Handling legal affairs',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'Managing server hardware',
            isCorrect: false
          }
        ],
        explanation: 'PMC members are responsible for guiding the overall development direction of the project, managing software release processes, nurturing a healthy developer community, and ensuring the project follows the Apache Way.'
      },
      {
        id: 'q3',
        question: 'What are the main features of the Apache License?',
        options: [
          {
            id: 'a',
            text: 'Requires all derivative works to be open source',
            isCorrect: false
          },
          {
            id: 'b',
            text: 'Allows commercial use, but requires retaining copyright notices',
            isCorrect: true
          },
          {
            id: 'c',
            text: 'Prohibits commercial use',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'Only for educational purposes',
            isCorrect: false
          }
        ],
        explanation: 'The Apache License is a permissive open source license that allows commercial use, modification, and distribution, as long as the original copyright and license notices are retained.'
      }
    ]
  },
  {
    id: 'asf-director-onboarding',
    title: 'ASF Director Onboarding',
    description: 'This test will help you understand the responsibilities and governance structure of Apache Software Foundation Board of Directors members.',
    questions: [
      {
        id: 'q1',
        question: 'What are the main responsibilities of the Apache Software Foundation Board of Directors?',
        options: [
          {
            id: 'a',
            text: 'Writing code and fixing bugs',
            isCorrect: false
          },
          {
            id: 'b',
            text: 'Setting foundation policies, overseeing project operations, handling legal affairs',
            isCorrect: true
          },
          {
            id: 'c',
            text: 'Selling Apache software products',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'Providing technical support services',
            isCorrect: false
          }
        ],
        explanation: 'The ASF Board of Directors is responsible for setting the foundation\'s overall policies, overseeing the operational status of various projects, handling legal and corporate governance affairs, and ensuring the foundation\'s mission is executed.'
      },
      {
        id: 'q2',
        question: 'How are ASF Board of Directors members elected?',
        options: [
          {
            id: 'a',
            text: 'Appointed by the existing board',
            isCorrect: false
          },
          {
            id: 'b',
            text: 'Elected annually by Apache members',
            isCorrect: true
          },
          {
            id: 'c',
            text: 'Recommended by project PMC chairs',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'Assigned by sponsoring companies',
            isCorrect: false
          }
        ],
        explanation: 'ASF Board of Directors members are elected annually by Apache Software Foundation members, reflecting the principles of democratic governance.'
      },
      {
        id: 'q3',
        question: 'What are the core values of the Apache Software Foundation?',
        options: [
          {
            id: 'a',
            text: 'Maximizing profits',
            isCorrect: false
          },
          {
            id: 'b',
            text: 'Community over code, collaborative development, openness and transparency',
            isCorrect: true
          },
          {
            id: 'c',
            text: 'Rapid iteration, breaking conventions',
            isCorrect: false
          },
          {
            id: 'd',
            text: 'Technology supremacy, elitism',
            isCorrect: false
          }
        ],
        explanation: 'The Apache Way emphasizes "Community over Code", valuing collaborative development, open and transparent decision-making processes, diversity and inclusivity, and achieving decisions through consensus.'
      }
    ]
  }
];

export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find(quiz => quiz.id === id);
}
