<template>
  <div class="cg-markdown" v-html="html" />
</template>

<script setup lang="ts">
const props = defineProps<{
  content?: string | null
}>()

const html = computed(() => renderMarkdown(props.content ?? ''))

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function renderInline(value: string) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-on-background">$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replaceAll('&lt;br&gt;', '<br>')
}

function renderTable(lines: string[]) {
  const rows = lines
    .filter((line) => !/^\|\s*-/.test(line))
    .map((line) => line
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((cell) => renderInline(cell.trim())))

  const [head, ...body] = rows

  return [
    '<table>',
    head ? `<thead><tr>${head.map((cell) => `<th>${cell}</th>`).join('')}</tr></thead>` : '',
    body.length ? `<tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody>` : '',
    '</table>',
  ].join('')
}

function renderMarkdown(markdown: string) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  const blocks: string[] = []
  let paragraph: string[] = []
  let list: string[] = []
  let table: string[] = []
  let code: string[] = []
  let inCode = false
  let codeLang = ''

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push(`<p>${renderInline(paragraph.join(' '))}</p>`)
      paragraph = []
    }
  }

  const flushList = () => {
    if (list.length) {
      blocks.push(`<ul>${list.map((item) => `<li>${renderInline(item)}</li>`).join('')}</ul>`)
      list = []
    }
  }

  const flushTable = () => {
    if (table.length) {
      blocks.push(renderTable(table))
      table = []
    }
  }

  const flushCode = () => {
    const raw = code.join('\n')
    const highlighted = (codeLang === 'python' || codeLang === 'py')
      ? highlightPython(raw)
      : escapeHtml(raw)
    blocks.push(`<pre><code>${highlighted}</code></pre>`)
    code = []
    codeLang = ''
  }

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      if (inCode) {
        flushCode()
        inCode = false
      }
      else {
        flushParagraph()
        flushList()
        flushTable()
        codeLang = line.trim().slice(3).trim().toLowerCase()
        inCode = true
      }
      continue
    }

    if (inCode) {
      code.push(line)
      continue
    }

    if (!line.trim()) {
      flushParagraph()
      flushList()
      flushTable()
      continue
    }

    if (line.trim().startsWith('|')) {
      flushParagraph()
      flushList()
      table.push(line)
      continue
    }

    flushTable()

    const heading = line.match(/^(#{1,3})\s+(.+)$/)
    if (heading) {
      flushParagraph()
      flushList()
      const level = heading[1]?.length ?? 2
      blocks.push(`<h${level}>${renderInline(heading[2] ?? '')}</h${level}>`)
      continue
    }

    const bullet = line.match(/^\s*[-*]\s+(.+)$/)
    if (bullet) {
      flushParagraph()
      list.push(bullet[1] ?? '')
      continue
    }

    flushList()
    paragraph.push(line.trim())
  }

  if (inCode) flushCode()
  flushParagraph()
  flushList()
  flushTable()

  return blocks.join('\n')
}
</script>
