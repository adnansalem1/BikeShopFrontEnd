<template>
  <header class="header">
    <div class="wrapper">
      <ul class="nav nav-pills nav-fill gap-2 p-1 small bg-primary rounded-5 shadow-sm">
        <li class="nav-item">
          <router-link to="/products-home" class="nav-link" aria-current="page">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/ProductList" class="nav-link">Produkte</router-link>
        </li>
      </ul>
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="darkModeSwitch" v-model="darkMode" @change="toggleDarkMode">
        <label class="form-check-label" for="darkModeSwitch">Dark Mode</label>
      </div>
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

const darkMode = ref(false), toggleDarkMode = () => {
  document.body.classList.toggle('dark-mode');
};

onMounted(() => {
  loadThings();

  if (localStorage.getItem('darkMode') === 'true') {
    darkMode.value = true;
    toggleDarkMode();
  }

});
</script>


<style scoped>

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem 0;
  line-height: 3;
  max-height: 10vh;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif !important;
  font-size: 1.2rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: -moz-center; transform-style: v-bind(1.5);
  color: #2c3e50;
  margin-top: 100px;
}

html, body {
  background-color: #90ee90; /* Light green */
  margin: 0;
  padding: 0;
  height: 100%;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1800px;
  margin: 0 auto;
}

.nav-pills .nav-link {
  color: #fff;
}

.nav-pills .nav-link.active {
  background-color: #007bff;
}

.nav-pills .nav-link:hover {
  background-color: #0056b3;
}

.nav-pills .nav-link:focus {
  background-color: #0056b3;
}

.dark-mode .header {
  background-color: #333;
  color: #fff;
}

.dark-mode .nav-pills .nav-link {
  color: #fff;
}

.dark-mode .nav-pills .nav-link:hover {
  background-color: #0056b3;
}

.dark-mode .nav-pills .nav-link:focus {
  background-color: #0056b3;
}

.dark-mode .header {
  background-color: #333;
  color: #fff;
}

.dark-mode #app {
  background-color: #333;
  color: #fff;
}

.dark-mode .wrapper {
  color: #fff;
}

.dark-mode .nav-pills .nav-link {
  color: #fff;
}

.dark-mode .nav-pills .nav-link.active {
  background-color: #007bff;
}

.dark-mode .nav-pills .nav-link:hover {
  background-color: #0056b3;
}

.dark-mode .nav-pills .nav-link:focus {
  background-color: #0056b3;
}

</style>