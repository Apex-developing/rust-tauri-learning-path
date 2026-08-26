---
id: "03"
slug: ownership-references-and-slices
title: "Ownership, References, and Slices"
description: "Predict moves and borrows, then use immutable and mutable references safely."
estimated_minutes: 50
prerequisites: ["02"]
source_ids: ["RUST-BOOK-CH04"]
quiz:
  required_score: 100
  question_count: 12
  passing_rule: exact-match
---

# Ownership, References, and Slices

## Goal

By the end of this module, you can explain ownership and use references without breaking Rust's borrowing rules.

## Lesson 1: One owner at a time

Ownership is Rust's way of deciding who is responsible for cleaning up a value. Every value has an owner, there can be only one owner at a time, and a value is dropped when its owner leaves scope.

Simple fixed-size values such as `i32` implement `Copy`, so assignment makes an independent copy:

```rust
let first = 5;
let second = first;
println!("{first}");
```

`String` owns heap data. Assigning it moves ownership instead of making an implicit expensive copy:

```rust
let first = String::from("hello");
let second = first;
// println!("{first}"); // not allowed: first was moved
println!("{second}");
```

Use `.clone()` when you intentionally need a separate owned copy.

## Lesson 2: Borrow without taking ownership

A **reference** lets a function use a value without owning it. `&T` is an immutable reference; it allows reading but not changing the borrowed value.

```rust
fn length_of(text: &String) -> usize {
    text.len()
}

let name = String::from("Ada");
let length = length_of(&name);
println!("{name} has {length} letters");
```

A mutable reference uses `&mut T`. Both the binding and the reference must be marked mutable.

```rust
fn add_mark(text: &mut String) {
    text.push('!');
}

let mut message = String::from("Ready");
add_mark(&mut message);
```

## Lesson 3: The borrowing rules

At any given time, you may have either any number of immutable references **or** exactly one mutable reference to a value. References must always be valid.

This rule prevents one part of a program from changing data while another part assumes it stays unchanged. A mutable borrow also ends after its last use, which can let a later borrow be valid.

## Lesson 4: Slices borrow part of a value

A **slice** is a reference to a contiguous part of a collection. A string slice has type `&str`; it borrows text instead of owning it.

```rust
fn first_word(text: &str) -> &str {
    for (index, byte) in text.bytes().enumerate() {
        if byte == b' ' {
            return &text[0..index];
        }
    }
    &text[..]
}
```

String literals have type `&str`. Prefer a `&str` function parameter when the function only needs to read text: it accepts both string slices and references to `String`.

## Check your understanding

```quiz
id: "03-q01"
type: multiple-choice
prompt: "Which statements are part of Rust's ownership rules?"
select: multiple
options:
  - id: a
    text: "Each value has an owner."
    correct: true
  - id: b
    text: "A value can have only one owner at a time."
    correct: true
  - id: c
    text: "Every value lives forever after it is created."
    correct: false
  - id: d
    text: "Ownership exists only for values inside a loop."
    correct: false
explanation: "A value has one owner at a time and is dropped when its owner leaves scope."
lesson_anchor: "lesson-1-one-owner-at-a-time"
source_ids: ["RUST-BOOK-CH04"]
```

```quiz
id: "03-q02"
type: multiple-choice
prompt: "After `let second = first;` where `first` is a `String`, what normally happens?"
select: single
options:
  - id: a
    text: "Ownership moves to `second`."
    correct: true
  - id: b
    text: "Rust always creates a deep copy automatically."
    correct: false
  - id: c
    text: "Both names become mutable references."
    correct: false
  - id: d
    text: "The string becomes a constant."
    correct: false
explanation: "String owns heap data, so assignment moves ownership unless you explicitly clone."
lesson_anchor: "lesson-1-one-owner-at-a-time"
source_ids: ["RUST-BOOK-CH04"]
```

```quiz
id: "03-q03"
type: multiple-choice
prompt: "Which values are commonly copied on assignment because they implement `Copy`?"
select: multiple
options:
  - id: a
    text: "An `i32` value"
    correct: true
  - id: b
    text: "A `bool` value"
    correct: true
  - id: c
    text: "A `String` value"
    correct: false
  - id: d
    text: "A `Vec<String>` value"
    correct: false
explanation: "Simple stack-only types such as integers and booleans implement Copy. String and Vec own heap data and do not."
lesson_anchor: "lesson-1-one-owner-at-a-time"
source_ids: ["RUST-BOOK-CH04"]
```

```quiz
id: "03-q04"
type: multiple-choice
prompt: "How can you deliberately create a separate owned `String` with the same text?"
select: single
options:
  - id: a
    text: "Call `.clone()` on the String."
    correct: true
  - id: b
    text: "Use `&` only."
    correct: false
  - id: c
    text: "Use `break`."
    correct: false
  - id: d
    text: "Remove the type annotation."
    correct: false
explanation: "`clone` creates a deep copy of heap data when that is intentionally needed."
lesson_anchor: "lesson-1-one-owner-at-a-time"
source_ids: ["RUST-BOOK-CH04"]
```

```quiz
id: "03-q05"
type: multiple-choice
prompt: "What does an immutable reference such as `&String` allow a function to do?"
select: single
options:
  - id: a
    text: "Read the String without taking ownership."
    correct: true
  - id: b
    text: "Change the String without any mutable borrow."
    correct: false
  - id: c
    text: "Destroy the caller's String immediately."
    correct: false
  - id: d
    text: "Turn the String into an integer."
    correct: false
explanation: "An immutable reference borrows for reading. Ownership remains with the caller and mutation is not allowed through it."
lesson_anchor: "lesson-2-borrow-without-taking-ownership"
source_ids: ["RUST-BOOK-CH04"]
```

```quiz
id: "03-q06"
type: multiple-choice
prompt: "Which requirements are necessary to mutate a String through a function parameter?"
select: multiple
options:
  - id: a
    text: "The parameter uses `&mut String`."
    correct: true
  - id: b
    text: "The caller passes `&mut` to a mutable binding."
    correct: true
  - id: c
    text: "The function parameter uses `&String` only."
    correct: false
  - id: d
    text: "The String must be declared as a `const`."
    correct: false
explanation: "Mutable borrowing is explicit at both the function parameter and the caller. The original binding must be mutable."
lesson_anchor: "lesson-2-borrow-without-taking-ownership"
source_ids: ["RUST-BOOK-CH04"]
```

```quiz
id: "03-q07"
type: multiple-choice
prompt: "At the same time, which reference combinations are allowed for one value?"
select: multiple
options:
  - id: a
    text: "Several immutable references"
    correct: true
  - id: b
    text: "One mutable reference"
    correct: true
  - id: c
    text: "One mutable reference and one immutable reference"
    correct: false
  - id: d
    text: "Two mutable references"
    correct: false
explanation: "Rust allows either any number of immutable borrows or exactly one mutable borrow at a time."
lesson_anchor: "lesson-3-the-borrowing-rules"
source_ids: ["RUST-BOOK-CH04"]
```

```quiz
id: "03-q08"
type: multiple-choice
prompt: "Why does Rust restrict simultaneous mutable and immutable references?"
select: single
options:
  - id: a
    text: "To prevent data from changing while other code assumes it is unchanged."
    correct: true
  - id: b
    text: "To make every program single-threaded."
    correct: false
  - id: c
    text: "To prevent all functions from receiving parameters."
    correct: false
  - id: d
    text: "To require a separate operating system for each reference."
    correct: false
explanation: "The borrowing rules prevent data races and invalid assumptions about shared data."
lesson_anchor: "lesson-3-the-borrowing-rules"
source_ids: ["RUST-BOOK-CH04"]
```

```quiz
id: "03-q09"
type: multiple-choice
prompt: "Which statement best describes a slice?"
select: single
options:
  - id: a
    text: "A reference to a contiguous part of a collection"
    correct: true
  - id: b
    text: "A command that clones every value"
    correct: false
  - id: c
    text: "A special kind of mutable integer"
    correct: false
  - id: d
    text: "A compiled Tauri installer"
    correct: false
explanation: "Slices borrow a section of a collection instead of owning a new copy."
lesson_anchor: "lesson-4-slices-borrow-part-of-a-value"
source_ids: ["RUST-BOOK-CH04"]
```

```quiz
id: "03-q10"
type: multiple-choice
prompt: "Which statements about `&str` are correct?"
select: multiple
options:
  - id: a
    text: "It is the type of a string slice."
    correct: true
  - id: b
    text: "A string literal has type `&str`."
    correct: true
  - id: c
    text: "It always owns a heap allocation."
    correct: false
  - id: d
    text: "It can never be used as a function parameter."
    correct: false
explanation: "`&str` is a borrowed string slice. String literals are string slices, and `&str` is a flexible read-only parameter type."
lesson_anchor: "lesson-4-slices-borrow-part-of-a-value"
source_ids: ["RUST-BOOK-CH04"]
```

```quiz
id: "03-q11"
type: multiple-choice
prompt: "Why is `fn print_name(name: &str)` often more flexible than `fn print_name(name: &String)`?"
select: single
options:
  - id: a
    text: "It can accept a string slice and a reference to a String."
    correct: true
  - id: b
    text: "It automatically makes `name` mutable."
    correct: false
  - id: c
    text: "It transfers ownership from every caller."
    correct: false
  - id: d
    text: "It avoids all compile-time type checks."
    correct: false
explanation: "A function that only reads text usually needs a slice, and both literals and String values can provide one."
lesson_anchor: "lesson-4-slices-borrow-part-of-a-value"
source_ids: ["RUST-BOOK-CH04"]
```

```quiz
id: "03-q12"
type: multiple-choice
prompt: "Which phrase correctly distinguishes borrowing from ownership transfer?"
select: single
options:
  - id: a
    text: "A reference borrows access; assigning a non-Copy owner can move ownership."
    correct: true
  - id: b
    text: "Borrowing permanently deletes the value."
    correct: false
  - id: c
    text: "Every assignment is always a deep copy."
    correct: false
  - id: d
    text: "References only exist in TypeScript."
    correct: false
explanation: "References grant temporary access without ownership. Moving transfers ownership of non-Copy values such as String."
lesson_anchor: "lesson-2-borrow-without-taking-ownership"
source_ids: ["RUST-BOOK-CH04"]
```

## What you can do now

- Predict when a String is moved versus copied.
- Borrow values immutably or mutably with the correct syntax.
- Choose `&str` when a function only needs to read text.

## Sources

- [The Rust Programming Language — Understanding Ownership](https://doc.rust-lang.org/stable/book/ch04-00-understanding-ownership.html)
