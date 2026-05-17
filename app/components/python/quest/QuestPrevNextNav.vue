<template>
  <div class="flex items-center justify-between gap-4 border-t border-slate-700/40 pt-6">
    <UButton
      v-if="prevPath"
      :to="prevPath"
      variant="ghost"
      color="neutral"
      icon="i-lucide-arrow-left"
    >
      <span class="hidden max-w-48 truncate sm:inline">{{ prevQuest?.titulo }}</span>
      <span class="sm:hidden">Anterior</span>
    </UButton>
    <div v-else />
    <UButton
      v-if="nextPath"
      :to="nextPath"
      variant="ghost"
      color="neutral"
      trailing-icon="i-lucide-arrow-right"
    >
      <span class="hidden max-w-48 truncate sm:inline">{{ nextQuest?.titulo }}</span>
      <span class="sm:hidden">Próxima</span>
    </UButton>
  </div>
</template>

<script setup lang="ts">
import type { ModuleQuest } from '~/types/course'

defineProps<{
  prevQuest: ModuleQuest | null
  nextQuest: ModuleQuest | null
  prevPath: string | null
  nextPath: string | null
}>()
</script>

