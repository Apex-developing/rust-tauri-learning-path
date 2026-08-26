# Official Source Registry

All content must be derived from the official documentation below. Links are deliberately version-stable where possible. Authors must re-check version-sensitive Tauri APIs immediately before publishing a module.

| Source ID | Official source | Used by modules |
| --- | --- | --- |
| `RUST-BOOK-INTRO` | [The Rust Programming Language — Introduction](https://doc.rust-lang.org/stable/book/ch00-00-introduction.html) | 00 |
| `RUST-BOOK-INSTALL` | [The Rust Programming Language — Installation](https://doc.rust-lang.org/stable/book/ch01-01-installation.html) | 01 |
| `RUST-BOOK-CH03` | [The Rust Programming Language — Common Programming Concepts](https://doc.rust-lang.org/stable/book/ch03-00-common-programming-concepts.html) | 02 |
| `RUST-BOOK-CH04` | [The Rust Programming Language — Understanding Ownership](https://doc.rust-lang.org/stable/book/ch04-00-understanding-ownership.html) | 03 |
| `RUST-BOOK-CH05` | [The Rust Programming Language — Using Structs](https://doc.rust-lang.org/stable/book/ch05-00-structs.html) | 04 |
| `RUST-BOOK-CH06` | [The Rust Programming Language — Enums and Pattern Matching](https://doc.rust-lang.org/stable/book/ch06-00-enums.html) | 04 |
| `RUST-BOOK-CH07` | [The Rust Programming Language — Managing Growing Projects](https://doc.rust-lang.org/stable/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html) | 05 |
| `RUST-BOOK-CH08` | [The Rust Programming Language — Common Collections](https://doc.rust-lang.org/stable/book/ch08-00-common-collections.html) | 04 |
| `RUST-BOOK-CH09` | [The Rust Programming Language — Error Handling](https://doc.rust-lang.org/stable/book/ch09-00-error-handling.html) | 04, 08 |
| `RUST-BOOK-CH11` | [The Rust Programming Language — Automated Tests](https://doc.rust-lang.org/stable/book/ch11-00-testing.html) | 05, 12 |
| `CARGO-FIRST` | [The Cargo Book — Getting Started](https://doc.rust-lang.org/cargo/getting-started/index.html) | 01 |
| `CARGO-TEST` | [The Cargo Book — `cargo test`](https://doc.rust-lang.org/cargo/commands/cargo-test.html) | 05 |
| `RUST-ASYNC-INTRO` | [Asynchronous Programming in Rust — Introduction](https://rust-lang.github.io/async-book/) | 09 |
| `TS-HANDBOOK-BASIC` | [TypeScript Handbook — The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html) | 06 |
| `TS-HANDBOOK-NARROWING` | [TypeScript Handbook — Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) | 06 |
| `SERDE-OVERVIEW` | [Serde — Overview](https://serde.rs/) | 07 |
| `TAURI-ARCH` | [Tauri v2 — Architecture](https://v2.tauri.app/concept/architecture/) | 00 |
| `TAURI-START` | [Tauri v2 — Start a Project](https://v2.tauri.app/start/create-project/) | 01 |
| `TAURI-CALL-RUST` | [Tauri v2 — Calling Rust from the Frontend](https://v2.tauri.app/develop/calling-rust/) | 07 |
| `TAURI-CALL-FRONTEND` | [Tauri v2 — Calling the Frontend from Rust](https://v2.tauri.app/develop/calling-frontend/) | 09 |
| `TAURI-STATE` | [Tauri v2 — State Management](https://v2.tauri.app/develop/state-management/) | 08 |
| `TAURI-ASYNC-RUNTIME` | [Tauri v2 Rust API — Async Runtime](https://docs.rs/tauri/latest/tauri/async_runtime/) | 09 |
| `TAURI-STORE` | [Tauri v2 — Store Plugin](https://v2.tauri.app/plugin/store/) | 08 |
| `TAURI-SECURITY` | [Tauri v2 — Security](https://v2.tauri.app/security/) | 10 |
| `TAURI-CAPABILITIES` | [Tauri v2 — Capabilities](https://v2.tauri.app/security/capabilities/) | 10 |
| `TAURI-FS` | [Tauri v2 — File System Plugin](https://v2.tauri.app/plugin/file-system/) | 10 |
| `TAURI-WINDOW` | [Tauri v2 — Window](https://v2.tauri.app/reference/javascript/api/namespacewindow/) | 11 |
| `TAURI-TRAY` | [Tauri v2 — System Tray](https://v2.tauri.app/learn/system-tray/) | 11 |
| `TAURI-DISTRIBUTION` | [Tauri v2 — Distribution](https://v2.tauri.app/distribute/) | 12 |
| `TAURI-SIGNING` | [Tauri v2 — Code Signing](https://v2.tauri.app/distribute/sign/) | 12 |
| `TAURI-MOBILE` | [Tauri v2 — Mobile](https://v2.tauri.app/develop/#mobile) | 13 |
| `TAURI-PLUGINS` | [Tauri v2 — Plugins](https://v2.tauri.app/plugin/) | 13 |

## Source policy

- Rust language semantics must be supported by official Rust Project documentation.
- Tauri behavior and configuration must be supported by official Tauri v2 documentation or the official `tauri` crate API documentation.
- TypeScript syntax and browser-facing TypeScript guidance must be supported by the official TypeScript Handbook.
- Serde is the exception needed to explain Rust/Tauri data serialization; use only its official documentation.
- Third-party blog posts, tutorials, Stack Overflow answers, and model-generated claims are not acceptable instructional sources.
