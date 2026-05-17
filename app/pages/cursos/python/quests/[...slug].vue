<template>
  <div class="grid gap-3 p-3 lg:h-full lg:overflow-hidden lg:grid-cols-[1fr_20rem]">
    <div class="min-w-0 lg:h-full lg:overflow-y-auto cg-scroll">
      <div class="space-y-6 pb-6">
        <div
          v-motion
          :initial="{ opacity: 0, y: -12 }"
          :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 28 } }"
          class="flex flex-wrap items-center justify-between gap-3"
        >
          <UButton to="/cursos/python" variant="ghost" color="neutral" icon="i-lucide-arrow-left">
            Voltar ao mapa
          </UButton>
          <UBadge v-if="lesson" :color="tone.badgeColor" variant="soft" :icon="tone.icon">
            {{ tone.label }}
          </UBadge>
        </div>

        <div v-if="pending" class="grid gap-4">
          <USkeleton class="h-56 rounded-3xl" />
          <USkeleton class="h-96 rounded-3xl" />
        </div>

        <template v-else-if="lesson && quest">
          <LessonConceptView
            v-if="lesson.subtipo === 'conceito'"
            :lesson="lesson"
            :tone="tone"
            :stage-badge-label="stageBadgeLabel"
            :is-optional="isOptionalQuest"
            :opening-sections="openingSections"
            :concept="concept"
            :examples="examples"
            :guided="guided"
            :autonomous="autonomous"
            :autonomous-starter="autonomousStarter"
            :challenges="challenges"
            :closing-sections="closingSections"
            :prev-quest="prevQuest"
            :next-quest="nextQuest"
            :prev-path="prevPath"
            :next-path="nextPath"
          />

          <TrailApprenticeView
            v-else-if="lesson.subtipo === 'aprendiz'"
            :lesson="lesson"
            :tone="tone"
            :stage-badge-label="stageBadgeLabel"
            :is-optional="isOptionalQuest"
            :opening-sections="openingSections"
            :mission-blocks="missionBlocks"
            :closing-sections="closingSections"
            :prev-quest="prevQuest"
            :next-quest="nextQuest"
            :prev-path="prevPath"
            :next-path="nextPath"
            :quest-slug="slug"
            :tipo-aula="tipoAula"
          />

          <TrailAdventureView
            v-else-if="lesson.subtipo === 'aventura'"
            :lesson="lesson"
            :tone="tone"
            :stage-badge-label="stageBadgeLabel"
            :is-optional="isOptionalQuest"
            :opening-sections="openingSections"
            :mission-blocks="missionBlocks"
            :closing-sections="closingSections"
            :prev-quest="prevQuest"
            :next-quest="nextQuest"
            :prev-path="prevPath"
            :next-path="nextPath"
            :quest-slug="slug"
            :tipo-aula="tipoAula"
          />

          <TrailGuardianView
            v-else-if="lesson.subtipo === 'guardiao'"
            :lesson="lesson"
            :tone="tone"
            :stage-badge-label="stageBadgeLabel"
            :is-optional="isOptionalQuest"
            :opening-sections="openingSections"
            :mission-blocks="missionBlocks"
            :closing-sections="closingSections"
            :prev-quest="prevQuest"
            :next-quest="nextQuest"
            :prev-path="prevPath"
            :next-path="nextPath"
            :quest-slug="slug"
            :tipo-aula="tipoAula"
          />

          <ExamProofView
            v-else-if="lesson.subtipo === 'prova'"
            :lesson="lesson"
            :tone="tone"
            :stage-badge-label="stageBadgeLabel"
            :is-optional="isOptionalQuest"
            :opening-sections="openingSections"
            :mission-blocks="missionBlocks"
            :closing-sections="closingSections"
            :prev-quest="prevQuest"
            :next-quest="nextQuest"
            :prev-path="prevPath"
            :next-path="nextPath"
            :quest-slug="slug"
            :tipo-aula="tipoAula"
          />

          <DungeonBossView
            v-else
            :lesson="lesson"
            :tone="tone"
            :stage-badge-label="stageBadgeLabel"
            :is-optional="isOptionalQuest"
            :opening-sections="openingSections"
            :mission-blocks="missionBlocks"
            :closing-sections="closingSections"
            :prev-quest="prevQuest"
            :next-quest="nextQuest"
            :prev-path="prevPath"
            :next-path="nextPath"
            :quest-slug="slug"
            :tipo-aula="tipoAula"
          />

          <div v-if="!progress.isCompleted(slug)" class="lg:hidden">
            <UButton
              class="w-full justify-center"
              color="primary"
              size="lg"
              icon="i-lucide-check-circle"
              @click="completeCurrentQuest"
            >
              Concluir quest
            </UButton>
          </div>
        </template>

        <UAlert
          v-else
          color="error"
          variant="soft"
          icon="i-lucide-alert-triangle"
          title="Quest não encontrada"
          description="O caminho solicitado não corresponde a um conteúdo do curso Python."
        />
      </div>
    </div>

    <aside
      v-if="lesson && quest"
      v-motion
      :initial="{ opacity: 0, x: 24 }"
      :enter="{ opacity: 1, x: 0, transition: { type: 'spring', stiffness: 260, damping: 26, delay: 120 } }"
      class="hidden lg:block lg:h-full lg:overflow-y-auto cg-scroll"
    >
      <QuestSidebarContext
        :lesson="lesson"
        :quest="quest ?? null"
        :completed="progress.isCompleted(slug)"
        :completed-count="progress.completedCount"
        :stats="progress.stats"
        :toc-items="tocItems"
        :optionals="availableOptionals"
        :mission-blocks="missionBlocks"
        :prev-quest="prevQuest"
        :next-quest="nextQuest"
        :prev-path="prevPath"
        :next-path="nextPath"
        @complete="completeCurrentQuest"
      />
    </aside>
  </div>
</template>

<script setup lang="ts">
import type { CampaignPayload, Lesson, ModuleQuest } from '~/types/course'
import { getBlockNavigation, groupQuestsIntoBlocks } from '~/composables/useModuleBlocks'
import { useQuestSections } from '~/composables/useQuestSections'
import LessonConceptView from '~/components/python/views/LessonConceptView.vue'
import TrailApprenticeView from '~/components/python/views/TrailApprenticeView.vue'
import TrailAdventureView from '~/components/python/views/TrailAdventureView.vue'
import TrailGuardianView from '~/components/python/views/TrailGuardianView.vue'
import DungeonBossView from '~/components/python/views/DungeonBossView.vue'
import ExamProofView from '~/components/python/views/ExamProofView.vue'
import QuestSidebarContext from '~/components/python/quest/QuestSidebarContext.vue'

useSeoMeta({ title: 'Quest Python' })

const route = useRoute()
const progress = useProgressStore()
const toast = useToast()

const slug = computed(() =>
  Array.isArray(route.params.slug) ? route.params.slug.join('/') : String(route.params.slug),
)

const { data: campaign } = await useFetch<CampaignPayload>('/api/cursos/python/campanha')
const { data: lesson, pending } = await useFetch<Lesson>(() => `/api/cursos/python/aulas/${slug.value}`)

const quest = computed<ModuleQuest | undefined>(() =>
  campaign.value?.modulo.aulas.find(item => getQuestSlug(item) === slug.value),
)

const tone = computed(() => getQuestTone(lesson.value?.subtipo ?? 'conceito'))
const reward = computed(() => (quest.value ? getQuestRewards(quest.value) : { xp: 0, coins: 0 }))
const stageBadgeLabel = computed(() => quest.value?.rotulo ?? `Aula ${lesson.value?.aula ?? '?'}`)
const isOptionalQuest = computed(() => (quest.value ? !isRequiredQuest(quest.value) : false))

const {
  openingSections,
  concept,
  guided,
  autonomous,
  autonomousStarter,
  examples,
  challenges,
  closingSections,
  missionBlocks,
  tocItems,
} = useQuestSections(lesson, slug)

const questList = computed(() => campaign.value?.modulo.aulas ?? [])
const blocks = computed(() => groupQuestsIntoBlocks(questList.value))
const blockNav = computed(() => getBlockNavigation(blocks.value, slug.value))

const prevQuest = computed<ModuleQuest | null>(() => blockNav.value.prevMandatory)
const nextQuest = computed<ModuleQuest | null>(() => blockNav.value.nextMandatory)
const availableOptionals = computed<ModuleQuest[]>(() => blockNav.value.availableOptionals)

const prevPath = computed(() => prevQuest.value ? `/cursos/python/quests/${getQuestSlug(prevQuest.value)}` : null)
const nextPath = computed(() => nextQuest.value ? `/cursos/python/quests/${getQuestSlug(nextQuest.value)}` : null)

function completeCurrentQuest() {
  if (!quest.value || progress.isCompleted(slug.value)) return

  progress.completeQuest(quest.value)

  toast.add({
    title: 'Quest concluída! ✨',
    description: `+${reward.value.xp} XP  ·  +${reward.value.coins} 🪙`,
    icon: 'i-lucide-check-circle',
    color: 'success',
  })
}
</script>

