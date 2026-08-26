---
id: "12"
slug: tests-builds-and-release-basics
title: "Tests, Builds, and Release Basics"
description: "Run automated tests, build release artifacts, and prepare a Tauri app for distribution."
estimated_minutes: 35
prerequisites: ["11"]
source_ids: ["RUST-BOOK-CH11", "CARGO-TEST", "TAURI-DISTRIBUTION", "TAURI-SIGNING"]
quiz:
  required_score: 100
  question_count: 12
  passing_rule: exact-match
---

# Tests, Builds, and Release Basics

## Goal

By the end of this module, you can explain how Rust tests help prevent regressions, how Tauri builds app bundles, and why signing matters before distribution.

## Lesson 1: Rust tests help catch regressions before release

Rust has a built-in test runner. You can write unit tests in the same module as the code you are testing and run them with `cargo test`.

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
```

This keeps a project safer as it grows. Automated tests are especially useful before you move from local development into shipping a release build.

### Remember

Running tests is part of a healthy Rust workflow: it gives you a quick feedback loop before packaging the application.

## Lesson 2: Tauri build commands generate distributable app artifacts

Tauri includes build tooling for the desktop app, and the `build` command can produce the packaged artifacts you need to distribute.

```bash
cargo tauri build
```

The docs also describe splitting the build and bundle steps if needed:

```bash
cargo tauri build --no-bundle
cargo tauri bundle --bundles app,dmg
```

This means the app can be built first, and then the platform-specific packaging step can create installers or app bundles for a target platform.

### Remember

The build flow is separated from the final packaging flow, which gives you more control over installers and release formats.

## Lesson 3: Distribution requires platform-specific packaging and signing

Most platforms require signing before an app is distributed. Code signing helps verify the app's identity and improves user trust.

```json
{
  "version": "1.2.3"
}
```

Tauri recommends managing the app version in the `tauri.conf.json` configuration. For macOS, signing and notarization may be required; Windows and Linux also have their own packaging and signing expectations.

### Remember

Distributing a desktop app is not only about building a binary — it also includes platform packaging and signing requirements.

## Check your understanding

```quiz
id: "12-q01"
type: multiple-choice
prompt: "Which command runs Rust tests for a Cargo project?"
select: single
options:
  - id: a
    text: "cargo test"
    correct: true
  - id: b
    text: "cargo bundle"
    correct: false
  - id: c
    text: "cargo build --test-only"
    correct: false
  - id: d
    text: "tauri test"
    correct: false
explanation: "The standard Cargo workflow uses cargo test to run unit and integration tests in a Rust project."
lesson_anchor: "lesson-1-rust-tests-help-catch-regressions-before-release"
source_ids: ["CARGO-TEST", "RUST-BOOK-CH11"]
```

```quiz
id: "12-q02"
type: multiple-choice
prompt: "Why are automated tests important before a release?"
select: single
options:
  - id: a
    text: "They help catch regressions and confirm that the app still behaves as expected before packaging."
    correct: true
  - id: b
    text: "They let the app skip the build step."
    correct: false
  - id: c
    text: "They replace the need for code signing."
    correct: false
  - id: d
    text: "They automatically upload binaries to app stores."
    correct: false
explanation: "Testing gives you a safety net before the code is packaged and distributed."
lesson_anchor: "lesson-1-rust-tests-help-catch-regressions-before-release"
source_ids: ["RUST-BOOK-CH11"]
```

```quiz
id: "12-q03"
type: multiple-choice
prompt: "Which command is the normal Tauri desktop build command?"
select: single
options:
  - id: a
    text: "cargo tauri build"
    correct: true
  - id: b
    text: "cargo run --release"
    correct: false
  - id: c
    text: "cargo test --build"
    correct: false
  - id: d
    text: "npm build-app"
    correct: false
explanation: "Tauri provides its own build command for creating the packaged desktop app artifacts."
lesson_anchor: "lesson-2-tauri-build-commands-generate-distributable-app-artifacts"
source_ids: ["TAURI-DISTRIBUTION"]
```

```quiz
id: "12-q04"
type: multiple-choice
prompt: "What does the `--no-bundle` option do in the build flow?"
select: single
options:
  - id: a
    text: "It builds the app without generating the final platform-specific installer or bundle."
    correct: true
  - id: b
    text: "It runs the app in development mode."
    correct: false
  - id: c
    text: "It disables the Rust compiler."
    correct: false
  - id: d
    text: "It removes all tests from the project."
    correct: false
explanation: "The Tauri docs describe separating the build step from the bundle step so the app can be packaged in a specific format later."
lesson_anchor: "lesson-2-tauri-build-commands-generate-distributable-app-artifacts"
source_ids: ["TAURI-DISTRIBUTION"]
```

```quiz
id: "12-q05"
type: multiple-choice
prompt: "Which statement about versioning is correct in Tauri?"
select: single
options:
  - id: a
    text: "The recommended place to manage the app version is tauri.conf.json > version."
    correct: true
  - id: b
    text: "The app version must always be hardcoded in CSS."
    correct: false
  - id: c
    text: "Versioning is handled only by Rust macros."
    correct: false
  - id: d
    text: "The version is ignored during distribution."
    correct: false
explanation: "The docs recommend the tauri.conf.json version field as the primary place to configure the app version."
lesson_anchor: "lesson-3-distribution-requires-platform-specific-packaging-and-signing"
source_ids: ["TAURI-DISTRIBUTION"]
```

```quiz
id: "12-q06"
type: multiple-choice
prompt: "Why is code signing used for desktop apps?"
select: single
options:
  - id: a
    text: "It verifies the identity of the app provider and improves trust in the final binary or installer."
    correct: true
  - id: b
    text: "It automatically writes tests."
    correct: false
  - id: c
    text: "It replaces the need for Cargo.toml."
    correct: false
  - id: d
    text: "It hides the app from the OS."
    correct: false
explanation: "Signing is a security and trust step that applies to executable files and bundles, especially for distribution."
lesson_anchor: "lesson-3-distribution-requires-platform-specific-packaging-and-signing"
source_ids: ["TAURI-SIGNING"]
```

```quiz
id: "12-q07"
type: multiple-choice
prompt: "Which statement is true about platform requirements?"
select: single
options:
  - id: a
    text: "Most platforms require some kind of signing or packaging step before users can run the app."
    correct: true
  - id: b
    text: "All platforms allow unsigned binaries without restrictions."
    correct: false
  - id: c
    text: "Only Linux requires signing."
    correct: false
  - id: d
    text: "Packaging happens only in the TypeScript frontend."
    correct: false
explanation: "The Tauri docs describe platform-specific distribution and signing requirements, which vary by OS."
lesson_anchor: "lesson-3-distribution-requires-platform-specific-packaging-and-signing"
source_ids: ["TAURI-DISTRIBUTION", "TAURI-SIGNING"]
```

```quiz
id: "12-q08"
type: multiple-choice
prompt: "Which macOS release requirement is explicitly described in the Tauri docs?"
select: single
options:
  - id: a
    text: "Signing and notarization may be required, especially outside the App Store."
    correct: true
  - id: b
    text: "macOS apps never need a certificate."
    correct: false
  - id: c
    text: "Notarization is only relevant to Rust tests."
    correct: false
  - id: d
    text: "macOS apps are packaged only as HTML files."
    correct: false
explanation: "The distribution docs mention that macOS apps often need signing and, when distributed outside the App Store, notarization."
lesson_anchor: "lesson-3-distribution-requires-platform-specific-packaging-and-signing"
source_ids: ["TAURI-SIGNING"]
```

```quiz
id: "12-q09"
type: multiple-choice
prompt: "Which Linux formats are mentioned in the distribution docs?"
select: multiple
options:
  - id: a
    text: "AppImage"
    correct: true
  - id: b
    text: "Debian package"
    correct: true
  - id: c
    text: "RPM"
    correct: true
  - id: d
    text: "XAML package"
    correct: false
explanation: "The docs list several Linux distribution formats such as AppImage, Debian, RPM, and AUR-based packaging."
lesson_anchor: "lesson-3-distribution-requires-platform-specific-packaging-and-signing"
source_ids: ["TAURI-DISTRIBUTION"]
```

```quiz
id: "12-q10"
type: multiple-choice
prompt: "What is the main benefit of splitting build and bundle steps?"
select: single
options:
  - id: a
    text: "It lets the app produce the binary first and then choose the correct installer or bundle format for the target platform."
    correct: true
  - id: b
    text: "It removes the need for the Rust compiler."
    correct: false
  - id: c
    text: "It compiles the frontend in a browser."
    correct: false
  - id: d
    text: "It automatically deletes test files."
    correct: false
explanation: "Different platforms and release channels need different package outputs, so the build and bundling steps are intentionally separated."
lesson_anchor: "lesson-2-tauri-build-commands-generate-distributable-app-artifacts"
source_ids: ["TAURI-DISTRIBUTION"]
```

```quiz
id: "12-q11"
type: multiple-choice
prompt: "Which part of a Tauri app is a natural place to keep the app version?"
select: single
options:
  - id: a
    text: "tauri.conf.json"
    correct: true
  - id: b
    text: "The browser's HTML title"
    correct: false
  - id: c
    text: "The README only"
    correct: false
  - id: d
    text: "The Rust test names"
    correct: false
explanation: "Tauri documents the configuration file as the recommended place to store the app version for distribution."
lesson_anchor: "lesson-3-distribution-requires-platform-specific-packaging-and-signing"
source_ids: ["TAURI-DISTRIBUTION"]
```

```quiz
id: "12-q12"
type: multiple-choice
prompt: "Which workflow best matches a release-ready desktop app plan?"
select: single
options:
  - id: a
    text: "Run tests, build the app, package the distributable, and sign it according to platform rules."
    correct: true
  - id: b
    text: "Skip tests, copy the source files into a ZIP, and upload them to the browser."
    correct: false
  - id: c
    text: "Only package the app after the user manually installs a compiler."
    correct: false
  - id: d
    text: "Use only the frontend build command and ignore the OS requirements."
    correct: false
explanation: "A professional release process includes verification, build output, packaging, and compliance with each platform's distribution rules."
lesson_anchor: "lesson-1-rust-tests-help-catch-regressions-before-release"
source_ids: ["RUST-BOOK-CH11", "TAURI-DISTRIBUTION", "TAURI-SIGNING"]
```

## What you can do now

- Run Rust tests before shipping a Tauri app.
- Use the Tauri build command to prepare distributable artifacts.
- Understand that signing and packaging are platform-specific release steps.

## Sources

- [The Rust Programming Language — Automated Tests](https://doc.rust-lang.org/stable/book/ch11-00-testing.html)
- [The Cargo Book — `cargo test`](https://doc.rust-lang.org/cargo/commands/cargo-test.html)
- [Tauri v2 — Distribution](https://v2.tauri.app/distribute/)
- [Tauri v2 — Code Signing](https://v2.tauri.app/distribute/sign/)
