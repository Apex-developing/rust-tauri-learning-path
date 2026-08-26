---
id: "08"
slug: state-errors-and-persistent-data
title: "State, Errors, and Persistent Data"
description: "Distinguish frontend and backend state, return useful errors, and persist small application data."
estimated_minutes: 40
prerequisites: ["07"]
source_ids: ["TAURI-STATE", "TAURI-STORE", "RUST-BOOK-CH09"]
quiz:
  required_score: 100
  question_count: 12
  passing_rule: exact-match
---

# State, Errors, and Persistent Data

## Goal

By the end of this module, you can distinguish frontend and backend state, return helpful `Result` errors from Rust commands, and choose a small persistent storage pattern for app data.

## Lesson 1: Frontend state and backend state are different

A Tauri app has more than one place where state can live. The frontend usually stores UI-related state such as input values, selected tabs, or a current page. The Rust backend stores application state that should be shared across commands or tied to the app lifecycle.

When a command needs shared data, Tauri can manage state from the Rust side. The official state management documentation describes storing data in the app and reading it from commands. This keeps state near the code that needs it, rather than mixing UI state and app state in one place.

```rust
use std::sync::Mutex;
use tauri::{Manager, State};

pub struct AppState {
    pub counter: Mutex<u32>,
}

#[tauri::command]
fn increment(state: State<'_, AppState>) -> u32 {
    let mut counter = state.counter.lock().unwrap();
    *counter += 1;
    *counter
}
```

The frontend can ask the backend for a value or trigger a command that changes it, but the state itself lives in Rust when it is part of the app's shared logic.

### Remember

Frontend state drives the interface; Rust state is for shared application data and app lifetime concerns.

## Lesson 2: Errors should be clear and useful

Rust's `Result<T, E>` type is the standard way to model success or failure. Instead of returning a vague value, a command can return `Ok(...)` on success and `Err("...message")` when something goes wrong. This makes it easier for the frontend to display a meaningful message to the user.

```rust
#[tauri::command]
fn read_name(name: String) -> Result<String, String> {
    if name.trim().is_empty() {
        Err("Name cannot be empty.".to_string())
    } else {
        Ok(format!("Hello, {}!", name))
    }
}
```

A good error message explains what failed and why. This is better than returning a generic value with no context. For many app features, a string error is enough to start with, especially when the message is intended for the user or a developer log.

### Remember

Return `Result<T, E>` when the action can fail, and use an error message that explains the problem clearly.

## Lesson 3: Persistent data can live in a local store

Not every value belongs in a Rust `Mutex` or in React state. Some data should survive between app runs, such as a saved setting or small preference. Tauri provides a store plugin for key-value persistence.

The store plugin is designed for small persistent data. It saves values to disk and can load them again later, which is useful for configuration, recent selections, or user preferences.

```ts
import { load } from "@tauri-apps/plugin-store";

const store = await load("settings.json", { autoSave: false });
await store.set("theme", "dark");

const theme = await store.get<string>("theme");
console.log(theme);
```

The plugin is a good fit for small structured values, not for large file collections or a full database. For a beginner app, it is often the simplest way to persist a few preferences.

### Remember

Use a persistent store for small settings or saved app data that should remain after the app restarts.

## Check your understanding

```quiz
id: "08-q01"
type: multiple-choice
prompt: "Which statement best distinguishes frontend state from Rust backend state in a Tauri app?"
select: single
options:
  - id: a
    text: "Frontend state usually handles UI choices; backend state is shared app state managed in Rust."
    correct: true
  - id: b
    text: "Frontend state is always more important than Rust state."
    correct: false
  - id: c
    text: "Rust state only stores CSS classes."
    correct: false
  - id: d
    text: "Frontend state must always be saved to disk."
    correct: false
explanation: "UI state is often held in the frontend, while shared application state often belongs in Rust and is managed in Tauri commands or app state."
lesson_anchor: "lesson-1-frontend-state-and-backend-state-are-different"
source_ids: ["TAURI-STATE"]
```

```quiz
id: "08-q02"
type: multiple-choice
prompt: "Why do Rust apps often wrap shared state in a `Mutex`?"
select: single
options:
  - id: a
    text: "To allow safe mutation of shared data without races when multiple parts of the app need access."
    correct: true
  - id: b
    text: "Because a `Mutex` is required for every function parameter."
    correct: false
  - id: c
    text: "Because `Mutex` is the same as a frontend component."
    correct: false
  - id: d
    text: "Because Rust apps never share data across threads."
    correct: false
explanation: "A `Mutex` guards shared mutable state so the program avoids concurrent data races while still allowing controlled updates."
lesson_anchor: "lesson-1-frontend-state-and-backend-state-are-different"
source_ids: ["TAURI-STATE"]
```

```quiz
id: "08-q03"
type: multiple-choice
prompt: "Which code pattern is the standard Rust error-handling approach for an action that might fail?"
select: single
options:
  - id: a
    text: "`Result<T, E>` with `Ok(...)` on success and `Err(...)` on failure"
    correct: true
  - id: b
    text: "A `String` returned without any error signal"
    correct: false
  - id: c
    text: "A `println!` statement alone"
    correct: false
  - id: d
    text: "A `while` loop with no condition"
    correct: false
explanation: "Rust uses `Result<T, E>` to represent either success or failure, which is a clear and idiomatic way to signal errors."
lesson_anchor: "lesson-2-errors-should-be-clear-and-useful"
source_ids: ["RUST-BOOK-CH09"]
```

```quiz
id: "08-q04"
type: multiple-choice
prompt: "Which command behavior is preferable for a user-facing validation error?"
select: single
options:
  - id: a
    text: 'Return `Err("Name cannot be empty.".to_string())`'
    correct: true
  - id: b
    text: "Return `Ok(0)` even when the input is invalid"
    correct: false
  - id: c
    text: "Ignore the error and continue silently"
    correct: false
  - id: d
    text: "Return a random string without context"
    correct: false
explanation: "A useful error explains the invalid condition and lets the frontend show a meaningful message to the user."
lesson_anchor: "lesson-2-errors-should-be-clear-and-useful"
source_ids: ["RUST-BOOK-CH09"]
```

```quiz
id: "08-q05"
type: multiple-choice
prompt: "Which statement about `Result` values is correct?"
select: single
options:
  - id: a
    text: "`Ok(value)` means the operation succeeded; `Err(error)` means it failed."
    correct: true
  - id: b
    text: "`Err(value)` always means the app is complete."
    correct: false
  - id: c
    text: "`Result` can only be used in the frontend."
    correct: false
  - id: d
    text: "`Result` is only for loops and not for commands."
    correct: false
explanation: "The `Result` enum clearly separates success and error cases. This is the standard Rust pattern for handling failures."
lesson_anchor: "lesson-2-errors-should-be-clear-and-useful"
source_ids: ["RUST-BOOK-CH09"]
```

```quiz
id: "08-q06"
type: multiple-choice
prompt: "Why is a user-facing error message better than a generic failure value?"
select: single
options:
  - id: a
    text: "It explains what went wrong and helps the user or developer fix the problem."
    correct: true
  - id: b
    text: "It makes the code appear shorter."
    correct: false
  - id: c
    text: "It removes the need to validate inputs."
    correct: false
  - id: d
    text: "It guarantees the app will never fail again."
    correct: false
explanation: "Clear error messages communicate the real reason for an issue, which improves debugging and user feedback."
lesson_anchor: "lesson-2-errors-should-be-clear-and-useful"
source_ids: ["RUST-BOOK-CH09"]
```

```quiz
id: "08-q07"
type: multiple-choice
prompt: "Which statement about the Tauri store plugin is correct?"
select: single
options:
  - id: a
    text: "It persists small key-value data to disk so it can survive app restarts."
    correct: true
  - id: b
    text: "It replaces the Rust compiler."
    correct: false
  - id: c
    text: "It is only for image files and not for settings."
    correct: false
  - id: d
    text: "It saves every value in a SQL database automatically."
    correct: false
explanation: "The Tauri store plugin is a persistent key-value store intended for small app data, such as settings and preferences."
lesson_anchor: "lesson-3-persistent-data-can-live-in-a-local-store"
source_ids: ["TAURI-STORE"]
```

```quiz
id: "08-q08"
type: multiple-choice
prompt: 'Which code is a good example of using the Tauri store plugin in the frontend?'
select: single
options:
  - id: a
    text: '`const store = await load("settings.json", { autoSave: false }); await store.set("theme", "dark");`'
    correct: true
  - id: b
    text: '`cargo run settings.json`'
    correct: false
  - id: c
    text: '`let theme = 42;` with no store'
    correct: false
  - id: d
    text: '`window.location = "settings.json";`'
    correct: false
explanation: 'The store plugin exposes a persistent store API that can load, set, and retrieve small values by key.'
lesson_anchor: 'lesson-3-persistent-data-can-live-in-a-local-store'
source_ids: ['TAURI-STORE']
```

```quiz
id: "08-q09"
type: multiple-choice
prompt: "Which data is a realistic candidate for the Tauri store?"
select: single
options:
  - id: a
    text: "A saved theme preference or small user setting"
    correct: true
  - id: b
    text: "A full database with millions of rows"
    correct: false
  - id: c
    text: "The entire source code of the app"
    correct: false
  - id: d
    text: "A browser-only animation frame"
    correct: false
explanation: "The store plugin is intended for small persistent values such as preferences, not for large-scale data storage or application code."
lesson_anchor: "lesson-3-persistent-data-can-live-in-a-local-store"
source_ids: ["TAURI-STORE"]
```

```quiz
id: "08-q10"
type: multiple-choice
prompt: "Which scenario best matches a persistent store use case?"
select: single
options:
  - id: a
    text: "Remembering the user's selected theme between app launches"
    correct: true
  - id: b
    text: "Rendering a button as soon as the app starts"
    correct: false
  - id: c
    text: "Compiling Rust code to JavaScript"
    correct: false
  - id: d
    text: "Replacing the backend with a CSS file"
    correct: false
explanation: "A persistent store is useful for small settings like a theme choice that should still be remembered after the app restarts."
lesson_anchor: "lesson-3-persistent-data-can-live-in-a-local-store"
source_ids: ["TAURI-STORE"]
```

```quiz
id: "08-q11"
type: multiple-choice
prompt: "Which statement is the best advice for a beginner deciding where to put app data?"
select: single
options:
  - id: a
    text: "Use React or frontend state for UI state, and use Rust shared state or a store for app data that needs persistence."
    correct: true
  - id: b
    text: "Put every value in one global file because it is easier to debug."
    correct: false
  - id: c
    text: "Store everything in HTML attributes."
    correct: false
  - id: d
    text: "Use only the backend for UI values and never the frontend."
    correct: false
explanation: "A clear separation helps the app stay maintainable: UI state belongs to the frontend, while shared or persistent data often belongs in Rust or the store plugin."
lesson_anchor: "lesson-1-frontend-state-and-backend-state-are-different"
source_ids: ["TAURI-STATE"]
```

```quiz
id: "08-q12"
type: multiple-choice
prompt: "Which statement best summarizes the module?"
select: single
options:
  - id: a
    text: "A good Tauri app separates UI state from app state, returns useful errors, and stores small persistent settings in a dedicated store."
    correct: true
  - id: b
    text: "There is no difference between frontend and backend state, so all values should be stored in one place."
    correct: false
  - id: c
    text: "The store plugin is a full database replacement for all data."
    correct: false
  - id: d
    text: "Errors should be hidden so the user sees fewer messages."
    correct: false
explanation: "The module emphasizes separation of concerns: keep UI state in the frontend, app state in Rust where needed, return meaningful errors, and persist only small settings with the store plugin."
lesson_anchor: "lesson-3-persistent-data-can-live-in-a-local-store"
source_ids: ["TAURI-STATE", "TAURI-STORE", "RUST-BOOK-CH09"]
```

## What you can do now

- Distinguish frontend UI state from shared Rust state.
- Return clear `Result` values from Tauri commands.
- Use the Tauri store plugin for a small saved preference or setting.

## Sources

- [Tauri v2 — State Management](https://v2.tauri.app/develop/state-management/)
- [Tauri v2 — Store Plugin](https://v2.tauri.app/plugin/store/)
- [The Rust Programming Language — Error Handling](https://doc.rust-lang.org/book/ch09-00-error-handling.html)
