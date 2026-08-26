---
id: "06"
slug: typescript-for-a-tauri-frontend
title: "TypeScript for a Tauri Frontend"
description: "Use TypeScript types, functions, objects, events, and async/await in a browser UI."
estimated_minutes: 30
prerequisites: ["05"]
source_ids: ["TS-HANDBOOK-BASIC", "TS-HANDBOOK-NARROWING"]
quiz:
  required_score: 100
  question_count: 12
  passing_rule: exact-match
---

# TypeScript for a Tauri Frontend

## Goal

By the end of this module, you can use TypeScript types, declare typed functions and objects, write asynchronous operations using `async/await`, and handle errors in the frontend.

## Lesson 1: TypeScript adds types to JavaScript

**JavaScript** is the language of the web browser. It is dynamically typed, meaning variables can hold any kind of value, and errors are often found only when someone runs the app.

**TypeScript** is a typed superset of JavaScript. It adds static types to catch bugs in your editor before the code is sent to the browser. The browser cannot run TypeScript directly: it is compiled into plain JavaScript first.

In TypeScript, you can explicitly state a type using a colon (`:`):

```ts
let username: string = "Alice";
let score: number = 42;
let isActive: boolean = true;
```

If you try to assign a number to a string variable:

```ts
// This causes a compiler error in TypeScript!
username = 100;
```

TypeScript can also infer types automatically from their initial values, so you do not always have to write the types out.

### Remember

TypeScript runs checks at compile-time to catch type mismatch errors before they reach the browser.

## Lesson 2: Objects and Interfaces

Most real data consists of complex structures rather than single numbers or strings. You define these structures using an `interface` or a `type` alias:

```ts
interface User {
  id: number;
  name: string;
  email?: string; // Optional property
}

const alice: User = {
  id: 1,
  name: "Alice"
};
```

You must also type function parameters and return values:

```ts
function greet(user: User): string {
  return `Hello, ${user.name}`;
}
```

Sometimes a variable can have more than one type, which is called a **union type** (e.g. `string | null`). To safely use it, you must perform **type narrowing** using a check like `typeof`:

```ts
function formatInput(input: string | null): string {
  if (input === null) {
    return "No input provided";
  }
  // TypeScript now knows that input is definitely a string here
  return input.trim().toUpperCase();
}
```

### Remember

Interfaces define object shapes. Union types allow a variable to have multiple types, which you resolve using type narrowing checks.

## Lesson 3: Asynchronous Operations with Async and Await

When a frontend calls the Tauri Rust backend, it sends a message over an asynchronous boundary. The backend might take time to respond (e.g., reading a file or computing a hash). If the frontend waited synchronously, the browser screen would freeze.

To prevent freezing, JavaScript uses **Promises**. A Promise represents a value that will be available in the future.

The modern way to handle Promises is using `async` and `await`:

```ts
async function loadUserData() {
  try {
    // await pauses execution until the promise resolves
    const response: string = await fetchUserData();
    console.log(response);
  } catch (error) {
    // catch handles any errors that happened during the async call
    console.error("Failed to load user:", error);
  }
}
```

Any function that uses `await` must be marked with the `async` keyword, and it automatically returns a `Promise`.

### Remember

Use `async` and `await` to handle asynchronous operations without freezing the user interface, wrapping them in `try/catch` to handle failures.

## Check your understanding

```quiz
id: "06-q01"
type: multiple-choice
prompt: "What is the relationship between JavaScript and TypeScript?"
select: multiple
options:
  - id: a
    text: "TypeScript is a typed superset of JavaScript."
    correct: true
  - id: b
    text: "TypeScript code is compiled into JavaScript to be run by the browser."
    correct: true
  - id: c
    text: "TypeScript is a completely new browser engine replacing JavaScript."
    correct: false
  - id: d
    text: "Browsers run TypeScript files directly without any translation."
    correct: false
explanation: "TypeScript is a superset of JavaScript, meaning valid JavaScript is also valid TypeScript. The TypeScript compiler translates (.ts) files into plain (.js) files because browsers do not run TypeScript natively."
lesson_anchor: "lesson-1-typescript-adds-types-to-javascript"
source_ids: ["TS-HANDBOOK-BASIC"]
```

```quiz
id: "06-q02"
type: multiple-choice
prompt: "How do you explicitly declare a type for a variable in TypeScript?"
select: single
options:
  - id: a
    text: "By putting the type name after a colon after the variable name"
    correct: true
  - id: b
    text: "By writing the type name before the variable name"
    correct: false
  - id: c
    text: "By wrapping the variable name in parentheses"
    correct: false
  - id: d
    text: "TypeScript does not allow explicit type annotations."
    correct: false
explanation: "You explicitly declare a variable type using a colon, like: `let score: number = 42;`."
lesson_anchor: "lesson-1-typescript-adds-types-to-javascript"
source_ids: ["TS-HANDBOOK-BASIC"]
```

```quiz
id: "06-q03"
type: multiple-choice
prompt: "What happens if you assign a value of the wrong type to a typed variable in TypeScript?"
select: single
options:
  - id: a
    text: "The TypeScript compiler produces an error immediately during build or check time."
    correct: true
  - id: b
    text: "The browser will ignore the type mismatch and run it anyway."
    correct: false
  - id: c
    text: "The variable is silently deleted."
    correct: false
  - id: d
    text: "The variable's type is dynamically converted to matching type."
    correct: false
explanation: "TypeScript raises compile-time errors when value assignments violate the declared or inferred variable types."
lesson_anchor: "lesson-1-typescript-adds-types-to-javascript"
source_ids: ["TS-HANDBOOK-BASIC"]
```

```quiz
id: "06-q04"
type: multiple-choice
prompt: "Which types are valid TypeScript primitives?"
select: multiple
options:
  - id: a
    text: "`string`"
    correct: true
  - id: b
    text: "`number`"
    correct: true
  - id: c
    text: "`boolean`"
    correct: true
  - id: d
    text: "`struct`"
    correct: false
explanation: "TypeScript's primitives include `string`, `number`, `boolean`, `null`, `undefined`, and `symbol`. `struct` is a keyword in Rust, not TypeScript."
lesson_anchor: "lesson-1-typescript-adds-types-to-javascript"
source_ids: ["TS-HANDBOOK-BASIC"]
```

```quiz
id: "06-q05"
type: multiple-choice
prompt: "What is the purpose of an `interface` in TypeScript?"
select: single
options:
  - id: a
    text: "To define the structure or shape of an object"
    correct: true
  - id: b
    text: "To create a connection to a database"
    correct: false
  - id: c
    text: "To compile TypeScript code to binary"
    correct: false
  - id: d
    text: "To register browser events"
    correct: false
explanation: "An interface defines the structure/contract of an object, outlining which fields are required, optional, and what types they hold."
lesson_anchor: "lesson-2-objects-and-interfaces"
source_ids: ["TS-HANDBOOK-BASIC"]
```

```quiz
id: "06-q06"
type: multiple-choice
prompt: "How do you declare that a property in an interface is optional?"
select: single
options:
  - id: a
    text: "By adding a question mark `?` after the property name"
    correct: true
  - id: b
    text: "By adding the keyword `optional` before the property name"
    correct: false
  - id: c
    text: "By assigning `null` as the default value"
    correct: false
  - id: d
    text: "By prefixing the property with `_`"
    correct: false
explanation: "In TypeScript, adding `?` after a property name, like `email?: string`, marks it as optional, meaning objects of that interface can omit this field."
lesson_anchor: "lesson-2-objects-and-interfaces"
source_ids: ["TS-HANDBOOK-BASIC"]
```

```quiz
id: "06-q07"
type: multiple-choice
prompt: "What is a union type in TypeScript?"
select: single
options:
  - id: a
    text: "A type that allows a variable to hold values of multiple specified types (e.g. `string | number`)"
    correct: true
  - id: b
    text: "A type combining two variables into a tuple"
    correct: false
  - id: c
    text: "A special class that represents files"
    correct: false
  - id: d
    text: "A variable type used only for database tables"
    correct: false
explanation: "A union type uses the pipe character `|` to indicate that a variable can contain one of several types."
lesson_anchor: "lesson-2-objects-and-interfaces"
source_ids: ["TS-HANDBOOK-BASIC"]
```

```quiz
id: "06-q08"
type: multiple-choice
prompt: "What is type narrowing?"
select: single
options:
  - id: a
    text: "Checking and refining a general type (like a union type) to a more specific type using logical checks"
    correct: true
  - id: b
    text: "Converting a variable to a smaller number size to save memory"
    correct: false
  - id: c
    text: "Defining a variable with no type at all"
    correct: false
  - id: d
    text: "Removing properties from an interface"
    correct: false
explanation: "Type narrowing is the process where TypeScript refines a union type into a specific type inside a conditional check (e.g. checking `typeof input === 'string'`)."
lesson_anchor: "lesson-2-objects-and-interfaces"
source_ids: ["TS-HANDBOOK-NARROWING"]
```

```quiz
id: "06-q09"
type: multiple-choice
prompt: "Why are asynchronous operations important in browser web frontends?"
select: single
options:
  - id: a
    text: "They allow the browser UI to remain active and responsive while waiting for slow operations"
    correct: true
  - id: b
    text: "They allow JavaScript code to compile faster"
    correct: false
  - id: c
    text: "They guarantee that a function never fails"
    correct: false
  - id: d
    text: "They allow the frontend to compile Rust code directly"
    correct: false
explanation: "Browsers run JavaScript on a single thread. Asynchronous actions prevent blocking this thread, ensuring buttons and inputs remain responsive while waiting for data."
lesson_anchor: "lesson-3-asynchronous-operations-with-async-and-await"
source_ids: ["TS-HANDBOOK-BASIC"]
```

```quiz
id: "06-q10"
type: multiple-choice
prompt: "What is a Promise in JavaScript/TypeScript?"
select: single
options:
  - id: a
    text: "An object representing the eventual completion (or failure) of an asynchronous operation and its resulting value"
    correct: true
  - id: b
    text: "A guarantee that the code has zero syntax errors"
    correct: false
  - id: c
    text: "A type of loop that runs indefinitely"
    correct: false
  - id: d
    text: "An interface for database connections"
    correct: false
explanation: "A Promise is a placeholder representing the future outcome of an asynchronous process."
lesson_anchor: "lesson-3-asynchronous-operations-with-async-and-await"
source_ids: ["TS-HANDBOOK-BASIC"]
```

```quiz
id: "06-q11"
type: multiple-choice
prompt: "Which keyword is used to pause the execution of an async function until a Promise resolves?"
select: single
options:
  - id: a
    text: "`await`"
    correct: true
  - id: b
    text: "`wait`"
    correct: false
  - id: c
    text: "`pause`"
    correct: false
  - id: d
    text: "`defer`"
    correct: false
explanation: "The `await` keyword pauses the execution of an asynchronous function until the awaited Promise is resolved or rejected."
lesson_anchor: "lesson-3-asynchronous-operations-with-async-and-await"
source_ids: ["TS-HANDBOOK-BASIC"]
```

```quiz
id: "06-q12"
type: multiple-choice
prompt: "How should you handle errors when using `await` in TypeScript?"
select: single
options:
  - id: a
    text: "By wrapping the `await` statement inside a `try/catch` block"
    correct: true
  - id: b
    text: "By calling an `error` function on the variable"
    correct: false
  - id: c
    text: "TypeScript automatically ignores errors if you use `await`."
    correct: false
  - id: d
    text: "By declaring the variable as `never`"
    correct: false
explanation: "Wrapping asynchronous calls in `try/catch` lets you catch rejected Promises and handle errors gracefully in your program."
lesson_anchor: "lesson-3-asynchronous-operations-with-async-and-await"
source_ids: ["TS-HANDBOOK-BASIC"]
```

## What you can do now

- Add type annotations to variables in your frontend code.
- Declare interfaces to model structures like settings or user details.
- Handle union types safely with `typeof` checks.
- Call asynchronous APIs using `async/await` and handle errors with `try/catch`.

## Sources

- [TypeScript Handbook — The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
- [TypeScript Handbook — Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
