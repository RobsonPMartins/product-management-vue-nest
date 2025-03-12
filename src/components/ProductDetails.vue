<script lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getProductByid } from '../services/api'

export default {
  name: 'ProductDetails',
  setup() {
    const route = useRoute()
    const product = ref(null)

    const loadProduct = async () => {
      try {
        const productId = route.params.id 
        product.value = await getProductByid(productId)
      } catch (error) {
        console.error('Erro ao carregar produto:', error)
      }
    }

    onMounted(loadProduct)

    return { product }
  },
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Detalhes do Produto</h2>
    
    <div v-if="product" class="bg-white p-6 rounded-lg shadow-md">
      <p><strong>Nome:</strong> {{ product.name }}</p>
      <p><strong>Preço:</strong> R$ {{ product.price }}</p>
      <p><strong>Descrição:</strong> {{ product.description }}</p>
    </div>
    <div v-else>
      <p>Carregando...</p>
    </div>

    <router-link to="/" class="mt-4 inline-block bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
      Voltar para Lista
    </router-link>
  </div>
</template>
