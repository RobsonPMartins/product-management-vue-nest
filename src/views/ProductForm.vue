<script lang="ts">
import { ref } from 'vue';
import { createProducts } from '../services/api';
import { useRouter } from 'vue-router'

export default {
  name: 'ProductForm',
  setup() {

    const router = useRouter()

    const product = ref({
      name: '',
      price: 0,
      description: '',
    });

    const handleSubmit = async () => {
      try {
        await createProducts(product.value);
        router.push('/');
      } catch (error) {
        console.error('Erro ao criar o produto:', error);
      }
    };

    return { product, handleSubmit };
  },
};

</script>

<template>
  <div class="container mx-auto p-6">
    <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Cadastrar / Editar Produto</h2>
    <form @submit.prevent="handleSubmit" class="border max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      
      <!-- Nome -->
      <div class="mb-4">
        <label for="name" class="block text-gray-700 font-semibold mb-2">Nome</label>
        <input
          id="name"
          type="text"
          v-model="product.name"
          required
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <!-- Preço -->
      <div class="mb-4">
        <label for="price" class="block text-gray-700 font-semibold mb-2">Preço</label>
        <input
          id="price"
          type="number"
          v-model="product.price"
          required
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Descrição -->
      <div class="mb-4">
        <label for="description" class="block text-gray-700 font-semibold mb-2">Descrição</label>
        <textarea
          id="description"
          v-model="product.description"
          placeholder="Descrição do produto"
          required
          rows="4"
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <!-- Ações -->
      <div class="flex gap-4 justify-center mt-4">
        <button type="submit" class="bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600 transition duration-200">
          Criar
        </button>
        <router-link to="/" class="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition duration-200">
          Cancelar
        </router-link>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* Custom Styles, if needed */
</style>

