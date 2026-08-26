import courseDataJson from '../generated/course-data.json';
import type { CourseData, ModuleData } from '../types/course';

export const COURSE_DATA = courseDataJson as CourseData;

export function getModuleById(id: string): ModuleData | undefined {
  return COURSE_DATA.modules.find((module) => module.id === id);
}

export function getModuleIndex(moduleId: string): number {
  return COURSE_DATA.modules.findIndex((module) => module.id === moduleId);
}

export function getNextUnlockedModuleId(currentModuleId: string): string | undefined {
  const currentIndex = getModuleIndex(currentModuleId);
  if (currentIndex === -1) return undefined;

  return COURSE_DATA.modules[currentIndex + 1]?.id;
}
