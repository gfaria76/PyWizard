// Pyodide — Python via WebAssembly no browser.
// Carregado lazily do CDN na primeira execução, depois fica em memória.

const PYODIDE_CDN = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/'

export interface PyRunResult {
  stdout: string
  stderr: string
  exitCode: number
}

interface PyodideInterface {
  runPythonAsync(code: string): Promise<unknown>
  globals: { set(k: string, v: unknown): void, get(k: string): unknown }
}

declare global {
  interface Window {
    loadPyodide?: (cfg: { indexURL: string }) => Promise<PyodideInterface>
  }
}

let instance: PyodideInterface | null = null
let loadPromise: Promise<PyodideInterface> | null = null

// Runner template — injected via py.globals.set to avoid escaping headaches
const RUNNER_TEMPLATE = `
import sys, io, builtins, traceback

_out = io.StringIO()
_err = io.StringIO()
_lines = _stdin_text.split('\\n')
_idx = [0]

def _input(prompt=''):
    if prompt:
        _out.write(str(prompt))
    if _idx[0] < len(_lines):
        val = _lines[_idx[0]]
        _idx[0] += 1
        _out.write(str(val) + '\\n')
        return str(val)
    return ''

_o, _e, _i = sys.stdout, sys.stderr, builtins.input
sys.stdout, sys.stderr, builtins.input = _out, _err, _input
_ec = 0
try:
    exec(compile(_code, '<aluno>', 'exec'), {'__name__': '__main__'})
except SystemExit as e:
    _ec = int(e.code) if isinstance(e.code, int) else 0
except Exception:
    _err.write(traceback.format_exc())
    _ec = 1
finally:
    sys.stdout, sys.stderr, builtins.input = _o, _e, _i

_r_out = _out.getvalue()
_r_err = _err.getvalue()
`

async function getOrLoad(): Promise<PyodideInterface> {
  if (instance) return instance
  if (loadPromise) return loadPromise

  loadPromise = (async () => {
    if (!window.loadPyodide) {
      await new Promise<void>((resolve, reject) => {
        const s = document.createElement('script')
        s.src = `${PYODIDE_CDN}pyodide.js`
        s.onload = () => resolve()
        s.onerror = () => reject(new Error('Falha ao carregar Pyodide do CDN'))
        document.head.appendChild(s)
      })
    }
    const py = await window.loadPyodide!({ indexURL: PYODIDE_CDN })
    instance = py
    return py
  })()

  return loadPromise
}

export function usePyodide() {
  const initializing = ref(false)

  async function runPython(code: string, stdin: string): Promise<PyRunResult> {
    initializing.value = !instance

    let py: PyodideInterface
    try {
      py = await getOrLoad()
    }
    catch (err) {
      initializing.value = false
      return {
        stdout: '',
        stderr: `Erro ao inicializar Python: ${err instanceof Error ? err.message : String(err)}`,
        exitCode: 1,
      }
    }
    finally {
      initializing.value = false
    }

    py.globals.set('_code', code)
    py.globals.set('_stdin_text', stdin || '')

    try {
      await py.runPythonAsync(RUNNER_TEMPLATE)
    }
    catch (err) {
      // Pyodide-level crash (e.g. infinite loop interrupted, syntax error in runner)
      return {
        stdout: String(py.globals.get('_r_out') ?? ''),
        stderr: err instanceof Error ? err.message : String(err),
        exitCode: 1,
      }
    }

    return {
      stdout: String(py.globals.get('_r_out') ?? ''),
      stderr: String(py.globals.get('_r_err') ?? ''),
      exitCode: Number(py.globals.get('_ec') ?? 0),
    }
  }

  return { initializing, runPython }
}
