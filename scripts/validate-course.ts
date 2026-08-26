import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const ROOT_DIR = process.cwd();
const CURRICULUM_DIR = path.join(ROOT_DIR, 'curriculum');
const CONTENT_DIR = path.join(ROOT_DIR, 'content');
const SOURCES_FILE = path.join(CURRICULUM_DIR, 'SOURCES.md');
const COURSE_YAML = path.join(CONTENT_DIR, 'course.yaml');

interface CourseModuleRef {
  id: string;
  slug: string;
  file: string;
}

interface CourseManifest {
  title: string;
  language: string;
  completion_policy: {
    required_score: number;
    grading: string;
  };
  modules: CourseModuleRef[];
}

interface ModuleFrontMatter {
  id: string;
  slug: string;
  title: string;
  description: string;
  estimated_minutes: number;
  prerequisites: string[];
  source_ids: string[];
  quiz: {
    required_score: number;
    question_count: number;
    passing_rule: string;
  };
}

interface QuizOption {
  id: string;
  text: string;
  correct: boolean;
}

interface QuizBlock {
  id: string;
  type: string;
  prompt: string;
  select: 'single' | 'multiple';
  options: QuizOption[];
  explanation: string;
  lesson_anchor: string;
  source_ids: string[];
}

function slugifyHeader(header: string): string {
  // Remove markdown header prefixes (e.g., '## ') and trim
  const cleanHeader = header.replace(/^#+\s+/, '').trim();
  return cleanHeader
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-alphanumeric/spaces/dashes (like colons, question marks)
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/-+/g, '-');     // Collapse multiple dashes
}

function runValidation() {
  console.log('=== Starting Course Validation ===');
  let errorsFound = 0;

  function reportError(file: string, message: string) {
    console.error(`[ERROR] ${path.relative(ROOT_DIR, file)}: ${message}`);
    errorsFound++;
  }

  // 1. Read and parse Sources
  if (!fs.existsSync(SOURCES_FILE)) {
    console.error(`Sources registry file not found at ${SOURCES_FILE}`);
    process.exit(1);
  }
  const sourcesContent = fs.readFileSync(SOURCES_FILE, 'utf-8');
  const validSourceIds = new Set<string>();
  // Match lines like: | `RUST-BOOK-INTRO` | ...
  const sourceLineRegex = /\|\s*`([A-Z0-9-]+)`\s*\|/g;
  let match;
  while ((match = sourceLineRegex.exec(sourcesContent)) !== null) {
    validSourceIds.add(match[1]);
  }
  console.log(`Loaded ${validSourceIds.size} source IDs from SOURCES.md`);

  // 2. Read and parse course.yaml
  if (!fs.existsSync(COURSE_YAML)) {
    console.error(`Course manifest file not found at ${COURSE_YAML}`);
    process.exit(1);
  }
  let manifest: CourseManifest;
  try {
    manifest = yaml.load(fs.readFileSync(COURSE_YAML, 'utf-8')) as CourseManifest;
  } catch (err: any) {
    console.error(`Failed to parse course.yaml: ${err.message}`);
    process.exit(1);
  }

  console.log(`Manifest loaded. Contains ${manifest.modules?.length || 0} modules.`);

  const seenModuleIds = new Set<string>();
  const seenModuleSlugs = new Set<string>();

  // 3. Validate each module
  for (const modRef of manifest.modules) {
    // Validate manifest entry
    if (!modRef.id || typeof modRef.id !== 'string') {
      reportError(COURSE_YAML, `Module entry has missing or invalid ID`);
      continue;
    }
    if (seenModuleIds.has(modRef.id)) {
      reportError(COURSE_YAML, `Duplicate module ID "${modRef.id}"`);
    }
    seenModuleIds.add(modRef.id);

    if (!modRef.slug || typeof modRef.slug !== 'string') {
      reportError(COURSE_YAML, `Module "${modRef.id}" is missing a slug`);
    } else {
      if (seenModuleSlugs.has(modRef.slug)) {
        reportError(COURSE_YAML, `Duplicate module slug "${modRef.slug}"`);
      }
      seenModuleSlugs.add(modRef.slug);
    }

    const moduleFilePath = path.join(CONTENT_DIR, modRef.file);
    if (!fs.existsSync(moduleFilePath)) {
      reportError(COURSE_YAML, `Module "${modRef.id}" file not found at path: ${modRef.file}`);
      continue;
    }

    // Parse the Markdown file
    const content = fs.readFileSync(moduleFilePath, 'utf-8');

    // Split front matter and body
    const parts = content.split(/^---$/m);
    if (parts.length < 3) {
      reportError(moduleFilePath, `Missing or malformed front matter boundary '---'`);
      continue;
    }

    const frontMatterStr = parts[1];
    const bodyStr = parts.slice(2).join('---');

    let frontMatter: ModuleFrontMatter;
    try {
      frontMatter = yaml.load(frontMatterStr) as ModuleFrontMatter;
    } catch (err: any) {
      reportError(moduleFilePath, `Failed to parse YAML front matter: ${err.message}`);
      continue;
    }

    // Validate front matter fields
    if (frontMatter.id !== modRef.id) {
      reportError(moduleFilePath, `Front matter ID "${frontMatter.id}" does not match course.yaml ID "${modRef.id}"`);
    }
    if (frontMatter.slug !== modRef.slug) {
      reportError(moduleFilePath, `Front matter slug "${frontMatter.slug}" does not match course.yaml slug "${modRef.slug}"`);
    }
    if (!frontMatter.title) {
      reportError(moduleFilePath, `Missing "title" in front matter`);
    }
    if (!frontMatter.description) {
      reportError(moduleFilePath, `Missing "description" in front matter`);
    }
    if (typeof frontMatter.estimated_minutes !== 'number') {
      reportError(moduleFilePath, `Invalid or missing "estimated_minutes" (must be a number)`);
    }
    if (!Array.isArray(frontMatter.prerequisites)) {
      reportError(moduleFilePath, `Invalid or missing "prerequisites" (must be an array)`);
    } else {
      for (const prereq of frontMatter.prerequisites) {
        if (!manifest.modules.some(m => m.id === prereq)) {
          reportError(moduleFilePath, `Prerequisite ID "${prereq}" does not exist in course.yaml`);
        }
      }
    }
    if (!Array.isArray(frontMatter.source_ids)) {
      reportError(moduleFilePath, `Invalid or missing "source_ids" in front matter (must be an array)`);
    } else {
      for (const sid of frontMatter.source_ids) {
        if (!validSourceIds.has(sid)) {
          reportError(moduleFilePath, `Source ID "${sid}" in front matter is not registered in SOURCES.md`);
        }
      }
    }

    if (!frontMatter.quiz) {
      reportError(moduleFilePath, `Missing "quiz" configuration in front matter`);
    } else {
      if (frontMatter.quiz.required_score !== 100) {
        reportError(moduleFilePath, `quiz.required_score must be 100 (got ${frontMatter.quiz.required_score})`);
      }
      if (typeof frontMatter.quiz.question_count !== 'number') {
        reportError(moduleFilePath, `quiz.question_count must be a number`);
      }
      if (frontMatter.quiz.passing_rule !== 'exact-match') {
        reportError(moduleFilePath, `quiz.passing_rule must be "exact-match"`);
      }
    }

    // Find all headers in the body to check quiz anchors
    const headers = new Set<string>();
    const headerRegex = /^#{1,6}\s+(.+)$/gm;
    let hMatch;
    while ((hMatch = headerRegex.exec(bodyStr)) !== null) {
      const headerText = hMatch[1].trim();
      headers.add(slugifyHeader(headerText));
    }

    // Find and parse all ```quiz blocks
    const quizBlocks: { blockStr: string; line: number }[] = [];
    const lines = bodyStr.split('\n');
    let inQuizBlock = false;
    let currentQuizBlock = '';
    let startLine = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim() === '```quiz') {
        inQuizBlock = true;
        currentQuizBlock = '';
        startLine = i + 1; // 1-indexed representation roughly
      } else if (line.trim() === '```' && inQuizBlock) {
        inQuizBlock = false;
        quizBlocks.push({ blockStr: currentQuizBlock, line: startLine });
      } else if (inQuizBlock) {
        currentQuizBlock += line + '\n';
      }
    }

    if (frontMatter.quiz && frontMatter.quiz.question_count !== quizBlocks.length) {
      reportError(
        moduleFilePath,
        `Front matter question_count (${frontMatter.quiz.question_count}) does not match actual quiz blocks found (${quizBlocks.length})`
      );
    }

    const seenQuizIds = new Set<string>();

    for (const { blockStr, line } of quizBlocks) {
      let quiz: QuizBlock;
      try {
        quiz = yaml.load(blockStr) as QuizBlock;
      } catch (err: any) {
        reportError(moduleFilePath, `Quiz block around line ${line} failed to parse: ${err.message}`);
        continue;
      }

      if (!quiz.id || typeof quiz.id !== 'string') {
        reportError(moduleFilePath, `Quiz block at line ${line} has missing or invalid ID`);
        continue;
      }

      const expectedQuizIdPrefix = `${frontMatter.id}-q`;
      if (!quiz.id.startsWith(expectedQuizIdPrefix)) {
        reportError(moduleFilePath, `Quiz ID "${quiz.id}" must start with prefix "${expectedQuizIdPrefix}"`);
      }

      if (seenQuizIds.has(quiz.id)) {
        reportError(moduleFilePath, `Duplicate quiz ID "${quiz.id}" inside module`);
      }
      seenQuizIds.add(quiz.id);

      if (quiz.type !== 'multiple-choice') {
        reportError(moduleFilePath, `Quiz "${quiz.id}": type must be "multiple-choice"`);
      }

      if (!quiz.prompt || typeof quiz.prompt !== 'string') {
        reportError(moduleFilePath, `Quiz "${quiz.id}": prompt must be a non-empty string`);
      }

      if (quiz.select !== 'single' && quiz.select !== 'multiple') {
        reportError(moduleFilePath, `Quiz "${quiz.id}": select must be "single" or "multiple"`);
      }

      if (!Array.isArray(quiz.options) || quiz.options.length < 3 || quiz.options.length > 5) {
        reportError(moduleFilePath, `Quiz "${quiz.id}": options must be an array of 3 to 5 options`);
      } else {
        const optionIds = new Set<string>();
        let correctCount = 0;
        for (const opt of quiz.options) {
          if (!opt.id || typeof opt.id !== 'string') {
            reportError(moduleFilePath, `Quiz "${quiz.id}": option is missing an ID`);
          } else {
            if (optionIds.has(opt.id)) {
              reportError(moduleFilePath, `Quiz "${quiz.id}": duplicate option ID "${opt.id}"`);
            }
            optionIds.add(opt.id);
          }

          if (!opt.text || typeof opt.text !== 'string') {
            reportError(moduleFilePath, `Quiz "${quiz.id}": option "${opt.id}" has missing or invalid text`);
          }

          if (typeof opt.correct !== 'boolean') {
            reportError(moduleFilePath, `Quiz "${quiz.id}": option "${opt.id}" has missing or invalid "correct" boolean`);
          } else if (opt.correct) {
            correctCount++;
          }
        }

        if (quiz.select === 'single' && correctCount !== 1) {
          reportError(moduleFilePath, `Quiz "${quiz.id}": select is "single" but has ${correctCount} correct options (expected exactly 1)`);
        }
        if (quiz.select === 'multiple' && correctCount < 2) {
          reportError(moduleFilePath, `Quiz "${quiz.id}": select is "multiple" but has ${correctCount} correct options (expected at least 2)`);
        }
      }

      if (!quiz.explanation || typeof quiz.explanation !== 'string') {
        reportError(moduleFilePath, `Quiz "${quiz.id}": explanation must be a non-empty string`);
      }

      if (!quiz.lesson_anchor || typeof quiz.lesson_anchor !== 'string') {
        reportError(moduleFilePath, `Quiz "${quiz.id}": lesson_anchor must be a non-empty string`);
      } else {
        if (!headers.has(quiz.lesson_anchor)) {
          reportError(
            moduleFilePath,
            `Quiz "${quiz.id}": lesson_anchor "${quiz.lesson_anchor}" does not match any header in the module. Found headers: ${Array.from(headers).join(', ')}`
          );
        }
      }

      if (!Array.isArray(quiz.source_ids)) {
        reportError(moduleFilePath, `Quiz "${quiz.id}": source_ids must be an array of strings`);
      } else {
        for (const sid of quiz.source_ids) {
          if (!validSourceIds.has(sid)) {
            reportError(moduleFilePath, `Quiz "${quiz.id}": source ID "${sid}" is not registered in SOURCES.md`);
          }
          if (frontMatter.source_ids && !frontMatter.source_ids.includes(sid)) {
            reportError(moduleFilePath, `Quiz "${quiz.id}": source ID "${sid}" is used but not listed in the module's front matter source_ids`);
          }
        }
      }
    }
  }

  if (errorsFound > 0) {
    console.error(`\nValidation FAILED with ${errorsFound} errors.`);
    process.exit(1);
  } else {
    console.log('\nValidation PASSED successfully with 0 errors!');
    process.exit(0);
  }
}

runValidation();
