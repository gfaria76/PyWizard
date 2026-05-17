<template>
  <NuxtLink
    :to="locked ? undefined : `/cursos/python/quests/${slug}`"
    class="group relative block rounded-2xl border p-4 transition duration-200"
    :class="[
      locked
        ? 'cursor-not-allowed border-slate-600/20 bg-slate-900/45 opacity-60'
        : tone.ring,
      active ? 'cg-active-node' : '',
      completed ? 'border-emerald-300/40 bg-emerald-300/10' : '',
    ]"
    :aria-disabled="locked"
  >
    <div class="flex items-start gap-4">
      <div class="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-current/25 bg-black/20 text-sm font-black">
        <UIcon v-if="completed" name="i-lucide-check" class="h-5 w-5 text-emerald-200" />
        <UIcon v-else-if="locked" name="i-lucide-lock" class="h-5 w-5 text-slate-400" />
        <span v-else>{{ quest.numero }}</span>
      </div>

      <div class="min-w-0 flex-1">
        <div class="mb-2 flex flex-wrap items-center gap-2">
          <UBadge :color="completed ? 'success' : tone.badgeColor" variant="soft">
            {{ completed ? 'Concluída' : tone.label }}
          </UBadge>
          <span class="text-xs font-semibold text-slate-400">Aula {{ quest.numero }}</span>
        </div>

        <h3 class="text-base font-extrabold leading-snug text-slate-50">
          {{ quest.titulo }}
        </h3>

        <p class="mt-2 line-clamp-2 text-sm text-slate-400">
          {{ summary }}
        </p>

        <div v-if="quest.inventario_novo?.length" class="mt-3 flex flex-wrap gap-2">
          <span
            v-for="item in quest.inventario_novo"
            :key="item.id"
            class="rounded-full border border-slate-500/20 bg-black/20 px-2.5 py-1 text-[0.68rem] font-semibold text-slate-300"
          >
            {{ item.nome }}
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { ModuleQuest } from '~/types/course'

const props = defineProps<{
  quest: ModuleQuest
  locked: boolean
  active: boolean
  completed: boolean
}>()

const slug = computed(() => getQuestSlug(props.quest))
const subtype = computed(() => getQuestSubtype(props.quest))
const tone = computed(() => getQuestTone(subtype.value))
const summary = computed(() => {
  if (subtype.value === 'prova') {
    return 'Ritual final para validar domínio do módulo e liberar o próximo território.'
  }

  if (subtype.value === 'boss') {
    return 'Combate prático com missões sequenciais, pressão de tempo e recompensa especial.'
  }

  return 'Quest guiada para aprender uma nova técnica e registrar poder no grimório.'
})
</script>
