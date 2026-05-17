<template>
  <div>
    <div class="grid gap-3 p-3 h-full overflow-hidden lg:grid-cols-[1fr_18rem]">

    <!-- Center: Hero + Quest Map -->
    <div
      v-motion
      :initial="{ opacity: 0, y: 24 }"
      :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 26 } }"
      class="min-w-0 space-y-3 h-full overflow-y-auto cg-scroll"
    >
      <section class="cg-solid-panel relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div class="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_70%_35%,rgba(76,215,246,0.22),transparent_22rem)] md:block" />
        <div class="relative max-w-3xl">
          <UBadge color="primary" variant="soft" icon="i-lucide-sparkles" class="mb-4">
            Campanha Python · Módulo I
          </UBadge>
          <h1 class="font-orbitron text-3xl font-black tracking-tight text-slate-50 text-shadow-[0_0_24px_rgba(76,215,246,0.32)] sm:text-4xl">
            Reino das Runas de Memória
          </h1>
          <p class="mt-4 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Variáveis, operações e decisões viram técnicas de batalha. Complete aulas, Provas do Aprendiz, trilhas extras, vigílias e bosses para registrar cada nova sintaxe no grimório.
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <template v-if="!activeQuestPath">
              <UTooltip text="Complete a primeira quest para continuar">
                <span class="inline-flex cursor-not-allowed">
                  <UButton color="primary" size="lg" icon="i-lucide-play" disabled style="pointer-events: none">
                    Continuar campanha
                  </UButton>
                </span>
              </UTooltip>
            </template>
            <UButton v-else :to="activeQuestPath" color="primary" size="lg" icon="i-lucide-play">
              Continuar campanha
            </UButton>
            <UButton variant="soft" color="neutral" icon="i-lucide-rotate-ccw" @click="showResetModal = true">
              Reiniciar progresso
            </UButton>
          </div>
        </div>
      </section>

      <section class="cg-panel rounded-3xl p-4 sm:p-6">
        <div class="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.24em] text-violet-100/70">Mapa da campanha</p>
            <h2 class="font-orbitron text-xl font-black text-slate-50">{{ campaign?.modulo.titulo ?? 'Carregando...' }}</h2>
          </div>
          <UBadge color="neutral" variant="soft">
            {{ progress.completedCount }}/{{ campaign?.modulo.aulas.length ?? 0 }} concluídas
          </UBadge>
        </div>

        <div v-if="pending" class="space-y-2">
          <USkeleton class="h-[296px] rounded-2xl" />
          <USkeleton class="h-14 rounded-2xl" />
        </div>
        <template v-else-if="campaign">
          <ConstellationMap
            :quests="campaign.modulo.aulas"
            :active-slug="activeQuestSlug"
          />

          <!-- Progresso por bloco -->
          <div class="flex flex-wrap gap-2 pt-1">
            <div
              v-for="(block, bi) in moduleBlocks"
              :key="bi"
              class="flex items-center gap-2 rounded-xl border border-slate-700/30 bg-slate-800/30 px-3 py-1.5 text-xs"
            >
              <span class="font-bold text-slate-400">Bloco {{ bi + 1 }}</span>
              <span class="text-emerald-400">{{ blockMandatoryDone(block) }}/{{ blockMandatoryTotal(block) }} <span class="text-slate-600">obrig.</span></span>
              <span v-if="block.optional.length" class="text-amber-400/70">{{ blockOptionalDone(block) }}/{{ block.optional.length }} <span class="text-slate-600">opc.</span></span>
            </div>
          </div>

          <!-- Legenda -->
          <div class="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-1 text-[0.7rem] text-slate-500">
            <span class="flex items-center gap-1.5"><UIcon name="i-lucide-scroll-text" class="h-3.5 w-3.5 text-cyan-400" /> Conceito</span>
            <span class="flex items-center gap-1.5"><UIcon name="i-lucide-wand-2" class="h-3.5 w-3.5 text-indigo-400" /> Aprendiz</span>
            <span class="flex items-center gap-1.5"><UIcon name="i-lucide-map" class="h-3.5 w-3.5 text-emerald-400" /> Aventura <span class="text-amber-400/60">(opcional)</span></span>
            <span class="flex items-center gap-1.5"><UIcon name="i-lucide-shield-check" class="h-3.5 w-3.5 text-amber-400" /> Guardião <span class="text-amber-400/60">(opcional)</span></span>
            <span class="flex items-center gap-1.5"><UIcon name="i-lucide-users-round" class="h-3.5 w-3.5 text-teal-400" /> Grupo <span class="text-amber-400/60">(opcional)</span></span>
            <span class="flex items-center gap-1.5"><UIcon name="i-lucide-swords" class="h-3.5 w-3.5 text-violet-400" /> Boss</span>
            <span class="flex items-center gap-1.5"><UIcon name="i-lucide-crown" class="h-3.5 w-3.5 text-amber-300" /> Prova</span>
          </div>
        </template>
      </section>
    </div>

    <!-- Right: Inventory -->
    <aside
      v-motion
      :initial="{ opacity: 0, x: 24 }"
      :enter="{ opacity: 1, x: 0, transition: { type: 'spring', stiffness: 260, damping: 26, delay: 80 } }"
      class="hidden lg:flex lg:flex-col lg:h-full lg:overflow-y-auto cg-scroll"
    >
      <InventoryPreview
        v-if="campaign"
        :quests="campaign.modulo.aulas"
        :completed-slugs="progress.completedQuestSlugs"
      />
    </aside>
    </div>

    <!-- Reset confirmation modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="showResetModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click.self="showResetModal = false"
        >
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showResetModal = false" />
          <div class="cg-solid-panel relative w-full max-w-sm rounded-2xl p-6 shadow-2xl">
            <div class="mb-4 flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-300/10">
                <UIcon name="i-lucide-alert-triangle" class="h-5 w-5 text-amber-400" />
              </div>
              <h2 class="font-black text-slate-50">Reiniciar progresso?</h2>
            </div>
            <p class="mb-6 text-sm leading-6 text-slate-300">
              Isso apagará <strong class="text-slate-100">todas as quests concluídas</strong>, XP, moedas e itens do grimório. Essa ação não pode ser desfeita.
            </p>
            <div class="flex justify-end gap-3">
              <UButton variant="ghost" color="neutral" @click="showResetModal = false">
                Cancelar
              </UButton>
              <UButton color="error" icon="i-lucide-rotate-ccw" @click="confirmReset">
                Reiniciar
              </UButton>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { CampaignPayload } from '~/types/course'
import { groupQuestsIntoBlocks } from '~/composables/useModuleBlocks'

useSeoMeta({ title: 'Mapa Python' })

const progress = useProgressStore()
const { data: campaign, pending } = await useFetch<CampaignPayload>('/api/cursos/python/campanha')
const showResetModal = ref(false)

const activeQuestSlug = computed(() => {
  if (!campaign.value) return ''
  return progress.getActiveQuestSlug(campaign.value.modulo.aulas)
})

// Blocos e progresso por bloco
const moduleBlocks = computed(() => groupQuestsIntoBlocks(campaign.value?.modulo.aulas ?? []))

function blockMandatoryTotal(block: ReturnType<typeof groupQuestsIntoBlocks>[0]) {
  return block.trunk.length + (block.closer ? 1 : 0)
}

function blockMandatoryDone(block: ReturnType<typeof groupQuestsIntoBlocks>[0]) {
  const all = block.closer ? [...block.trunk, block.closer] : block.trunk
  return all.filter(q => progress.isCompleted(getQuestSlug(q))).length
}

function blockOptionalDone(block: ReturnType<typeof groupQuestsIntoBlocks>[0]) {
  return block.optional.filter(q => progress.isCompleted(getQuestSlug(q))).length
}

const activeQuestPath = computed(() =>
  activeQuestSlug.value ? `/cursos/python/quests/${activeQuestSlug.value}` : undefined,
)

function confirmReset() {
  progress.reset()
  showResetModal.value = false
}
</script>
