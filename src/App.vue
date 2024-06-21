<template>
  <header class="header">
    <div class="wrapper">
      <nav>
        <router-link to="/products-home">Produkte Home</router-link>

        <RouterLink to="/ProductList" class="nav-link">Products</RouterLink>
      </nav>
    </div>
  </header>
  <div id="app">
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

interface Anzeige {
  name: string;
  beschreibung: string;
  preis: number;
}

const items = ref<Anzeige[]>([]), loadThings = () => {
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const endpoint = `${baseURL}/anzeigen`;
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow' as RequestRedirect,
  };

  console.log('Fetching data from:', endpoint);

  fetch(endpoint, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(result => {
        console.log('Received data:', result);
        items.value = result;
      })
      .catch(error => console.error('Fetch error:', error));
};

onMounted(() => {
  loadThings();
});
</script>


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
    background-color: #90ee90; /* Light green */
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>