export interface SourceLink {
  id: string;
  label: string;
  url: string;
}

export const SOURCE_REGISTRY: Record<string, SourceLink> = {
  'RUST-BOOK-INTRO': {
    id: 'RUST-BOOK-INTRO',
    label: 'The Rust Programming Language — Introduction',
    url: 'https://doc.rust-lang.org/stable/book/ch00-00-introduction.html'
  },
  'RUST-BOOK-INSTALL': {
    id: 'RUST-BOOK-INSTALL',
    label: 'The Rust Programming Language — Installation',
    url: 'https://doc.rust-lang.org/stable/book/ch01-01-installation.html'
  },
  'RUST-BOOK-CH03': {
    id: 'RUST-BOOK-CH03',
    label: 'The Rust Programming Language — Common Programming Concepts',
    url: 'https://doc.rust-lang.org/stable/book/ch03-00-common-programming-concepts.html'
  },
  'RUST-BOOK-CH04': {
    id: 'RUST-BOOK-CH04',
    label: 'The Rust Programming Language — Understanding Ownership',
    url: 'https://doc.rust-lang.org/stable/book/ch04-00-understanding-ownership.html'
  },
  'RUST-BOOK-CH05': {
    id: 'RUST-BOOK-CH05',
    label: 'The Rust Programming Language — Using Structs',
    url: 'https://doc.rust-lang.org/stable/book/ch05-00-structs.html'
  },
  'RUST-BOOK-CH06': {
    id: 'RUST-BOOK-CH06',
    label: 'The Rust Programming Language — Enums and Pattern Matching',
    url: 'https://doc.rust-lang.org/stable/book/ch06-00-enums.html'
  },
  'RUST-BOOK-CH07': {
    id: 'RUST-BOOK-CH07',
    label: 'The Rust Programming Language — Managing Growing Projects',
    url: 'https://doc.rust-lang.org/stable/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html'
  },
  'RUST-BOOK-CH08': {
    id: 'RUST-BOOK-CH08',
    label: 'The Rust Programming Language — Common Collections',
    url: 'https://doc.rust-lang.org/stable/book/ch08-00-common-collections.html'
  },
  'RUST-BOOK-CH09': {
    id: 'RUST-BOOK-CH09',
    label: 'The Rust Programming Language — Error Handling',
    url: 'https://doc.rust-lang.org/stable/book/ch09-00-error-handling.html'
  },
  'RUST-BOOK-CH11': {
    id: 'RUST-BOOK-CH11',
    label: 'The Rust Programming Language — Automated Tests',
    url: 'https://doc.rust-lang.org/stable/book/ch11-00-testing.html'
  },
  'CARGO-FIRST': {
    id: 'CARGO-FIRST',
    label: 'The Cargo Book — Getting Started',
    url: 'https://doc.rust-lang.org/cargo/getting-started/index.html'
  },
  'CARGO-TEST': {
    id: 'CARGO-TEST',
    label: 'The Cargo Book — cargo test',
    url: 'https://doc.rust-lang.org/cargo/commands/cargo-test.html'
  },
  'RUST-ASYNC-INTRO': {
    id: 'RUST-ASYNC-INTRO',
    label: 'Asynchronous Programming in Rust — Introduction',
    url: 'https://rust-lang.github.io/async-book/'
  },
  'TS-HANDBOOK-BASIC': {
    id: 'TS-HANDBOOK-BASIC',
    label: 'TypeScript Handbook — The Basics',
    url: 'https://www.typescriptlang.org/docs/handbook/2/basic-types.html'
  },
  'TS-HANDBOOK-NARROWING': {
    id: 'TS-HANDBOOK-NARROWING',
    label: 'TypeScript Handbook — Narrowing',
    url: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html'
  },
  'SERDE-OVERVIEW': {
    id: 'SERDE-OVERVIEW',
    label: 'Serde — Overview',
    url: 'https://serde.rs/'
  },
  'TAURI-ARCH': {
    id: 'TAURI-ARCH',
    label: 'Tauri v2 — Architecture',
    url: 'https://v2.tauri.app/concept/architecture/'
  },
  'TAURI-START': {
    id: 'TAURI-START',
    label: 'Tauri v2 — Start a Project',
    url: 'https://v2.tauri.app/start/create-project/'
  },
  'TAURI-CALL-RUST': {
    id: 'TAURI-CALL-RUST',
    label: 'Tauri v2 — Calling Rust from the Frontend',
    url: 'https://v2.tauri.app/develop/calling-rust/'
  },
  'TAURI-CALL-FRONTEND': {
    id: 'TAURI-CALL-FRONTEND',
    label: 'Tauri v2 — Calling the Frontend from Rust',
    url: 'https://v2.tauri.app/develop/calling-frontend/'
  },
  'TAURI-STATE': {
    id: 'TAURI-STATE',
    label: 'Tauri v2 — State Management',
    url: 'https://v2.tauri.app/develop/state-management/'
  },
  'TAURI-ASYNC-RUNTIME': {
    id: 'TAURI-ASYNC-RUNTIME',
    label: 'Tauri v2 Rust API — Async Runtime',
    url: 'https://docs.rs/tauri/latest/tauri/async_runtime/'
  },
  'TAURI-STORE': {
    id: 'TAURI-STORE',
    label: 'Tauri v2 — Store Plugin',
    url: 'https://v2.tauri.app/plugin/store/'
  },
  'TAURI-SECURITY': {
    id: 'TAURI-SECURITY',
    label: 'Tauri v2 — Security',
    url: 'https://v2.tauri.app/security/'
  },
  'TAURI-CAPABILITIES': {
    id: 'TAURI-CAPABILITIES',
    label: 'Tauri v2 — Capabilities',
    url: 'https://v2.tauri.app/security/capabilities/'
  },
  'TAURI-FS': {
    id: 'TAURI-FS',
    label: 'Tauri v2 — File System Plugin',
    url: 'https://v2.tauri.app/plugin/file-system/'
  },
  'TAURI-WINDOW': {
    id: 'TAURI-WINDOW',
    label: 'Tauri v2 — Window',
    url: 'https://v2.tauri.app/reference/javascript/api/namespacewindow/'
  },
  'TAURI-TRAY': {
    id: 'TAURI-TRAY',
    label: 'Tauri v2 — System Tray',
    url: 'https://v2.tauri.app/learn/system-tray/'
  },
  'TAURI-DISTRIBUTION': {
    id: 'TAURI-DISTRIBUTION',
    label: 'Tauri v2 — Distribution',
    url: 'https://v2.tauri.app/distribute/'
  },
  'TAURI-SIGNING': {
    id: 'TAURI-SIGNING',
    label: 'Tauri v2 — Code Signing',
    url: 'https://v2.tauri.app/distribute/sign/'
  },
  'TAURI-MOBILE': {
    id: 'TAURI-MOBILE',
    label: 'Tauri v2 — Mobile',
    url: 'https://v2.tauri.app/develop/#mobile'
  },
  'TAURI-PLUGINS': {
    id: 'TAURI-PLUGINS',
    label: 'Tauri v2 — Plugins',
    url: 'https://v2.tauri.app/plugin/'
  }
};

export function getSourceLink(sourceId: string) {
  return SOURCE_REGISTRY[sourceId];
}
