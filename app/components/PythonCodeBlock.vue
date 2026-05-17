<template>
  <div class="group relative">
    <div class="flex items-center justify-between rounded-t-[0.9rem] border border-b-0 border-cyan-200/20 bg-[#050a13] px-4 py-2">
      <span class="flex items-center gap-1.5 text-[0.72rem] font-semibold text-slate-500">
        <UIcon name="i-simple-icons-python" class="h-3.5 w-3.5 text-cyan-400/60" />
        Python
      </span>
      <button
        class="flex items-center gap-1.5 rounded-md px-2 py-1 text-[0.72rem] font-semibold text-slate-400 opacity-0 transition hover:bg-white/8 hover:text-slate-200 group-hover:opacity-100 focus-visible:opacity-100"
        aria-label="Copiar código"
        @click="copyCode"
      >
        <UIcon :name="copied ? 'i-lucide-check' : 'i-lucide-copy'" class="h-3.5 w-3.5" />
        {{ copied ? 'Copiado!' : 'Copiar' }}
      </button>
    </div>
    <pre class="overflow-auto rounded-b-[0.9rem] border border-t-0 border-cyan-200/20 bg-[#050a13] p-4 font-mono text-[0.86rem] leading-7"><code v-html="highlighted" /></pre>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  code: string
}>()

const copied = ref(false)
const highlighted = computed(() => highlightPython(props.code))

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }
  catch {
    // clipboard API unavailable
  }
}
</script>
