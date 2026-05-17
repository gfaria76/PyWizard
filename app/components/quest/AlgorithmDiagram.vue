<template>
  <div class="bg-surface-container/80 backdrop-blur-xl border border-secondary-container/30 rounded-xl p-6">
    <h3 class="font-headline-sm text-headline-sm text-secondary mb-4 flex items-center gap-2">
      <span class="material-symbols-outlined">architecture</span>
      Algorithm Visualization
    </h3>

    <!-- SVG Container -->
    <div class="bg-surface-container-lowest rounded-lg p-6 min-h-[200px] flex items-center justify-center">
      <svg v-if="svgContent" class="w-full h-auto max-w-full" v-html="svgContent" />
      <div v-else class="text-center text-on-surface-variant">
        <span class="material-symbols-outlined text-[48px] opacity-30 block mb-2">not_interested</span>
        <p class="text-sm">No diagram available for this lesson</p>
      </div>
    </div>

    <!-- Open in Modal Button -->
    <div v-if="svgContent" class="mt-4 flex justify-center">
      <button
        class="flex items-center gap-2 px-4 py-2 bg-primary-container/20 hover:bg-primary-container/30 text-primary-container font-label-caps rounded-lg transition-colors"
        @click="showModal = true"
      >
        <span class="material-symbols-outlined">fullscreen</span>
        View Fullscreen
      </button>
    </div>

    <!-- Fullscreen Modal -->
    <UModal v-model:open="showModal" title="Algorithm Diagram">
      <template #content>
        <div class="bg-surface-container p-8">
          <div v-if="svgContent" class="bg-surface-container-lowest rounded-lg p-8 max-h-[600px] overflow-auto">
            <svg v-html="svgContent" class="w-full h-auto" />
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  svgContent?: string
}>()

const showModal = ref(false)
</script>

<style scoped>
/* Allow v-html SVG elements to display properly */
:deep(svg) {
  max-width: 100%;
  height: auto;
}
</style>
