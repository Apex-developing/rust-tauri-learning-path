export interface ModuleProgressResult {
  moduleId: string;
  completed: boolean;
  passed: boolean;
  score: number;
  attempts: number;
  selectedAnswers: Record<string, string[]>;
  lastUpdated: number;
}

export type SupportedLanguage = 'en' | 'uk';

export interface CourseProgressState {
  version: string;
  language: SupportedLanguage;
  lastVisitedModuleId: string;
  moduleResults: Record<string, ModuleProgressResult>;
}

const DB_NAME = 'rust-tauri-learning-db';
const STORE_NAME = 'progress';
const KEY = 'course';
const DEFAULT_PROGRESS: CourseProgressState = {
  version: '1.0.0',
  language: 'en',
  lastVisitedModuleId: '00',
  moduleResults: {}
};

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Failed to open IndexedDB'));
  });
}

export async function readProgress(): Promise<CourseProgressState> {
  try {
    const database = await openDatabase();
    const transaction = database.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    return await new Promise((resolve, reject) => {
      const request = store.get(KEY);
      request.onsuccess = () => {
        const value = request.result as (CourseProgressState & { id?: string }) | undefined;
        if (!value) {
          resolve(DEFAULT_PROGRESS);
          return;
        }

        resolve({
          version: value.version ?? DEFAULT_PROGRESS.version,
          language: value.language ?? DEFAULT_PROGRESS.language,
          lastVisitedModuleId: value.lastVisitedModuleId ?? DEFAULT_PROGRESS.lastVisitedModuleId,
          moduleResults: value.moduleResults ?? {}
        });
      };
      request.onerror = () => reject(request.error ?? new Error('Failed to read progress'));
    });
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export async function saveProgress(progress: CourseProgressState): Promise<void> {
  const database = await openDatabase();
  const transaction = database.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

  await new Promise<void>((resolve, reject) => {
    const request = store.put({ id: KEY, ...progress });
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error ?? new Error('Failed to save progress'));
  });
}

export async function updateModuleResult(moduleId: string, result: ModuleProgressResult): Promise<void> {
  const existing = await readProgress();
  existing.moduleResults[moduleId] = result;
  existing.lastVisitedModuleId = moduleId;
  await saveProgress(existing);
}

export async function resetProgress(): Promise<void> {
  await saveProgress(DEFAULT_PROGRESS);
}
