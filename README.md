# Rust & Tauri Learning Path

Planning foundation for an English-language, SoloLearn-style web/PWA course that teaches programming fundamentals, Rust, TypeScript, and Tauri v2.

The course is intentionally source-led: every lesson must cite the official documentation listed in [curriculum/SOURCES.md](curriculum/SOURCES.md). It is designed for learners who are new to programming.

## What is defined now

- [Course curriculum](curriculum/COURSE-CURRICULUM.md): module sequence, outcomes, and quiz sizes.
- [Module format](curriculum/MODULE-FORMAT.md): the Markdown contract that future lesson files must follow.
- [Assessment rules](curriculum/ASSESSMENT-RULES.md): exact-match multiple-choice grading and 100% completion policy.
- [Source registry](curriculum/SOURCES.md): official sources mapped to every module.
- [Course manifest](content/course.yaml): machine-readable module order for the future application.
- [src/App.tsx](src/App.tsx): mobile-first course app shell and module flow.

## Local development

```bash
npm install
npm run dev
```

## Production build and GitHub Pages

```bash
npm run build
npm run deploy:pages
```

This project is built as a static PWA with relative URLs (`base: './'`) so it can be deployed directly to GitHub Pages without a backend. The generated `dist/` folder is published as the site artifact and supports offline caching through the PWA service worker.

### GitHub Pages deployment summary

This release packages the Rust & Tauri learning course as a mobile-first static PWA for GitHub Pages. The app is designed for browser-based study, with local IndexedDB progress persistence, exact-match quiz logic, and static hosting compatibility. It keeps the curriculum source of truth in Markdown and compiles it into app-ready JSON during the build pipeline, enabling a clean deployment flow without any server-side runtime.
