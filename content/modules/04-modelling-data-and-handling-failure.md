---
id: "04"
slug: modelling-data-and-handling-failure
title: "Modelling Data and Handling Failure"
description: "Use structs, enums, pattern matching, collections, Option, and Result."
estimated_minutes: 60
prerequisites: ["03"]
source_ids: ["RUST-BOOK-CH05", "RUST-BOOK-CH06", "RUST-BOOK-CH08", "RUST-BOOK-CH09"]
quiz:
  required_score: 100
  question_count: 14
  passing_rule: exact-match
---

# Modelling Data and Handling Failure

## Goal

By the end of this module, you can model related data and represent expected absence or failure explicitly.

## Lesson 1: Structs describe one meaningful thing

A `struct` groups named, related fields. It is useful when the values describe one thing.

    struct Note {
        title: String,
        done: bool,
    }

    let note = Note {
        title: String::from("Learn Rust"),
        done: false,
    };

Use dot syntax to read a field: `note.title`. To change a field, the whole struct instance must be bound with `mut`. An `impl` block can define methods for a struct. A method starts with `self`, `&self`, or `&mut self`.

## Lesson 2: Enums describe alternatives

An `enum` lists possible variants of one type. A value is one variant, and a variant may hold data.

    enum SaveState {
        Idle,
        Saving,
        Failed(String),
    }

`match` handles a value by pattern and must cover every possible variant. Use `if let` when you only need one case.

## Lesson 3: Collections store many values

`Vec<T>` is a growable list containing one element type. `HashMap<K, V>` associates a value with a unique key. `String` is owned, growable UTF-8 text. Rust does not allow indexing a String with `text[0]`, because a byte position is not necessarily a complete human character.

    let mut names: Vec<String> = Vec::new();
    names.push(String::from("Ada"));

## Lesson 4: Absence and recoverable failure are values

`Option<T>` is either `Some(value)` or `None`. Use it when a value may legitimately be absent. `Result<T, E>` is either `Ok(value)` or `Err(error)`; use it when an operation can fail and the caller should respond.

    fn find_name(found: bool) -> Option<&'static str> {
        if found { Some("Ada") } else { None }
    }

    fn parse_count(text: &str) -> Result<u32, std::num::ParseIntError> {
        text.parse::<u32>()
    }

Use `match` to handle both outcomes. The `?` operator returns an error early from a function that has a compatible Result return type. Avoid `unwrap` for normal user input because it panics on None or Err.

## Check your understanding

```quiz
id: "04-q01"
type: multiple-choice
prompt: "What is a struct best suited to model?"
select: single
options:
  - id: a
    text: "One item with several named, related fields"
    correct: true
  - id: b
    text: "Only a repeating loop"
    correct: false
  - id: c
    text: "A compiler version"
    correct: false
explanation: "A struct packages related named values, such as a note title and completion status."
lesson_anchor: "lesson-1-structs-describe-one-meaningful-thing"
source_ids: ["RUST-BOOK-CH05"]
```

```quiz
id: "04-q02"
type: multiple-choice
prompt: "Which statements about a struct instance are correct?"
select: multiple
options:
  - id: a
    text: "Its fields are supplied when the instance is created."
    correct: true
  - id: b
    text: "A field can be read with dot syntax."
    correct: true
  - id: c
    text: "It cannot contain a String."
    correct: false
  - id: d
    text: "Its fields are always mutable."
    correct: false
explanation: "Struct literals provide their fields and dot syntax reads them. Mutation requires a mutable binding."
lesson_anchor: "lesson-1-structs-describe-one-meaningful-thing"
source_ids: ["RUST-BOOK-CH05"]
```

```quiz
id: "04-q03"
type: multiple-choice
prompt: "Which method receiver borrows a struct without permitting mutation?"
select: single
options:
  - id: a
    text: "&self"
    correct: true
  - id: b
    text: "&mut self"
    correct: false
  - id: c
    text: "self only"
    correct: false
  - id: d
    text: "static self"
    correct: false
explanation: "&self is an immutable reference to the instance. &mut self permits mutation, while self takes ownership."
lesson_anchor: "lesson-1-structs-describe-one-meaningful-thing"
source_ids: ["RUST-BOOK-CH05"]
```

```quiz
id: "04-q04"
type: multiple-choice
prompt: "What does an enum value represent?"
select: single
options:
  - id: a
    text: "One named variant from its defined alternatives"
    correct: true
  - id: b
    text: "Every variant at the same time"
    correct: false
  - id: c
    text: "Only numeric data"
    correct: false
  - id: d
    text: "A mutable reference by default"
    correct: false
explanation: "An enum models alternatives. Each value is one variant, and variants may contain data."
lesson_anchor: "lesson-2-enums-describe-alternatives"
source_ids: ["RUST-BOOK-CH06"]
```

```quiz
id: "04-q05"
type: multiple-choice
prompt: "Which statements about match are correct?"
select: multiple
options:
  - id: a
    text: "It can select behavior based on an enum variant."
    correct: true
  - id: b
    text: "It must cover all possible cases."
    correct: true
  - id: c
    text: "It is only valid for integers."
    correct: false
  - id: d
    text: "It always makes a value mutable."
    correct: false
explanation: "match is exhaustive pattern matching. It is especially useful for enums but is not restricted to integers."
lesson_anchor: "lesson-2-enums-describe-alternatives"
source_ids: ["RUST-BOOK-CH06"]
```

```quiz
id: "04-q06"
type: multiple-choice
prompt: "When is if let most useful?"
select: single
options:
  - id: a
    text: "When one pattern matters and other cases need no action"
    correct: true
  - id: b
    text: "When every enum variant must have separate behavior"
    correct: false
  - id: c
    text: "When defining a struct field"
    correct: false
  - id: d
    text: "When creating a vector"
    correct: false
explanation: "if let is concise when you care about one matching pattern; match is better when all cases need handling."
lesson_anchor: "lesson-2-enums-describe-alternatives"
source_ids: ["RUST-BOOK-CH06"]
```

```quiz
id: "04-q07"
type: multiple-choice
prompt: "Which collection descriptions are correct?"
select: multiple
options:
  - id: a
    text: "Vec<T> is a growable list of one element type."
    correct: true
  - id: b
    text: "HashMap<K, V> associates values with keys."
    correct: true
  - id: c
    text: "An array grows automatically like a Vec."
    correct: false
  - id: d
    text: "A HashMap cannot contain values."
    correct: false
explanation: "Vectors can grow and have one element type; hash maps store key-value associations."
lesson_anchor: "lesson-3-collections-store-many-values"
source_ids: ["RUST-BOOK-CH08"]
```

```quiz
id: "04-q08"
type: multiple-choice
prompt: "Why is text[0] not valid Rust String indexing?"
select: single
options:
  - id: a
    text: "A byte position is not necessarily a complete Unicode character."
    correct: true
  - id: b
    text: "Strings never contain text."
    correct: false
  - id: c
    text: "Only HashMap values may be indexed."
    correct: false
  - id: d
    text: "String values are always empty."
    correct: false
explanation: "Rust String values are UTF-8. Indexing by a single integer could split a character, so it is not allowed."
lesson_anchor: "lesson-3-collections-store-many-values"
source_ids: ["RUST-BOOK-CH08"]
```

```quiz
id: "04-q09"
type: multiple-choice
prompt: "Which Option variants represent its two possible states?"
select: multiple
options:
  - id: a
    text: "Some(value)"
    correct: true
  - id: b
    text: "None"
    correct: true
  - id: c
    text: "Ok(value)"
    correct: false
  - id: d
    text: "Failed(error)"
    correct: false
explanation: "Option represents presence with Some or absence with None. Ok and Err belong to Result."
lesson_anchor: "lesson-4-absence-and-recoverable-failure-are-values"
source_ids: ["RUST-BOOK-CH06"]
```

```quiz
id: "04-q10"
type: multiple-choice
prompt: "Which Result variants represent its two possible states?"
select: multiple
options:
  - id: a
    text: "Ok(value)"
    correct: true
  - id: b
    text: "Err(error)"
    correct: true
  - id: c
    text: "Some(value)"
    correct: false
  - id: d
    text: "None"
    correct: false
explanation: "Result represents a successful value with Ok or a recoverable failure with Err."
lesson_anchor: "lesson-4-absence-and-recoverable-failure-are-values"
source_ids: ["RUST-BOOK-CH09"]
```

```quiz
id: "04-q11"
type: multiple-choice
prompt: "Which situation is a good fit for Option<T>?"
select: single
options:
  - id: a
    text: "A search may legitimately find no matching note."
    correct: true
  - id: b
    text: "A function must always return a successful integer."
    correct: false
  - id: c
    text: "A compiler must ignore every syntax error."
    correct: false
  - id: d
    text: "A vector must contain mixed element types."
    correct: false
explanation: "Option expresses an expected possibly missing value, such as an unsuccessful search."
lesson_anchor: "lesson-4-absence-and-recoverable-failure-are-values"
source_ids: ["RUST-BOOK-CH06"]
```

```quiz
id: "04-q12"
type: multiple-choice
prompt: "What does the ? operator do in a function returning a compatible Result?"
select: single
options:
  - id: a
    text: "It returns an error early when the called Result is Err."
    correct: true
  - id: b
    text: "It ignores every error automatically."
    correct: false
  - id: c
    text: "It converts all values to String."
    correct: false
  - id: d
    text: "It makes a reference mutable."
    correct: false
explanation: "The ? operator unwraps Ok values and propagates compatible Err values by returning early."
lesson_anchor: "lesson-4-absence-and-recoverable-failure-are-values"
source_ids: ["RUST-BOOK-CH09"]
```

```quiz
id: "04-q13"
type: multiple-choice
prompt: "Why should normal user-input flows avoid unwrap?"
select: single
options:
  - id: a
    text: "unwrap panics if it receives None or Err."
    correct: true
  - id: b
    text: "unwrap always creates a HashMap."
    correct: false
  - id: c
    text: "unwrap is required to use a struct."
    correct: false
  - id: d
    text: "unwrap makes errors visible to the user safely."
    correct: false
explanation: "unwrap is convenient for examples or guaranteed cases, but it panics on an absent value or error."
lesson_anchor: "lesson-4-absence-and-recoverable-failure-are-values"
source_ids: ["RUST-BOOK-CH09"]
```

```quiz
id: "04-q14"
type: multiple-choice
prompt: "Which choices model a note application clearly?"
select: multiple
options:
  - id: a
    text: "A Note struct for a note title and completion status"
    correct: true
  - id: b
    text: "Option<Note> for a lookup that may find nothing"
    correct: true
  - id: c
    text: "A bare integer for every possible loading state"
    correct: false
  - id: d
    text: "unwrap for every file and user input operation"
    correct: false
explanation: "Structs model related note data and Option models an absent lookup. Explicit enum or Result states are clearer than arbitrary integers or panics."
lesson_anchor: "lesson-4-absence-and-recoverable-failure-are-values"
source_ids: ["RUST-BOOK-CH05", "RUST-BOOK-CH06", "RUST-BOOK-CH09"]
```

## What you can do now

- Choose structs for related fields and enums for alternatives.
- Use Vec and HashMap for collections with different purposes.
- Represent absence with Option and recoverable failure with Result.

## Sources

- [The Rust Programming Language — Structs](https://doc.rust-lang.org/stable/book/ch05-00-structs.html)
- [The Rust Programming Language — Enums and Pattern Matching](https://doc.rust-lang.org/stable/book/ch06-00-enums.html)
- [The Rust Programming Language — Common Collections](https://doc.rust-lang.org/stable/book/ch08-00-common-collections.html)
- [The Rust Programming Language — Error Handling](https://doc.rust-lang.org/stable/book/ch09-00-error-handling.html)
