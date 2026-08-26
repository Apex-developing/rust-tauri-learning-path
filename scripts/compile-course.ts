import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const ROOT_DIR = process.cwd();
const CONTENT_DIR = path.join(ROOT_DIR, 'content');
const COURSE_YAML = path.join(CONTENT_DIR, 'course.yaml');
const OUTPUT_DIR = path.join(ROOT_DIR, 'src', 'generated');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'course-data.json');

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

interface CompiledModule {
  id: string;
  slug: string;
  title: string;
  description: string;
  estimated_minutes: number;
  prerequisites: string[];
  source_ids: string[];
  content: string;
  quizzes: QuizBlock[];
}

function compileCourse() {
  console.log('=== Compiling Course Data ===');

  if (!fs.existsSync(COURSE_YAML)) {
    console.error(`Course manifest not found at ${COURSE_YAML}`);
    process.exit(1);
  }

  let manifest: CourseManifest;
  try {
    manifest = yaml.load(fs.readFileSync(COURSE_YAML, 'utf-8')) as CourseManifest;
  } catch (err: any) {
    console.error(`Failed to parse course.yaml: ${err.message}`);
    process.exit(1);
  }

  const compiledModules: CompiledModule[] = [];

  for (const modRef of manifest.modules) {
    const moduleFilePath = path.join(CONTENT_DIR, modRef.file);
    if (!fs.existsSync(moduleFilePath)) {
      console.error(`Module file not found: ${moduleFilePath}`);
      process.exit(1);
    }

    const fileContent = fs.readFileSync(moduleFilePath, 'utf-8');

    // Split front matter and body
    const parts = fileContent.split(/^---$/m);
    if (parts.length < 3) {
      console.error(`Missing or malformed front matter boundary in ${moduleFilePath}`);
      process.exit(1);
    }

    const frontMatterStr = parts[1];
    const bodyStr = parts.slice(2).join('---');

    let frontMatter: ModuleFrontMatter;
    try {
      frontMatter = yaml.load(frontMatterStr) as ModuleFrontMatter;
    } catch (err: any) {
      console.error(`Failed to parse front matter in ${moduleFilePath}: ${err.message}`);
      process.exit(1);
    }

    // Now extract quiz blocks and compile content without quiz blocks
    const quizzes: QuizBlock[] = [];
    const lines = bodyStr.split('\n');
    let contentLines: string[] = [];
    let inQuizBlock = false;
    let currentQuizBlock = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim() === '```quiz') {
        inQuizBlock = true;
        currentQuizBlock = '';
      } else if (line.trim() === '```' && inQuizBlock) {
        inQuizBlock = false;
        try {
          const quiz = yaml.load(currentQuizBlock) as QuizBlock;
          quizzes.push(quiz);
        } catch (err: any) {
          console.error(`Failed to parse quiz block in ${moduleFilePath}: ${err.message}`);
          process.exit(1);
        }
      } else if (inQuizBlock) {
        currentQuizBlock += line + '\n';
      } else {
        contentLines.push(line);
      }
    }

    // Join and trim content
    const compiledContent = contentLines
      .join('\n')
      .replace(/\n?##\s*(?:Sources|Джерела)\s*\n[\s\S]*$/i, '')
      .trim();

    compiledModules.push({
      id: frontMatter.id,
      slug: frontMatter.slug,
      title: frontMatter.title,
      description: frontMatter.description,
      estimated_minutes: frontMatter.estimated_minutes,
      prerequisites: frontMatter.prerequisites,
      source_ids: frontMatter.source_ids,
      content: compiledContent,
      quizzes: quizzes
    });

    console.log(`Compiled Module ${frontMatter.id}: "${frontMatter.title}" (${quizzes.length} questions)`);
  }

  // Create generated folder if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const finalData = {
    title: manifest.title,
    language: manifest.language,
    completion_policy: manifest.completion_policy,
    modules: compiledModules
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalData, null, 2), 'utf-8');
  console.log(`Course data compiled successfully to ${OUTPUT_FILE}`);
}

compileCourse();
