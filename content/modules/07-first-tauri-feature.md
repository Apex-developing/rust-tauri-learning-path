---
id: "07"
slug: first-tauri-feature
title: "First Tauri Feature: Frontend to Rust"
description: "Call a Rust command from the frontend, pass typed data, and display a result."
estimated_minutes: 35
prerequisites: ["06"]
source_ids: ["TAURI-CALL-RUST", "SERDE-OVERVIEW"]
quiz:
  required_score: 100
  question_count: 12
  passing_rule: exact-match
---

# First Tauri Feature: Frontend to Rust

## Goal

By the end of this module, you can call a Rust command from the TypeScript frontend, pass JSON-compatible data, and display the returned result.

## Lesson 1: The frontend calls a Rust command

A Tauri app often keeps user-visible logic in the frontend and work that should happen in the system core in Rust. The frontend uses `invoke` to call a Rust command by name. The Rust command must be registered with `#[tauri::command]` and added to the app's `invoke_handler`.

```ts
import { invoke } from "@tauri-apps/api/core";

const message = await invoke<string>("greet", { name: "Ada" });
console.log(message);
```

This call sends a request from the frontend to Rust. The command name string must match the function name you registered in the Rust backend.

```rust
#[tauri::command]
fn greet(name: String) -> String {
    format!("Hello, {name}!")
}
```

### Remember

Use `invoke("command-name", { ... })` from the frontend to trigger a Rust command that you registered in the Tauri app.

## Lesson 2: Rust commands can accept data

The frontend can pass arguments as a JavaScript object. Those values are converted into Rust data with Serde-compatible deserialization. This means common JSON-friendly values such as strings, numbers, booleans, arrays, and structs work well when the Rust side expects matching types.

```ts
await invoke("save_profile", {
  userName: "Ada",
  isAdmin: true,
  score: 42
});
```

```rust
#[tauri::command]
fn save_profile(user_name: String, is_admin: bool, score: i32) {
    println!("{user_name}: {is_admin} => {score}");
}
```

The exact property names are part of the contract between the frontend and the Rust function. In Tauri examples, object keys are often written in camelCase to match Rust parameter names.

### Remember

Command arguments are passed as a JSON object, and Rust receives them as typed values that can be deserialized.

## Lesson 3: Commands can return values and errors

Commands can return data to the frontend. The `invoke` call returns a Promise that resolves with the Rust result. If a command returns a `Result`, the Promise resolves on success and rejects on an error.

```ts
try {
  const result = await invoke<string>("login", {
    user: "tauri",
    password: "secret"
  });

  console.log(result);
} catch (error) {
  console.error(error);
}
```

```rust
#[tauri::command]
fn login(user: String, password: String) -> Result<String, String> {
    if user == "tauri" && password == "secret" {
        Ok("logged_in".to_string())
    } else {
        Err("invalid credentials".to_string())
    }
}
```

The return value and the error type must be serializable. In simple cases, `String` is enough. This keeps the frontend easy to read and makes the error path explicit.

### Remember

A Tauri command can return strings, numbers, objects, or `Result<T, E>`, and the frontend receives that result through `await invoke(...)`.

## Check your understanding

```quiz
id: "07-q01"
type: multiple-choice
prompt: 'What does the frontend use to trigger a Rust function in a Tauri app?'
select: single
options:
  - id: a
    text: 'The `invoke` function'
    correct: true
  - id: b
    text: 'The `cargo run` command'
    correct: false
  - id: c
    text: 'The `rustc` compiler'
    correct: false
  - id: d
    text: 'The HTML `<script>` tag alone'
    correct: false
explanation: 'The frontend calls a Rust command through the Tauri `invoke` API, which sends a request to the registered command handler.'
lesson_anchor: 'lesson-1-the-frontend-calls-a-rust-command'
source_ids: ['TAURI-CALL-RUST']
```

```quiz
id: "07-q02"
type: multiple-choice
prompt: 'Which Rust declaration exposes a function to the frontend as a Tauri command?'
select: single
options:
  - id: a
    text: '`#[tauri::command]` before the function'
    correct: true
  - id: b
    text: '`#[derive(Debug)]` before the function'
    correct: false
  - id: c
    text: '`fn main() {}` wrapping the function'
    correct: false
  - id: d
    text: 'A `struct` with the same name'
    correct: false
explanation: 'Tauri commands are registered by annotating a Rust function with `#[tauri::command]`.'
lesson_anchor: 'lesson-1-the-frontend-calls-a-rust-command'
source_ids: ['TAURI-CALL-RUST']
```

```quiz
id: "07-q03"
type: multiple-choice
prompt: 'Which code registers a command named `greet` with the Tauri app?'
select: single
options:
  - id: a
    text: '`tauri::generate_handler![greet]` inside `invoke_handler(...)`'
    correct: true
  - id: b
    text: '`cargo new greet` inside the frontend file'
    correct: false
  - id: c
    text: '`invoke("greet")` inside the Rust compiler'
    correct: false
  - id: d
    text: 'A `const` variable named `greet`'
    correct: false
explanation: 'The app builder registers commands with `invoke_handler(tauri::generate_handler![greet])` so the frontend can call them by name.'
lesson_anchor: 'lesson-1-the-frontend-calls-a-rust-command'
source_ids: ['TAURI-CALL-RUST']
```

```quiz
id: "07-q04"
type: multiple-choice
prompt: 'Which frontend call invokes the Rust command `greet` with the argument `name: "Ada"`?'
select: single
options:
  - id: a
    text: '`invoke("greet", { name: "Ada" })`'
    correct: true
  - id: b
    text: '`invoke("greet")` with `name` in a CSS file'
    correct: false
  - id: c
    text: '`greet("Ada")` in a Rust file'
    correct: false
  - id: d
    text: '`cargo run greet Ada`'
    correct: false
explanation: 'The frontend passes arguments as a JavaScript object to `invoke`, which Tauri sends to the matching Rust command.'
lesson_anchor: 'lesson-2-rust-commands-can-accept-data'
source_ids: ['TAURI-CALL-RUST']
```

```quiz
id: "07-q05"
type: multiple-choice
prompt: 'Which statement about command arguments is correct?'
select: single
options:
  - id: a
    text: 'The frontend passes JSON-compatible values, and Rust receives typed values after deserialization.'
    correct: true
  - id: b
    text: 'Rust arguments are always strings no matter what the frontend sends.'
    correct: false
  - id: c
    text: 'The frontend cannot send booleans to a Rust command.'
    correct: false
  - id: d
    text: 'Arguments are stored in a database automatically.'
    correct: false
explanation: 'Tauri can deserialize JSON-compatible frontend data into Rust argument types, as long as those types are supported by Serde.'
lesson_anchor: 'lesson-2-rust-commands-can-accept-data'
source_ids: ['TAURI-CALL-RUST', 'SERDE-OVERVIEW']
```

```quiz
id: "07-q06"
type: multiple-choice
prompt: 'Which Rust function signature correctly matches a frontend call like `invoke("save_profile", { userName: "Ada", isAdmin: true, score: 42 })`?'
select: single
options:
  - id: a
    text: '`fn save_profile(user_name: String, is_admin: bool, score: i32) -> ()`'
    correct: true
  - id: b
    text: '`fn save_profile(userName: String, isAdmin: bool, score: String)`'
    correct: false
  - id: c
    text: '`fn save_profile(user_name: bool, is_admin: String, score: f32)`'
    correct: false
  - id: d
    text: '`fn save_profile()` with no parameters'
    correct: false
explanation: 'The frontend can send a structured object; the Rust function receives matching typed parameters and can deserialize JSON-compatible data into them.'
lesson_anchor: 'lesson-2-rust-commands-can-accept-data'
source_ids: ['TAURI-CALL-RUST']
```

```quiz
id: "07-q07"
type: multiple-choice
prompt: 'What does a command return to the frontend?'
select: single
options:
  - id: a
    text: 'A value that can be serialized for the frontend, or a `Result` that resolves or rejects'
    correct: true
  - id: b
    text: 'Only a HTML string'
    correct: false
  - id: c
    text: 'Only a compiler warning'
    correct: false
  - id: d
    text: 'A browser window object'
    correct: false
explanation: 'A command can return serializable data, and if it returns `Result`, successful values resolve while errors reject the promise.'
lesson_anchor: 'lesson-3-commands-can-return-values-and-errors'
source_ids: ['TAURI-CALL-RUST']
```

```quiz
id: "07-q08"
type: multiple-choice
prompt: 'Which statement about `Result` in a Tauri command is correct?'
select: single
options:
  - id: a
    text: '`Ok(...)` resolves the `invoke` promise, while `Err(...)` rejects it.'
    correct: true
  - id: b
    text: '`Result` is only used for CSS layout errors.'
    correct: false
  - id: c
    text: '`Result` is ignored by the frontend and always logs nothing.'
    correct: false
  - id: d
    text: '`Err(...)` always changes the browser theme.'
    correct: false
explanation: 'If a Tauri command returns a `Result`, the frontend receives a resolved promise for success and a rejected promise for error cases.'
lesson_anchor: 'lesson-3-commands-can-return-values-and-errors'
source_ids: ['TAURI-CALL-RUST']
```

```quiz
id: "07-q09"
type: multiple-choice
prompt: 'Which TypeScript pattern is a correct way to handle a command result and failure?'
select: single
options:
  - id: a
    text: '`try { const result = await invoke<string>("login", payload); } catch (error) { ... }`'
    correct: true
  - id: b
    text: '`invoke("login")` without `await` and without a catch block'
    correct: false
  - id: c
    text: '`return invoke("login")` in a CSS file'
    correct: false
  - id: d
    text: '`console.log("login")` only; no `invoke` call is needed'
    correct: false
explanation: 'The usual pattern is to call `await invoke(...)` in an async function and handle errors in a `try/catch` block.'
lesson_anchor: 'lesson-3-commands-can-return-values-and-errors'
source_ids: ['TAURI-CALL-RUST']
```

```quiz
id: "07-q10"
type: multiple-choice
prompt: 'Which statements about Serde are correct?'
select: multiple
options:
  - id: a
    text: 'It helps Rust data structures serialize and deserialize data.'
    correct: true
  - id: b
    text: 'JSON is a common format used with Serde.'
    correct: true
  - id: c
    text: 'It is a frontend-only library for CSS.'
    correct: false
  - id: d
    text: 'It turns every Rust program into a browser window.'
    correct: false
explanation: 'Serde is the framework used to serialize and deserialize Rust data. It is commonly used with JSON when Tauri moves data between JavaScript and Rust.'
lesson_anchor: 'lesson-2-rust-commands-can-accept-data'
source_ids: ['SERDE-OVERVIEW', 'TAURI-CALL-RUST']
```

```quiz
id: "07-q11"
type: multiple-choice
prompt: 'Which Rust function is a valid Tauri command that returns a greeting string?'
select: single
options:
  - id: a
    text: '`#[tauri::command] fn greet(name: String) -> String { format!("Hello, {name}!") }`'
    correct: true
  - id: b
    text: '`fn greet(name: String) -> bool { name == "Ada" }`'
    correct: false
  - id: c
    text: '`let greet = "Hello";`'
    correct: false
  - id: d
    text: '`fn greet() {}` without the `#[tauri::command]` attribute'
    correct: false
explanation: 'A Tauri command is a Rust function with the `#[tauri::command]` attribute and an input/output shape that can be serialized.'
lesson_anchor: 'lesson-1-the-frontend-calls-a-rust-command'
source_ids: ['TAURI-CALL-RUST']
```

```quiz
id: "07-q12"
type: multiple-choice
prompt: 'Why is `String` or a custom serializable type often used as a command return type?'
select: single
options:
  - id: a
    text: 'Because the return value must be serializable for the frontend to receive it.'
    correct: true
  - id: b
    text: 'Because Rust cannot return anything from a command.'
    correct: false
  - id: c
    text: 'Because only CSS values may cross the frontend/backend boundary.'
    correct: false
  - id: d
    text: 'Because `invoke` only accepts HTML strings.'
    correct: false
explanation: 'The data returned from a Tauri command must be serializable so the frontend can receive it as JSON or another supported representation.'
lesson_anchor: 'lesson-3-commands-can-return-values-and-errors'
source_ids: ['TAURI-CALL-RUST', 'SERDE-OVERVIEW']
```

## What you can do now

- Invoke a Rust command from a TypeScript frontend with `invoke`.
- Pass JSON-compatible arguments and read them as typed Rust values.
- Return data or `Result<T, E>` from a command and handle the result in the UI.

## Sources

- [Tauri v2 — Calling Rust from the Frontend](https://v2.tauri.app/develop/calling-rust/)
- [Serde — Overview](https://serde.rs/)
