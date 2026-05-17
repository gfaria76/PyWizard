<template>
  <div class="bg-surface-container-lowest/50 border border-outline-variant/50 rounded-lg overflow-hidden">
    <div class="bg-surface-container-low/50 px-4 py-2 border-b border-outline-variant/30 text-label-caps text-on-surface-variant font-bold">
      Python
    </div>
    <pre class="cg-markdown cg-scroll px-4 py-4 overflow-x-auto text-code-md"><code v-html="highlighted" /></pre>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  code: string
}>()

const highlighted = computed(() => {
  // Simple Python syntax highlighting using cg-py-* classes
  let html = props.code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

  // Keywords
  html = html.replace(
    /\b(def|class|if|elif|else|for|while|import|from|return|True|False|None|and|or|not|in|is|lambda|with|as|try|except|finally)\b/g,
    '<span class="cg-py-keyword">$1</span>'
  )

  // Strings
  html = html.replace(
    /(["\'])(?:(?=(\\?))\2.)*?\1/g,
    '<span class="cg-py-string">$&</span>'
  )

  // Comments
  html = html.replace(
    /(#.*)$/gm,
    '<span class="cg-py-comment">$1</span>'
  )

  // Numbers
  html = html.replace(
    /\b(\d+(?:\.\d+)?)\b/g,
    '<span class="cg-py-number">$1</span>'
  )

  // Built-ins
  html = html.replace(
    /\b(print|len|range|str|int|float|list|dict|set|tuple|open|input|sum|max|min|sorted|enumerate|zip|map|filter|type|isinstance)\b/g,
    '<span class="cg-py-builtin">$1</span>'
  )

  return html
})
</script>
