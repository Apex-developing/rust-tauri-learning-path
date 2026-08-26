import type { ModuleData, ModuleStatus } from '../types/course';

interface CourseOverviewProps {
  modules: ModuleData[];
  getModuleStatus: (moduleId: string) => ModuleStatus;
  completedCount: number;
  onOpenModule: (moduleId: string) => void;
  moduleResults: Record<string, { completed: boolean; score: number }>; 
  strings: Record<string, string>;
}

function getStatusLabel(status: ModuleStatus, strings: Record<string, string>): string {
  switch (status) {
    case 'completed':
      return strings.completed;
    case 'available':
      return strings.available;
    default:
      return strings.locked;
  }
}

export function CourseOverview({ modules, getModuleStatus, completedCount, onOpenModule, moduleResults, strings }: CourseOverviewProps) {
  return (
    <div className="course-overview">
      <div className="overview-header card">
        <p className="eyebrow">{strings.learningPath}</p>
        <h1>{strings.courseTitle}</h1>
        <p className="muted">{strings.completeEachModule}</p>
        <div className="progress-strip">
          <div className="progress-meta">
            <strong>{completedCount}</strong>
            <span>{strings.ofModules.replace('{count}', String(modules.length))}</span>
          </div>
          <div className="progress-bar">
            <span style={{ width: `${(completedCount / modules.length) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="module-list">
        {modules.map((module) => {
          const status = getModuleStatus(module.id);
          const result = moduleResults[module.id];
          const score = result?.score ?? 0;

          return (
            <button
              key={module.id}
              type="button"
              className={`module-card card ${status}`}
              onClick={() => onOpenModule(module.id)}
              disabled={status === 'locked'}
            >
              <div className="module-card-topline">
                <span className="module-index">{module.id}</span>
                <span className={`status-chip ${status}`}>{getStatusLabel(status, strings)}</span>
              </div>

              <h2>{module.title}</h2>
              <p>{module.description}</p>

              <div className="module-meta">
                <span>{module.estimated_minutes} {strings.min}</span>
                <span>{module.quizzes.length} {strings.questions}</span>
                <span>{score}%</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
