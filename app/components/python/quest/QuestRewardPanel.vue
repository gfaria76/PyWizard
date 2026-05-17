<template>
  <section v-if="quest" class="cg-panel rounded-2xl p-4">
    <div class="mb-4 flex items-center gap-2">
      <UIcon name="i-lucide-package-plus" class="h-5 w-5 text-cyan-200" />
      <h2 class="font-black text-slate-50">Recompensa</h2>
    </div>
    <div class="space-y-3">
      <div
        v-for="item in quest.inventario_novo"
        :key="item.id"
        class="rounded-xl border border-cyan-200/20 bg-cyan-300/10 p-3"
      >
        <p class="text-sm font-bold text-cyan-50">{{ item.nome }}</p>
        <p class="mt-1 text-xs leading-5 text-slate-400">{{ item.descricao }}</p>
      </div>
    </div>
    <UButton
      class="mt-4 w-full justify-center"
      :color="completed ? 'neutral' : 'primary'"
      :variant="completed ? 'soft' : 'solid'"
      :icon="completed ? 'i-lucide-check' : 'i-lucide-check-circle'"
      :disabled="completed"
      @click="$emit('complete')"
    >
      {{ completed ? 'Concluída' : 'Concluir quest' }}
    </UButton>
  </section>
</template>

<script setup lang="ts">
import type { ModuleQuest } from '~/types/course'

defineProps<{
  quest: ModuleQuest | null
  completed: boolean
}>()

defineEmits<{
  complete: []
}>()
</script>

