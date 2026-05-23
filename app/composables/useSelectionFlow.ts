const FLOW_STORAGE_KEY = 'codegrimoire:selection-flow:v1'

interface SelectionFlowState {
  lastCourseId: string | null
  lastModuleByCourse: Record<string, number>
  lastLessonByModule: Record<string, number>
  lastActivityByLesson: Record<string, string>
}

function defaultFlowState(): SelectionFlowState {
  return {
    lastCourseId: null,
    lastModuleByCourse: {},
    lastLessonByModule: {},
    lastActivityByLesson: {},
  }
}

function moduleKey(courseId: string): string {
  return courseId
}

function lessonKey(courseId: string, moduleNumber: number): string {
  return `${courseId}:m${moduleNumber}`
}

function activityKey(courseId: string, moduleNumber: number, lessonNumber: number): string {
  return `${courseId}:m${moduleNumber}:a${lessonNumber}`
}

export function useSelectionFlow() {
  const state = useState<SelectionFlowState>('selection-flow-state', defaultFlowState)
  const hydrated = useState<boolean>('selection-flow-hydrated', () => false)

  function hydrate() {
    if (!import.meta.client || hydrated.value) {
      return
    }

    const raw = localStorage.getItem(FLOW_STORAGE_KEY)
    if (!raw) {
      hydrated.value = true
      return
    }

    try {
      const parsed = JSON.parse(raw) as Partial<SelectionFlowState>
      state.value = {
        ...defaultFlowState(),
        ...parsed,
        lastModuleByCourse: parsed.lastModuleByCourse ?? {},
        lastLessonByModule: parsed.lastLessonByModule ?? {},
        lastActivityByLesson: parsed.lastActivityByLesson ?? {},
      }
    } catch {
      state.value = defaultFlowState()
    } finally {
      hydrated.value = true
    }
  }

  function persist() {
    if (!import.meta.client) {
      return
    }
    localStorage.setItem(FLOW_STORAGE_KEY, JSON.stringify(state.value))
  }

  function setCourse(courseId: string) {
    state.value.lastCourseId = courseId
    persist()
  }

  function setModule(courseId: string, moduleNumber: number) {
    state.value.lastCourseId = courseId
    state.value.lastModuleByCourse[moduleKey(courseId)] = moduleNumber
    persist()
  }

  function setLesson(courseId: string, moduleNumber: number, lessonNumber: number) {
    setModule(courseId, moduleNumber)
    state.value.lastLessonByModule[lessonKey(courseId, moduleNumber)] = lessonNumber
    persist()
  }

  function setActivity(courseId: string, moduleNumber: number, lessonNumber: number, activitySlug: string) {
    setLesson(courseId, moduleNumber, lessonNumber)
    state.value.lastActivityByLesson[activityKey(courseId, moduleNumber, lessonNumber)] = activitySlug
    persist()
  }

  function getLastModule(courseId: string): number | null {
    return state.value.lastModuleByCourse[moduleKey(courseId)] ?? null
  }

  function getLastLesson(courseId: string, moduleNumber: number): number | null {
    return state.value.lastLessonByModule[lessonKey(courseId, moduleNumber)] ?? null
  }

  function getLastActivity(courseId: string, moduleNumber: number, lessonNumber: number): string | null {
    return state.value.lastActivityByLesson[activityKey(courseId, moduleNumber, lessonNumber)] ?? null
  }

  return {
    state,
    hydrate,
    setCourse,
    setModule,
    setLesson,
    setActivity,
    getLastModule,
    getLastLesson,
    getLastActivity,
  }
}
