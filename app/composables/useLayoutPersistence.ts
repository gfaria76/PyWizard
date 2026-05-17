const STORAGE_KEY = 'cg:layout:cols:v1'

export interface LayoutWidths {
  sidebar: number
}

const DEFAULTS: LayoutWidths = {
  sidebar: 256,
}

const MIN: LayoutWidths = {
  sidebar: 220,
}

const MAX: LayoutWidths = {
  sidebar: 480,
}

export function useLayoutPersistence() {
  const widths = useState<LayoutWidths>('cg-layout-widths', () => ({ ...DEFAULTS }))

  function hydrate() {
    if (!import.meta.client) return
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    try {
      const parsed = JSON.parse(raw) as Partial<LayoutWidths>
      if (typeof parsed.sidebar === 'number') {
        widths.value.sidebar = clamp(parsed.sidebar, MIN.sidebar, MAX.sidebar)
      }
    } catch {
      // ignore — fall back to defaults
    }
  }

  function persist() {
    if (!import.meta.client) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(widths.value))
  }

  function setSidebar(value: number) {
    widths.value.sidebar = clamp(value, MIN.sidebar, MAX.sidebar)
    persist()
  }

  function reset() {
    widths.value = { ...DEFAULTS }
    persist()
  }

  return {
    widths,
    defaults: DEFAULTS,
    min: MIN,
    max: MAX,
    hydrate,
    setSidebar,
    reset,
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}
