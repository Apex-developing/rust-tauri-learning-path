import { useEffect, useMemo, useState } from 'react';
import { CourseOverview } from './components/CourseOverview';
import { ModuleReader } from './components/ModuleReader';
import { QuizScreen } from './components/QuizScreen';
import { COURSE_DATA, getModuleById, getNextUnlockedModuleId } from './lib/course-data';
import { getText, localizeModuleDescription, localizeModuleTitle, type Language } from './lib/i18n';
import { readProgress, saveProgress, type CourseProgressState, updateModuleResult } from './lib/progress-db';
import type { ModuleStatus } from './types/course';

type Screen = 'overview' | 'module' | 'quiz';

const DEFAULT_PROGRESS: CourseProgressState = {
  version: '1.0.0',
  language: 'en',
  lastVisitedModuleId: '00',
  moduleResults: {}
};

export default function App() {
  const [screen, setScreen] = useState<Screen>('overview');
  const [selectedModuleId, setSelectedModuleId] = useState('00');
  const [progress, setProgress] = useState<CourseProgressState>(DEFAULT_PROGRESS);
  const [isReady, setIsReady] = useState(false);

  const language: Language = progress.language ?? 'en';
  const strings = {
    course: getText(language, 'course'),
    learningPath: getText(language, 'learningPath'),
    completeEachModule: getText(language, 'completeEachModule'),
    ofModules: getText(language, 'ofModules'),
    courseTitle: getText(language, 'courseTitle'),
    back: getText(language, 'back'),
    moduleLabel: getText(language, 'moduleLabel'),
    startQuiz: getText(language, 'startQuiz'),
    startQuizLocked: getText(language, 'startQuizLocked'),
    sources: getText(language, 'sources'),
    question: getText(language, 'question'),
    quiz: getText(language, 'quiz'),
    submitAnswers: getText(language, 'submitAnswers'),
    reviewRetry: getText(language, 'reviewRetry'),
    retryModule: getText(language, 'retryModule'),
    studyNextModule: getText(language, 'studyNextModule'),
    backToModule: getText(language, 'backToModule'),
    correct: getText(language, 'correct'),
    incorrect: getText(language, 'incorrect'),
    completed: getText(language, 'completed'),
    available: getText(language, 'available'),
    locked: getText(language, 'locked'),
    min: getText(language, 'min'),
    questions: getText(language, 'questions'),
    language: getText(language, 'language')
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [screen, selectedModuleId]);

  useEffect(() => {
    void (async () => {
      const loaded = await readProgress();
      setProgress(loaded);
      setSelectedModuleId(loaded.lastVisitedModuleId || '00');
      setIsReady(true);
    })();
  }, []);

  const localizedModules = useMemo(
    () =>
      COURSE_DATA.modules.map((module) => ({
        ...module,
        title: localizeModuleTitle(module.id, language, module.title),
        description: localizeModuleDescription(module.id, language, module.description)
      })),
    [language]
  );

  const currentModule = useMemo(
    () => localizedModules.find((module) => module.id === selectedModuleId) ?? localizedModules[0],
    [selectedModuleId, localizedModules]
  );

  const getModuleStatus = (moduleId: string): ModuleStatus => {
    const module = getModuleById(moduleId);
    if (!module) {
      return 'locked';
    }

    if (progress.moduleResults[moduleId]?.completed) {
      return 'completed';
    }

    const prerequisitesCompleted = module.prerequisites.every((prerequisiteId) => {
      return progress.moduleResults[prerequisiteId]?.completed === true;
    });

    if (moduleId === '00' || prerequisitesCompleted) {
      return 'available';
    }

    return 'locked';
  };

  const completedCount = localizedModules.filter(
    (module) => progress.moduleResults[module.id]?.completed === true
  ).length;

  const toggleLanguage = async () => {
    const nextLanguage: Language = language === 'en' ? 'uk' : 'en';
    const nextProgress = { ...progress, language: nextLanguage };
    setProgress(nextProgress);
    await saveProgress(nextProgress);
  };

  const openModule = async (moduleId: string) => {
    const status = getModuleStatus(moduleId);
    if (status === 'locked') {
      return;
    }

    const nextProgress = { ...progress, lastVisitedModuleId: moduleId };
    setSelectedModuleId(moduleId);
    setScreen('module');
    setProgress(nextProgress);
    await saveProgress(nextProgress);
  };

  const handleQuizSubmit = async (payload: {
    moduleId: string;
    score: number;
    selectedAnswers: Record<string, string[]>;
    passed: boolean;
  }) => {
    const currentResult = progress.moduleResults[payload.moduleId];
    const nextResult = {
      moduleId: payload.moduleId,
      completed: payload.passed,
      passed: payload.passed,
      score: payload.score,
      attempts: (currentResult?.attempts ?? 0) + 1,
      selectedAnswers: payload.selectedAnswers,
      lastUpdated: Date.now()
    };

    await updateModuleResult(payload.moduleId, nextResult);
    const refreshed = await readProgress();
    setProgress(refreshed);
  };

  const handleStudyNext = () => {
    const nextModuleId = getNextUnlockedModuleId(currentModule.id);
    if (nextModuleId) {
      void openModule(nextModuleId);
    }
  };

  const handleRetryModule = async () => {
    const moduleId = currentModule.id;
    const current = progress.moduleResults[moduleId];
    if (current) {
      await updateModuleResult(moduleId, { ...current, selectedAnswers: {} });
      const refreshed = await readProgress();
      setProgress(refreshed);
    }
    setScreen('module');
  };

  if (!isReady) {
    return <div className="loading-screen">{getText(language, 'loading')}</div>;
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="topbar-label">{strings.course}</p>
          <h2>Rust &amp; Tauri</h2>
        </div>
        <div className="topbar-actions">
          <button type="button" className="lang-toggle" onClick={toggleLanguage} aria-label="Change language">
            {language === 'en' ? 'UA' : 'EN'}
          </button>
          <div className="topbar-progress">
            <span>{completedCount}/{localizedModules.length}</span>
          </div>
        </div>
      </header>

      {screen === 'overview' && (
        <CourseOverview
          modules={localizedModules}
          getModuleStatus={getModuleStatus}
          completedCount={completedCount}
          onOpenModule={openModule}
          moduleResults={Object.fromEntries(
            localizedModules.map((module) => [
              module.id,
              {
                completed: progress.moduleResults[module.id]?.completed ?? false,
                score: progress.moduleResults[module.id]?.score ?? 0
              }
            ])
          )}
          strings={strings}
        />
      )}

      {screen === 'module' && (
        <ModuleReader
          module={currentModule}
          onBack={() => setScreen('overview')}
          onStartQuiz={() => setScreen('quiz')}
          isQuizAvailable={getModuleStatus(currentModule.id) !== 'locked'}
          strings={strings}
          language={language}
        />
      )}

      {screen === 'quiz' && (
        <QuizScreen
          module={currentModule}
          previousAnswers={progress.moduleResults[currentModule.id]?.selectedAnswers}
          onBack={() => setScreen('module')}
          onStudyNext={handleStudyNext}
          onRetryModule={handleRetryModule}
          onSubmit={handleQuizSubmit}
          strings={strings}
        />
      )}

      <footer className="app-footer">
        <a href="https://apex-developing.github.io" target="_blank" rel="noreferrer">
          developed by Sergii Trynchuk
        </a>
      </footer>
    </div>
  );
}
