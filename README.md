# Quiz System

A Next.js-based quiz application supporting multi-category question and answer workflows.

## Features

- ✅ **Multi-category quizzes** with different topics
- ✅ **Optional background introduction** before each quiz
- ✅ **Multiple choice questions** with instant feedback
- ✅ **Detailed explanations** for correct/incorrect answers
- ✅ **Navigation controls** (previous/next questions)
- ✅ **Progress tracking** and completion statistics
- ✅ **Responsive design** for desktop and mobile
- 🎨 **Modern UI** with dark mode support

## Tech Stack

- **Framework**: Next.js 15.4.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build
pnpm start
```

The application will be available at http://localhost:3000

## Project Structure

```
src/
├── app/
│   ├── page.tsx           # Homepage with quiz categories
│   └── quiz/[id]/page.tsx # Dynamic quiz pages
├── data/
│   └── quizzes.ts         # Quiz content and data
└── types/
    └── quiz.ts            # TypeScript type definitions
```

## Adding New Quizzes

Add quiz objects to `src/data/quizzes.ts`:

```typescript
{
  id: 'your-quiz-id',
  title: 'Your Quiz Title',
  description: 'Optional background information',
  questions: [
    {
      id: 'q1',
      question: 'Your question?',
      options: [
        { id: 'a', text: 'Option A', isCorrect: false },
        { id: 'b', text: 'Option B', isCorrect: true },
        // ... more options
      ],
      explanation: 'Answer explanation'
    }
    // ... more questions
  ]
}
```

## Current Quizzes

These questions are just for demonstration purposes and can be modified or expanded.

1. **ASF Incubator PMC Onboarding** - Apache Incubator PMC basics (3 questions)
2. **ASF Director Onboarding** - ASF Board of Directors training (3 questions)

## Development

```bash
pnpm run dev    # Development mode
pnpm run build  # Build for production
pnpm start      # Start production server
pnpm run lint   # Code linting
```

## License

MIT License
