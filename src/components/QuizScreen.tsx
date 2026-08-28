import { useEffect, useMemo, useState } from 'react';
import { evaluateQuestion, getCorrectOptionIds } from '../lib/quiz-engine';
import type { ModuleData, QuizQuestion } from '../types/course';

interface QuizScreenProps {
  module: ModuleData;
  onSubmit: (payload: { moduleId: string; score: number; selectedAnswers: Record<string, string[]>; passed: boolean }) => void;
  onBack: () => void;
  previousAnswers?: Record<string, string[]>;
  strings: Record<string, string>;
}

function buildInitialAnswers(questions: QuizQuestion[]): Record<string, string[]> {
  return Object.fromEntries(questions.map((question) => [question.id, []]));
}

export function QuizScreen({ module, onSubmit, onBack, previousAnswers, strings }: QuizScreenProps) {
  const initialAnswers = useMemo(() => {
    const base = buildInitialAnswers(module.quizzes);
    return previousAnswers ? { ...base, ...previousAnswers } : base;
  }, [module.quizzes, previousAnswers]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [module.id]);

  const [answers, setAnswers] = useState<Record<string, string[]>>(initialAnswers);
  const [submitted, setSubmitted] = useState(false);

  const toggleOption = (questionId: string, optionId: string, selectType: 'single' | 'multiple') => {
    setAnswers((current) => {
      const existing = current[questionId] ?? [];

      if (selectType === 'single') {
        return { ...current, [questionId]: [optionId] };
      }

      if (existing.includes(optionId)) {
        return { ...current, [questionId]: existing.filter((value) => value !== optionId) };
      }

      return { ...current, [questionId]: [...existing, optionId] };
    });
  };

  const result = useMemo(() => {
    const totalQuestions = module.quizzes.length;
    let correctCount = 0;

    module.quizzes.forEach((question) => {
      const selectedIds = answers[question.id] ?? [];
      const isCorrect = evaluateQuestion(question, selectedIds);
      if (isCorrect) {
        correctCount += 1;
      }
    });

    return {
      totalQuestions,
      correctCount,
      score: Math.round((correctCount / totalQuestions) * 100),
      passed: correctCount === totalQuestions
    };
  }, [answers, module.quizzes]);

  const submitQuiz = () => {
    setSubmitted(true);
    const selectedAnswers: Record<string, string[]> = {};
    module.quizzes.forEach((question) => {
      selectedAnswers[question.id] = answers[question.id] ?? [];
    });

    onSubmit({
      moduleId: module.id,
      score: result.score,
      selectedAnswers,
      passed: result.passed
    });
  };

  return (
    <div className="quiz-page">
      <header className="module-header card">
        <div className="module-top-actions">
          <button type="button" className="secondary-button" onClick={onBack}>
            {strings.back}
          </button>
          <span className="module-tag">{strings.quiz}</span>
        </div>
        <h1>{module.title}</h1>
      </header>

      <div className="quiz-list">
        {module.quizzes.map((question, index) => {
          const selectedIds = answers[question.id] ?? [];
          const correctIds = getCorrectOptionIds(question);
          const showFeedback = submitted;

          return (
            <div key={question.id} className="question-card card">
              <p className="question-index">
                {strings.question} {index + 1}/{module.quizzes.length}
              </p>
              <h3>{question.prompt}</h3>

              <div className="options-group">
                {question.options.map((option) => {
                  const isSelected = selectedIds.includes(option.id);
                  const isCorrect = correctIds.includes(option.id);
                  const showCorrect = showFeedback && isSelected && isCorrect;
                  const showMissed = showFeedback && !isSelected && isCorrect;
                  const showIncorrect = showFeedback && isSelected && !isCorrect;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={[
                        'option-item',
                        isSelected ? 'selected' : '',
                        showCorrect ? 'correct' : '',
                        showMissed ? 'missed' : '',
                        showIncorrect ? 'incorrect' : ''
                      ].join(' ')}
                      onClick={() => toggleOption(question.id, option.id, question.select)}
                    >
                      <span className="option-hit">{option.id.toUpperCase()}</span>
                      <span>{option.text}</span>
                    </button>
                  );
                })}
              </div>

              {showFeedback && (
                <div className={`explanation ${evaluateQuestion(question, selectedIds) ? 'success' : 'error'}`}>
                  <strong>{evaluateQuestion(question, selectedIds) ? strings.correct : strings.incorrect}:</strong>
                  <p>{question.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="submit-panel card">
        <div className="score-summary">
          <strong>{result.correctCount}/{result.totalQuestions}</strong>
          <span>{result.score}%</span>
        </div>

        {!submitted ? (
          <button type="button" className="primary-button" onClick={submitQuiz}>
            {strings.submitAnswers}
          </button>
        ) : (
          <button type="button" className="primary-button" onClick={onBack}>
            {result.passed ? strings.backToModule : strings.reviewRetry}
          </button>
        )}
      </div>
    </div>
  );
}
