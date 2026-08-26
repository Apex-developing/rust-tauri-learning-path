---
id: "01"
slug: setup-and-first-run
title: "Setup and First Run"
description: "Install the tools, use a terminal, create a project, and run it locally."
estimated_minutes: 35
prerequisites: ["00"]
source_ids: ["RUST-BOOK-INSTALL", "CARGO-FIRST", "TAURI-START"]
quiz:
  required_score: 100
  question_count: 8
  passing_rule: exact-match
---

# Setup and First Run

## Goal

By the end of this module, you can verify Rust, create a Cargo project, and scaffold a Tauri project.

## Lesson 1: The terminal is a text interface

A **terminal** lets you give commands to your operating system by typing text. The current folder is called the working directory. The command prompt symbol, such as `$` in many examples, is not part of the command you type.

Rust is installed and managed with `rustup`. After installation, verify that the compiler is available:

```sh
rustc --version
```

`rustc` is the Rust compiler. `rustup` manages installed Rust toolchains and can update them with `rustup update`.

### Remember

Type the command after the prompt symbol, not the prompt symbol itself.

## Lesson 2: Cargo manages Rust projects

**Cargo** is Rust's build tool and package manager. It creates projects, compiles code, runs programs, adds dependencies, and runs tests.

Create a small Rust application with:

```sh
cargo new hello_rust
cd hello_rust
cargo run
```

`cargo new` creates a project folder. `cargo run` builds the project when necessary and then runs the resulting program. A new application package includes `Cargo.toml`, which describes the package, and `src/main.rs`, which contains the program entry point.

## Lesson 3: Create a Tauri project

Tauri provides `create-tauri-app` to scaffold a project. It asks you to choose a frontend language, package manager, UI template, and other options. For this course, choose TypeScript.

```sh
npm create tauri-app@latest
```

The resulting project has a frontend area and a `src-tauri` directory for Rust and Tauri configuration. Use the generated project's package-manager scripts to start development; the exact command is shown by the scaffolded project.

Do not run commands you do not understand from an untrusted source. Official documentation is the source for the setup commands used in this course.

## Check your understanding

```quiz
id: "01-q01"
type: multiple-choice
prompt: "What does `rustc --version` help you verify?"
select: single
options:
  - id: a
    text: "That the Rust compiler is available and reports its version"
    correct: true
  - id: b
    text: "That a Tauri app has been published"
    correct: false
  - id: c
    text: "That a GitHub Pages site is online"
    correct: false
  - id: d
    text: "That every Cargo test has passed"
    correct: false
explanation: "`rustc --version` prints information about the installed Rust compiler, making it a useful installation check."
lesson_anchor: "lesson-1-the-terminal-is-a-text-interface"
source_ids: ["RUST-BOOK-INSTALL"]
```

```quiz
id: "01-q02"
type: multiple-choice
prompt: "Which statements about `rustup` are correct?"
select: multiple
options:
  - id: a
    text: "It manages Rust versions and associated tools."
    correct: true
  - id: b
    text: "`rustup update` updates an installation managed by rustup."
    correct: true
  - id: c
    text: "It is the filename of every Rust source file."
    correct: false
  - id: d
    text: "It renders the HTML frontend in a Tauri WebView."
    correct: false
explanation: "rustup is the standard toolchain manager. It is separate from source files and from Tauri's WebView."
lesson_anchor: "lesson-1-the-terminal-is-a-text-interface"
source_ids: ["RUST-BOOK-INSTALL"]
```

```quiz
id: "01-q03"
type: multiple-choice
prompt: "Which command creates a new Cargo application project named `hello_rust`?"
select: single
options:
  - id: a
    text: "cargo new hello_rust"
    correct: true
  - id: b
    text: "rustc new hello_rust"
    correct: false
  - id: c
    text: "cargo run hello_rust"
    correct: false
  - id: d
    text: "rustup hello_rust"
    correct: false
explanation: "`cargo new <name>` creates a new Cargo package. `cargo run` runs a project that already exists."
lesson_anchor: "lesson-2-cargo-manages-rust-projects"
source_ids: ["CARGO-FIRST"]
```

```quiz
id: "01-q04"
type: multiple-choice
prompt: "Which files or folders are normally created for a new Cargo application package?"
select: multiple
options:
  - id: a
    text: "A `Cargo.toml` manifest"
    correct: true
  - id: b
    text: "A `src/main.rs` entry-point source file"
    correct: true
  - id: c
    text: "A mandatory `index.php` file"
    correct: false
  - id: d
    text: "A generated production installer"
    correct: false
explanation: "A new binary Cargo package includes its manifest and `src/main.rs`. It does not create a PHP file or a production installer."
lesson_anchor: "lesson-2-cargo-manages-rust-projects"
source_ids: ["CARGO-FIRST"]
```

```quiz
id: "01-q05"
type: multiple-choice
prompt: "What does `cargo run` do for a Cargo application project?"
select: single
options:
  - id: a
    text: "Builds the project if needed and runs the resulting program"
    correct: true
  - id: b
    text: "Only opens Cargo documentation in a browser"
    correct: false
  - id: c
    text: "Uninstalls Rust"
    correct: false
  - id: d
    text: "Creates a new Tauri capability file"
    correct: false
explanation: "Cargo's `run` command compiles as needed and then starts the program."
lesson_anchor: "lesson-2-cargo-manages-rust-projects"
source_ids: ["CARGO-FIRST"]
```

```quiz
id: "01-q06"
type: multiple-choice
prompt: "Why does a Rust installation sometimes also need a linker or C compiler?"
select: single
options:
  - id: a
    text: "A linker joins compiled outputs into an executable, and some packages depend on C code."
    correct: true
  - id: b
    text: "Rust source files can only be written in C."
    correct: false
  - id: c
    text: "A linker creates multiple-choice questions."
    correct: false
  - id: d
    text: "Tauri does not use compiled code."
    correct: false
explanation: "Rust uses a linker to produce final binaries. A C compiler is also useful when a dependency includes C code."
lesson_anchor: "lesson-1-the-terminal-is-a-text-interface"
source_ids: ["RUST-BOOK-INSTALL"]
```

```quiz
id: "01-q07"
type: multiple-choice
prompt: "Which statement about `create-tauri-app` is correct?"
select: single
options:
  - id: a
    text: "It scaffolds a Tauri project and lets you choose frontend options."
    correct: true
  - id: b
    text: "It compiles any Rust code without a project."
    correct: false
  - id: c
    text: "It is a replacement for the Rust compiler."
    correct: false
  - id: d
    text: "It automatically publishes an app to every app store."
    correct: false
explanation: "create-tauri-app is a project scaffold. It guides you through frontend and project choices; it does not replace compilation or publish apps automatically."
lesson_anchor: "lesson-3-create-a-tauri-project"
source_ids: ["TAURI-START"]
```

```quiz
id: "01-q08"
type: multiple-choice
prompt: "Which statements are safe setup habits?"
select: multiple
options:
  - id: a
    text: "Use commands from the official documentation for this course."
    correct: true
  - id: b
    text: "Read a command before running it, especially if it downloads or executes a script."
    correct: true
  - id: c
    text: "Run any command from an unknown message because it mentions Rust."
    correct: false
  - id: d
    text: "Treat a terminal prompt symbol as mandatory text to copy into every command."
    correct: false
explanation: "Official sources and understanding a command are safer habits. The `$` in many examples is only a prompt marker."
lesson_anchor: "lesson-3-create-a-tauri-project"
source_ids: ["RUST-BOOK-INSTALL", "TAURI-START"]
```

## What you can do now

- Verify a Rust installation and understand the role of rustup.
- Create and run a basic Cargo application.
- Recognise the frontend and `src-tauri` areas of a scaffolded Tauri project.

## Sources

- [The Rust Programming Language — Installation](https://doc.rust-lang.org/stable/book/ch01-01-installation.html)
- [The Cargo Book — Getting Started](https://doc.rust-lang.org/cargo/getting-started/first-steps.html)
- [Tauri v2 — Create a Project](https://v2.tauri.app/start/create-project/)
