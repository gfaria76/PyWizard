<template>
  <div v-if="rows.length" class="overflow-x-auto">
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-surface-container/50 border-b border-outline-variant/30">
          <th v-for="col in columns" :key="col" class="text-left px-4 py-2 font-label-caps text-label-caps text-secondary">
            {{ formatColumnHeader(col) }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-outline-variant/20">
        <tr v-for="(row, i) in rows" :key="i" class="hover:bg-surface-container-highest/50 transition-colors">
          <td v-for="col in columns" :key="col" class="px-4 py-3 font-code-md text-code-md text-on-surface">
            <div v-if="col === 'Show'" class="flex items-center gap-2">
              <span class="inline-block px-2 py-1 rounded text-xs font-bold" :class="row[col] === 'Hidden' ? 'bg-error/10 text-error' : 'bg-primary-container/10 text-primary-container'">
                {{ row[col] || 'Show' }}
              </span>
            </div>
            <div v-else-if="col === 'Entrada' || col === 'Input'" class="flex items-center justify-between">
              <code class="bg-surface-container-lowest px-2 py-1 rounded text-xs">{{ row[col] }}</code>
              <button
                class="ml-2 p-1 text-on-surface-variant hover:text-primary-container transition-colors"
                :title="`Copy ${col}`"
                @click="copyToClipboard(row[col])"
              >
                <span class="material-symbols-outlined text-[16px]">content_copy</span>
              </button>
            </div>
            <div v-else-if="col === 'Saída' || col === 'Output'" class="bg-surface-container-lowest px-2 py-1 rounded text-xs whitespace-pre-wrap">
              {{ row[col] }}
            </div>
            <div v-else>
              {{ row[col] }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface TableData {
  [key: string]: string | number
}

const props = defineProps<{
  markdown: string
}>()

// Parse markdown table format
// Expected: | Entrada | Saída | Show |
const rows = computed<TableData[]>(() => {
  const lines = props.markdown.split('\n').map(l => l.trim()).filter(l => l && l.startsWith('|'))

  if (lines.length < 2) return []

  // Extract column headers from first line
  const headerLine = lines[0]
  const headers = headerLine.split('|').map(h => h.trim()).filter(h => h)

  // Parse data rows
  const dataRows: TableData[] = []
  for (let i = 2; i < lines.length; i++) {
    const cells = lines[i].split('|').map(c => c.trim()).filter(c => c)
    if (cells.length === headers.length) {
      const row: TableData = {}
      headers.forEach((h, idx) => {
        row[h] = cells[idx]
      })
      dataRows.push(row)
    }
  }

  return dataRows
})

const columns = computed(() => {
  if (rows.value.length === 0) return []
  return Object.keys(rows.value[0])
})

function formatColumnHeader(col: string): string {
  // Map common headers
  const map: Record<string, string> = {
    'Entrada': 'Input',
    'Input': 'Input',
    'Saída': 'Output',
    'Output': 'Output',
    'Show': 'Visibility',
    'Visible': 'Visibility'
  }
  return map[col] || col
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
  // Could add toast notification here
}
</script>
