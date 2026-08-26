# Assessment Rules

## Quiz model

Every assessment is multiple-choice. A question has one correct option (`select: single`) or two or more correct options (`select: multiple`). There are no typed answers, code runners, timers, streak penalties, or AI grading in the MVP.

## Exact-match grading

A response is correct only if the set of selected option IDs is identical to the set of correct option IDs.

```text
selected option IDs == correct option IDs
```

Examples:

- Correct answers: `a`, `c`; learner selects `a`, `c` → correct.
- Correct answers: `a`, `c`; learner selects only `a` → incorrect.
- Correct answers: `a`, `c`; learner selects `a`, `b`, `c` → incorrect.
- Correct answer: `b`; learner selects `b` → correct.

No partial credit is awarded. This prevents a learner from passing a multi-select question by selecting every option.

## Module completion

```text
score = correct_questions / total_questions × 100
module is completed when score == 100
```

- The learner submits all questions as one quiz attempt.
- Questions and options may be displayed in a random order, but their stable IDs and answer key do not change.
- A module with an unanswered question cannot be submitted.
- On a failed attempt, retain the attempt result and show the explanation for each incorrect question.
- The learner can retry immediately and without a limit.
- The highest score is stored locally. A `Completed` status is permanent unless the learner explicitly resets progress.
- The course overview shows `Completed` only for modules whose highest score is `100`.

## Question quality requirements

Each question must:

- test one learning objective, not a trick or a reading-comprehension accident;
- have 3–5 plausible, mutually distinct options;
- have exactly one correct option for `single`, and at least two for `multiple`;
- make the number of correct answers clear through the UI text: “Select one answer” or “Select all correct answers”;
- use an explanation that teaches, rather than merely states “Correct” or “Incorrect”;
- reference the lesson anchor and official source IDs that support the answer;
- avoid irrelevant trivia, deprecated APIs, and ambiguous wording.

## Content review checklist

Before a module is accepted:

1. Verify every factual claim and correct answer against its official source.
2. Confirm that all distractors are unambiguously false in the stated context.
3. Confirm every question is answerable using the module and its prerequisites.
4. Confirm `question_count` matches the actual quiz blocks.
5. Confirm all multi-select answer sets have at least two correct options.
6. Run a content lint later in the implementation phase to catch duplicate IDs, missing source IDs, malformed YAML, and empty explanations.
