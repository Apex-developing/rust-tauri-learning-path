# Module Markdown Format

Every module lives in `content/modules/<id>-<slug>.md`. Files are authored in English and use UTF-8 Markdown with YAML front matter.

## Required front matter

```yaml
---
id: "02"
slug: rust-fundamentals
title: "Rust Fundamentals"
description: "Use variables, types, functions, conditions, and loops."
estimated_minutes: 35
prerequisites: ["01"]
source_ids: ["RUST-BOOK-CH03"]
quiz:
  required_score: 100
  question_count: 12
  passing_rule: exact-match
---
```

Rules:

- `id`, `slug`, `title`, `description`, `estimated_minutes`, `prerequisites`, `source_ids`, and `quiz` are mandatory.
- `id` must match the course manifest and the filename prefix.
- `source_ids` must exist in `curriculum/SOURCES.md`.
- `question_count` must equal the number of `quiz` blocks in the file.
- `passing_rule` is always `exact-match` for the MVP.

## Required body structure

```md
# Rust Fundamentals

## Goal

By the end of this module, you can ...

## Lesson 1: A focused concept

Plain-English explanation for a beginner.

```rust
let greeting = "Hello";
```

### Remember

One short, accurate takeaway.

## Lesson 2: The next focused concept

...

## Check your understanding

```quiz
id: "02-q01"
type: multiple-choice
prompt: "Which statements about `let` are correct?"
select: multiple
options:
  - id: a
    text: "It creates a variable binding."
    correct: true
  - id: b
    text: "It always creates a mutable variable."
    correct: false
  - id: c
    text: "A binding is immutable unless `mut` is used."
    correct: true
explanation: "`let` creates a binding. Add `mut` when the binding must be reassigned."
lesson_anchor: "lesson-1-a-focused-concept"
source_ids: ["RUST-BOOK-CH03"]
```

## What you can do now

- Outcome one.
- Outcome two.

## Sources

- [The Rust Programming Language — Common Programming Concepts](https://doc.rust-lang.org/stable/book/ch03-00-common-programming-concepts.html)
```

## Authoring rules

- Start every module with exactly one concrete learner goal.
- Present one new idea per lesson section; avoid unexplained jargon.
- Every code sample must be syntactically valid for the stated version and small enough to read on a phone.
- Mark runnable Rust code fences as `rust`; use `ts` for TypeScript and `json` for configuration.
- Do not include a claim that is not supported by a module source.
- Cite source IDs on every quiz block and list clickable source links in the final `Sources` section.
- Do not use “always”, “never”, or version-sensitive claims unless the official source supports them.
- A question may test only information taught earlier in the same module or its prerequisites.

## Quiz block contract

Quiz blocks are fenced YAML blocks with the language label `quiz`. The future application will parse them after rendering the learning text.

| Field | Required | Meaning |
| --- | --- | --- |
| `id` | Yes | Globally unique question ID, e.g. `04-q03`. |
| `type` | Yes | Always `multiple-choice` in the MVP. |
| `prompt` | Yes | The question shown to the learner. |
| `select` | Yes | `single` for one correct option, `multiple` for two or more. |
| `options` | Yes | 3–5 options with stable IDs. |
| `options[].id` | Yes | Short stable identifier, unique inside the question. |
| `options[].text` | Yes | Answer text, written in English. |
| `options[].correct` | Yes | Boolean answer key. |
| `explanation` | Yes | Shown after submission; explains both the rule and the result. |
| `lesson_anchor` | Yes | Anchor to the lesson section that teaches the answer. |
| `source_ids` | Yes | One or more entries from the source registry. |

The static MVP necessarily ships answer keys to the browser. This supports learning and offline use; it is not an anti-cheating system.
