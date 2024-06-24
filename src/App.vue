<template>
  <header class="header">
    <div class="wrapper">
      <nav>
        <router-link to="/products-home"> <button class="shadow-sm btn btn-outline-primary me-2">Home</button></router-link>
        <router-link to="/ProductList"> <button class="shadow-sm btn btn-outline-primary">Produkte</button></router-link>
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
  position: fixed;
  top: 0;
  left: 0.5rem;
  right: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem 0;
  line-height: 3;
  max-height: 100vh;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif !important;
  font-size: 1.2rem;
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