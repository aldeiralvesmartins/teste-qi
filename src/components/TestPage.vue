<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { questions } from '../data/questions'
import PaymentModal from './PaymentModal.vue'

const currentQuestionIndex = ref(0)
const answers = ref<number[]>([])
const selectedAnswer = ref<number | null>(null)
const showPaymentModal = ref(false)

const currentQuestion = computed(() => questions[currentQuestionIndex.value])
const progress = computed(() => ((currentQuestionIndex.value + 1) / questions.length) * 100)
const isLastQuestion = computed(() => currentQuestionIndex.value === questions.length - 1)

onMounted(() => {
  const saved = localStorage.getItem('iq-test-progress')
  if (saved) {
    const data = JSON.parse(saved)
    currentQuestionIndex.value = data.currentIndex || 0
    answers.value = data.answers || []
  }
})

const selectAnswer = (index: number) => {
  selectedAnswer.value = index
}

const nextQuestion = () => {
  if (selectedAnswer.value === null) return

  answers.value[currentQuestionIndex.value] = selectedAnswer.value

  saveProgress()

  if (isLastQuestion.value) {
    calculateAndSaveScore()
    showPaymentModal.value = true
  } else {
    currentQuestionIndex.value++
    selectedAnswer.value = answers.value[currentQuestionIndex.value] ?? null
  }
}

const saveProgress = () => {
  const data = {
    currentIndex: currentQuestionIndex.value,
    answers: answers.value
  }
  localStorage.setItem('iq-test-progress', JSON.stringify(data))
}

const calculateAndSaveScore = () => {
  let correctCount = 0
  answers.value.forEach((answer, index) => {
    if (answer === questions[index].correctAnswer) {
      correctCount++
    }
  })

  const percentage = (correctCount / questions.length) * 100
  let iqScore = 70

  if (percentage >= 90) iqScore = 140
  else if (percentage >= 80) iqScore = 130
  else if (percentage >= 70) iqScore = 120
  else if (percentage >= 60) iqScore = 115
  else if (percentage >= 50) iqScore = 105
  else if (percentage >= 40) iqScore = 100
  else if (percentage >= 30) iqScore = 92
  else if (percentage >= 20) iqScore = 85
  else iqScore = 78

  localStorage.setItem('iq-test-score', iqScore.toString())
  localStorage.setItem('iq-test-correct', correctCount.toString())
}

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
    selectedAnswer.value = answers.value[currentQuestionIndex.value] ?? null
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-8 px-4">
    <div class="max-w-3xl mx-auto">
      <div class="mb-8">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm font-semibold text-primary-blue">
            Pergunta {{ currentQuestionIndex + 1 }} de {{ questions.length }}
          </span>
          <span class="text-sm font-semibold text-primary-blue">
            {{ Math.round(progress) }}%
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            class="bg-gradient-to-r from-light-blue to-primary-blue h-full rounded-full transition-all duration-500 ease-out"
            :style="{ width: progress + '%' }"
          ></div>
        </div>
      </div>

      <transition name="slide" mode="out-in">
        <div :key="currentQuestionIndex" class="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div class="mb-8">
            <span class="inline-block bg-light-blue/10 text-light-blue px-4 py-2 rounded-full text-sm font-semibold mb-6">
              {{ currentQuestion.category === 'logic' ? '🧩 Lógica' :
                 currentQuestion.category === 'verbal' ? '📝 Verbal' :
                 currentQuestion.category === 'visual' ? '👁️ Visual' : '🔢 Numérico' }}
            </span>
            <h2 class="text-2xl md:text-3xl font-bold text-primary-blue leading-relaxed">
              {{ currentQuestion.question }}
            </h2>
          </div>

          <div class="space-y-4 mb-8">
            <div
              v-for="(option, index) in currentQuestion.options"
              :key="index"
              @click="selectAnswer(index)"
              class="border-2 rounded-xl p-5 cursor-pointer transition-all duration-300 hover:shadow-lg"
              :class="[
                selectedAnswer === index
                  ? 'border-light-blue bg-light-blue/5 shadow-md'
                  : 'border-gray-200 hover:border-light-blue/50'
              ]"
            >
              <div class="flex items-center">
                <div
                  class="w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all"
                  :class="[
                    selectedAnswer === index
                      ? 'border-light-blue bg-light-blue'
                      : 'border-gray-300'
                  ]"
                >
                  <div v-if="selectedAnswer === index" class="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span class="text-lg font-medium text-gray-800">
                  {{ String.fromCharCode(65 + index) }}. {{ option }}
                </span>
              </div>
            </div>
          </div>

          <div class="flex justify-between items-center">
            <button
              v-if="currentQuestionIndex > 0"
              @click="previousQuestion"
              class="text-gray-600 hover:text-primary-blue font-semibold transition-colors"
            >
              ← Anterior
            </button>
            <div v-else></div>

            <button
              @click="nextQuestion"
              :disabled="selectedAnswer === null"
              class="bg-light-blue text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 hover:shadow-xl disabled:hover:bg-light-blue disabled:hover:shadow-lg"
            >
              {{ isLastQuestion ? '✓ Finalizar Teste' : 'Próxima →' }}
            </button>
          </div>
        </div>
      </transition>

      <div class="mt-8 text-center text-sm text-gray-600">
        <p>💡 Seu progresso está sendo salvo automaticamente</p>
      </div>
    </div>

    <PaymentModal v-if="showPaymentModal" @close="showPaymentModal = false" />
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
