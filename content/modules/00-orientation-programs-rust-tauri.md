---
id: "00"
slug: orientation-programs-rust-tauri
title: "Orientation: Programs, Rust, and Tauri"
description: "Understand the building blocks of a program and how Rust and Tauri fit together."
estimated_minutes: 20
prerequisites: []
source_ids: ["RUST-BOOK-INTRO", "TAURI-ARCH"]
quiz:
  required_score: 100
  question_count: 6
  passing_rule: exact-match
---

# Orientation: Programs, Rust, and Tauri

## Goal

By the end of this module, you can explain what a program, compiler, frontend, backend, Rust, and Tauri are.

## Lesson 1: A program is a set of instructions

A **program** is a precise set of instructions that a computer follows. A source file is the human-readable version of those instructions, such as a Rust file ending in `.rs` or a TypeScript file ending in `.ts`.

Computers ultimately run machine instructions, not the English-like text that we write. A **compiler** translates source code into a form the computer can run. Rust is a compiled language: the Rust compiler checks the program and produces a native executable for the target platform.

Compiler errors are useful feedback. They mean the program does not yet meet Rust's rules; they are not a judgement about the learner.

### Remember

You write source code; the compiler checks and translates it; the computer runs the result.

## Lesson 2: Frontend and backend have different jobs

In an application, the **frontend** is the part a person sees and uses: buttons, text fields, menus, and displayed results. A **backend** performs work that should not live directly in the interface, such as validating data, reading a local file, or calculating a result.

In a Tauri desktop app, the frontend is web content: HTML, CSS, and usually JavaScript or TypeScript rendered in the operating system's WebView. Rust code forms the native application core. The frontend asks the Rust core to perform explicitly exposed actions by sending messages.

Neither side is “more important.” The frontend makes the app understandable; the Rust core gives it controlled access to native capabilities.

## Lesson 3: What Rust and Tauri contribute

Rust is a programming language designed to offer both low-level control and high-level ergonomics. Its compiler checks many mistakes before the program runs, including rules around memory safety and data access.

Tauri is a toolkit for creating applications with a Rust core and a web frontend. It uses the operating system's WebView rather than bundling a separate browser runtime. Tauri is not a virtual machine and does not turn every web page into a desktop application automatically: the developer chooses which native capabilities the frontend may use.

### Remember

Rust is the language we will learn; Tauri is the toolkit that connects a Rust application core to a web-based interface.

## Check your understanding

```quiz
id: "00-q01"
type: multiple-choice
prompt: "Which statements correctly describe a compiler?"
select: multiple
options:
  - id: a
    text: "It translates source code into a form that can run on a target platform."
    correct: true
  - id: b
    text: "It can report rule violations before the program runs."
    correct: true
  - id: c
    text: "It is the same thing as a button in the user interface."
    correct: false
  - id: d
    text: "It guarantees that an application has no possible bug."
    correct: false
explanation: "A compiler translates and checks source code. Its checks catch many problems, but no compiler can guarantee that every program has no possible bug."
lesson_anchor: "lesson-1-a-program-is-a-set-of-instructions"
source_ids: ["RUST-BOOK-INTRO"]
```

```quiz
id: "00-q02"
type: multiple-choice
prompt: "In a Tauri desktop application, which part normally displays buttons and text fields?"
select: single
options:
  - id: a
    text: "The frontend rendered in a WebView"
    correct: true
  - id: b
    text: "The Rust compiler"
    correct: false
  - id: c
    text: "The Cargo lockfile"
    correct: false
  - id: d
    text: "A code-signing certificate"
    correct: false
explanation: "The frontend is the user-facing part of the app. Tauri renders web frontend content in an operating-system WebView."
lesson_anchor: "lesson-2-frontend-and-backend-have-different-jobs"
source_ids: ["TAURI-ARCH"]
```

```quiz
id: "00-q03"
type: multiple-choice
prompt: "Which tasks are suitable responsibilities for a Tauri Rust core?"
select: multiple
options:
  - id: a
    text: "Validating data received from the frontend"
    correct: true
  - id: b
    text: "Performing a native file operation that was intentionally exposed"
    correct: true
  - id: c
    text: "Automatically giving every web page on the internet access to the computer"
    correct: false
  - id: d
    text: "Replacing every visible UI element with compiler output"
    correct: false
explanation: "The Rust core can validate data and access native capabilities. Those capabilities must be deliberately exposed rather than being available to arbitrary web content."
lesson_anchor: "lesson-2-frontend-and-backend-have-different-jobs"
source_ids: ["TAURI-ARCH"]
```

```quiz
id: "00-q04"
type: multiple-choice
prompt: "Which statement best describes Rust in this course?"
select: single
options:
  - id: a
    text: "A compiled programming language used for the native application core"
    correct: true
  - id: b
    text: "A browser built into every operating system"
    correct: false
  - id: c
    text: "A package manager for JavaScript only"
    correct: false
  - id: d
    text: "A format for writing CSS"
    correct: false
explanation: "Rust is a programming language. In a Tauri app, it is commonly used for the native application core."
lesson_anchor: "lesson-3-what-rust-and-tauri-contribute"
source_ids: ["RUST-BOOK-INTRO", "TAURI-ARCH"]
```

```quiz
id: "00-q05"
type: multiple-choice
prompt: "Which statements about Tauri are correct?"
select: multiple
options:
  - id: a
    text: "It can combine a Rust application core with a web frontend."
    correct: true
  - id: b
    text: "It uses an operating-system WebView for web content."
    correct: true
  - id: c
    text: "It is a virtual machine that executes Rust source files directly."
    correct: false
  - id: d
    text: "It removes the need to decide which native APIs a frontend may access."
    correct: false
explanation: "Tauri connects Rust and web technologies and uses the system WebView. It still requires deliberate API and security decisions."
lesson_anchor: "lesson-3-what-rust-and-tauri-contribute"
source_ids: ["TAURI-ARCH"]
```

```quiz
id: "00-q06"
type: multiple-choice
prompt: "A Rust compiler error most directly means:"
select: single
options:
  - id: a
    text: "The current program does not meet a Rust rule and needs a change."
    correct: true
  - id: b
    text: "The learner is not capable of programming."
    correct: false
  - id: c
    text: "The operating system has permanently damaged the project."
    correct: false
  - id: d
    text: "The frontend has been deployed to GitHub Pages."
    correct: false
explanation: "Compiler errors are feedback about the current code. They help developers make the program meet the language rules."
lesson_anchor: "lesson-1-a-program-is-a-set-of-instructions"
source_ids: ["RUST-BOOK-INTRO"]
```

## What you can do now

- Describe the route from source code to a running program.
- Distinguish a Tauri frontend from its Rust core.
- Explain why compiler feedback is part of normal programming work.

## Sources

- [The Rust Programming Language — Introduction](https://doc.rust-lang.org/stable/book/ch00-00-introduction.html)
- [Tauri v2 — Architecture](https://v2.tauri.app/concept/architecture/)
