---
id: "10"
slug: files-and-security-boundaries
title: "Files and Security Boundaries"
description: "Use least privilege with capabilities, permissions, and filesystem scopes."
estimated_minutes: 35
prerequisites: ["09"]
source_ids: ["TAURI-SECURITY", "TAURI-CAPABILITIES", "TAURI-FS"]
quiz:
  required_score: 100
  question_count: 12
  passing_rule: exact-match
---

# Files and Security Boundaries

## Goal

By the end of this module, you can explain why Tauri separates trusted Rust code from frontend code, and how capabilities, permissions, and file scopes reduce risk when the app touches the filesystem.

## Lesson 1: Trust boundaries matter

A Tauri application has a boundary between the app core and the web frontend. The Rust code in the app core can access the system more directly. The frontend code runs inside the system WebView, and Tauri limits what it can do by exposing only specific commands and capabilities.

This matters because code on the front side is not automatically trusted to access every native capability. A trusted boundary is the place where you decide what data or actions are allowed to cross from one environment to another. Tauri's security model requires those boundaries to be explicit.

### Remember

Frontend code and Rust core code are not equally trusted by default. Tauri enforces a boundary between them.

## Lesson 2: Capabilities and permissions control exposure

Tauri uses capabilities and permissions to decide what the frontend can access. A capability groups the permissions that a window or webview may use. That way, an app can grant only the actions it really needs.

```json
{
  "$schema": "../gen/schemas/desktop-schema.json",
  "identifier": "main-capability",
  "description": "Allow the main window to change its title",
  "permissions": ["core:window:allow-set-title"]
}
```

The idea is least privilege: only grant the permissions needed for a specific feature. If a feature does not need file access, do not expose file permissions for it.

### Remember

Capabilities and permissions describe what the frontend may access; grant only the minimum needed for the feature.

## Lesson 3: Filesystem access must be scoped and constrained

The file system plugin lets an app read or write files safely, but the plugin still requires deliberate configuration. It supports a base directory and scopes, which means you can restrict access to a small area instead of letting the app touch arbitrary paths.

```ts
import { readFile, BaseDirectory } from "@tauri-apps/plugin-fs";

const contents = await readFile("notes.txt", {
  baseDir: BaseDirectory.AppData
});
```

This is safer than allowing arbitrary file paths from the frontend. Restricting the allowed directory and validating the target path reduces the risk of path traversal or accidental access outside the intended area.

### Remember

Filesystem access should be scoped to a small, intentional area and not left open to arbitrary paths.

## Check your understanding

```quiz
id: "10-q01"
type: multiple-choice
prompt: "What is a trust boundary in a Tauri app?"
select: single
options:
  - id: a
    text: "A boundary where data or actions move between code with different levels of trust, such as the frontend and the Rust core."
    correct: true
  - id: b
    text: "A place where JavaScript files are compiled to Rust."
    correct: false
  - id: c
    text: "A configuration file for CSS colors."
    correct: false
  - id: d
    text: "A type alias for a string."
    correct: false
explanation: "Tauri treats the frontend and the Rust core as different trust segments, and data crossing that boundary must be explicitly controlled."
lesson_anchor: "lesson-1-trust-boundaries-matter"
source_ids: ["TAURI-SECURITY"]
```

```quiz
id: "10-q02"
type: multiple-choice
prompt: "Why is Tauri's security model important?"
select: single
options:
  - id: a
    text: "Because code in the WebView should not automatically have full access to all system resources."
    correct: true
  - id: b
    text: "Because Tauri ignores all permissions."
    correct: false
  - id: c
    text: "Because Rust code cannot run inside a desktop app."
    correct: false
  - id: d
    text: "Because TypeScript needs special browser permissions by default."
    correct: false
explanation: "The security model helps ensure that frontend code cannot reach native resources unless the app intentionally exposes them through Tauri configuration and commands."
lesson_anchor: "lesson-1-trust-boundaries-matter"
source_ids: ["TAURI-SECURITY"]
```

```quiz
id: "10-q03"
type: multiple-choice
prompt: "What is the main purpose of a capability in Tauri?"
select: single
options:
  - id: a
    text: "To define which permissions a window or webview is allowed to use."
    correct: true
  - id: b
    text: "To compile the app for multiple operating systems."
    correct: false
  - id: c
    text: "To replace the Rust compiler."
    correct: false
  - id: d
    text: "To create random app state."
    correct: false
explanation: "Capabilities group permissions together so a specific window or webview gets only the access it needs."
lesson_anchor: "lesson-2-capabilities-and-permissions-control-exposure"
source_ids: ["TAURI-CAPABILITIES"]
```

```quiz
id: "10-q04"
type: multiple-choice
prompt: "Which principle is best matched by Tauri permissions?"
select: single
options:
  - id: a
    text: "Least privilege"
    correct: true
  - id: b
    text: "Maximum privilege"
    correct: false
  - id: c
    text: "No privilege"
    correct: false
  - id: d
    text: "Random privilege"
    correct: false
explanation: "The app should grant only the permissions required for a feature, which is a least-privilege model."
lesson_anchor: "lesson-2-capabilities-and-permissions-control-exposure"
source_ids: ["TAURI-CAPABILITIES"]
```

```quiz
id: "10-q05"
type: multiple-choice
prompt: 'Which file-system example shows a scoped and intentional read?'
select: single
options:
  - id: a
    text: '`readFile("notes.txt", { baseDir: BaseDirectory.AppData })`'
    correct: true
  - id: b
    text: '`readFile("/etc/passwd")` with no restriction'
    correct: false
  - id: c
    text: 'A file read from an arbitrary URL'
    correct: false
  - id: d
    text: 'A plain `console.log` without any file operation'
    correct: false
explanation: 'Using a base directory narrows access to a defined app location rather than allowing arbitrary filesystem paths.'
lesson_anchor: 'lesson-3-filesystem-access-must-be-scoped-and-constrained'
source_ids: ['TAURI-FS']
```

```quiz
id: "10-q06"
type: multiple-choice
prompt: "Why is it risky to allow arbitrary file paths from the frontend?"
select: single
options:
  - id: a
    text: "It can allow access outside the app's intended directory and create security issues like path traversal."
    correct: true
  - id: b
    text: "It automatically removes the need for Rust code."
    correct: false
  - id: c
    text: "It is impossible to use the file system plugin."
    correct: false
  - id: d
    text: "It makes the frontend compile in less time."
    correct: false
explanation: "Open filesystem access without restrictions can expose a system path that the app did not intend to allow, which is dangerous."
lesson_anchor: "lesson-3-filesystem-access-must-be-scoped-and-constrained"
source_ids: ["TAURI-FS"]
```

```quiz
id: "10-q07"
type: multiple-choice
prompt: "Which statement about the file system plugin is correct?"
select: single
options:
  - id: a
    text: "It offers safe access to files, but the app should still define paths and scopes carefully."
    correct: true
  - id: b
    text: "It is only useful for CSS files."
    correct: false
  - id: c
    text: "It makes all filesystem access automatically secure."
    correct: false
  - id: d
    text: "It disables all permissions for the app."
    correct: false
explanation: "The plugin provides a structured API, but the app must still choose the correct base directory and restrict what it exposes."
lesson_anchor: "lesson-3-filesystem-access-must-be-scoped-and-constrained"
source_ids: ["TAURI-FS"]
```

```quiz
id: "10-q08"
type: multiple-choice
prompt: "Which best describes a safe default for filesystem permissions in a Tauri app?"
select: single
options:
  - id: a
    text: "Grant only the minimal permissions needed for the feature and scope them to just the needed directory."
    correct: true
  - id: b
    text: "Grant full access to the whole machine by default."
    correct: false
  - id: c
    text: "Never use permissions because they are optional."
    correct: false
  - id: d
    text: "Allow every command without checking the app context."
    correct: false
explanation: "Least privilege is the safe default: expose the smallest level of access that the actual feature requires."
lesson_anchor: "lesson-2-capabilities-and-permissions-control-exposure"
source_ids: ["TAURI-CAPABILITIES", "TAURI-SECURITY"]
```

```quiz
id: "10-q09"
type: multiple-choice
prompt: "Why are capabilities and permissions more useful than a single blanket permission?"
select: single
options:
  - id: a
    text: "They let the app match access to the actual feature and window while keeping the rest of the app closed off."
    correct: true
  - id: b
    text: "They automatically make every command safe."
    correct: false
  - id: c
    text: "They eliminate the need for all Rust checks."
    correct: false
  - id: d
    text: "They convert web code into native code."
    correct: false
explanation: "Granular permissions and capabilities allow different windows or features to have different access levels instead of every frontend window receiving every permission."
lesson_anchor: "lesson-2-capabilities-and-permissions-control-exposure"
source_ids: ["TAURI-CAPABILITIES"]
```

```quiz
id: "10-q10"
type: multiple-choice
prompt: "Which statement about the app core and the WebView is most accurate?"
select: single
options:
  - id: a
    text: "The app core is more trusted and has broader system access, while the WebView must rely on explicit Tauri exposure."
    correct: true
  - id: b
    text: "The WebView has equal access to every native API by default."
    correct: false
  - id: c
    text: "The app core and the WebView are identical in all security contexts."
    correct: false
  - id: d
    text: "Only the WebView can read files."
    correct: false
explanation: "Tauri distinguishes the app core from the frontend: native access is controlled, and the frontend is limited to exposed capabilities."
lesson_anchor: "lesson-1-trust-boundaries-matter"
source_ids: ["TAURI-SECURITY"]
```

```quiz
id: "10-q11"
type: multiple-choice
prompt: "What should a developer do before exposing any filesystem or native capability?"
select: single
options:
  - id: a
    text: "Decide whether the feature actually needs it and configure the smallest relevant permission and scope."
    correct: true
  - id: b
    text: "Expose everything to every window immediately."
    correct: false
  - id: c
    text: "Assume the frontend never needs to validate user input."
    correct: false
  - id: d
    text: "Skip the capability files because they are optional."
    correct: false
explanation: "The safest approach is to design the access boundary around the actual feature and keep permissions narrow and explicit."
lesson_anchor: "lesson-2-capabilities-and-permissions-control-exposure"
source_ids: ["TAURI-CAPABILITIES", "TAURI-SECURITY"]
```

```quiz
id: "10-q12"
type: multiple-choice
prompt: "Which summary best matches the module?"
select: single
options:
  - id: a
    text: "Tauri uses trust boundaries, least privilege, and scoped filesystem access so the frontend cannot accidentally reach beyond what the app intentionally exposes."
    correct: true
  - id: b
    text: "All app code should have unrestricted filesystem access by default."
    correct: false
  - id: c
    text: "Permissions are only needed for CSS and HTML files."
    correct: false
  - id: d
    text: "Security boundaries are irrelevant for a beginner app."
    correct: false
explanation: "The core principle of Tauri security is to keep access explicit and minimal: trust boundaries, permissions, capabilities, and scoped filesystem access."
lesson_anchor: "lesson-3-filesystem-access-must-be-scoped-and-constrained"
source_ids: ["TAURI-SECURITY", "TAURI-CAPABILITIES", "TAURI-FS"]
```

## What you can do now

- Explain why Tauri distinguishes frontend and app-core trust boundaries.
- Describe how capabilities and permissions control the frontend.
- Scope filesystem access to a small, intended area and avoid broad access.

## Sources

- [Tauri v2 — Security](https://v2.tauri.app/security/)
- [Tauri v2 — Capabilities](https://v2.tauri.app/security/capabilities/)
- [Tauri v2 — File System Plugin](https://v2.tauri.app/plugin/file-system/)
