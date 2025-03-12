<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { type Products } from '../types/Products'
import { getAllProducts, deleteProducts as deleteProductFromDB } from '../services/api'

export default defineComponent({
  name: 'ProductList',
  setup() {
    const produtos = ref<Products[]>([])

    const loadProducts = async () => {
      produtos.value = await getAllProducts()
    }

    const isLoading = ref(false)

    const deleteProducts = async (id: number) => {
      if (!confirm('Tem certeza que deseja excluir este produto?')) return

      isLoading.value = true

      try {
        await deleteProductFromDB(id)
        produtos.value = produtos.value.filter((produto) => produto.id !== id)
        alert('Produto excluído com sucesso!')
      } catch (error) {
        console.error('Erro ao excluir produto:', error)
        alert('Erro ao excluir o produto.')
      } finally {
        isLoading.value = false
      }
    }

    onMounted(loadProducts)

    return {
      produtos,
      deleteProducts,
    }
  },
})
</script>

<template>
  <div class="container mx-auto p-1">
    <h2 class="text-2xl font-bold mb-4 text-center">Lista de Produtos</h2>

    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-500 shadow-md rounded-lg">
        <thead>
          <tr class="bg-gray-200 text-gray-700 text-sm md:text-base">
            <th class="py-3 px-4 border w-1/6">Nome</th>
            <th class="py-3 px-4 border w-1/8">Preço</th>
            <th class="py-3 px-4 border w-1/3">Descrição</th>
            <th class="py-3 px-4 border w-1/3">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="produto in produtos"
            :key="produto.id"
            class="border-t hover:bg-gray-100 transition"
          >
            <td class="py-3 px-4 border text-center text-sm md:text-base">{{ produto.name }}</td>
            <td class="py-3 px-4 border text-center text-sm md:text-base">{{ produto.price }}</td>
            <td class="py-3 px-4 border text-center text-sm md:text-base">{{ produto.description }}</td>
            <td class="py-3 px-2 flex flex-wrap justify-center items-center gap-2">
              <router-link
                :to="`/productupdate/${produto.id}`"
                class="bg-blue-500 text-white text-sm md:text-base px-3 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Atualizar
              </router-link>
              <router-link
                :to="`/productdetails/${produto.id}`"
                class="bg-green-500 text-white text-sm md:text-base px-3 py-2 rounded-md hover:bg-green-600 transition"
              >
                Detalhes
              </router-link>
              <button
                @click="deleteProducts(produto.id)"
                class="bg-red-500 text-white text-sm md:text-base px-3 py-2 rounded-md hover:bg-red-600 transition"
              >
                Excluir
              </button>
              <router-link
                to="/productform"
                class="bg-yellow-500 text-white text-sm md:text-base px-3 py-2 rounded-md hover:bg-yellow-600 transition"
              >
                Editar
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
