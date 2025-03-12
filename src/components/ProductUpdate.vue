<script lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProductByid, updateProducts } from '../services/api'

export default {
  name: 'ProductUpdate',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const product = ref({ name: '', price: '', description: '' })

    const loadProduct = async () => {
      try {
        const productId = route.params.id
        product.value = await getProductByid(productId)
      } catch (error) {
        console.error('Erro ao carregar produto:', error)
      }
    }

    const saveProduct = async () => {
      try {
        await updateProducts(route.params.id, product.value)
        alert('Produto atualizado com sucesso!')
        router.push('/')
      } catch (error) {
        console.error('Erro ao atualizar produto:', error)
      }
    }

    onMounted(loadProduct)

    return { product, saveProduct }
  },
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Atualizar Produto</h2>
    
    <div class="bg-white p-6 rounded-lg shadow-lg border">
      <label class="block mb-2 font-bold">Nome</label>
      <input v-model="product.name" type="text" class="w-full p-2 border rounded-lg mb-4" />

      <label class="block mb-2 font-bold">Preço</label>
      <input v-model="product.price" type="number" class="w-full p-2 border rounded-lg mb-4" />

      <label class="block mb-2 font-bold">Descrição</label>
      <input v-model="product.description" type="text" class="w-full p-2 border rounded-lg mb-4" />

      <button @click="saveProduct" class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
        Salvar
      </button>
    </div>

    <router-link to="/" class="mt-4 inline-block bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600">
      Voltar para Lista
    </router-link>
  </div>
</template>
