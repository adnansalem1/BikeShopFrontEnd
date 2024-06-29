<template>
  <div id="app">
    <header class="header">
      <div class="wrapper">
        <ul class="nav nav-pills nav-fill gap-2 p-1 small bg-primary rounded-5 shadow-sm">
          <li class="nav-item">
            <router-link to="/products-home" class="nav-link" aria-current="page">{{ $t('message.home') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/ProductList" class="nav-link">{{ $t('message.products') }}</router-link>
          </li>
        </ul>
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="darkModeSwitch" v-model="darkMode" @change="toggleDarkMode">
          <label class="form-check-label" for="darkModeSwitch">{{ $t('message.darkMode') }}</label>
        </div>
        <div>
          <button @click="changeLanguage('en')" :disabled="currentLocale === 'en'">EN</button>
          <button @click="changeLanguage('de')" :disabled="currentLocale === 'de'">DE</button>
        </div>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
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
  localStorage.setItem('darkMode', darkMode.value.toString());
};

const { locale } = useI18n();
const currentLocale = ref(locale.value);

const changeLanguage = (lang: string) => {
  locale.value = lang;
  currentLocale.value = lang;
  localStorage.setItem('locale', lang);
};

onMounted(() => {
  loadThings();

  if (localStorage.getItem('darkMode') === 'true') {
    darkMode.value = true;
    toggleDarkMode();
  }

  const savedLocale = localStorage.getItem('locale');
  if (savedLocale) {
    changeLanguage(savedLocale);
  }
});
</script>

<style scoped>
:root {
  --primary-color: #007bff;
  --secondary-color: #0056b3;
  --light-bg-color: #f8f9fa;
  --dark-bg-color: #333;
  --light-text-color: #495057;
  --dark-text-color: #fff;
  --shadow-color: rgba(0, 0, 0, 0.1);
  --font-size-base: 16px;
  --font-size-large: 1.2rem;
  --padding-base: 10px;
  --padding-large: 20px;
  --border-radius: 0.25rem;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
  font-size: var(--font-size-base);
  line-height: 1.5;
  color: var(--light-text-color);
  background-color: var(--light-bg-color);
  transition: background-color 0.3s, color 0.3s;
}

#app {
  font-family: 'Avenir', 'Helvetica', 'Arial', sans-serif !important;
  font-size: var(--font-size-large);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 100px;
  padding: var(--padding-large);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.header {
  background-color: var(--primary-color);
  color: var(--dark-text-color);
  padding: var(--padding-base) 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px var(--shadow-color);
  transition: background-color 0.3s, color 0.3s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size-large);
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 0 1px 2px var(--shadow-color);
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1800px;
  margin: 0 auto;
  width: 100%;
  padding: 0 var(--padding-base);
}

.nav-pills .nav-link {
  color: var(--dark-text-color);
  transition: background-color 0.3s, color 0.3s;
}

.nav-pills .nav-link.active {
  background-color: var(--primary-color);
}

.nav-pills .nav-link:hover,
.nav-pills .nav-link:focus {
  background-color: var(--secondary-color);
}

.form-check-input {
  cursor: pointer;
}
.language-switcher button {
  background-color: var(--primary-color);
  color: var(--dark-text-color);
  border: none;
  border-radius: var(--border-radius);
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}
.language-switcher button.active {
  background-color: var(--secondary-color);
}

.language-switcher button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>