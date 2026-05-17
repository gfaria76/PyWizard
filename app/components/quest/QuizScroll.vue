<template>
  <div class="space-y-6">
    <!-- Quiz Header -->
    <div class="bg-surface-container/80 backdrop-blur-xl border border-secondary-container/30 rounded-xl p-6">
      <h2 class="font-headline-sm text-headline-sm text-secondary mb-2 flex items-center gap-2">
        <span class="material-symbols-outlined">quiz</span>
        Scroll of Wisdom
      </h2>
      <div class="mt-4 space-y-3">
        <div class="flex items-center justify-between">
          <span class="font-label-caps text-label-caps text-on-surface-variant">Progress</span>
          <span class="font-code-md text-code-md">{{ correct }}/{{ totalShown }}</span>
        </div>
        <div class="w-full h-2 bg-surface-container-lowest rounded-full overflow-hidden border border-outline-variant/20">
          <div class="h-full bg-primary-container transition-all" :style="{ width: progressPercent + '%' }" />
        </div>
        <div class="text-xs text-on-surface-variant">
          Need {{ Math.ceil(totalQuestions * 2 / 3) }}/{{ totalQuestions }} correct to complete
        </div>
      </div>
    </div>

    <!-- Questions -->
    <div v-if="currentQuestions.length" class="space-y-4">
      <div v-for="(q, idx) in shownQuestions" :key="idx" class="bg-surface-container/80 backdrop-blur-xl border border-secondary-container/30 rounded-xl p-6">
        <h3 class="font-headline-sm text-headline-sm text-secondary mb-4">{{ q.number }}. {{ q.question }}</h3>

        <!-- Options -->
        <div class="space-y-2 mb-4">
          <button
            v-for="opt in q.options"
            :key="opt.letter"
            :disabled="showAnswers"
            class="w-full text-left px-4 py-3 rounded-lg border transition-colors"
            :class="[
              userAnswers[`q${q.number}`] === opt.letter
                ? 'bg-primary-container/20 border-primary-container text-primary-container'
                : 'bg-surface-container-lowest border-outline-variant/30 text-on-surface hover:border-primary-container/50',
              showAnswers && opt.correct ? 'ring-2 ring-primary-container' : '',
              showAnswers && userAnswers[`q${q.number}`] === opt.letter && !opt.correct ? 'ring-2 ring-error' : ''
            ]"
            @click="selectAnswer(`q${q.number}`, opt.letter)"
          >
            <span class="font-label-caps font-bold">{{ opt.letter }})</span>
            {{ opt.text }}
          </button>
        </div>

        <!-- Feedback -->
        <div v-if="showAnswers && userAnswers[`q${q.number}`]" class="mt-4 p-3 rounded" :class="userAnswers[`q${q.number}`] === q.correct ? 'bg-primary-container/10 border border-primary-container/30' : 'bg-error/10 border border-error/30'">
          <div class="flex items-center gap-2 text-sm">
            <span class="material-symbols-outlined text-[18px]" :class="userAnswers[`q${q.number}`] === q.correct ? 'text-primary-container' : 'text-error'">
              {{ userAnswers[`q${q.number}`] === q.correct ? 'verified' : 'cancel' }}
            </span>
            <span class="font-label-caps" :class="userAnswers[`q${q.number}`] === q.correct ? 'text-primary-container' : 'text-error'">
              {{ userAnswers[`q${q.number}`] === q.correct ? 'Correto!' : 'Incorreto' }}
            </span>
          </div>
          <div v-if="q.explanation" class="mt-2 text-xs text-on-surface-variant italic">{{ q.explanation }}</div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div v-if="!showAnswers && allAnswered" class="flex gap-3">
      <button
        class="flex-1 bg-primary-container text-on-primary-container font-label-caps rounded-lg px-4 py-2 hover:shadow-[0_0_15px_rgba(0,251,251,0.5)] transition-all"
        @click="submitAnswers"
      >
        <span class="material-symbols-outlined inline mr-2 text-[18px]">check_circle</span>
        Check Answers
      </button>
    </div>

    <!-- Completion -->
    <div v-else-if="isComplete" class="bg-tertiary-fixed-dim/10 border border-tertiary-fixed-dim/30 rounded-xl p-6 text-center">
      <span class="material-symbols-outlined text-tertiary-fixed-dim text-[32px] block mb-2">workspace_premium</span>
      <h3 class="font-headline-sm text-tertiary-fixed-dim mb-2">Quiz Complete!</h3>
      <p class="text-sm text-on-surface-variant">You've mastered the Scroll of Wisdom</p>
    </div>

    <!-- Retry Option -->
    <div v-else-if="showAnswers && !isComplete" class="flex gap-3">
      <button
        class="flex-1 bg-surface-container/80 border border-outline-variant/30 text-on-surface font-label-caps rounded-lg px-4 py-2 hover:bg-surface-container transition-colors"
        @click="retryQuiz"
      >
        <span class="material-symbols-outlined inline mr-2 text-[18px]">refresh</span>
        Try Again
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Question {
  number: number
  question: string
  options: Array<{ letter: string, text: string, correct: boolean }>
  correct: string
  explanation: string
}

const props = defineProps<{
  quizMarkdown: string
  questSlug: string
}>()

const progress = useProgressStore()

const userAnswers = ref<Record<string, string>>({})
const showAnswers = ref(false)

// Parse quiz markdown into structured questions
const currentQuestions = computed<Question[]>(() => {
  const questions: Question[] = []
  const lines = props.quizMarkdown.split('\n')

  let currentQ: Partial<Question> | null = null
  let inDetails = false
  let correctAnswer = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Question
    if (line.match(/^\*\*\d+\./)) {
      if (currentQ && currentQ.number) {
        currentQ.correct = correctAnswer
        questions.push(currentQ as Question)
      }
      const match = line.match(/^\*\*(\d+)\.\s+(.+)\*\*/)
      if (match) {
        currentQ = {
          number: parseInt(match[1]),
          question: match[2],
          options: [],
          explanation: ''
        }
        correctAnswer = ''
        inDetails = false
      }
    }
    // Options
    else if (currentQ && line.match(/^[A-Z]\)/)) {
      const match = line.match(/^([A-Z])\)\s+(.+)/)
      if (match) {
        currentQ.options?.push({
          letter: match[1],
          text: match[2],
          correct: false
        })
      }
    }
    // Correct answer indicator
    else if (line.includes('**Correto:')) {
      const match = line.match(/\*\*Correto:\s*([A-Z])/i)
      if (match) {
        correctAnswer = match[1]
        if (currentQ?.options) {
          const opt = currentQ.options.find(o => o.letter === match[1])
          if (opt) opt.correct = true
        }
      }
      // Extract explanation
      const explanationMatch = line.match(/\*\*Correto:\s*[A-Z][.)]\s*(.+?)(?:\*\*)?$/)
      if (explanationMatch && currentQ) {
        currentQ.explanation = explanationMatch[1].replace(/\*\*/g, '').trim()
      }
    }
    // Gather remaining explanation lines
    else if (inDetails && line && !line.startsWith('::') && currentQ && line !== '**') {
      if (!currentQ.explanation) {
        currentQ.explanation = line
      } else {
        currentQ.explanation += ' ' + line
      }
    }

    if (line.startsWith('::details')) inDetails = true
    else if (line === '::') inDetails = false
  }

  // Add last question
  if (currentQ && currentQ.number) {
    currentQ.correct = correctAnswer
    questions.push(currentQ as Question)
  }

  return questions.filter(q => q.options && q.options.length > 0)
})

const totalQuestions = computed(() => currentQuestions.value.length)

// Show a random subset if total > 3
const shownQuestions = computed(() => {
  const toShow = Math.min(3, currentQuestions.value.length)
  return currentQuestions.value.slice(0, toShow)
})

const totalShown = computed(() => shownQuestions.value.length)

const correct = computed(() => {
  return shownQuestions.value.filter(q => {
    const userAnswer = userAnswers.value[`q${q.number}`]
    return userAnswer === q.correct
  }).length
})

const progressPercent = computed(() => totalShown.value > 0 ? (correct.value / totalShown.value) * 100 : 0)

const allAnswered = computed(() => shownQuestions.value.every(q => userAnswers.value[`q${q.number}`]))

const requiredCorrect = computed(() => Math.ceil(totalQuestions.value * 2 / 3))

const isComplete = computed(() => {
  // Check if already completed
  const completed = progress.completed_quest_slugs?.includes(`${props.questSlug}:quiz`) ?? false
  if (completed) return true
  // Check if current attempt is passing
  return showAnswers.value && correct.value >= requiredCorrect.value
})

function selectAnswer(qId: string, letter: string) {
  if (!showAnswers.value) {
    userAnswers.value[qId] = letter
  }
}

function submitAnswers() {
  showAnswers.value = true
  if (isComplete.value) {
    // Mark as completed in progress
    if (!progress.completed_quest_slugs?.includes(`${props.questSlug}:quiz`)) {
      progress.completed_quest_slugs?.push(`${props.questSlug}:quiz`)
    }
  }
}

function retryQuiz() {
  userAnswers.value = {}
  showAnswers.value = false
}
</script>
