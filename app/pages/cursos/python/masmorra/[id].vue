<template>
  <div class="min-h-screen px-4 py-10">
    <div class="mx-auto max-w-lg">
      <!-- Loading -->
      <div v-if="pending" class="flex justify-center py-20">
        <UIcon name="i-lucide-loader-2" class="h-8 w-8 animate-spin text-cyan-400" />
      </div>

      <!-- Erro -->
      <div v-else-if="error || !masmorra" class="cg-panel rounded-2xl p-8 text-center">
        <UIcon name="i-lucide-castle" class="mx-auto mb-3 h-12 w-12 text-slate-600" />
        <p class="text-slate-400">Masmorra não encontrada ou encerrada.</p>
        <UButton class="mt-4" variant="ghost" to="/cursos/python">Voltar ao curso</UButton>
      </div>

      <!-- Conteúdo -->
      <template v-else>
        <!-- Header da masmorra -->
        <div class="mb-8 text-center">
          <div class="mb-4 flex justify-center">
            <div class="flex h-20 w-20 items-center justify-center rounded-3xl border border-rose-400/30 bg-rose-500/10">
              <UIcon name="i-lucide-castle" class="h-10 w-10 text-rose-400" />
            </div>
          </div>
          <h1 class="text-3xl font-black text-slate-100">{{ masmorra.titulo }}</h1>
          <p class="mt-1 text-sm text-slate-500">{{ masmorra.total_gavetas }} gavetas · Quest: {{ masmorra.quest_slug }}</p>
        </div>

        <!-- Já abriu -->
        <div v-if="resultado" class="cg-panel overflow-hidden rounded-3xl">
          <div
            class="p-8 text-center"
            :class="resultado.premio.tipo_premio === 'consolacao' ? 'bg-slate-800/30' : 'bg-amber-500/5'"
          >
            <!-- Ícone do prêmio -->
            <div class="mb-5 flex justify-center">
              <div
                class="flex h-24 w-24 items-center justify-center rounded-3xl text-5xl"
                :class="premioClass"
              >
                {{ premioEmoji }}
              </div>
            </div>

            <p class="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-500">
              {{ resultado.ja_aberta ? 'Você abriu a gaveta' : 'Parabéns!' }}
            </p>
            <h2 class="mb-2 text-2xl font-black" :class="premioTitleClass">
              {{ resultado.premio.descricao ?? premioLabel }}
            </h2>

            <div class="mt-4 flex justify-center gap-4">
              <div v-if="resultado.premio.valor_moedas" class="text-center">
                <p class="text-2xl font-black text-amber-400">+{{ resultado.premio.valor_moedas }}</p>
                <p class="text-xs text-slate-500">Moedas 🪙</p>
              </div>
              <div v-if="resultado.premio.valor_xp" class="text-center">
                <p class="text-2xl font-black text-cyan-400">+{{ resultado.premio.valor_xp }}</p>
                <p class="text-xs text-slate-500">XP ⭐</p>
              </div>
              <div v-if="resultado.premio.tipo_premio === 'consolacao'" class="text-center">
                <p class="text-2xl font-black text-slate-400">+{{ resultado.premio.valor_moedas || masmorra.consolacao_moedas }}</p>
                <p class="text-xs text-slate-500">Consolação 🪙</p>
              </div>
            </div>

            <p class="mt-5 text-xs text-slate-600">Gaveta #{{ resultado.posicao + 1 }}</p>
          </div>
        </div>

        <!-- Ainda não abriu -->
        <div v-else class="cg-panel rounded-3xl p-8 text-center">
          <div class="mb-6 grid grid-cols-5 gap-2">
            <div
              v-for="i in Math.min(masmorra.total_gavetas, 15)"
              :key="i"
              class="flex aspect-square items-center justify-center rounded-xl border border-slate-600/30 bg-slate-800/40 text-lg"
            >
              🔒
            </div>
            <div v-if="masmorra.total_gavetas > 15" class="col-span-5 text-center text-xs text-slate-600">
              + {{ masmorra.total_gavetas - 15 }} mais…
            </div>
          </div>

          <p class="mb-6 text-sm text-slate-400">
            A sua gaveta está esperando. A ordem de abertura determina o prêmio — quem chega primeiro, escolhe melhor!
          </p>

          <UButton
            size="xl"
            color="error"
            :loading="abrindo"
            :disabled="abrindo"
            class="w-full"
            @click="abrirGaveta"
          >
            <UIcon v-if="!abrindo" name="i-lucide-door-open" class="h-5 w-5" />
            {{ abrindo ? 'Abrindo…' : 'Abrir minha gaveta!' }}
          </UButton>
        </div>

        <div class="mt-4 text-center">
          <UButton variant="ghost" color="neutral" size="sm" to="/cursos/python">
            Voltar ao curso
          </UButton>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Premio {
  tipo_premio: string
  valor_moedas: number
  valor_xp: number
  descricao: string | null
}

interface AbrirResponse {
  ja_aberta: boolean
  posicao: number
  premio: Premio
}

interface Masmorra {
  id: string
  titulo: string
  quest_slug: string
  total_gavetas: number
  consolacao_moedas: number
  ativa: boolean
}

const route = useRoute()
const toast = useToast()
const progress = useProgressStore()
const masmorraId = route.params.id as string

// Carregar dados da masmorra
const { data: masmorraRaw, pending, error } = await useFetch<Masmorra>(`/api/masmorras/${masmorraId}`, {
  key: `masmorra-${masmorraId}`,
})

const masmorra = computed(() => masmorraRaw.value ?? null)

// Estado do resultado
const resultado = ref<AbrirResponse | null>(null)
const abrindo = ref(false)

// Computed de exibição do prêmio
const premioEmoji = computed(() => {
  if (!resultado.value) return '🔒'
  const t = resultado.value.premio.tipo_premio
  if (t === 'consolacao') return '🪙'
  if (t === 'xp') return '⭐'
  return '💎'
})

const premioLabel = computed(() => {
  if (!resultado.value) return ''
  const t = resultado.value.premio.tipo_premio
  if (t === 'consolacao') return 'Moedas de consolação'
  if (t === 'xp') return `+${resultado.value.premio.valor_xp} XP`
  return `+${resultado.value.premio.valor_moedas} 🪙`
})

const premioClass = computed(() => {
  if (!resultado.value) return ''
  const t = resultado.value.premio.tipo_premio
  if (t === 'consolacao') return 'border border-slate-600/30 bg-slate-800/40'
  if (t === 'xp') return 'border border-cyan-400/30 bg-cyan-500/10'
  return 'border border-amber-400/30 bg-amber-500/10'
})

const premioTitleClass = computed(() => {
  if (!resultado.value) return ''
  const t = resultado.value.premio.tipo_premio
  if (t === 'consolacao') return 'text-slate-400'
  if (t === 'xp') return 'text-cyan-300'
  return 'text-amber-300'
})

async function abrirGaveta() {
  abrindo.value = true
  try {
    const res = await $fetch<AbrirResponse>(`/api/masmorras/${masmorraId}/abrir`, {
      method: 'POST',
    })
    resultado.value = res

    // Aplicar prêmio ao progress store local
    if (res.premio.valor_moedas || res.premio.valor_xp) {
      progress.syncFromBackend({
        coins: (progress.stats.coins ?? 0) + (res.premio.valor_moedas ?? 0),
        xp: (progress.stats.xp ?? 0) + (res.premio.valor_xp ?? 0),
      })
    }

    if (!res.ja_aberta) {
      toast.add({
        title: res.premio.tipo_premio === 'consolacao' ? '🪙 Sorte da próxima!' : '🎉 Prêmio incrível!',
        description: res.premio.descricao ?? premioLabel.value,
        color: res.premio.tipo_premio === 'consolacao' ? 'neutral' : 'success',
        duration: 5000,
      })
    }
  }
  catch (e: unknown) {
    toast.add({ title: 'Erro', description: (e as Error).message, color: 'error' })
  }
  finally {
    abrindo.value = false
  }
}
</script>
