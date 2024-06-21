import { createRouter, createWebHistory } from 'vue-router';

import ProductListView from '../views/ProductListView.vue';
import ProductHome from '@/components/home/ProductHome.vue';

const routes = [
  {
    path: '/ProductList',
    name: 'ProductList',
    component: ProductListView
  },
  {
    path: '/products-home',
    name: 'ProductsHome',
    component: ProductHome
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;