import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../views/ProductList.vue'
import ProductForm from '../views/ProductForm.vue'
import ProductDetails from '../components/ProductDetails.vue'
import ProductUpdate from '../components/ProductUpdate.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'productlist',
      component: ProductList,
    },
    {
      path: '/productform',
      name: 'productform',
      component: ProductForm,
    },
    {
      path: '/productdetails/:id',
      name: 'productdetails',
      component: ProductDetails,
      props: true,
    },
    { path: '/productupdate/:id',
      name: 'productupdate',
      component: ProductUpdate,
      props: true 
    },
  ],
})

export default router
