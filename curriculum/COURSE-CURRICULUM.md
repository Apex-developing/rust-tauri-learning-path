# Course Curriculum

## Product goal

Enable a complete programming beginner to build and understand a small Tauri v2 desktop application with a TypeScript frontend and a Rust backend.

The course uses short, self-contained modules. Each module is a single Markdown file and ends with an exact-match multiple-choice quiz. The learner completes a module only after answering every question in that module correctly.

## Scope and sequencing

| ID | Module | Learner outcome | Quiz questions | Primary sources |
| --- | --- | --- | ---: | --- |
| `00` | Orientation: Programs, Rust, and Tauri | Explain what a program, frontend, backend, compiler, Rust, and Tauri are. | 6 | `RUST-BOOK-INTRO`, `TAURI-ARCH` |
| `01` | Setup and First Run | Install the tools, use a terminal, create a project, and run it locally. | 8 | `RUST-BOOK-INSTALL`, `CARGO-FIRST`, `TAURI-START` |
| `02` | Rust Fundamentals | Use variables, scalar and compound types, functions, conditions, and loops. | 12 | `RUST-BOOK-CH03` |
| `03` | Ownership, References, and Slices | Predict moves and borrows, then use immutable and mutable references safely. | 12 | `RUST-BOOK-CH04` |
| `04` | Modelling Data and Handling Failure | Use structs, enums, pattern matching, collections, `Option`, and `Result`. | 14 | `RUST-BOOK-CH05`, `RUST-BOOK-CH06`, `RUST-BOOK-CH08`, `RUST-BOOK-CH09` |
| `05` | Organising and Testing Rust Code | Organise code with modules and packages; write and run basic tests. | 10 | `RUST-BOOK-CH07`, `RUST-BOOK-CH11`, `CARGO-TEST` |
| `06` | TypeScript for a Tauri Frontend | Use TypeScript types, functions, objects, events, and `async`/`await` in a browser UI. | 12 | `TS-HANDBOOK-BASIC`, `TS-HANDBOOK-NARROWING` |
| `07` | First Tauri Feature: Frontend to Rust | Call a Rust command with `invoke`, pass typed JSON-compatible data, and display a result. | 12 | `TAURI-CALL-RUST`, `SERDE-OVERVIEW` |
| `08` | State, Errors, and Persistent Data | Distinguish frontend and backend state; return useful errors; persist small application data. | 12 | `TAURI-STATE`, `TAURI-STORE`, `RUST-BOOK-CH09` |
| `09` | Async Work and Progress Updates | Choose between ordinary async work and blocking work; communicate progress without freezing the UI. | 12 | `RUST-ASYNC-INTRO`, `TAURI-CALL-FRONTEND`, `TAURI-ASYNC-RUNTIME` |
| `10` | Files and Security Boundaries | Use least privilege with capabilities, permissions, and filesystem scopes. | 12 | `TAURI-SECURITY`, `TAURI-CAPABILITIES`, `TAURI-FS` |
| `11` | Windows, Lifecycle, and System Tray | Explain close versus hide; create a basic tray flow; explicitly quit an application. | 10 | `TAURI-WINDOW`, `TAURI-TRAY` |
| `12` | Tests, Builds, and Release Basics | Run relevant checks, create a production bundle, and explain signing at a high level. | 10 | `RUST-BOOK-CH11`, `TAURI-DISTRIBUTION`, `TAURI-SIGNING` |
| `13` | Mobile and the Next Projects | Identify platform constraints and choose a realistic next project. | 8 | `TAURI-MOBILE`, `TAURI-PLUGINS` |

**Total:** 162 questions.

## Completion requirements

1. A learner must read every required lesson block in a module.
2. A learner must submit the full module quiz.
3. Every quiz question must be correct in the same attempt: a score of `100%`.
4. Only then may the module appear as `Completed` in the course list.
5. Attempts are unlimited. Incorrect answers provide an explanation and a link back to the relevant lesson block.

## Content boundaries

- Modules `00`–`05` do not assume prior programming knowledge.
- Module `06` teaches only the TypeScript needed to understand and write the Tauri frontend. It is not a complete TypeScript course.
- Modules `07`–`12` use Tauri v2 documentation only; no v1 APIs or `allowlist` configuration may appear.
- Module `13` is a guided overview, not a promise that every desktop plugin works on mobile.
- A concept must be introduced before it appears in a quiz distractor or code sample.
