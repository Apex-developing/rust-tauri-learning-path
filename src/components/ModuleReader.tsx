import { marked } from 'marked';
import { translateModuleContent, type Language } from '../lib/i18n';
import { getSourceLink } from '../lib/sources';
import type { ModuleData } from '../types/course';

interface ModuleReaderProps {
  module: ModuleData;
  onStartQuiz: () => void;
  onBack: () => void;
  isQuizAvailable: boolean;
  strings: Record<string, string>;
  language: Language;
}

export function ModuleReader({ module, onStartQuiz, onBack, isQuizAvailable, strings, language }: ModuleReaderProps) {
  const localizedContent = translateModuleContent(module.content, language);
  const contentWithoutSources = localizedContent.replace(/\n?##\s*(?:Sources|Джерела)\s*\n[\s\S]*$/i, '').trim();
  const contentHtml = marked.parse(contentWithoutSources, { gfm: true, breaks: false }) as string;
  const sourceLinks = module.source_ids
    .map((sourceId) => getSourceLink(sourceId))
    .filter((link): link is NonNullable<typeof link> => Boolean(link));

  return (
    <div className="module-page">
      <header className="module-header card">
        <div className="module-top-actions">
          <button type="button" className="secondary-button" onClick={onBack}>
            {strings.back}
          </button>
          <span className="module-tag">{strings.moduleLabel} {module.id}</span>
        </div>
        <h1>{module.title}</h1>
        <p className="muted">{module.description}</p>
      </header>

      <article
        className="lesson-content card"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      <div className="module-actions card">
        <button
          type="button"
          className="primary-button"
          onClick={onStartQuiz}
          disabled={!isQuizAvailable}
        >
          {isQuizAvailable ? strings.startQuiz : strings.startQuizLocked}
        </button>
      </div>

      {sourceLinks.length > 0 && (
        <div className="module-sources card">
          <h3>{strings.sources}</h3>
          <ul>
            {sourceLinks.map((source) => (
              <li key={source.id}>
                <a href={source.url} target="_blank" rel="noreferrer">
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
