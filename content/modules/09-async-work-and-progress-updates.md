---
id: "09"
slug: async-work-and-progress-updates
title: "Async Work and Progress Updates"
description: "Choose between ordinary async work and blocking work, then communicate progress without freezing the UI."
estimated_minutes: 40
prerequisites: ["08"]
source_ids: ["RUST-ASYNC-INTRO", "TAURI-CALL-FRONTEND", "TAURI-ASYNC-RUNTIME"]
quiz:
  required_score: 100
  question_count: 12
  passing_rule: exact-match
---

# Async Work and Progress Updates

## Goal

By the end of this module, you can distinguish asynchronous Rust work from blocking work, and explain how Tauri uses events to communicate progress updates without freezing the frontend.

## Lesson 1: Async work is different from blocking work

A program spends time on different kinds of tasks. Some operations are naturally asynchronous: they request work, wait for a result, and continue when the result is available. This is common in I/O, waiting for a network response, or a background task that should not stop the rest of the app.

Rust's async model is about tasks that can pause and resume without blocking the whole thread. The Rust Async Book describes async work as a way to write code that yields control while waiting for I/O or other asynchronous work to complete. This is different from code that holds a thread busy for a long time.

```rust
async fn fetch_data() -> String {
    "ready".to_string()
}
```

A blocking operation keeps a thread occupied until it is done. If a task blocks the UI thread, the interface may freeze. A Tauri app should avoid long blocking operations in the frontend or the UI path when a smoother experience is expected.

### Remember

Async work can wait without stopping the whole app; blocking work can freeze the interface when it occupies the main thread for too long.

## Lesson 2: Tauri can send events back to the frontend

The Rust side of a Tauri app can notify the frontend by emitting events. The official Tauri documentation describes events as a way for Rust to send small payloads to the web frontend. This is useful for progress updates, statuses, or short notifications.

```ts
import { listen } from "@tauri-apps/api/event";

await listen("download-progress", (event) => {
  console.log("Progress:", event.payload);
});
```

```rust
use tauri::{AppHandle, Emitter};

#[tauri::command]
fn start_download(app: AppHandle) {
    app.emit("download-progress", 25).unwrap();
    app.emit("download-progress", 75).unwrap();
    app.emit("download-progress", 100).unwrap();
}
```

The frontend listens for these event names and updates the UI when progress changes. This keeps the app responsive because the event loop remains available to the interface while the background work continues.

### Remember

Use Tauri events when Rust needs to report progress or short status updates to the frontend.

## Lesson 3: Progress updates help the user understand work

When a task takes time, a user should see progress instead of a frozen screen. A simple progress bar, spinner, or text update can communicate that the app is still working. Tauri events are a natural fit for this because they can be sent repeatedly while a long-running task proceeds.

```ts
await listen<number>("download-progress", (event) => {
  const percent = event.payload;
  console.log(`download is ${percent}% complete`);
});
```

This pattern is especially useful for file processing, long computations, or work that may take several seconds. It does not remove the need for efficient code, but it improves clarity and user trust.

### Remember

Progress events help users understand a long-running task without making the interface feel stuck.

## Check your understanding

```quiz
id: "09-q01"
type: multiple-choice
prompt: "Which statement best describes async work in Rust?"
select: single
options:
  - id: a
    text: "It allows a task to pause and resume without necessarily blocking the whole thread."
    correct: true
  - id: b
    text: "It always makes code run faster than synchronous code."
    correct: false
  - id: c
    text: "It only works in JavaScript, not Rust."
    correct: false
  - id: d
    text: "It removes the need for any progress reporting."
    correct: false
explanation: "Async work in Rust can wait for an operation without permanently blocking the rest of the program, which is different from a full thread block."
lesson_anchor: "lesson-1-async-work-is-different-from-blocking-work"
source_ids: ["RUST-ASYNC-INTRO"]
```

```quiz
id: "09-q02"
type: multiple-choice
prompt: "What is the main risk of blocking the UI thread for too long?"
select: single
options:
  - id: a
    text: "The interface can freeze and stop responding to the user."
    correct: true
  - id: b
    text: "The compiler immediately stops building the app."
    correct: false
  - id: c
    text: "Every button becomes invisible."
    correct: false
  - id: d
    text: "The app automatically restarts."
    correct: false
explanation: "When a long task blocks the main UI path, the user can no longer interact with the app because the interface stops updating and responding."
lesson_anchor: "lesson-1-async-work-is-different-from-blocking-work"
source_ids: ["RUST-ASYNC-INTRO", "TAURI-ASYNC-RUNTIME"]
```

```quiz
id: "09-q03"
type: multiple-choice
prompt: "Which statement about a blocking operation is correct?"
select: single
options:
  - id: a
    text: "It can keep a thread busy until the operation completes, sometimes making the UI feel stuck."
    correct: true
  - id: b
    text: "It always runs in parallel with the frontend."
    correct: false
  - id: c
    text: "It is the same thing as a progress event."
    correct: false
  - id: d
    text: "It never needs a runtime."
    correct: false
explanation: "Blocking work holds the thread until completion; if that thread is the UI thread, the app can appear frozen."
lesson_anchor: "lesson-1-async-work-is-different-from-blocking-work"
source_ids: ["RUST-ASYNC-INTRO", "TAURI-ASYNC-RUNTIME"]
```

```quiz
id: "09-q04"
type: multiple-choice
prompt: "What is Tauri's event system mainly used for in this module?"
select: single
options:
  - id: a
    text: "Sending small status updates or progress notifications from Rust to the frontend."
    correct: true
  - id: b
    text: "Replacing the entire Rust compiler."
    correct: false
  - id: c
    text: "Compiling TypeScript into CSS."
    correct: false
  - id: d
    text: "Writing files directly to disk without a command."
    correct: false
explanation: "Tauri events are a simple way to deliver progressive updates from the Rust side to the frontend without blocking the UI."
lesson_anchor: "lesson-2-tauri-can-send-events-back-to-the-frontend"
source_ids: ["TAURI-CALL-FRONTEND"]
```

```quiz
id: "09-q05"
type: multiple-choice
prompt: 'Which frontend code correctly listens for a Tauri event named `download-progress`?'
select: single
options:
  - id: a
    text: '`await listen("download-progress", (event) => console.log(event.payload));`'
    correct: true
  - id: b
    text: '`cargo run download-progress`'
    correct: false
  - id: c
    text: '`listen("download-progress")` in a Rust file only'
    correct: false
  - id: d
    text: '`window.alert("download-progress")` with no event listener'
    correct: false
explanation: 'The frontend listens for a named event and receives payload data whenever the Rust side emits it.'
lesson_anchor: 'lesson-2-tauri-can-send-events-back-to-the-frontend'
source_ids: ['TAURI-CALL-FRONTEND']
```

```quiz
id: "09-q06"
type: multiple-choice
prompt: 'How does the Rust side emit progress updates to the frontend in Tauri?'
select: single
options:
  - id: a
    text: 'Using `app.emit("event-name", payload)` or another emitter method.'
    correct: true
  - id: b
    text: 'By editing the `.gitignore` file.'
    correct: false
  - id: c
    text: 'By calling `println!` once and not emitting anything.'
    correct: false
  - id: d
    text: 'By returning a CSS variable to the browser.'
    correct: false
explanation: 'Tauri exposes emitter APIs so Rust can send events with payloads such as percentages or status messages.'
lesson_anchor: 'lesson-2-tauri-can-send-events-back-to-the-frontend'
source_ids: ['TAURI-CALL-FRONTEND']
```

```quiz
id: "09-q07"
type: multiple-choice
prompt: "Why are progress updates useful in a Tauri app?"
select: single
options:
  - id: a
    text: "They tell the user that work is ongoing without leaving the interface unresponsive."
    correct: true
  - id: b
    text: "They replace all async logic in Rust."
    correct: false
  - id: c
    text: "They remove the need for the frontend to handle any errors."
    correct: false
  - id: d
    text: "They automatically save all files to disk."
    correct: false
explanation: "Progress updates improve user trust and clarity when a task takes time, especially when the UI should still remain interactive."
lesson_anchor: "lesson-3-progress-updates-help-the-user-understand-work"
source_ids: ["TAURI-CALL-FRONTEND"]
```

```quiz
id: "09-q08"
type: multiple-choice
prompt: "Which pattern is a good way to show work progress in the UI?"
select: single
options:
  - id: a
    text: "Listen to a progress event and update a progress bar or text label with the new percentage."
    correct: true
  - id: b
    text: "Hide all progress and show a blank screen until the task is done."
    correct: false
  - id: c
    text: "Restart the app after every progress update."
    correct: false
  - id: d
    text: "Use only CSS transitions and no event data."
    correct: false
explanation: "A progress bar or label is a common, clear way to reflect the event payload the backend sends to the frontend."
lesson_anchor: "lesson-3-progress-updates-help-the-user-understand-work"
source_ids: ["TAURI-CALL-FRONTEND"]
```

```quiz
id: "09-q09"
type: multiple-choice
prompt: "Which statement about async tasks and progress notifications is most accurate?"
select: single
options:
  - id: a
    text: "Async or background work can still use progress events so the user sees ongoing activity while the app stays responsive."
    correct: true
  - id: b
    text: "All async tasks must freeze the frontend completely."
    correct: false
  - id: c
    text: "Progress notifications are only available in CSS."
    correct: false
  - id: d
    text: "The frontend cannot receive status updates from Rust."
    correct: false
explanation: "Asynchronous work often runs in the background while the frontend keeps listening for events and updating the screen."
lesson_anchor: "lesson-3-progress-updates-help-the-user-understand-work"
source_ids: ["TAURI-CALL-FRONTEND", "RUST-ASYNC-INTRO"]
```

```quiz
id: "09-q10"
type: multiple-choice
prompt: "Which scenario would most likely benefit from a progress event?"
select: single
options:
  - id: a
    text: "A long file download or a large processing task that takes several seconds."
    correct: true
  - id: b
    text: "A variable declaration in a tiny Rust function."
    correct: false
  - id: c
    text: "A CSS border radius change."
    correct: false
  - id: d
    text: "A button click that finishes immediately."
    correct: false
explanation: "Long tasks benefit from progress updates because they let the user see that the work is ongoing and that the app is still active."
lesson_anchor: "lesson-3-progress-updates-help-the-user-understand-work"
source_ids: ["TAURI-CALL-FRONTEND"]
```

```quiz
id: "09-q11"
type: multiple-choice
prompt: "Which task would be a poor fit for a UI blocking approach?"
select: single
options:
  - id: a
    text: "A long file processing job on the main UI thread"
    correct: true
  - id: b
    text: "A short immediate click handler"
    correct: false
  - id: c
    text: "A simple value assignment"
    correct: false
  - id: d
    text: "Displaying a constant label"
    correct: false
explanation: "Long tasks on the main UI thread risk freezing the app, whereas short operations are usually fine without a progress event."
lesson_anchor: "lesson-1-async-work-is-different-from-blocking-work"
source_ids: ["RUST-ASYNC-INTRO", "TAURI-ASYNC-RUNTIME"]
```

```quiz
id: "09-q12"
type: multiple-choice
prompt: "Which summary statement best matches this module?"
select: single
options:
  - id: a
    text: "Async work avoids unnecessary blocking, and Tauri events let Rust report progress to the frontend so the UI stays responsive."
    correct: true
  - id: b
    text: "All work should be blocking because it is easier to reason about."
    correct: false
  - id: c
    text: "Events are only decorative and do not carry any useful data."
    correct: false
  - id: d
    text: "The UI should freeze during any long-running operation."
    correct: false
explanation: "A good app separates long-running work from the UI thread and uses events to communicate status updates so the user remains informed and the interface remains responsive."
lesson_anchor: "lesson-3-progress-updates-help-the-user-understand-work"
source_ids: ["RUST-ASYNC-INTRO", "TAURI-CALL-FRONTEND", "TAURI-ASYNC-RUNTIME"]
```

## What you can do now

- Explain the difference between async and blocking work in Rust.
- Recognize when a Tauri app should emit events to the frontend.
- Design progress feedback that keeps the user informed without freezing the interface.

## Sources

- [Asynchronous Programming in Rust — Introduction](https://rust-lang.github.io/async-book/)
- [Tauri v2 — Calling the Frontend from Rust](https://v2.tauri.app/develop/calling-frontend/)
- [Tauri v2 Rust API — Async Runtime](https://docs.rs/tauri/latest/tauri/async_runtime/)
