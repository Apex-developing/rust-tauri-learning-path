---
id: "02"
slug: rust-fundamentals
title: "Rust Fundamentals"
description: "Use variables, types, functions, conditions, and loops."
estimated_minutes: 45
prerequisites: ["01"]
source_ids: ["RUST-BOOK-CH03"]
quiz:
  required_score: 100
  question_count: 12
  passing_rule: exact-match
---

# Rust Fundamentals

## Goal

By the end of this module, you can read and write small Rust programs using variables, types, functions, conditions, and loops.

## Lesson 1: Bind values with `let`

Use `let` to bind a value to a name:

```rust
let language = "Rust";
```

Bindings are immutable by default. This does not mean Rust values can never change; it means that this particular binding cannot be assigned a new value. Add `mut` only when the binding needs to be reassigned.

```rust
let mut score = 0;
score = score + 1;
```

`const` defines a value that is always immutable, requires a type annotation, and must be initialized with a constant expression. Shadowing is different from mutation: writing a new `let` with the same name creates a new binding and may change its type.

### Remember

`let mut` permits reassignment; a second `let` creates a new binding.

## Lesson 2: Values have types

Rust is statically typed: the compiler must know the type of every value at compile time. It often infers the type from the value and how it is used.

Common scalar types are integers (`i32`, `u32`), floating-point numbers (`f64`, `f32`), booleans (`bool`), and Unicode scalar values (`char`). A `char` uses single quotes, while a string literal uses double quotes.

```rust
let count: u32 = 3;
let price = 4.5; // f64 by default
let ready: bool = true;
let icon: char = '✓';
let label = "Start";
```

Tuples group values that may have different types. Arrays have a fixed length and each element has the same type.

```rust
let item = ("book", 12);
let weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
```

## Lesson 3: Functions and expressions

Functions are declared with `fn`. Parameters must have types. A function's return type comes after `->` when it returns a value.

```rust
fn double(value: i32) -> i32 {
    value * 2
}
```

The last expression in a block is returned when it has no semicolon. Adding a semicolon turns it into a statement and changes this behavior.

```rust
fn label(is_ready: bool) -> &str {
    if is_ready { "Ready" } else { "Waiting" }
}
```

## Lesson 4: Choose and repeat with control flow

An `if` condition must evaluate to a `bool`. Because `if` is an expression, its branches can produce a value of the same type.

```rust
let message = if score >= 10 { "Passed" } else { "Try again" };
```

Use `loop` for repetition until you explicitly stop it, `while` while a condition stays true, and `for` to visit each value in an iterator or range.

```rust
for number in 1..=3 {
    println!("{number}");
}
```

The range `1..=3` includes both 1 and 3. The range `1..3` excludes 3.

## Check your understanding

```quiz
id: "02-q01"
type: multiple-choice
prompt: "What happens when this code is compiled? `let points = 1; points = 2;`"
select: single
options:
  - id: a
    text: "It fails because `points` is immutable by default."
    correct: true
  - id: b
    text: "It succeeds because all Rust bindings are mutable."
    correct: false
  - id: c
    text: "It creates a constant automatically."
    correct: false
  - id: d
    text: "It changes the type of `points` to `mut`."
    correct: false
explanation: "Bindings made with `let` are immutable unless `mut` is included."
lesson_anchor: "lesson-1-bind-values-with-let"
source_ids: ["RUST-BOOK-CH03"]
```

```quiz
id: "02-q02"
type: multiple-choice
prompt: "Which declarations create a mutable binding?"
select: multiple
options:
  - id: a
    text: "let mut total = 0;"
    correct: true
  - id: b
    text: "let total = 0;"
    correct: false
  - id: c
    text: "const TOTAL: i32 = 0;"
    correct: false
  - id: d
    text: "let mut name = String::from(\"Ada\");"
    correct: true
explanation: "Only bindings declared with `let mut` may be reassigned. Constants are always immutable."
lesson_anchor: "lesson-1-bind-values-with-let"
source_ids: ["RUST-BOOK-CH03"]
```

```quiz
id: "02-q03"
type: multiple-choice
prompt: "Which statements about a Rust `const` are correct?"
select: multiple
options:
  - id: a
    text: "It is always immutable."
    correct: true
  - id: b
    text: "Its declaration requires a type annotation."
    correct: true
  - id: c
    text: "It is declared with `let mut`."
    correct: false
  - id: d
    text: "It can only exist inside a function."
    correct: false
explanation: "Constants use `const`, are always immutable, need a type, and may be declared in any scope including global scope."
lesson_anchor: "lesson-1-bind-values-with-let"
source_ids: ["RUST-BOOK-CH03"]
```

```quiz
id: "02-q04"
type: multiple-choice
prompt: "Which code demonstrates shadowing rather than mutation?"
select: single
options:
  - id: a
    text: "let value = \"12\"; let value = value.len();"
    correct: true
  - id: b
    text: "let value = 12; value = 13;"
    correct: false
  - id: c
    text: "const value: i32 = 12; value = 13;"
    correct: false
  - id: d
    text: "let value: bool = 12;"
    correct: false
explanation: "A second `let` creates a new binding, which is shadowing. It can even bind a value of a different type."
lesson_anchor: "lesson-1-bind-values-with-let"
source_ids: ["RUST-BOOK-CH03"]
```

```quiz
id: "02-q05"
type: multiple-choice
prompt: "Which statements about Rust types are correct?"
select: multiple
options:
  - id: a
    text: "Rust is statically typed."
    correct: true
  - id: b
    text: "The compiler can often infer a type from context."
    correct: true
  - id: c
    text: "Every variable must always have a manually written type annotation."
    correct: false
  - id: d
    text: "A value has no type until the program finishes running."
    correct: false
explanation: "Rust must know types at compile time, but inference often supplies the information without an explicit annotation."
lesson_anchor: "lesson-2-values-have-types"
source_ids: ["RUST-BOOK-CH03"]
```

```quiz
id: "02-q06"
type: multiple-choice
prompt: "Which literals have the stated Rust type?"
select: multiple
options:
  - id: a
    text: "`true` can be a `bool`."
    correct: true
  - id: b
    text: "`'✓'` can be a `char`."
    correct: true
  - id: c
    text: "`\"✓\"` is a `char` literal."
    correct: false
  - id: d
    text: "`3.5` is an integer literal."
    correct: false
explanation: "Booleans use `true` or `false`; char literals use single quotes. Double quotes create a string literal, and 3.5 is floating-point."
lesson_anchor: "lesson-2-values-have-types"
source_ids: ["RUST-BOOK-CH03"]
```

```quiz
id: "02-q07"
type: multiple-choice
prompt: "Which statements correctly compare tuples and arrays?"
select: multiple
options:
  - id: a
    text: "A tuple can contain values with different types."
    correct: true
  - id: b
    text: "Every array element has the same type."
    correct: true
  - id: c
    text: "An array can grow automatically whenever an element is added."
    correct: false
  - id: d
    text: "A tuple can only contain integers."
    correct: false
explanation: "Tuples may mix types. Rust arrays are fixed length and use one element type."
lesson_anchor: "lesson-2-values-have-types"
source_ids: ["RUST-BOOK-CH03"]
```

```quiz
id: "02-q08"
type: multiple-choice
prompt: "Which function definition correctly accepts an `i32` and returns an `i32`?"
select: single
options:
  - id: a
    text: "fn double(value: i32) -> i32 { value * 2 }"
    correct: true
  - id: b
    text: "fn double(value) -> i32 { value * 2 }"
    correct: false
  - id: c
    text: "fn double(i32 value) { return i32 }"
    correct: false
  - id: d
    text: "function double(value: i32): i32 { value * 2 }"
    correct: false
explanation: "Rust functions use `fn`, typed parameters, and `->` before the return type."
lesson_anchor: "lesson-3-functions-and-expressions"
source_ids: ["RUST-BOOK-CH03"]
```

```quiz
id: "02-q09"
type: multiple-choice
prompt: "In `fn answer() -> i32 { 42 }`, why is `42` returned?"
select: single
options:
  - id: a
    text: "It is the final expression in the block and has no semicolon."
    correct: true
  - id: b
    text: "All numbers are automatically returned from every function."
    correct: false
  - id: c
    text: "The function has no return type."
    correct: false
  - id: d
    text: "A semicolon is required to return an expression."
    correct: false
explanation: "A block's last expression without a semicolon is its value. Here that value satisfies the `i32` return type."
lesson_anchor: "lesson-3-functions-and-expressions"
source_ids: ["RUST-BOOK-CH03"]
```

```quiz
id: "02-q10"
type: multiple-choice
prompt: "Which statements about a Rust `if` expression are correct?"
select: multiple
options:
  - id: a
    text: "Its condition must evaluate to `bool`."
    correct: true
  - id: b
    text: "Its branches can produce a value."
    correct: true
  - id: c
    text: "A number such as `1` is automatically treated as true."
    correct: false
  - id: d
    text: "The two branches may freely return unrelated types."
    correct: false
explanation: "Rust requires a Boolean condition. When an `if` is used as an expression, its branches must produce compatible types."
lesson_anchor: "lesson-4-choose-and-repeat-with-control-flow"
source_ids: ["RUST-BOOK-CH03"]
```

```quiz
id: "02-q11"
type: multiple-choice
prompt: "Which values are printed by `for number in 1..=3 { println!(\"{number}\"); }`?"
select: single
options:
  - id: a
    text: "1, 2, and 3"
    correct: true
  - id: b
    text: "1 and 2 only"
    correct: false
  - id: c
    text: "0, 1, 2, and 3"
    correct: false
  - id: d
    text: "Only 3"
    correct: false
explanation: "`..=` makes an inclusive range, so the end value 3 is included."
lesson_anchor: "lesson-4-choose-and-repeat-with-control-flow"
source_ids: ["RUST-BOOK-CH03"]
```

```quiz
id: "02-q12"
type: multiple-choice
prompt: "Which loop choice matches the described task?"
select: multiple
options:
  - id: a
    text: "Use `for` to visit each value in a collection or range."
    correct: true
  - id: b
    text: "Use `while` when repetition should continue while a Boolean condition is true."
    correct: true
  - id: c
    text: "Use `loop` only when Rust should run exactly once."
    correct: false
  - id: d
    text: "Use `if` to repeat a block automatically."
    correct: false
explanation: "`for` is suited to iterating values, `while` repeats while a condition holds, and `loop` repeats until explicitly stopped."
lesson_anchor: "lesson-4-choose-and-repeat-with-control-flow"
source_ids: ["RUST-BOOK-CH03"]
```

## What you can do now

- Bind and update values intentionally.
- Recognise common Rust types and compound values.
- Write a small function and use `if` and `for`.

## Sources

- [The Rust Programming Language — Common Programming Concepts](https://doc.rust-lang.org/stable/book/ch03-00-common-programming-concepts.html)
