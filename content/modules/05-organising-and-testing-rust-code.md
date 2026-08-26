---
id: "05"
slug: organising-and-testing-rust-code
title: "Organising and Testing Rust Code"
description: "Organise code with modules and packages; write and run basic tests."
estimated_minutes: 25
prerequisites: ["04"]
source_ids: ["RUST-BOOK-CH07", "RUST-BOOK-CH11", "CARGO-TEST"]
quiz:
  required_score: 100
  question_count: 10
  passing_rule: exact-match
---

# Organising and Testing Rust Code

## Goal

By the end of this module, you can organise Rust code using packages, crates, modules, and paths, and write and run unit tests.

## Lesson 1: Packages and Crates

As your program grows, you should organise it. In Rust:
- A **crate** is a compilation unit. It is either a binary crate (which compiles into an executable program and has a `main` function) or a library crate (which contains code intended to be shared and reused by other projects).
- A **package** is one or more crates that provide a set of functionality. A package is defined by a `Cargo.toml` file that describes how to build those crates.

A package can contain at most one library crate, but can contain multiple binary crates by placing files in the `src/bin` directory. The main entry point of a binary crate is `src/main.rs`, and for a library crate it is `src/lib.rs`.

### Remember

A crate is a binary or a library; a package is defined by `Cargo.toml` and contains one or more crates.

## Lesson 2: Modules and Paths

Inside a crate, you use **modules** to group code together for readability and reuse. Modules also control the privacy of items (whether they can be used by external code or are private to their module).

To define a module, use the `mod` keyword:

```rust
mod garden {
    pub fn plant_flower() {
        // public function
    }

    fn water_plants() {
        // private function: only accessible inside this module
    }
}
```

By default, everything in Rust is private. To make a module, struct, or function accessible outside its immediate scope, you must add the `pub` keyword.

To call a function inside a module, you use a **path**. A path can be:
- **Absolute**: starts from the crate root using `crate::garden::plant_flower()`.
- **Relative**: starts from the current module using `garden::plant_flower()`, or uses `super` to go up to the parent module scope.

To bring a path into scope so you do not have to repeat it, use the `use` keyword:

```rust
use crate::garden::plant_flower;

fn main() {
    plant_flower();
}
```

### Remember

Everything in Rust is private by default; use `pub` to expose items, and `use` to bring paths into scope.

## Lesson 3: Writing and Running Tests

Testing helps prove that your code does what you expect. A Rust test is a function annotated with the `#[test]` attribute.

To verify values in a test, use these macros:
- `assert!(condition)`: passes if the condition is `true`.
- `assert_eq!(left, right)`: passes if `left == right`.
- `assert_ne!(left, right)`: passes if `left != right`.

A standard unit test file structure looks like this:

```rust
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(2, 2), 4);
    }
}
```

The `#[cfg(test)]` attribute tells Rust to compile the `tests` module only when running `cargo test`. The `use super::*;` statement brings the functions of the outer module (like `add`) into the scope of the nested `tests` module.

Run tests in the terminal using Cargo:

```sh
cargo test
```

This compiles your code, runs all functions with `#[test]`, and reports which tests passed or failed.

### Remember

Mark test functions with `#[test]`, verify results with `assert_eq!`, and execute them using the `cargo test` command.

## Check your understanding

```quiz
id: "05-q01"
type: multiple-choice
prompt: "What is the difference between a crate and a package in Rust?"
select: multiple
options:
  - id: a
    text: "A crate is a binary or library compilation unit, while a package is defined by Cargo.toml and groups one or more crates."
    correct: true
  - id: b
    text: "A package is compiled into a single executable, whereas a crate cannot be compiled on its own."
    correct: false
  - id: c
    text: "A package can contain at most one library crate."
    correct: true
  - id: d
    text: "A package can contain multiple binary crates."
    correct: true
explanation: "A crate is a compilation unit (either binary or library). A package is a directory containing a Cargo.toml file and one or more crates. A package can have at most one library crate and zero or more binary crates."
lesson_anchor: "lesson-1-packages-and-crates"
source_ids: ["RUST-BOOK-CH07"]
```

```quiz
id: "05-q02"
type: multiple-choice
prompt: "Which file is the default entry point for a package's library crate?"
select: single
options:
  - id: a
    text: "src/main.rs"
    correct: false
  - id: b
    text: "src/lib.rs"
    correct: true
  - id: c
    text: "Cargo.toml"
    correct: false
  - id: d
    text: "src/bin.rs"
    correct: false
explanation: "By default, Cargo looks for src/lib.rs as the entry point for a library crate, and src/main.rs for a binary crate."
lesson_anchor: "lesson-1-packages-and-crates"
source_ids: ["RUST-BOOK-CH07"]
```

```quiz
id: "05-q03"
type: multiple-choice
prompt: "Which statements correctly describe module privacy in Rust?"
select: multiple
options:
  - id: a
    text: "All items (functions, structs, modules) are private by default."
    correct: true
  - id: b
    text: "Adding `pub` before an item makes it public and accessible to other parts of the project."
    correct: true
  - id: c
    text: "Adding `pub` is optional because Rust code is public within the same package."
    correct: false
  - id: d
    text: "Private functions can still be called from parent modules without any keywords."
    correct: false
explanation: "In Rust, all items are private by default. You must explicitly add the `pub` keyword to make them public. A parent module cannot access private items inside its child modules."
lesson_anchor: "lesson-2-modules-and-paths"
source_ids: ["RUST-BOOK-CH07"]
```

```quiz
id: "05-q04"
type: multiple-choice
prompt: "How can you refer to an item from the parent module inside a nested child module?"
select: single
options:
  - id: a
    text: "By using the `super` keyword at the start of the path."
    correct: true
  - id: b
    text: "By using the `parent` keyword."
    correct: false
  - id: c
    text: "By using the `self` keyword."
    correct: false
  - id: d
    text: "It is impossible; child modules can never reference parent items."
    correct: false
explanation: "The `super` keyword allows you to construct a relative path starting from the parent module, making it easy to access sibling or parent scope items."
lesson_anchor: "lesson-2-modules-and-paths"
source_ids: ["RUST-BOOK-CH07"]
```

```quiz
id: "05-q05"
type: multiple-choice
prompt: "What is the purpose of the `use` keyword?"
select: single
options:
  - id: a
    text: "It brings a path into the current scope so you can call items directly without writing out the full path."
    correct: true
  - id: b
    text: "It compiles a separate crate."
    correct: false
  - id: c
    text: "It declares a new sub-module."
    correct: false
  - id: d
    text: "It defines a macro to test variables."
    correct: false
explanation: "The `use` keyword creates a shortcut to an item, bringing its path into the current scope so that you do not have to write absolute or long relative paths every time."
lesson_anchor: "lesson-2-modules-and-paths"
source_ids: ["RUST-BOOK-CH07"]
```

```quiz
id: "05-q06"
type: multiple-choice
prompt: "What attribute must be placed above a function to mark it as a test function?"
select: single
options:
  - id: a
    text: "`#[test]`"
    correct: true
  - id: b
    text: "`#[cfg(test)]`"
    correct: false
  - id: c
    text: "`#[assert]`"
    correct: false
  - id: d
    text: "`#[run]`"
    correct: false
explanation: "`#[test]` is the attribute that tells the compiler a function is a test, while `#[cfg(test)]` is placed above modules to compile them conditionally."
lesson_anchor: "lesson-3-writing-and-running-tests"
source_ids: ["RUST-BOOK-CH11"]
```

```quiz
id: "05-q07"
type: multiple-choice
prompt: "Which macros can you use to write assertions in Rust tests?"
select: multiple
options:
  - id: a
    text: "`assert!`"
    correct: true
  - id: b
    text: "`assert_eq!`"
    correct: true
  - id: c
    text: "`assert_ne!`"
    correct: true
  - id: d
    text: "`assert_match!`"
    correct: false
explanation: "Rust provides `assert!`, `assert_eq!`, and `assert_ne!` in its standard library to check conditions and values within tests."
lesson_anchor: "lesson-3-writing-and-running-tests"
source_ids: ["RUST-BOOK-CH11"]
```

```quiz
id: "05-q08"
type: multiple-choice
prompt: "What does the `#[cfg(test)]` attribute do?"
select: single
options:
  - id: a
    text: "It tells the compiler to compile the annotated module only when you run `cargo test`."
    correct: true
  - id: b
    text: "It configuration-checks whether a variable is valid."
    correct: false
  - id: c
    text: "It marks a single function as an integration test."
    correct: false
  - id: d
    text: "It creates a new package configuration."
    correct: false
explanation: "`#[cfg(test)]` tells Rust to compile the associated module conditionally, saving compile time and binary size when you build the application normally."
lesson_anchor: "lesson-3-writing-and-running-tests"
source_ids: ["RUST-BOOK-CH11"]
```

```quiz
id: "05-q09"
type: multiple-choice
prompt: "What statement is commonly used inside a test module `tests` to access functions from the parent module?"
select: single
options:
  - id: a
    text: "`use super::*;`"
    correct: true
  - id: b
    text: "`use crate::*;`"
    correct: false
  - id: c
    text: "`mod parent;`"
    correct: false
  - id: d
    text: "`pub use self;`"
    correct: false
explanation: "Because the `tests` module is a separate nested module, using `use super::*;` is a convenient way to bring all items from the parent module into the test scope."
lesson_anchor: "lesson-3-writing-and-running-tests"
source_ids: ["RUST-BOOK-CH11"]
```

```quiz
id: "05-q10"
type: multiple-choice
prompt: "Which command runs all tests defined in a Rust package?"
select: single
options:
  - id: a
    text: "`cargo run`"
    correct: false
  - id: b
    text: "`cargo test`"
    correct: true
  - id: c
    text: "`cargo build --test`"
    correct: false
  - id: d
    text: "`rustc test`"
    correct: false
explanation: "`cargo test` compiles and runs all test targets in the package, printing the execution log of each test function."
lesson_anchor: "lesson-3-writing-and-running-tests"
source_ids: ["CARGO-TEST"]
```

## What you can do now

- Organise your Rust projects into multiple files using the `mod` keyword.
- Control the visibility of variables, structs, and functions using the `pub` keyword.
- Write unit tests using `#[test]` and assert values using `assert_eq!`.
- Run your tests locally using `cargo test`.

## Sources

- [The Rust Programming Language — Managing Growing Projects with Packages, Crates, and Modules](https://doc.rust-lang.org/stable/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html)
- [The Rust Programming Language — Automated Tests](https://doc.rust-lang.org/stable/book/ch11-00-testing.html)
- [The Cargo Book — cargo test](https://doc.rust-lang.org/cargo/commands/cargo-test.html)
