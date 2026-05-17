const KEYWORDS = new Set([
  'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await',
  'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except',
  'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is',
  'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try',
  'while', 'with', 'yield',
])

const BUILTINS = new Set([
  'abs', 'all', 'any', 'bin', 'bool', 'callable', 'chr', 'dict',
  'dir', 'divmod', 'enumerate', 'eval', 'exec', 'filter', 'float',
  'format', 'frozenset', 'getattr', 'globals', 'hasattr', 'hash',
  'help', 'hex', 'id', 'input', 'int', 'isinstance', 'issubclass',
  'iter', 'len', 'list', 'locals', 'map', 'max', 'min', 'next',
  'object', 'oct', 'open', 'ord', 'pow', 'print', 'property', 'range',
  'repr', 'reversed', 'round', 'set', 'setattr', 'slice', 'sorted',
  'staticmethod', 'str', 'sum', 'super', 'tuple', 'type', 'vars', 'zip',
])

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function tok(cls: string, content: string): string {
  return `<span class="${cls}">${content}</span>`
}

function tokenizeLine(line: string): string {
  let result = ''
  let i = 0

  while (i < line.length) {
    // Comment
    if (line[i] === '#') {
      result += tok('cg-py-comment', esc(line.slice(i)))
      break
    }

    // Strings
    if (line[i] === '"' || line[i] === "'") {
      const q = line[i]!
      const isTriple = line.slice(i, i + 3) === q + q + q
      let j = isTriple ? i + 3 : i + 1
      if (isTriple) {
        while (j < line.length) {
          if (line.slice(j, j + 3) === q + q + q) { j += 3; break }
          if (line[j] === '\\') j += 2
          else j++
        }
      }
      else {
        while (j < line.length) {
          if (line[j] === '\\') { j += 2; continue }
          if (line[j] === q) { j++; break }
          j++
        }
      }
      result += tok('cg-py-string', esc(line.slice(i, j)))
      i = j
      continue
    }

    // Numbers (not preceded by word char)
    if (/[0-9]/.test(line[i]!) && (i === 0 || !/[a-zA-Z_0-9]/.test(line[i - 1]!))) {
      let j = i
      while (j < line.length && /[0-9._xXoObBe]/.test(line[j]!)) j++
      result += tok('cg-py-number', esc(line.slice(i, j)))
      i = j
      continue
    }

    // Identifiers, keywords, builtins
    if (/[a-zA-Z_]/.test(line[i]!)) {
      let j = i
      while (j < line.length && /[a-zA-Z_0-9]/.test(line[j]!)) j++
      const word = line.slice(i, j)
      let k = j
      while (k < line.length && line[k] === ' ') k++
      if (KEYWORDS.has(word)) {
        result += tok('cg-py-keyword', esc(word))
      }
      else if (BUILTINS.has(word)) {
        result += tok('cg-py-builtin', esc(word))
      }
      else if (line[k] === '(') {
        result += tok('cg-py-func', esc(word))
      }
      else {
        result += esc(word)
      }
      i = j
      continue
    }

    result += esc(line[i]!)
    i++
  }

  return result
}

export function highlightPython(code: string): string {
  return code.split('\n').map(tokenizeLine).join('\n')
}
