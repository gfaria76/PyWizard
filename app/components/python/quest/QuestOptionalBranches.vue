<template>
  <section v-if="optionals.length" class="cg-panel rounded-2xl p-4">
    <div class="mb-3 flex items-center gap-2">
      <UIcon name="i-lucide-git-branch" class="h-4 w-4 text-amber-400" />
      <h2 class="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Ramos opcionais</h2>
    </div>

    <div class="space-y-2">
      <NuxtLink
        v-for="opt in optionals"
        :key="getQuestSlug(opt)"
        :to="`/cursos/python/quests/${getQuestSlug(opt)}`"
        class="flex items-center gap-3 rounded-xl border border-amber-300/15 bg-amber-300/5 px-3 py-2.5 transition hover:border-amber-300/30 hover:bg-amber-300/10"
      >
        <UIcon :name="getQuestTone(getQuestSubtype(opt)).icon" class="h-4 w-4 shrink-0 text-amber-300" />
        <div class="min-w-0">
          <p class="truncate text-xs font-bold text-slate-200">{{ opt.titulo }}</p>
          <p class="text-[0.65rem] text-amber-400/70">Opcional · +{{ getQuestRewards(opt).xp }} XP</p>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ModuleQuest } from '~/types/course'
import { getQuestRewards, getQuestSlug, getQuestSubtype, getQuestTone } from '~/composables/useLessonMeta'

defineProps<{
  optionals: ModuleQuest[]
}>()
</script>

