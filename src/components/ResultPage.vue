<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const iqScore = ref<number | null>(null)
const correctAnswers = ref<number>(0)
const showResult = ref(false)
const animatedScore = ref(0)
const showToast = ref(false)
const toastMessage = ref('')

const hasPaymentToken = computed(() => {
  return route.query.token !== undefined
})

const classification = computed(() => {
  if (!iqScore.value) return { label: '', description: '', color: '' }

  if (iqScore.value >= 140) {
    return {
      label: 'Genialidade',
      description: 'Capacidade intelectual excepcional, presente em menos de 1% da população',
      color: 'text-purple-600'
    }
  } else if (iqScore.value >= 130) {
    return {
      label: 'Muito Superior',
      description: 'Capacidade intelectual muito acima da média, excelente raciocínio',
      color: 'text-gold'
    }
  } else if (iqScore.value >= 115) {
    return {
      label: 'Alta Capacidade',
      description: 'Raciocínio acima da média, ótima capacidade de resolver problemas complexos',
      color: 'text-light-blue'
    }
  } else if (iqScore.value >= 100) {
    return {
      label: 'Boa Capacidade',
      description: 'Inteligência na média alta, bom desempenho em tarefas cognitivas',
      color: 'text-green-600'
    }
  } else if (iqScore.value >= 85) {
    return {
      label: 'Média',
      description: 'Capacidade intelectual dentro da média populacional',
      color: 'text-blue-600'
    }
  } else {
    return {
      label: 'Em Desenvolvimento',
      description: 'Continue praticando para desenvolver suas habilidades cognitivas',
      color: 'text-gray-600'
    }
  }
})

const percentage = computed(() => {
  return Math.round((correctAnswers.value / 33) * 100)
})

onMounted(() => {
  if (!hasPaymentToken.value) {
    showResult.value = false
    return
  }

  const savedScore = localStorage.getItem('iq-test-score')
  const savedCorrect = localStorage.getItem('iq-test-correct')

  if (savedScore) {
    iqScore.value = parseInt(savedScore)
    correctAnswers.value = parseInt(savedCorrect || '0')
    showResult.value = true

    animateScore()

    localStorage.removeItem('iq-test-progress')
  }
})

const animateScore = () => {
  if (!iqScore.value) return

  const duration = 2000
  const steps = 60
  const targetScore = iqScore.value
  const increment = targetScore / steps
  let current = 0

  const interval = setInterval(() => {
    current += increment
    if (current >= targetScore) {
      animatedScore.value = targetScore
      clearInterval(interval)
    } else {
      animatedScore.value = Math.floor(current)
    }
  }, duration / steps)
}

const restartTest = () => {
  localStorage.removeItem('iq-test-progress')
  localStorage.removeItem('iq-test-score')
  localStorage.removeItem('iq-test-correct')
  router.push('/')
}

// Função que mostra o toast
const triggerToast = (message: string) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

const shareUrl = async () => {
  const baseUrl = window.location.origin

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Teste de QI',
        text: 'Descubra seu QI com este teste incrível!',
        url: baseUrl
      })
      triggerToast('✅ Link compartilhado com sucesso!')
    } catch (err) {
      triggerToast('❌ Compartilhamento cancelado.')
    }
  } else {
    // fallback: copia o link
    try {
      await navigator.clipboard.writeText(baseUrl)
      triggerToast('✅ Link copiado para a área de transferência!')
    } catch {
      triggerToast('❌ Não foi possível copiar o link.')
    }
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
    <div v-if="!hasPaymentToken" class="flex items-center justify-center min-h-screen px-4">
      <div class="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md text-center">
        <div class="text-6xl mb-6">🔒</div>
        <h2 class="text-3xl font-bold text-primary-blue mb-4">
          Resultado Bloqueado
        </h2>
        <p class="text-gray-600 text-lg mb-8">
          Finalize o pagamento para desbloquear seu resultado completo e descobrir seu QI.
        </p>
        <button
          @click="router.push('/teste')"
          class="bg-light-blue hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300"
        >
          Voltar ao Teste
        </button>
      </div>
    </div>

    <div v-else-if="showResult" class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12 animate-fade-in">
          <div class="inline-block bg-green-100 text-green-700 px-6 py-3 rounded-full mb-6 font-semibold">
            ✓ Pagamento Confirmado
          </div>
          <h1 class="text-4xl md:text-6xl font-bold text-primary-blue mb-4">
            Seu Resultado de QI
          </h1>
        </div>

        <div class="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8 animate-slide-up">
          <div class="text-center mb-12">
            <div class="relative inline-block">
              <svg class="w-64 h-64 transform -rotate-90" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  stroke="#E5E7EB"
                  stroke-width="16"
                  fill="none"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  :stroke="classification.color.includes('purple') ? '#9333EA' :
                          classification.color.includes('gold') ? '#FACC15' :
                          classification.color.includes('light-blue') ? '#3B82F6' : '#10B981'"
                  stroke-width="16"
                  fill="none"
                  :stroke-dasharray="2 * Math.PI * 80"
                  :stroke-dashoffset="2 * Math.PI * 80 * (1 - animatedScore / 150)"
                  stroke-linecap="round"
                  class="transition-all duration-1000 ease-out"
                />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <div>
                  <div class="text-6xl font-bold text-primary-blue mb-2">
                    {{ animatedScore }}
                  </div>
                  <div class="text-gray-500 text-sm font-semibold">PONTOS QI</div>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center mb-8">
            <h2 :class="['text-3xl font-bold mb-3', classification.color]">
              {{ classification.label }}
            </h2>
            <p class="text-gray-600 text-lg max-w-2xl mx-auto">
              {{ classification.description }}
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-6 mb-8">
            <div class="bg-gradient-to-br from-light-blue/10 to-primary-blue/10 rounded-2xl p-6 text-center">
              <div class="text-4xl font-bold text-primary-blue mb-2">
                {{ correctAnswers }}/33
              </div>
              <div class="text-gray-600 font-semibold">Respostas Corretas</div>
            </div>

            <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 text-center">
              <div class="text-4xl font-bold text-green-600 mb-2">
                {{ percentage }}%
              </div>
              <div class="text-gray-600 font-semibold">Taxa de Acerto</div>
            </div>

            <div class="bg-gradient-to-br from-gold/10 to-yellow-50 rounded-2xl p-6 text-center">
              <div class="text-4xl font-bold text-gold mb-2">
                Top {{ (iqScore ?? 0) >= 130 ? '2' : (iqScore ?? 0) >= 115 ? '15' : (iqScore ?? 0) >= 100 ? '50' : '70' }}%
              </div>
              <div class="text-gray-600 font-semibold">Ranking Global</div>
            </div>
          </div>

          <div class="bg-gradient-to-r from-light-blue/5 to-primary-blue/5 rounded-2xl p-8 mb-8">
            <h3 class="text-2xl font-bold text-primary-blue mb-4 text-center">
              💡 Mensagem Personalizada
            </h3>
            <p class="text-gray-700 text-lg text-center leading-relaxed">
              <span v-if="(iqScore ?? 0) >= 130">
                Parabéns! Seu raciocínio está muito acima da média. Você possui uma capacidade excepcional de resolver problemas complexos e pensar de forma abstrata. Continue desenvolvendo seu potencial!
              </span>
              <span v-else-if="(iqScore ?? 0) >= 115">
                Excelente resultado! Seu raciocínio está acima da média. Você demonstra ótima capacidade analítica e de resolução de problemas. Continue praticando para alcançar níveis ainda mais altos!
              </span>
              <span v-else-if="(iqScore ?? 0) >= 100">
                Bom trabalho! Sua capacidade cognitiva está na média alta. Continue desenvolvendo suas habilidades lógicas e de raciocínio através de desafios e aprendizado contínuo.
              </span>
              <span v-else>
                Resultado positivo! Você está no caminho certo. Pratique regularmente exercícios de lógica, matemática e leitura para continuar desenvolvendo suas habilidades cognitivas.
              </span>
            </p>
          </div>

          <div class="flex flex-col sm:flex-row justify-center gap-4 text-center mt-8">
            <button
                @click="restartTest"
                class="bg-light-blue hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl w-full sm:w-auto"
            >
              🔄 Fazer Novo Teste
            </button>
</div>
          <div class="flex flex-col sm:flex-row justify-center gap-4 text-center mt-8">
            <button
                @click="shareUrl"
                class="bg-green-500 hover:bg-green-600 text-black font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl w-full sm:w-auto"
            >
              📤 Compartilhar
            </button>
          </div>

          <!-- Toast -->
          <transition name="fade">
            <div
                v-if="showToast"
                class="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-black px-6 py-3 rounded-full shadow-lg flex items-center gap-3 text-sm font-semibold z-50"
            >
              <span>🔔</span>
              <span>{{ toastMessage }}</span>
            </div>
          </transition>


        </div>

        <div class="text-center text-sm text-gray-500">
          <p>Este teste é uma avaliação educacional e não substitui uma avaliação profissional completa.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out 0.3s both;
}
</style>
