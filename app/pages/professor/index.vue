<template>
  <div class="min-h-screen p-6">
    <div class="mx-auto max-w-4xl">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15">
            <UIcon name="i-lucide-wand-2" class="h-6 w-6 text-violet-400" />
          </div>
          <div>
            <h1 class="text-2xl font-black text-slate-100">Painel do Professor</h1>
            <p class="text-sm text-slate-500">Poderes mágicos de gestão da turma</p>
          </div>
        </div>
      </div>

      <!-- Seletor de turma -->
      <div class="cg-panel mb-6 rounded-2xl p-5">
        <label class="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">Turma ativa</label>
        <USelect
          v-model="turmaSelecionada"
          :options="turmaOptions"
          option-value="id"
          option-label="nome"
          placeholder="Selecione uma turma…"
          class="w-full max-w-xs"
        />
      </div>

      <!-- Grid de poderes -->
      <div class="grid gap-4 sm:grid-cols-2">
        <!-- Curar Turma -->
        <div class="cg-panel rounded-2xl p-5">
          <div class="mb-4 flex items-center gap-3">
            <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/12">
              <UIcon name="i-lucide-heart-pulse" class="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h2 class="font-bold text-slate-200">Curar Turma</h2>
              <p class="text-xs text-slate-500">Repõe HP e Mana de todos</p>
            </div>
          </div>
          <UButton
            color="success"
            variant="soft"
            :loading="loading.curarTurma"
            :disabled="!turmaSelecionada || loading.curarTurma"
            class="w-full"
            @click="curarTurma"
          >
            <UIcon name="i-lucide-sparkles" class="h-4 w-4" />
            Curar toda a turma
          </UButton>
        </div>

        <!-- Curar Aluno -->
        <div class="cg-panel rounded-2xl p-5">
          <div class="mb-4 flex items-center gap-3">
            <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/12">
              <UIcon name="i-lucide-user-check" class="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <h2 class="font-bold text-slate-200">Curar Aluno</h2>
              <p class="text-xs text-slate-500">Repõe HP e Mana de um aluno</p>
            </div>
          </div>
          <USelect
            v-model="alunoSelecionado"
            :options="alunoOptions"
            option-value="id"
            option-label="nome"
            placeholder="Selecione um aluno…"
            :disabled="!turmaSelecionada"
            class="mb-3 w-full"
          />
          <UButton
            color="primary"
            variant="soft"
            :loading="loading.curarAluno"
            :disabled="!alunoSelecionado || loading.curarAluno"
            class="w-full"
            @click="curarAluno"
          >
            Curar aluno
          </UButton>
        </div>

        <!-- Creditar Moedas -->
        <div class="cg-panel rounded-2xl p-5">
          <div class="mb-4 flex items-center gap-3">
            <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/12">
              <UIcon name="i-lucide-coins" class="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <h2 class="font-bold text-slate-200">Creditar Moedas</h2>
              <p class="text-xs text-slate-500">Bônus manual para um aluno</p>
            </div>
          </div>
          <USelect
            v-model="alunoCreditar"
            :options="alunoOptions"
            option-value="id"
            option-label="nome"
            placeholder="Selecione um aluno…"
            :disabled="!turmaSelecionada"
            class="mb-2 w-full"
          />
          <div class="mb-3 flex gap-2">
            <UInput
              v-model.number="moedasCreditar"
              type="number"
              min="1"
              max="1000"
              placeholder="Qtd. 🪙"
              class="flex-1"
            />
            <UInput
              v-model="motivoCreditar"
              placeholder="Motivo (opcional)"
              class="flex-[2]"
            />
          </div>
          <UButton
            color="warning"
            variant="soft"
            :loading="loading.creditar"
            :disabled="!alunoCreditar || !moedasCreditar || loading.creditar"
            class="w-full"
            @click="creditar"
          >
            Creditar {{ moedasCreditar || '' }} 🪙
          </UButton>
        </div>

        <!-- Ativar Masmorra -->
        <div class="cg-panel rounded-2xl p-5">
          <div class="mb-4 flex items-center gap-3">
            <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/12">
              <UIcon name="i-lucide-castle" class="h-5 w-5 text-rose-400" />
            </div>
            <div>
              <h2 class="font-bold text-slate-200">Ativar Masmorra</h2>
              <p class="text-xs text-slate-500">Gacha de recompensas para quest</p>
            </div>
          </div>
          <UInput
            v-model="masmorraSlug"
            placeholder="Quest slug (ex: modulo1/aula-03-boss)"
            class="mb-2 w-full"
          />
          <UInput
            v-model="masmorraTitle"
            placeholder="Título da masmorra"
            class="mb-2 w-full"
          />
          <p class="mb-2 text-xs text-slate-500">Prêmios (1 por linha: tipo,moedas,xp,descrição)</p>
          <textarea
            v-model="premiosRaw"
            rows="3"
            placeholder="moedas,100,0,Baú de ouro&#10;xp,0,200,Runa de sabedoria"
            class="mb-3 w-full resize-none rounded-xl border border-slate-600/30 bg-black/30 px-3 py-2 font-mono text-xs text-slate-300 placeholder-slate-600 focus:border-cyan-400/40 focus:outline-none"
          />
          <UButton
            color="error"
            variant="soft"
            :loading="loading.masmorra"
            :disabled="!turmaSelecionada || !masmorraSlug || !masmorraTitle || loading.masmorra"
            class="w-full"
            @click="ativarMasmorra"
          >
            <UIcon name="i-lucide-zap" class="h-4 w-4" />
            Ativar masmorra
          </UButton>
          <p v-if="masmorraAtivada" class="mt-2 text-center text-xs text-emerald-400">
            ✓ Masmorra criada! ID: {{ masmorraAtivada }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'professor' })

const toast = useToast()
const auth = useAuthStore()

// ── Estado ────────────────────────────────────────────────────────────────────
const turmas = ref<{ id: string, nome: string }[]>([])
const alunos = ref<{ id: string, nome: string }[]>([])
const turmaSelecionada = ref<string | null>(null)
const alunoSelecionado = ref<string | null>(null)
const alunoCreditar = ref<string | null>(null)
const moedasCreditar = ref<number>(10)
const motivoCreditar = ref('')
const masmorraSlug = ref('')
const masmorraTitle = ref('')
const premiosRaw = ref('')
const masmorraAtivada = ref<string | null>(null)

const loading = reactive({
  turmas: false,
  alunos: false,
  curarTurma: false,
  curarAluno: false,
  creditar: false,
  masmorra: false,
})

const turmaOptions = computed(() => turmas.value)
const alunoOptions = computed(() => alunos.value)

// ── Carregar turmas ───────────────────────────────────────────────────────────
const supabase = useSupabaseClient()

async function carregarTurmas() {
  loading.turmas = true
  try {
    const { data } = await supabase
      .from('turma')
      .select('id, nome')
      .eq('professor_id', auth.user?.id ?? '')
      .order('created_at', { ascending: false })
    turmas.value = (data as { id: string, nome: string }[] | null) ?? []
  }
  finally { loading.turmas = false }
}

async function carregarAlunos(turmaId: string) {
  loading.alunos = true
  try {
    const { data } = await supabase
      .from('aluno_turma')
      .select('aluno_id, aluno:aluno(id, nome)')
      .eq('turma_id', turmaId)
    alunos.value = (data as { aluno: { id: string, nome: string } }[] | null)
      ?.map(r => r.aluno)
      .filter(Boolean) ?? []
  }
  finally { loading.alunos = false }
}

watch(turmaSelecionada, (id) => {
  if (id) {
    alunoSelecionado.value = null
    alunoCreditar.value = null
    void carregarAlunos(id)
  }
})

onMounted(() => { void carregarTurmas() })

// ── Ações ─────────────────────────────────────────────────────────────────────
async function curarTurma() {
  if (!turmaSelecionada.value) return
  loading.curarTurma = true
  try {
    const { curados } = await $fetch<{ curados: number }>('/api/professor/curar', {
      method: 'POST',
      body: { turma_id: turmaSelecionada.value },
    })
    toast.add({ title: `❤️ ${curados} aluno(s) curados!`, color: 'success' })
  }
  catch (e: unknown) {
    toast.add({ title: 'Erro', description: (e as Error).message, color: 'error' })
  }
  finally { loading.curarTurma = false }
}

async function curarAluno() {
  if (!turmaSelecionada.value || !alunoSelecionado.value) return
  loading.curarAluno = true
  try {
    await $fetch('/api/professor/curar', {
      method: 'POST',
      body: { turma_id: turmaSelecionada.value, aluno_id: alunoSelecionado.value },
    })
    toast.add({ title: '❤️ Aluno curado!', color: 'success' })
  }
  catch (e: unknown) {
    toast.add({ title: 'Erro', description: (e as Error).message, color: 'error' })
  }
  finally { loading.curarAluno = false }
}

async function creditar() {
  if (!turmaSelecionada.value || !alunoCreditar.value || !moedasCreditar.value) return
  loading.creditar = true
  try {
    const res = await $fetch<{ novo_saldo: number }>('/api/professor/creditar', {
      method: 'POST',
      body: {
        turma_id: turmaSelecionada.value,
        aluno_id: alunoCreditar.value,
        moedas: moedasCreditar.value,
        motivo: motivoCreditar.value || undefined,
      },
    })
    toast.add({ title: `🪙 ${moedasCreditar.value} moedas creditadas! Saldo: ${res.novo_saldo}`, color: 'success' })
    motivoCreditar.value = ''
  }
  catch (e: unknown) {
    toast.add({ title: 'Erro', description: (e as Error).message, color: 'error' })
  }
  finally { loading.creditar = false }
}

async function ativarMasmorra() {
  if (!turmaSelecionada.value || !masmorraSlug.value || !masmorraTitle.value) return
  loading.masmorra = true
  masmorraAtivada.value = null
  try {
    const premios = premiosRaw.value.trim().split('\n').filter(Boolean).map((line) => {
      const [tipo, moedas, xp, ...descParts] = line.split(',')
      return {
        tipo_premio: (tipo?.trim() ?? 'consolacao') as 'moedas' | 'xp' | 'consolacao',
        valor_moedas: parseInt(moedas?.trim() ?? '0', 10) || 0,
        valor_xp: parseInt(xp?.trim() ?? '0', 10) || 0,
        descricao: descParts.join(',').trim() || undefined,
      }
    })

    const res = await $fetch<{ masmorra_id: string }>('/api/professor/masmorras', {
      method: 'POST',
      body: {
        turma_id: turmaSelecionada.value,
        quest_slug: masmorraSlug.value,
        titulo: masmorraTitle.value,
        premios: premios.length ? premios : [{ tipo_premio: 'moedas', valor_moedas: 50, valor_xp: 0 }],
      },
    })
    masmorraAtivada.value = res.masmorra_id
    toast.add({ title: '🏰 Masmorra ativada!', color: 'success' })
  }
  catch (e: unknown) {
    toast.add({ title: 'Erro', description: (e as Error).message, color: 'error' })
  }
  finally { loading.masmorra = false }
}
</script>
