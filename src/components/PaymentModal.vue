<script setup lang="ts">
import { onMounted } from 'vue'

const emit = defineEmits<{
  close: []
}>()

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://js.stripe.com/v3/buy-button.js'
  script.async = true
  document.head.appendChild(script)
})
</script>

<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 md:p-10 relative animate-modal">
      <button
        @click="emit('close')"
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="text-center mb-8">
        <div class="text-6xl mb-4">🎉</div>
        <h2 class="text-3xl font-bold text-primary-blue mb-4">
          Você Concluiu o Teste!
        </h2>
        <p class="text-gray-600 text-lg leading-relaxed">
          Para ver seu resultado completo e sua pontuação de QI, realize o pagamento de <span class="font-bold text-light-blue">US$ 1,00</span>.
        </p>
        <p class="text-gray-500 text-sm mt-4">
          Assim que o pagamento for confirmado, seu resultado será liberado automaticamente.
        </p>
      </div>

      <div class="mb-6 bg-gradient-to-r from-light-blue/10 to-primary-blue/10 rounded-xl p-5">
        <ul class="space-y-3 text-left">
          <li class="flex items-center text-gray-700">
            <span class="text-green-500 mr-3 text-xl">✓</span>
            <span>Análise completa do seu QI</span>
          </li>
          <li class="flex items-center text-gray-700">
            <span class="text-green-500 mr-3 text-xl">✓</span>
            <span>Classificação detalhada</span>
          </li>
          <li class="flex items-center text-gray-700">
            <span class="text-green-500 mr-3 text-xl">✓</span>
            <span>Resultado imediato</span>
          </li>
          <li class="flex items-center text-gray-700">
            <span class="text-green-500 mr-3 text-xl">✓</span>
            <span>Certificado digital</span>
          </li>
        </ul>
      </div>

      <div class="flex justify-center">
        <stripe-buy-button
          buy-button-id="buy_btn_1SEYwbF118tf09LB00dg0UCV"
          publishable-key="pk_live_51QdBRJF118tf09LBdrWxMnuezQtpDWtfWVNMJ7e76iS6HRICTHARhC6z7bjj01KjySpEsJLRgDgsMekg6ydcTeDn007m1wG3rk"
        >
        </stripe-buy-button>
      </div>

      <p class="text-xs text-gray-400 text-center mt-6">
        🔒 Pagamento 100% seguro via Stripe
      </p>
    </div>
  </div>
</template>

<style scoped>
@keyframes modal-appear {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-modal {
  animation: modal-appear 0.4s ease-out;
}
</style>
