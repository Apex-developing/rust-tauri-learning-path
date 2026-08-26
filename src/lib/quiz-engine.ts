import type { QuizQuestion } from '../types/course';

export function getCorrectOptionIds(question: QuizQuestion): string[] {
  return question.options.filter((option) => option.correct).map((option) => option.id);
}

export function evaluateExactMatch(selectedOptionIds: string[], correctOptionIds: string[]): boolean {
  const selected = [...selectedOptionIds].sort();
  const correct = [...correctOptionIds].sort();

  if (selected.length !== correct.length) {
    return false;
  }

  return selected.every((id, index) => id === correct[index]);
}

export function evaluateQuestion(question: QuizQuestion, selectedIds: string[]): boolean {
  const correctIds = getCorrectOptionIds(question);
  return evaluateExactMatch(selectedIds, correctIds);
}

export function buildEmptySelection(_question: QuizQuestion): string[] {
  return [];
}
