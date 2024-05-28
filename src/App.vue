<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

interface Anzeige {
  name: string;
  beschreibung: string;
  preis: number;
}

const items = ref<Anzeige[]>([]);

const loadThings = () => {
  const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;
  const endpoint = `${baseURL}/anzeigen`;
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow' as RequestRedirect // Korrektur hier
  };

  fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(result => {
        items.value = result;
      })
      .catch(error => console.log('error', error));
};

onMounted(() => {
  loadThings();
});
</script>

<template>
  <header class="header">
    <div class="wrapper">
      <nav>
        <RouterLink to="/ProductList" class="nav-link">Products</RouterLink>
      </nav>
    </div>
  </header>

  <div id="app">
    <ul>
      <li v-for="item in items" :key="item.name">
        {{ item.name }} - {{ item.beschreibung }} - {{ item.preis }} €
      </li>
    </ul>
  </div>

  <RouterView />
</template>

<style scoped>
.header {
  line-height: 1.5;
  max-height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 100px;
}

html, body {
  background-color: #dcdcdc;
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>