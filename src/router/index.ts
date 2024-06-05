import { createRouter, createWebHistory } from 'vue-router';

import ProductListView from '../views/ProductListView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: ProductListView
  },
  {
    path: '/ProductList',
    name: 'ProductList',
    component: ProductListView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;