<template>
  <UModal v-model:open="isOpen" :title="title">
    <template #content>
      <div class="bg-surface-container p-6 space-y-4">
        <!-- Image or SVG Content -->
        <div v-if="imageUrl" class="rounded-lg overflow-hidden bg-surface-container-lowest p-4">
          <img :src="imageUrl" :alt="title" class="w-full h-auto" />
        </div>

        <div v-else-if="svgContent" class="rounded-lg overflow-auto bg-surface-container-lowest p-4 max-h-[500px]">
          <svg v-html="svgContent" class="w-full h-auto" />
        </div>

        <!-- Text Explanation -->
        <div v-if="explanation" class="prose-arcane max-h-[300px] overflow-auto">
          <QuestMarkdownBlock :content="explanation" />
        </div>

        <!-- No Content State -->
        <div v-if="!imageUrl && !svgContent && !explanation" class="text-center py-8 text-on-surface-variant">
          <span class="material-symbols-outlined text-[48px] opacity-30 block mb-2">image_not_supported</span>
          <p class="text-sm">No visual explanation available</p>
        </div>

        <!-- Close Button -->
        <div class="flex justify-end gap-2 mt-6 border-t border-outline-variant/20 pt-4">
          <button
            class="px-4 py-2 rounded text-on-surface-variant hover:bg-surface-variant transition-colors"
            @click="isOpen = false"
          >
            Close
          </button>
        </div>
      </div>
    </template>
  </UModal>

  <!-- Trigger Button (optional) -->
  <button
    v-if="triggerButton"
    class="flex items-center gap-2 px-4 py-2 bg-primary-container/20 hover:bg-primary-container/30 text-primary-container font-label-caps rounded-lg transition-colors"
    @click="isOpen = true"
  >
    <span class="material-symbols-outlined">info</span>
    {{ triggerButton }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  imageUrl?: string
  svgContent?: string
  explanation?: string
  triggerButton?: string
}>()

const isOpen = defineModel<boolean>('open', { default: false })
</script>

<style scoped>
:deep(svg) {
  max-width: 100%;
  height: auto;
}
</style>
