<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
const showContent = ref(false)

onMounted(() => {
  setTimeout(() => {
    showContent.value = true
  }, 100)
})

const startTest = () => {
  router.push('/teste')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
    <div class="container mx-auto px-4 py-8">
      <transition name="slide-fade">
        <div v-if="showContent" class="max-w-5xl mx-auto">
          <header class="text-center mb-16 pt-12">
            <div class="inline-block bg-gold/20 text-primary-blue px-6 py-2 rounded-full mb-6 text-sm font-semibold animate-pulse">
              ⭐ Mais de 100.000 pessoas já testaram
            </div>
            <h1 class="text-5xl md:text-7xl font-bold text-primary-blue mb-6 leading-tight">
              Descubra Seu QI Real
            </h1>
            <p class="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Teste validado por padrões usados em avaliações psicológicas. Veja em minutos o seu verdadeiro potencial intelectual.
            </p>
            <button
              @click="startTest"
              class="bg-light-blue hover:bg-blue-600 text-white text-xl font-bold py-5 px-12 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-blue-500/50"
            >
              🧠 Quero Fazer o Teste de QI
            </button>
          </header>

          <div class="grid md:grid-cols-3 gap-8 mb-16">
            <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div class="text-5xl mb-4">⚡</div>
              <h3 class="text-xl font-bold text-primary-blue mb-3">Resultado Imediato</h3>
              <p class="text-gray-600">Descubra seu QI em poucos minutos após finalizar o teste</p>
            </div>

            <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div class="text-5xl mb-4">🧠</div>
              <h3 class="text-xl font-bold text-primary-blue mb-3">Base Científica</h3>
              <p class="text-gray-600">Teste desenvolvido com métodos validados cientificamente</p>
            </div>

            <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div class="text-5xl mb-4">🌍</div>
              <h3 class="text-xl font-bold text-primary-blue mb-3">Confiável</h3>
              <p class="text-gray-600">Milhares de pessoas descobriram seu potencial intelectual</p>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16">
            <h2 class="text-3xl font-bold text-primary-blue mb-8 text-center">O Que Nossos Usuários Dizem</h2>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="border-l-4 border-gold pl-6 py-4">
                <div class="flex items-center mb-3">
                  <span class="text-gold text-xl">⭐⭐⭐⭐⭐</span>
                </div>
                <p class="text-gray-700 mb-3 italic">"Sempre quis saber meu QI e esse teste me surpreendeu pela qualidade das questões. Resultado muito preciso!"</p>
                <p class="text-sm text-gray-500 font-semibold">— Maria S., São Paulo</p>
              </div>

              <div class="border-l-4 border-gold pl-6 py-4">
                <div class="flex items-center mb-3">
                  <span class="text-gold text-xl">⭐⭐⭐⭐⭐</span>
                </div>
                <p class="text-gray-700 mb-3 italic">"Incrível! As questões são desafiadoras e o resultado foi muito detalhado. Vale cada centavo."</p>
                <p class="text-sm text-gray-500 font-semibold">— João P., Rio de Janeiro</p>
              </div>

              <div class="border-l-4 border-gold pl-6 py-4">
                <div class="flex items-center mb-3">
                  <span class="text-gold text-xl">⭐⭐⭐⭐⭐</span>
                </div>
                <p class="text-gray-700 mb-3 italic">"Fiquei impressionada com a precisão. As perguntas realmente testam o raciocínio lógico!"</p>
                <p class="text-sm text-gray-500 font-semibold">— Ana C., Belo Horizonte</p>
              </div>

              <div class="border-l-4 border-gold pl-6 py-4">
                <div class="flex items-center mb-3">
                  <span class="text-gold text-xl">⭐⭐⭐⭐⭐</span>
                </div>
                <p class="text-gray-700 mb-3 italic">"Teste profissional! Consegui entender melhor minhas habilidades cognitivas."</p>
                <p class="text-sm text-gray-500 font-semibold">— Carlos M., Curitiba</p>
              </div>
            </div>
          </div>

          <div class="text-center mb-12">
            <div class="inline-block bg-gradient-to-r from-light-blue to-primary-blue text-white px-8 py-4 rounded-2xl shadow-xl">
              <p class="text-lg font-semibold">🔥 Mais de 10.000 pessoas testaram hoje!</p>
            </div>
          </div>

          <div class="text-center pb-12">
            <button
              @click="startTest"
              class="bg-gold hover:bg-yellow-500 text-primary-blue text-xl font-bold py-5 px-12 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Iniciar Meu Teste Agora →
            </button>
          </div>
        </div>
      </transition>
    </div>

    <div class="md:hidden fixed bottom-0 left-0 right-0 bg-light-blue p-4 shadow-lg z-50">
      <button
        @click="startTest"
        class="w-full bg-white text-light-blue text-lg font-bold py-4 px-6 rounded-lg shadow-lg"
      >
        Iniciar Teste de QI
      </button>
    </div>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.6s ease;
}

.slide-fade-enter-from {
  transform: translateY(30px);
  opacity: 0;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
